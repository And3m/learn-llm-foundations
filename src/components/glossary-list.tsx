"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { GlossaryTerm } from "@/lib/content";

export function GlossaryList({ terms }: { terms: GlossaryTerm[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => terms.filter((item) => `${item.term} ${item.definition}`.toLowerCase().includes(query.toLowerCase())), [query, terms]);
  return (
    <div>
      <label className="search-field"><span>Filter concepts</span><input type="search" placeholder={'Try "caching" or "alignment"'} value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      <p className="results-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "term" : "terms"}</p>
      <dl className="glossary-list">
        {filtered.map((item) => <div key={item.term}><dt>{item.term}</dt><dd>{item.definition}{item.lesson && item.chapter && <Link href={`/chapters/${item.chapter}/${item.lesson}`}>Read lesson</Link>}</dd></div>)}
      </dl>
      {filtered.length === 0 && <div className="empty-state"><p>No concepts match &quot;{query}&quot;.</p><button type="button" onClick={() => setQuery("")}>Clear search</button></div>}
    </div>
  );
}
