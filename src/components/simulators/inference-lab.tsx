"use client";

import { useState } from "react";
import { SimulatorFrame } from "./simulator-frame";

export function InferenceLab() {
  const [batch, setBatch] = useState(4);
  const throughput = Math.round(34 * Math.pow(batch, 0.72));
  const ttft = Math.round(105 + batch * batch * 3.5);
  return (
    <SimulatorFrame number="5.1" title="Batching: throughput vs. latency" description="A simple serving model. More concurrent requests increase utilization, but they can delay one request.">
      <label className="range-control"><span>Concurrent requests <output>{batch}</output></span><input aria-label="Concurrent requests" type="range" min="1" max="16" value={batch} onChange={(event) => setBatch(Number(event.target.value))} /></label>
      <div className="metric-grid"><div><span>Throughput</span><strong>{throughput}</strong><small>tokens / second</small></div><div><span>Time to first token</span><strong>{ttft}</strong><small>milliseconds</small></div></div>
      <p className="simulator-disclaimer">These are only approximate values. Real performance depends on the model, the hardware, the sequence lengths, the scheduler and the cache state.</p>
    </SimulatorFrame>
  );
}
