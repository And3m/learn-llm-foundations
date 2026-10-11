import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * A light guard for the Simplified Technical English (STE) style of the lessons.
 * It does not check the full ASD-STE100 rules. It checks the two rules that drift most
 * easily: long sentences and words that STE does not approve.
 */
const MAX_WORDS = 25;
const bannedWords = ["utilize", "utilise", "leverage", "various", "basically", "significantly", "very important", "in order to", "plethora", "myriad"];

const chaptersDir = join(process.cwd(), "src", "content", "chapters");

export function proseSentences(mdx: string) {
  const prose = mdx
    .replace(/<MermaidDiagram[\s\S]*?\/>/g, " ")
    .replace(/^import .*$/gm, " ")
    .replace(/\$\$[\s\S]*?\$\$/g, " ")
    .replace(/\$[^$\n]+\$/g, "X")
    .replace(/^\|.*\|\s*$/gm, " ")
    .replace(/<[^>]+>/g, "\n")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]/g, "");

  return prose
    .split(/\n+/)
    .map((line) => line.replace(/^\s*(?:[-*>]|\d+\.)\s+/, "").trim())
    .filter(Boolean)
    .flatMap((line) => line.split(/(?<=[.!?:])\s+(?=[A-Z"(])/))
    .map((sentence) => sentence.trim())
    .filter((sentence) => /[a-z]/i.test(sentence));
}

const lessons = readdirSync(chaptersDir).flatMap((chapter) =>
  readdirSync(join(chaptersDir, chapter))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ name: `${chapter}/${file}`, source: readFileSync(join(chaptersDir, chapter, file), "utf8") })),
);

describe("Simplified Technical English guard", () => {
  it.each(lessons)(`$name has no sentence longer than ${MAX_WORDS} words`, ({ source }) => {
    const long = proseSentences(source).filter((sentence) => sentence.split(/\s+/).length > MAX_WORDS);
    expect(long).toEqual([]);
  });

  it.each(lessons)("$name uses no banned words", ({ source }) => {
    const text = proseSentences(source).join(" ").toLowerCase();
    expect(bannedWords.filter((word) => new RegExp(`\\b${word}\\b`).test(text))).toEqual([]);
  });
});
