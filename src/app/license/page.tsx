import type { Metadata } from "next";

export const metadata: Metadata = { title: "Attribution & license" };

export default function LicensePage() {
  return <main className="page-shell"><header className="page-header"><span className="eyebrow">Open knowledge, credited clearly</span><h1>Attribution &amp; license</h1></header><div className="license-copy"><p>This site is an independent, noncommercial interactive companion based on <em>Foundations of Large Language Models</em> by Tong Xiao and Jingbo Zhu, dated June 17, 2025.</p><h2>Source material</h2><p>The source book is available as <a href="https://arxiv.org/abs/2501.09223">arXiv:2501.09223</a> and through the <a href="https://github.com/NiuTrans/NLPBook">NiuTrans NLP Book</a> project. The PDF’s printed copyright page states the Creative Commons Attribution-NonCommercial 4.0 license. This companion follows that stricter visible notice.</p><h2>What changed</h2><p>The explanations here are condensed and reorganized for the web. Diagrams and interactions are original implementations created to communicate the book’s concepts; illustrative simulator data is clearly identified and does not represent live model output.</p><h2>Not affiliated</h2><p>Learn LLM Foundations is not affiliated with the authors, Northeastern University, NiuTrans Research, or the Learn Inference reference site.</p></div></main>;
}
