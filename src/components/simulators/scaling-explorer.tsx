"use client";

import { useState } from "react";
import { SimulatorFrame } from "./simulator-frame";

export function ScalingExplorer() {
  const [model, setModel] = useState(55);
  const data = 100 - model;
  const balance = 100 - Math.abs(model - 50) * 1.25;
  return (
    <SimulatorFrame number="2.1" title="Balance a training budget" description="A conceptual scaling-law view: extra compute helps most when model capacity and training data grow together.">
      <div className="lab-panel">
        <label className="range-control"><span>Compute allocated to model size <output>{model}%</output></span><input aria-label="Compute allocated to model size" type="range" min="10" max="90" value={model} onChange={(event) => setModel(Number(event.target.value))} /></label>
        <div className="meter-pair"><div><span>Parameters</span><i><b style={{ width: `${model}%` }} /></i></div><div><span>Training tokens</span><i><b style={{ width: `${data}%` }} /></i></div></div>
        <div className="lab-result"><strong>{balance > 85 ? "Balanced" : balance > 60 ? "Useful, but constrained" : "Bottlenecked"}</strong><p>{model > 62 ? "The model is large relative to the data budget, so capacity may be under-trained." : model < 38 ? "The token budget is large relative to model capacity, so the model may be under-sized." : "Capacity and data grow together—the region where compute is typically used most effectively."}</p></div>
      </div>
    </SimulatorFrame>
  );
}
