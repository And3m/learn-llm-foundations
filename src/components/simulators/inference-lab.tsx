"use client";

import { useState } from "react";
import { SimulatorFrame } from "./simulator-frame";

export function InferenceLab() {
  const [batch, setBatch] = useState(4);
  const throughput = Math.round(34 * Math.pow(batch, 0.72));
  const ttft = Math.round(105 + batch * batch * 3.5);
  return (
    <SimulatorFrame number="5.1" title="Batching: throughput vs. latency" description="A simplified serving model showing why more simultaneous requests improve utilization but can delay an individual request.">
      <label className="range-control"><span>Concurrent requests <output>{batch}</output></span><input aria-label="Concurrent requests" type="range" min="1" max="16" value={batch} onChange={(event) => setBatch(Number(event.target.value))} /></label>
      <div className="metric-grid"><div><span>Throughput</span><strong>{throughput}</strong><small>tokens / second</small></div><div><span>Time to first token</span><strong>{ttft}</strong><small>milliseconds</small></div></div>
      <p className="simulator-disclaimer">Conceptual estimates only. Real performance depends on model, hardware, sequence lengths, scheduler, and cache state.</p>
    </SimulatorFrame>
  );
}
