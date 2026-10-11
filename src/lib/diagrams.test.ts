import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { Mermaid } from "mermaid";
import { beforeAll, describe, expect, it } from "vitest";

const chaptersDir = join(process.cwd(), "src", "content", "chapters");

const charts = readdirSync(chaptersDir).flatMap((chapter) =>
  readdirSync(join(chaptersDir, chapter))
    .filter((file) => file.endsWith(".mdx"))
    .flatMap((file) => {
      const source = readFileSync(join(chaptersDir, chapter, file), "utf8");
      return [...source.matchAll(/<MermaidDiagram[\s\S]*?chart=\{`([\s\S]*?)`\}/g)].map((match, index) => ({
        name: `${chapter}/${file}#${index + 1}`,
        chart: match[1].trim(),
      }));
    }),
);

describe("Mermaid diagrams", () => {
  let mermaid: Mermaid;

  beforeAll(async () => {
    mermaid = (await import("mermaid")).default;
    mermaid.initialize({ startOnLoad: false, securityLevel: "strict" });
  }, 60_000);

  it("finds diagrams in the lessons", () => {
    expect(charts.length).toBeGreaterThan(0);
  });

  it.each(charts)("$name parses", async ({ chart }) => {
    await expect(mermaid.parse(chart)).resolves.toBeTruthy();
  });
});
