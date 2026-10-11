// PostToolUse hook: after an edit to lesson MDX or diagram code, run the STE guard and the
// Mermaid parse test. On failure, exit 2 so Claude Code shows the failures to Claude.
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

let input = {};
try {
  input = JSON.parse(readFileSync(0, "utf8"));
} catch {
  process.exit(0);
}

const file = String(input.tool_input?.file_path ?? input.tool_response?.filePath ?? "").replace(/\\/g, "/");
const isLesson = /(?:^|\/)src\/content\/chapters\/[^/]+\/[^/]+\.mdx$/.test(file);
const isDiagram = /(?:^|\/)src\/components\/diagrams\/[^/]+\.tsx$/.test(file);
if (!isLesson && !isDiagram) process.exit(0);

// Diagram captions live in both places; Mermaid charts live only in the lessons.
const tests = ["src/lib/ste.test.ts", ...(isLesson ? ["src/lib/diagrams.test.ts"] : [])];
// On Windows, a lowercase drive letter ("d:\") makes Vitest load the same module under two
// paths and fail with "failed to find the current suite", so normalize it.
const projectDir = (process.env.CLAUDE_PROJECT_DIR || process.cwd()).replace(/^([a-z]):/, (_, drive) => `${drive.toUpperCase()}:`);
const result = spawnSync("npx", ["vitest", "run", ...tests], {
  cwd: projectDir,
  encoding: "utf8",
  shell: process.platform === "win32",
});

if (result.status === 0) process.exit(0);

const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
const failures = output
  .split("\n")
  .filter((line) => /FAIL|^\s*[-+]\s|Error|×/.test(line))
  .slice(0, 40)
  .join("\n");
process.stderr.write(`Lesson checks failed after editing ${file}:\n${failures || output.slice(-3000)}\n`);
process.exit(2);
