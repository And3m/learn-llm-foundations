"use client";

import { useMemo, useState } from "react";
import { SimulatorFrame } from "./simulator-frame";

const examples = [
  { tokens: ["The", "model", "reads", "both", "directions"], defaultMask: 2, candidates: [["sees", 48], ["reads", 31], ["uses", 14], ["knows", 7]] as [string, number][] },
  { tokens: ["Context", "changes", "a", "token's", "meaning"], defaultMask: 4, candidates: [["meaning", 62], ["role", 18], ["value", 13], ["shape", 7]] as [string, number][] },
];

export function BertMaskingLab() {
  const [exampleIndex, setExampleIndex] = useState(0);
  const [maskIndex, setMaskIndex] = useState(examples[0].defaultMask);
  const example = examples[exampleIndex];
  const candidates = useMemo(() => example.candidates, [example]);
  function selectExample(index: number) { setExampleIndex(index); setMaskIndex(examples[index].defaultMask); }
  return (
    <SimulatorFrame number="03" title="What can BERT infer from both sides?" description="Choose a sentence and hide a token. The example distribution shows how context narrows the possibilities.">
      <div className="lab-toolbar">
        <label>Sentence<select value={exampleIndex} onChange={(event) => selectExample(Number(event.target.value))}><option value={0}>Reading directions</option><option value={1}>Context and meaning</option></select></label>
        <span>Click any token to mask it</span>
      </div>
      <div className="masking-grid">
        <div className="mask-sentence">
          {example.tokens.map((token, index) => <button className={index === maskIndex ? "masked" : ""} key={`${token}-${index}`} onClick={() => setMaskIndex(index)} aria-pressed={index === maskIndex}>{index === maskIndex ? "[MASK]" : token}</button>)}
          <div className="context-arrows" aria-hidden="true"><span>left context →</span><span>← right context</span></div>
        </div>
        <div className="probability-list" aria-live="polite">
          <p>Example predictions</p>
          {candidates.map(([word, value], index) => <div key={word}><span>{maskIndex === example.defaultMask ? word : index === 0 ? example.tokens[maskIndex] : word}</span><i><b style={{ width: `${value}%` }} /></i><small>{value}%</small></div>)}
        </div>
      </div>
      <p className="simulator-disclaimer">Illustrative probabilities, not a live model inference.</p>
    </SimulatorFrame>
  );
}
