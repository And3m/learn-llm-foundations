import Link from "next/link";
import type { Chapter, Lesson } from "@/lib/content";
import { getLessonNeighbors } from "@/lib/content";
import { ArrowIcon } from "./icons";
import { LessonSidebar } from "./lesson-sidebar";
import { ReadingProgress } from "./reading-progress";

export function ArticleShell({ chapter, lesson, children }: { chapter: Chapter; lesson: Lesson; children: React.ReactNode }) {
  const { previous, next } = getLessonNeighbors(chapter.slug, lesson.slug);
  const basePath = `/chapters/${chapter.slug}`;
  return (
    <>
      <ReadingProgress />
      <div className="reading-layout">
        <LessonSidebar chapter={chapter} activeSlug={lesson.slug} />
        <main className="article-wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><Link href={basePath}>{chapter.title}</Link><span>/</span><span>{lesson.number}</span>
          </nav>
          <header className="article-header">
            <span className="lesson-number">Lesson {lesson.number}</span>
            <h1>{lesson.title}</h1>
            <p>{lesson.description}</p>
            <div className="article-meta"><span>{lesson.readingMinutes} min read</span><span>Source pp. {lesson.sourcePages}</span></div>
          </header>
          <article className="prose">{children}</article>
          <nav className="lesson-pager" aria-label="Lesson navigation">
            {previous ? <Link className="pager-card previous" href={`${basePath}/${previous.slug}`}><small>Previous</small><span><ArrowIcon /> {previous.shortTitle}</span></Link> : <span />}
            {next ? <Link className="pager-card next" href={`${basePath}/${next.slug}`}><small>Next</small><span>{next.shortTitle} <ArrowIcon /></span></Link> : <Link className="pager-card next" href={basePath}><small>Complete</small><span>Chapter overview <ArrowIcon /></span></Link>}
          </nav>
        </main>
        <aside className="article-toc">
          <p className="eyebrow">On this page</p>
          <nav>{lesson.sections.map((section) => <a key={section.id} href={`#${section.id}`}><span>{section.label}</span>{section.sourcePages ? <small>pp. {section.sourcePages}</small> : null}</a>)}</nav>
          <a className="source-link" href="/resources/foundations-of-large-language-models.pdf">Open source PDF</a>
        </aside>
      </div>
    </>
  );
}
