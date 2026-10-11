import Link from "next/link";
import { ArrowIcon, GlossaryIcon, MarkIcon, PlayIcon } from "@/components/icons";
import { chapters, getAllLessons } from "@/lib/content";

export default function HomePage() {
  return (
    <main className="home">
      <div className="home-grid">
        <aside className="book-column">
          <div className="book-cover">
            <MarkIcon className="cover-mark" />
            <p className="cover-kicker">An interactive field guide</p>
            <h1>Learn LLM<br />Foundations</h1>
            <p>From pre-training<br />to inference</p>
          </div>
          <div className="book-actions">
            <Link className="button primary" href="/chapters/pre-training/pre-training-models"><PlayIcon /> Start reading</Link>
            <Link className="button" href="/glossary"><GlossaryIcon /> Glossary</Link>
          </div>
        </aside>
        <section className="home-intro">
          <p className="eyebrow">Foundations, made tangible</p>
          <h2>See how language models learn.</h2>
          <p className="lede">A visual companion to <em>Foundations of Large Language Models</em>. Read the main ideas in Simplified Technical English. Then use the diagrams and labs to see the objectives and systems at work.</p>
          <div className="home-stats">
            <div><strong>{chapters.length}</strong><span>complete chapters</span></div>
            <div><strong>{getAllLessons().length}</strong><span>focused lessons</span></div>
            <div><strong>8</strong><span>interactive labs</span></div>
          </div>
          <div className="section-heading"><h3>Contents</h3><span>All chapters available</span></div>
          <div className="chapter-list">
            {chapters.map((chapter) => <Link className="chapter-card available" href={`/chapters/${chapter.slug}`} key={chapter.slug}><span className="chapter-num">0{chapter.number}</span><div><h4>{chapter.title}</h4><p>{chapter.description}</p></div><ArrowIcon /></Link>)}
          </div>
        </section>
      </div>
    </main>
  );
}
