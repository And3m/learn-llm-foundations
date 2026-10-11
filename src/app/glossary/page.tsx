import type { Metadata } from "next";
import { GlossaryList } from "@/components/glossary-list";
import { glossary } from "@/lib/content";

export const metadata: Metadata = { title: "Glossary", description: "Definitions of the main concepts across the full LLM life cycle." };

export default function GlossaryPage() {
  return <main className="page-shell"><header className="page-header"><span className="eyebrow">Reference</span><h1>Glossary</h1><p>The main words of all five chapters. Filter by a term or an idea. Then go to the lesson where it occurs.</p></header><GlossaryList terms={glossary} /></main>;
}
