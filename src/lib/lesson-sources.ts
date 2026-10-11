// Test-only helpers that read the lesson MDX and diagram sources from disk.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

type Source = { name: string; source: string };

const chaptersDir = join(process.cwd(), "src", "content", "chapters");
const diagramsDir = join(process.cwd(), "src", "components", "diagrams");

/** One full `<MermaidDiagram ... chart={`...`} />` element. Group 1 is the chart text. */
export const mermaidElement = /<MermaidDiagram[\s\S]*?chart=\{`([\s\S]*?)`\}\s*\/>/g;

/** A `caption` prop written as "...", {"..."} or {`...`}. Group 1, 2 or 3 is the text. */
const captionProp = /\bcaption=(?:"([^"]+)"|\{"([^"]+)"\}|\{`([^`]+)`\})/g;

export function lessonSources(): Source[] {
  return readdirSync(chaptersDir).flatMap((chapter) =>
    readdirSync(join(chaptersDir, chapter))
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => ({ name: `${chapter}/${file}`, source: readFileSync(join(chaptersDir, chapter, file), "utf8") })),
  );
}

export function diagramSources(): Source[] {
  return readdirSync(diagramsDir)
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => ({ name: `diagrams/${file}`, source: readFileSync(join(diagramsDir, file), "utf8") }));
}

export function mermaidCharts() {
  return lessonSources().flatMap(({ name, source }) =>
    [...source.matchAll(mermaidElement)].map((match, index) => ({ name: `${name}#${index + 1}`, chart: match[1].trim() })),
  );
}

/** All diagram captions in the lessons and the diagram components. */
export function diagramCaptions() {
  return [...lessonSources(), ...diagramSources()].flatMap(({ name, source }) =>
    [...source.matchAll(captionProp)].map((match) => ({ name, caption: match[1] ?? match[2] ?? match[3] })),
  );
}
