import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/content/callout";
import { SourceNote } from "@/components/content/source-note";
import { MermaidDiagram } from "@/components/diagrams/mermaid-diagram";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Callout,
    SourceNote,
    MermaidDiagram,
    ...components,
  };
}
