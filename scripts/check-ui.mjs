#!/usr/bin/env node
// Layout and typography check across device sizes, with headless Chrome over the DevTools protocol.
//
//   npm run check:ui                        # checks http://localhost:3000 (start the site first)
//   npm run check:ui -- --base http://localhost:3200 --shots ./ui-shots
//   npm run check:ui -- --devices "iPhone SE,Desktop 1440" --themes dark
//
// For each device, theme and page it fails when:
//   - the page scrolls sideways,
//   - visible text is smaller than 12px (SVG diagram text: smaller than 10.5px on screen),
//   - a page title wraps to more than 3 lines on phones or 2 lines on larger screens,
//   - a link, button or input is smaller than 24x24px (WCAG 2.5.8; links inside sentences are exempt),
//   - the page logs a console error or throws.
// Needs Chrome or Edge. Set CHROME_PATH if the browser is not in a default location.

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const DEVICES = [
  { name: "Galaxy Fold", width: 280, height: 653, scale: 3, mobile: true },
  { name: "iPhone SE", width: 375, height: 667, scale: 2, mobile: true },
  { name: "iPhone 15", width: 393, height: 852, scale: 3, mobile: true },
  { name: "Pixel 7", width: 412, height: 915, scale: 2.6, mobile: true },
  { name: "Phone landscape", width: 852, height: 393, scale: 3, mobile: true },
  { name: "iPad Mini", width: 768, height: 1024, scale: 2, mobile: true },
  { name: "iPad Pro", width: 1024, height: 1366, scale: 2, mobile: true },
  { name: "Laptop 1280", width: 1280, height: 800, scale: 1, mobile: false },
  { name: "Desktop 1440", width: 1440, height: 900, scale: 1, mobile: false },
  { name: "Desktop 1920", width: 1920, height: 1080, scale: 1, mobile: false },
];
const PAGES = ["/", "/chapters/pre-training", "/chapters/pre-training/bert", "/chapters/inference/efficient-inference", "/glossary"];
const MOBILE_UA = "Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Mobile Safari/537.36";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((pairs, arg, index, all) => (arg.startsWith("--") ? [...pairs, [arg.slice(2), all[index + 1]?.startsWith("--") ? "true" : (all[index + 1] ?? "true")]] : pairs), []),
);
const base = (args.base ?? "http://localhost:3000").replace(/\/$/, "");
const devices = args.devices ? DEVICES.filter((device) => args.devices.split(",").map((name) => name.trim()).includes(device.name)) : DEVICES;
const themes = (args.themes ?? "light,dark").split(",");
const pages = args.pages ? args.pages.split(",") : PAGES;
const shotsDir = args.shots && args.shots !== "true" ? args.shots : null;
if (shotsDir) mkdirSync(shotsDir, { recursive: true });

const chromePath = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].find((path) => path && existsSync(path));
if (!chromePath) {
  console.error("Chrome or Edge not found. Set CHROME_PATH.");
  process.exit(2);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const port = 9400 + Math.floor(Math.random() * 400);
const profile = mkdtempSync(join(tmpdir(), "check-ui-"));
const chrome = spawn(chromePath, ["--headless=new", "--disable-gpu", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });

let targets;
for (let attempt = 0; attempt < 60 && !targets; attempt += 1) {
  try {
    targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
  } catch {
    await sleep(250);
  }
}
const ws = new WebSocket(targets.find((target) => target.type === "page").webSocketDebuggerUrl);
await new Promise((resolve) => ws.addEventListener("open", resolve));
let nextId = 0;
const pending = new Map();
let consoleErrors = [];
ws.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  } else if (message.method === "Runtime.exceptionThrown") {
    consoleErrors.push(message.params.exceptionDetails.exception?.description?.split("\n")[0] ?? message.params.exceptionDetails.text);
  } else if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
    consoleErrors.push(message.params.args.map((arg) => arg.value ?? arg.description ?? "").join(" ").slice(0, 200));
  }
});
const send = (method, params = {}) =>
  new Promise((resolve) => {
    nextId += 1;
    pending.set(nextId, resolve);
    ws.send(JSON.stringify({ id: nextId, method, params }));
  });
const evaluate = async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result.result?.value;

