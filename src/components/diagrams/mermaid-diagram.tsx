"use client";

import type { Mermaid } from "mermaid";
import { useTheme } from "next-themes";
import { useEffect, useId, useState } from "react";
import { useInView } from "./use-in-view";

type MermaidDiagramProps = {
  title: string;
  caption?: string;
  chart: string;
};

const token = (styles: CSSStyleDeclaration, name: string) => styles.getPropertyValue(name).trim();

let configuredTheme: string | null = null;

/** Loads Mermaid one time and configures it again only when the site theme changes. */
async function loadMermaid(theme: string): Promise<Mermaid> {
  const { default: mermaid } = await import("mermaid");
  if (configuredTheme === theme) return mermaid;
  const styles = getComputedStyle(document.documentElement);
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: "base",
    fontFamily: "inherit",
    themeVariables: {
      darkMode: theme === "dark",
      background: token(styles, "--background"),
      primaryColor: token(styles, "--signal-soft"),
      primaryTextColor: token(styles, "--foreground"),
      primaryBorderColor: token(styles, "--signal"),
      secondaryColor: token(styles, "--surface-2"),
      tertiaryColor: token(styles, "--surface"),
      lineColor: token(styles, "--muted"),
      textColor: token(styles, "--foreground"),
      mainBkg: token(styles, "--signal-soft"),
      nodeBorder: token(styles, "--signal"),
      clusterBkg: token(styles, "--surface"),
      clusterBorder: token(styles, "--border"),
      actorBkg: token(styles, "--signal-soft"),
      actorBorder: token(styles, "--signal"),
      actorTextColor: token(styles, "--foreground"),
      signalColor: token(styles, "--foreground"),
      signalTextColor: token(styles, "--foreground"),
      noteBkgColor: token(styles, "--surface-2"),
      noteTextColor: token(styles, "--foreground"),
      noteBorderColor: token(styles, "--border"),
      labelBoxBkgColor: token(styles, "--surface-2"),
      fontSize: "14px",
    },
  });
  configuredTheme = theme;
  return mermaid;
}

/**
 * Renders a Mermaid diagram in the browser. The site theme tokens set the diagram colors,
 * and the diagram draws again when the reader changes the theme. Until Mermaid loads,
 * the reader sees the diagram source text. Mermaid loads only when the diagram comes near
 * the viewport, so a reader who does not scroll to a diagram does not download it.
 */
export function MermaidDiagram({ title, caption, chart }: MermaidDiagramProps) {
  const { resolvedTheme } = useTheme();
  const id = `mermaid-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [ref, near] = useInView<HTMLElement>({ rootMargin: "600px 0px", once: true });

  useEffect(() => {
    if (!resolvedTheme || !near) return;
    let cancelled = false;
    (async () => {
      try {
        const mermaid = await loadMermaid(resolvedTheme);
        const { svg: rendered } = await mermaid.render(`${id}-${resolvedTheme}`, chart.trim());
        if (!cancelled) {
          setSvg(rendered);
          setFailed(false);
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, id, near, resolvedTheme]);

  return (
    <figure className="diagram diagram--mermaid" ref={ref}>
      <figcaption className="diagram__header">
        <span>Diagram</span>
        <strong>{title}</strong>
      </figcaption>
      {svg && !failed ? (
        <div className="diagram__canvas diagram__mermaid" role="img" aria-label={title} dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <pre className="diagram__source" aria-label={`${title} (diagram source)`}>{chart.trim()}</pre>
      )}
      {caption ? <p className="diagram__caption">{caption}</p> : null}
    </figure>
  );
}
