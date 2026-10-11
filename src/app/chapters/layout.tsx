import "katex/dist/katex.min.css";
import "./simulator.css";
import "./diagrams.css";

// Only lesson pages render math, so the KaTeX styles and fonts load here and not in the root layout.
export default function ChaptersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
