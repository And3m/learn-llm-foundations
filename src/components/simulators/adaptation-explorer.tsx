"use client";

import { useState } from "react";
import { trainablePercent, type AdaptationMode } from "@/lib/simulators";
import { SimulatorFrame } from "./simulator-frame";

const modes: { key: AdaptationMode; label: string; detail: string }[] = [
  { key: "features", label: "Feature extraction", detail: "Freeze the backbone and train only a small task head." },
  { key: "partial", label: "Partial fine-tuning", detail: "Update the task head and the last few Transformer layers." },
  { key: "full", label: "Full fine-tuning", detail: "Update all the layers. This gives the most flexibility for the task." },
];

export function AdaptationExplorer() {
  const [mode, setMode] = useState<AdaptationMode>("partial");
  const [layers, setLayers] = useState(4);
  const percent = trainablePercent(mode, layers);
  const detail = modes.find((item) => item.key === mode)?.detail;
  return (
    <SimulatorFrame number="04" title="How much of the model should move?" description="More trainable parameters give more flexibility for the task. But they need more compute and more data.">
      <div className="adaptation-layout">
        <div>
          <div className="mode-cards">
            {modes.map((item) => <button key={item.key} aria-pressed={mode === item.key} onClick={() => setMode(item.key)}><strong>{item.label}</strong><span>{item.detail}</span></button>)}
          </div>
          {mode === "partial" && <label className="range-control"><span><b>Unfrozen layers</b><output>{layers} / 12</output></span><input aria-label="Unfrozen layers" type="range" min="1" max="11" value={layers} onChange={(event) => setLayers(Number(event.target.value))} /></label>}
        </div>
        <div className="model-stack" aria-label={`${percent}% of parameters trainable`}>
          <div className="task-head">Task head <span>train</span></div>
          {Array.from({ length: 12 }, (_, index) => {
            const trainable = mode === "full" || (mode === "partial" && index >= 12 - layers);
            return <i className={trainable ? "trainable" : "frozen"} key={index}><span>Layer {12 - index}</span><small>{trainable ? "train" : "frozen"}</small></i>;
          })}
          <div className="trainable-readout"><strong>{percent}%</strong><span>parameters trainable</span></div>
        </div>
      </div>
      <p className="objective-relation">{detail} The percentage is an approximate value. It includes the task head.</p>
    </SimulatorFrame>
  );
}
