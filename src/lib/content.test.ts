import { describe, expect, it } from "vitest";
import { chapters, getAllLessons, getChapter, getLesson, getLessonNeighbors, glossary } from "./content";

describe("content registry", () => {
  it("publishes all five chapters and every planned lesson", () => {
    expect(chapters).toHaveLength(5);
    expect(chapters.every((chapter) => chapter.status === "available")).toBe(true);
    expect(getAllLessons()).toHaveLength(22);
  });

  it("uses unique chapter/lesson routes and sequential numbering", () => {
    const routes = getAllLessons().map(({ chapter, lesson }) => `${chapter.slug}/${lesson.slug}`);
    expect(new Set(routes).size).toBe(routes.length);
    for (const chapter of chapters) {
      expect(chapter.lessons.map((item) => item.number)).toEqual(
        chapter.lessons.map((_, index) => `${chapter.number}.${index + 1}`),
      );
    }
  });

  it("builds chapter-local previous and next relationships", () => {
    expect(getLessonNeighbors("generative-models", "llm-pipeline").previous).toBeUndefined();
    expect(getLessonNeighbors("generative-models", "llm-pipeline").next?.slug).toBe("training-at-scale");
    expect(getLessonNeighbors("generative-models", "summary").next).toBeUndefined();
  });

  it("keeps glossary lesson links resolvable", () => {
    for (const entry of glossary) {
      if (entry.chapter && entry.lesson) {
        expect(getChapter(entry.chapter), entry.term).toBeDefined();
        expect(getLesson(entry.chapter, entry.lesson), entry.term).toBeDefined();
      }
    }
  });
});
