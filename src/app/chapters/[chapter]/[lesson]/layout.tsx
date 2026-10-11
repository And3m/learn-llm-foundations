import "katex/dist/katex.min.css";
import "../../simulator.css";
import "../../diagrams.css";

// Only lesson pages render math, labs and diagrams, so their styles and the KaTeX fonts load here.
export default function LessonLayout({ children }: { children: React.ReactNode }) {
  return children;
}
