"use client";

import { useState } from "react";
import { SimulatorFrame } from "./simulator-frame";

export function ScalingExplorer() {
  const [model, setModel] = useState(55);
  const data = 100 - model;
  const balance = 100 - Math.abs(model - 50) * 1.25;
  return (
    <SimulatorFrame number="2.1" title="Balance a training budget" description="A simple scaling-law view. More compute helps most when the model capacity and the training data increase together.">
      <div className="lab-panel">
        <label className="range-control"><span>Compute allocated to model size <output>{model}%</output></span><input aria-label="Compute allocated to model size" type="range" min="10" max="90" value={model} onChange={(event) => setModel(Number(event.target.value))} /></label>
        <div className="meter-pair"><div><span>Parameters</span><i><b style={{ width: `${model}%` }} /></i></div><div><span>Training tokens</span><i><b style={{ width: `${data}%` }} /></i></div></div>
        <div className="lab-result"><strong>{balance > 85 ? "Balanced" : balance > 60 ? "Useful, but limited" : "Bottlenecked"}</strong><p>{model > 62 ? "The model is large for the data budget. Thus, the model can have too little training." : model < 38 ? "The token budget is large for the model capacity. Thus, the model can be too small." : "Capacity and data increase together. In this range, compute usually gives the most benefit."}</p></div>
      </div>
    </SimulatorFrame>
  );
}
