"use client";

import { useState } from "react";
import { SimulatorFrame } from "./simulator-frame";

const paradigms = {
  unsupervised: { label: "Unsupervised", source: "Raw examples", signal: "Structure in data", goal: "Find patterns", note: "No person gives a target. The learning criterion describes a useful structure, for example the reconstruction of an input.", example: "Autoencoder" },
  supervised: { label: "Supervised", source: "Examples + labels", signal: "Human annotations", goal: "Predict the label", note: "The model learns from an explicit target. This method is direct. But good labels are expensive when you need many of them.", example: "Sentiment model" },
  self: { label: "Self-supervised", source: "Raw text", signal: "Targets from text", goal: "Recover hidden text", note: "The data makes its own supervision. You can hide or shift a token and then use it as the target.", example: "BERT / GPT" },
} as const;

type Paradigm = keyof typeof paradigms;

export function ParadigmExplorer() {
  const [active, setActive] = useState<Paradigm>("self");
  const item = paradigms[active];
  return (
    <SimulatorFrame number="01" title="Where does the teaching signal come from?" description="Select a paradigm. Then follow the signal from the data to the learning objective.">
      <div className="segmented" role="tablist" aria-label="Learning paradigm">
        {(Object.keys(paradigms) as Paradigm[]).map((key) => <button key={key} role="tab" aria-selected={active === key} onClick={() => setActive(key)}>{paradigms[key].label}</button>)}
      </div>
      <div className="flow-diagram" aria-live="polite">
        <div className="flow-node"><small>Input</small><strong>{item.source}</strong></div><span className="flow-arrow">→</span>
        <div className="flow-node accent"><small>Signal</small><strong>{item.signal}</strong></div><span className="flow-arrow">→</span>
        <div className="flow-node"><small>Objective</small><strong>{item.goal}</strong></div>
      </div>
      <div className="simulator-note"><p>{item.note}</p><span>Example · {item.example}</span></div>
    </SimulatorFrame>
  );
}
