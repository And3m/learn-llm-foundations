import Link from "next/link";
import type { Chapter } from "@/lib/content";

export function LessonSidebar({ chapter, activeSlug }: { chapter: Chapter; activeSlug?: string }) {
  const currentIndex = chapter.lessons.findIndex((item) => item.slug === activeSlug);
  return (
    <aside className="lesson-sidebar">
      <p className="eyebrow">Chapter {chapter.number}</p>
      <Link className="lesson-sidebar__title" href={`/chapters/${chapter.slug}`}>{chapter.title}</Link>
      <ol>
        {chapter.lessons.map((lesson) => (
          <li key={lesson.slug}>
            <Link className={activeSlug === lesson.slug ? "active" : ""} href={`/chapters/${chapter.slug}/${lesson.slug}`}>
              <span>{lesson.number}</span>{lesson.shortTitle}
            </Link>
          </li>
        ))}
      </ol>
      <div className="sidebar-meter"><span style={{ width: currentIndex >= 0 ? `${((currentIndex + 1) / chapter.lessons.length) * 100}%` : "0%" }} /></div>
      <small>{currentIndex >= 0 ? `${currentIndex + 1} of ${chapter.lessons.length} lessons` : `${chapter.lessons.length} lessons`}</small>
    </aside>
  );
}
