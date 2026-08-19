import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/content/callout";
import { SourceNote } from "@/components/content/source-note";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Callout,
    SourceNote,
    ...components,
  };
}
