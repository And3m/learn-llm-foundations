import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleShell } from "@/components/article-shell";
import { getAllLessons, getChapter, getLesson } from "@/lib/content";

type Props = { params: Promise<{ chapter: string; lesson: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return getAllLessons().map(({ chapter, lesson }) => ({ chapter: chapter.slug, lesson: lesson.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapter: chapterSlug, lesson: lessonSlug } = await params;
  const lesson = getLesson(chapterSlug, lessonSlug);
  if (!lesson) return {};
  return { title: lesson.title, description: lesson.description, alternates: { canonical: `/chapters/${chapterSlug}/${lessonSlug}` } };
}

export default async function LessonPage({ params }: Props) {
  const { chapter: chapterSlug, lesson: lessonSlug } = await params;
  const chapter = getChapter(chapterSlug);
  const lesson = getLesson(chapterSlug, lessonSlug);
  if (!chapter || !lesson) notFound();
  // Import only this lesson, so that each page ships only its own labs and diagrams.
  const { default: Content } = await import(`@/content/chapters/${chapterSlug}/${lessonSlug}.mdx`);
  return <ArticleShell chapter={chapter} lesson={lesson}><Content /></ArticleShell>;
}
