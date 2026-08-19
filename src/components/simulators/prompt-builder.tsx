"use client";

import { useState } from "react";
import { SimulatorFrame } from "./simulator-frame";

const parts = [
  ["instruction", "Instruction", "Classify the support ticket by urgency."],
  ["context", "Context", "Policy: outages are urgent; cosmetic defects are normal."],
  ["examples", "Examples", "‘Checkout is down’ → urgent"],
  ["format", "Output format", "Return JSON: { urgency, reason }"],
] as const;

export function PromptBuilder() {
  const [enabled, setEnabled] = useState<string[]>(["instruction"]);
  const toggle = (id: string) => setEnabled((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  return (
    <SimulatorFrame number="3.1" title="Assemble a prompt" description="Add the information a model needs, then inspect what each part contributes.">
      <div className="prompt-builder">
        <div className="toggle-list">{parts.map(([id, label]) => <button key={id} type="button" aria-pressed={enabled.includes(id)} onClick={() => toggle(id)}><strong>{label}</strong><span>{enabled.includes(id) ? "Included" : "Add"}</span></button>)}</div>
        <div className="prompt-preview"><small>Prompt preview</small>{parts.filter(([id]) => enabled.includes(id)).map(([id, label, text]) => <p key={id}><b>{label}</b>{text}</p>)}{enabled.length === 0 && <p className="empty-copy">An empty prompt leaves the task unspecified.</p>}</div>
      </div>
    </SimulatorFrame>
  );
}
