"use client";

import { useState } from "react";
import { SimulatorFrame } from "./simulator-frame";

const paradigms = {
  unsupervised: { label: "Unsupervised", source: "Raw examples", signal: "Structure in data", goal: "Discover patterns", note: "No human target is supplied. The learning criterion describes a useful structure, such as reconstructing an input.", example: "Autoencoder" },
  supervised: { label: "Supervised", source: "Examples + labels", signal: "Human annotations", goal: "Predict the label", note: "The model learns from an explicit target. It is direct, but high-quality labels become expensive at scale.", example: "Sentiment model" },
  self: { label: "Self-supervised", source: "Raw text", signal: "Targets from text", goal: "Recover hidden text", note: "The data creates its own supervision. A token can be hidden or shifted and then used as the target.", example: "BERT / GPT" },
} as const;

type Paradigm = keyof typeof paradigms;

export function ParadigmExplorer() {
  const [active, setActive] = useState<Paradigm>("self");
  const item = paradigms[active];
  return (
    <SimulatorFrame number="01" title="Where does the teaching signal come from?" description="Switch paradigms and follow the signal from data to learning objective.">
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
