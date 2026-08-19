import type { Metadata } from "next";
import { GlossaryList } from "@/components/glossary-list";
import { glossary } from "@/lib/content";

export const metadata: Metadata = { title: "Glossary", description: "Definitions for core concepts across the complete LLM lifecycle." };

export default function GlossaryPage() {
  return <main className="page-shell"><header className="page-header"><span className="eyebrow">Reference</span><h1>Glossary</h1><p>The compact vocabulary behind all five chapters. Filter by a term or an idea, then jump back into the lesson where it appears.</p></header><GlossaryList terms={glossary} /></main>;
}
