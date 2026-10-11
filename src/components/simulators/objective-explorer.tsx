"use client";

import { useState } from "react";
import { SimulatorFrame } from "./simulator-frame";

const modes = {
  decoder: { label: "Decoder-only", caption: "Predict the next token", input: ["A", "model", "learns", "from"], target: "text", visible: [true, true, true, true], relation: "Causal: each position sees only its left context." },
  encoder: { label: "Encoder-only", caption: "Recover masked tokens", input: ["A", "model", "[MASK]", "from", "text"], target: "learns", visible: [true, true, false, true, true], relation: "Bidirectional: the masked position uses context on both sides." },
  seq2seq: { label: "Encoder-decoder", caption: "Rebuild the changed text", input: ["A", "model", "[GAP]", "text"], target: "learns from", visible: [true, true, false, true], relation: "The encoder reads the corrupted input. The decoder generates the missing text." },
} as const;

type Mode = keyof typeof modes;

export function ObjectiveExplorer() {
  const [mode, setMode] = useState<Mode>("encoder");
  const item = modes[mode];
  return (
    <SimulatorFrame number="02" title="One corpus, three learning objectives" description="The architecture and the corruption rule decide which relations the model can learn.">
      <div className="segmented" role="tablist" aria-label="Pre-training objective">
        {(Object.keys(modes) as Mode[]).map((key) => <button key={key} role="tab" aria-selected={mode === key} onClick={() => setMode(key)}>{modes[key].label}</button>)}
      </div>
      <div className="objective-stage">
        <div className="token-row" aria-label={`Input: ${item.input.join(" ")}`}>
          {item.input.map((token, index) => <span className={item.visible[index] ? "token" : "token masked"} key={`${token}-${index}`}>{token}</span>)}
        </div>
        <div className="objective-connector"><span>training target</span><i /></div>
        <div className="target-token"><small>{item.caption}</small><strong>{item.target}</strong></div>
      </div>
      <p className="objective-relation">{item.relation}</p>
    </SimulatorFrame>
  );
}
