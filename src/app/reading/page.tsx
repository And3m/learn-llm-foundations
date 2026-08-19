import type { Metadata } from "next";

export const metadata: Metadata = { title: "Further reading", description: "Primary sources and companion resources for learning LLM foundations." };

const resources = [
  { type: "Source book", title: "Foundations of Large Language Models", description: "Tong Xiao and Jingbo Zhu’s complete five-chapter text, revised June 2025.", href: "/resources/foundations-of-large-language-models.pdf" },
  { type: "Research record", title: "arXiv:2501.09223", description: "Abstract, versions, citation formats, and source files for the book.", href: "https://arxiv.org/abs/2501.09223" },
  { type: "Open textbook", title: "NiuTrans NLP Book", description: "The broader introductory NLP resource from which these chapters were selected.", href: "https://github.com/NiuTrans/NLPBook" },
  { type: "Landmark paper", title: "BERT", description: "Devlin et al.’s original encoder pre-training paper and its masked-language-model objective.", href: "https://arxiv.org/abs/1810.04805" },
];

export default function ReadingPage() {
  return <main className="page-shell"><header className="page-header"><span className="eyebrow">Sources, not rabbit holes</span><h1>Further reading</h1><p>Start with the source book, then follow the primary material when you want the derivations, experiments, and historical context.</p></header><div className="resource-grid">{resources.map((resource) => <a className="resource-card" href={resource.href} target={resource.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" key={resource.title}><small>{resource.type}</small><h2>{resource.title} ↗</h2><p>{resource.description}</p></a>)}</div></main>;
}