// Runs inside the page. Returns a list of problems.
const inspect = (deviceWidth) => `(() => {
  const issues = [];
  const isVisible = (el) => {
    const style = getComputedStyle(el);
    if (style.visibility === "hidden" || style.display === "none" || Number(style.opacity) === 0) return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && el.closest("[aria-hidden='true']:not(svg), .sr-only, details:not([open]) > :not(summary)") === null;
  };
  const describe = (el) => (el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\\s+/).join(".") : "")).slice(0, 70);

  if (document.documentElement.scrollWidth > window.innerWidth + 1) {
    issues.push({ kind: "horizontal-scroll", detail: "page is " + document.documentElement.scrollWidth + "px wide in a " + window.innerWidth + "px viewport" });
  }

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const el = node.parentElement;
    if (!el || seen.has(el) || !node.textContent.trim()) continue;
    seen.add(el);
    if (el.closest("script, style, noscript, .katex, pre")) continue;
    if (!isVisible(el)) continue;
    const svg = el.closest("svg");
    if (svg) {
      const viewBox = svg.viewBox && svg.viewBox.baseVal;
      const scale = viewBox && viewBox.width ? svg.getBoundingClientRect().width / viewBox.width : 1;
      const size = parseFloat(getComputedStyle(el).fontSize) * scale;
      if (size < 10.5) issues.push({ kind: "small-svg-text", detail: size.toFixed(1) + "px: " + node.textContent.trim().slice(0, 40) });
      continue;
    }
    const size = parseFloat(getComputedStyle(el).fontSize);
    if (size < 12) issues.push({ kind: "small-text", detail: size.toFixed(1) + "px " + describe(el) + ": " + node.textContent.trim().slice(0, 40) });
  }

  const maxLines = ${deviceWidth} < 768 ? 3 : 2;
  for (const heading of document.querySelectorAll("h1, .home-intro h2")) {
    if (!isVisible(heading)) continue;
    const style = getComputedStyle(heading);
    const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.1;
    const lines = Math.round(heading.getBoundingClientRect().height / lineHeight);
    if (lines > maxLines) issues.push({ kind: "title-wraps", detail: lines + " lines: " + heading.textContent.trim().slice(0, 50) });
  }

  // Items in one row (breadcrumb, nav, footer links, meta) must share the same text midline.
  for (const row of document.querySelectorAll(".breadcrumb, .desktop-nav, .site-footer__links, .site-footer__creator, .article-meta, .diagram__controls")) {
    if (!isVisible(row)) continue;
    const mids = [];
    for (const child of row.children) {
      const text = [...child.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim()) || child.querySelector("*") && [...child.querySelectorAll("*")].flatMap((el) => [...el.childNodes]).find((n) => n.nodeType === 3 && n.textContent.trim());
      if (!text || !isVisible(child)) continue;
      const range = document.createRange();
      range.selectNodeContents(text);
      const rect = range.getClientRects()[0];
      if (rect && rect.top >= row.getBoundingClientRect().top - 1 && rect.bottom <= row.getBoundingClientRect().top + 40) mids.push({ mid: (rect.top + rect.bottom) / 2, text: text.textContent.trim().slice(0, 15) });
    }
    if (mids.length > 1) {
      const spread = Math.max(...mids.map((m) => m.mid)) - Math.min(...mids.map((m) => m.mid));
      if (spread > 2) issues.push({ kind: "misaligned-row", detail: spread.toFixed(1) + "px in " + describe(row) + ": " + mids.map((m) => m.text).join(" | ") });
    }
  }

  for (const el of document.querySelectorAll("a[href], button, input, select, textarea, summary")) {
    if (!isVisible(el)) continue;
    if (el.tagName === "A" && el.closest("p, li, dd, td, blockquote, .prose")) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width < 24 || rect.height < 24) issues.push({ kind: "small-target", detail: Math.round(rect.width) + "x" + Math.round(rect.height) + " " + describe(el) + " " + (el.getAttribute("aria-label") || el.textContent.trim()).slice(0, 30) });
  }
  return issues;
})()`;

await send("Page.enable");
await send("Runtime.enable");
const failures = [];
let checked = 0;

for (const device of devices) {
  await send("Emulation.setDeviceMetricsOverride", { width: device.width, height: device.height, deviceScaleFactor: device.scale, mobile: device.mobile });
  await send("Emulation.setTouchEmulationEnabled", { enabled: device.mobile, maxTouchPoints: device.mobile ? 5 : 0 });
  if (device.mobile) await send("Emulation.setUserAgentOverride", { userAgent: MOBILE_UA });
  else await send("Emulation.setUserAgentOverride", { userAgent: "" });
  for (const theme of themes) {
    await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: theme }] });
    for (const page of pages) {
      consoleErrors = [];
      await send("Page.navigate", { url: base + page });
      await sleep(2500);
      // Scroll through the page so that lazy diagrams and fonts load, then go back to the top.
      const height = (await evaluate("document.documentElement.scrollHeight")) ?? 0;
      for (let y = 0; y < height; y += device.height) {
        await evaluate(`window.scrollTo(0, ${y})`);
        await sleep(150);
      }
      await sleep(1200);
      const issues = (await evaluate(inspect(device.width))) ?? [];
      await evaluate("window.scrollTo(0, 0)");
      await sleep(300);
      for (const error of consoleErrors) issues.push({ kind: "console-error", detail: error });
      checked += 1;
      const label = `${device.name} (${device.width}x${device.height}) ${theme} ${page}`;
      if (issues.length) failures.push({ label, issues });
      console.log(`${issues.length ? "FAIL" : "ok  "} ${label}${issues.length ? ` — ${issues.length} issue(s)` : ""}`);
      if (shotsDir) {
        const shot = await send("Page.captureScreenshot", { format: "png" });
        const file = `${device.name}-${theme}-${page === "/" ? "home" : page.split("/").filter(Boolean).join("_")}.png`.replace(/\s+/g, "-");
        writeFileSync(join(shotsDir, file), Buffer.from(shot.result.data, "base64"));
      }
    }
  }
}

ws.close();
chrome.kill();
await sleep(300);
try {
  rmSync(profile, { recursive: true, force: true });
} catch {
  // Chrome can keep the profile locked for a moment on Windows.
}

console.log(`\nChecked ${checked} page views. ${failures.length} with issues.`);
const byKind = new Map();
for (const { label, issues } of failures) {
  for (const issue of issues) {
    if (!byKind.has(issue.kind)) byKind.set(issue.kind, new Map());
    const details = byKind.get(issue.kind);
    if (!details.has(issue.detail)) details.set(issue.detail, []);
    details.get(issue.detail).push(label);
  }
}
for (const [kind, details] of byKind) {
  console.log(`\n${kind} (${[...details.values()].reduce((total, labels) => total + labels.length, 0)})`);
  for (const [detail, labels] of [...details].slice(0, 12)) console.log(`  ${detail}  [${labels.length}x, e.g. ${labels[0]}]`);
  if (details.size > 12) console.log(`  … and ${details.size - 12} more`);
}
process.exit(failures.length ? 1 : 0);
