import type { MetadataRoute } from "next";
import { chapters, getAllLessons, siteUrl } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/glossary", "/reading", "/license"];
  const chapterRoutes = chapters.map((chapter) => `/chapters/${chapter.slug}`);
  const lessonRoutes = getAllLessons().map(({ chapter, lesson }) => `/chapters/${chapter.slug}/${lesson.slug}`);
  return [...staticRoutes, ...chapterRoutes, ...lessonRoutes].map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: "monthly", priority: path === "" ? 1 : .8 }));
}
