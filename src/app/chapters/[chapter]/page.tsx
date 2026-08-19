import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { chapters, getChapter } from "@/lib/content";

type Props = { params: Promise<{ chapter: string }> };

export const dynamicParams = false;
export function generateStaticParams() { return chapters.map((chapter) => ({ chapter: chapter.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapter: slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) return {};
  return { title: chapter.title, description: chapter.description, alternates: { canonical: `/chapters/${slug}` } };
}

export default async function ChapterPage({ params }: Props) {
  const { chapter: slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();
  const readingMinutes = chapter.lessons.reduce((total, item) => total + item.readingMinutes, 0);
  return (
    <main className="chapter-hero">
      <div className="chapter-hero__grid">
        <aside className="chapter-index"><div className="chapter-glyph">{String(chapter.number).padStart(2, "0")}</div><p>Chapter length</p><strong>{readingMinutes} min / {chapter.lessons.length} lessons</strong></aside>
        <section className="chapter-main">
          <span className="eyebrow">Chapter {chapter.number} / Available now</span>
          <h1>{chapter.title}</h1>
          <p>{chapter.overview}</p>
          <div className="lesson-list">
            {chapter.lessons.map((item) => <Link className="lesson-row" href={`/chapters/${chapter.slug}/${item.slug}`} key={item.slug}><span>{item.number}</span><div><h2>{item.title}</h2><p>{item.description}</p></div><small>{item.readingMinutes} min <span aria-hidden="true">-&gt;</span></small></Link>)}
          </div>
        </section>
      </div>
    </main>
  );
}
