"use client";

import { useState } from "react";
import { SimulatorFrame } from "./simulator-frame";

const responses = [
  { label: "A", text: "Try restarting it.", helpful: 38, safe: 84 },
  { label: "B", text: "Save your work, check the service status, then restart if no outage is reported.", helpful: 91, safe: 92 },
];

export function PreferenceLab() {
  const [choice, setChoice] = useState(1);
  return (
    <SimulatorFrame number="4.1" title="Create a preference signal" description="A comparison supplies a relative signal: which response better matches the desired behavior?">
      <div className="preference-grid">{responses.map((response, index) => <button type="button" key={response.label} aria-pressed={choice === index} onClick={() => setChoice(index)}><small>Response {response.label}</small><p>{response.text}</p><span>Helpful {response.helpful} · Safe {response.safe}</span></button>)}</div>
      <div className="lab-result"><strong>Chosen: response {responses[choice].label}</strong><p>The chosen/rejected pair can train a reward model for RLHF or enter a direct preference objective such as DPO. It does not provide an absolute definition of “good.”</p></div>
    </SimulatorFrame>
  );
}
