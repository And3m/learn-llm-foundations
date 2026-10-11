import { describe, expect, it } from "vitest";
import { diagramCaptions, lessonSources, mermaidElement } from "./lesson-sources";

/**
 * A light guard for the Simplified Technical English (STE) style of the lessons.
 * It does not check the full ASD-STE100 rules. It checks the two rules that drift most
 * easily: long sentences and words that STE does not approve.
 */
const MAX_WORDS = 25;
const bannedWords = ["utilize", "utilise", "leverage", "various", "basically", "significantly", "very important", "in order to", "plethora", "myriad"];

const countWords = (sentence: string) => sentence.split(/\s+/).length;
const findBanned = (text: string) => bannedWords.filter((word) => new RegExp(`\\b${word}\\b`, "i").test(text));

function proseSentences(mdx: string) {
  const prose = mdx
    .replace(mermaidElement, " ")
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

const lessons = lessonSources();
// Diagram captions are reader-facing text too. They live in MDX props and in the diagram components.
const captions = diagramCaptions();

describe("Simplified Technical English guard", () => {
  it.each(lessons)(`$name has no sentence longer than ${MAX_WORDS} words`, ({ source }) => {
    expect(proseSentences(source).filter((sentence) => countWords(sentence) > MAX_WORDS)).toEqual([]);
  });

  it.each(lessons)("$name uses no banned words", ({ source }) => {
    expect(findBanned(proseSentences(source).join(" "))).toEqual([]);
  });

  it("detects banned words and long sentences", () => {
    expect(findBanned("We utilize the cache.")).toEqual(["utilize"]);
    expect(proseSentences(`${"word ".repeat(30).trim()}.`).filter((sentence) => countWords(sentence) > MAX_WORDS)).toHaveLength(1);
  });

  it("finds the diagram captions", () => {
    expect(captions.length).toBeGreaterThan(30);
  });

  it.each(captions)("$name caption follows STE", ({ caption }) => {
    expect(caption.split(/(?<=[.!?])\s+/).filter((sentence) => countWords(sentence) > MAX_WORDS)).toEqual([]);
    expect(findBanned(caption)).toEqual([]);
  });
});
