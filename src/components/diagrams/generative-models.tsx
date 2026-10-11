"use client";

import { DiagramFrame } from "./diagram-frame";
import { Arrow, Box, Label, Svg } from "./svg";

const prompt = ["Models", "learn", "from"];
const generated = [
  { token: "data", options: [["data", 0.52], ["text", 0.31], ["examples", 0.17]] },
  { token: "at", options: [["at", 0.44], ["and", 0.36], [".", 0.2]] },
  { token: "scale", options: [["scale", 0.71], ["once", 0.18], ["home", 0.11]] },
] as const;

export function AutoregressiveDiagram() {
  return (
    <DiagramFrame
      title="Token-by-token generation"
      caption="At each step, the model calculates a distribution over the vocabulary, selects one token and adds it to the context. The next step reads the longer context."
      steps={generated.length + 1}
      stepLabels={["Prompt only", ...generated.map((item, index) => `Step ${index + 1}: add “${item.token}”`)]}
      intervalMs={1900}
    >
      {(step) => {
        const tokens = [...prompt, ...generated.slice(0, step).map((item) => item.token)];
        const next = generated[step];
        return (
          <Svg width={640} height={270}>
            <Label x={16} y={22} title anchor="start">Context</Label>
            {tokens.map((token, index) => (
              <Box key={`${token}-${index}`} x={16 + index * 88} y={34} w={80} h={34} label={token} mono state={index >= prompt.length ? (index === tokens.length - 1 ? "on" : "alt") : "off"} rx={6} />
            ))}
            <Arrow x1={320} y1={74} x2={320} y2={102} on={Boolean(next)} />
            <Box x={170} y={106} w={300} h={38} label="Decoder-only Transformer" sub="causal attention over the context" state={next ? "on" : "off"} />
            {next ? (
              <g>
                <Arrow x1={320} y1={148} x2={320} y2={172} on />
                <Label x={16} y={168} title anchor="start">Next-token distribution</Label>
                {next.options.map(([word, p], index) => (
                  <g key={word}>
                    <Label x={150} y={196 + index * 24} mono anchor="end" on={index === 0}>{word}</Label>
                    <rect className="dg-fill-off" x={162} y={184 + index * 24} width={300} height={14} rx={7} />
                    <rect className={index === 0 ? "dg-fill-on" : "dg-fill-alt"} x={162} y={184 + index * 24} width={300 * p} height={14} rx={7} opacity={index === 0 ? 1 : 0.5} />
                    <Label x={472} y={196 + index * 24} small anchor="start">{p.toFixed(2)}</Label>
                  </g>
                ))}
                <Label x={540} y={220} small>→ append</Label>
              </g>
            ) : (
              <Label x={320} y={200}>The full sequence is ready. Stop.</Label>
            )}
          </Svg>
        );
      }}
    </DiagramFrame>
  );
}

const strategies = [
  { name: "Data parallelism", note: "Each device has a full copy of the model and a different part of the batch. Devices average their gradients." },
  { name: "Tensor parallelism", note: "Each layer is divided across devices. Devices exchange partial results inside each layer." },
  { name: "Pipeline parallelism", note: "Each device holds a group of layers. Micro-batches move through the stages. Idle slots are bubbles." },
];

export function ParallelismDiagram() {
  const devices = 4;
  return (
    <DiagramFrame
      title="Three ways to divide training across devices"
      caption="Data parallelism divides the examples. Tensor parallelism divides the inside of each layer. Pipeline parallelism divides the stack of layers. Large runs use all three together."
      steps={3}
      stepLabels={strategies.map((item) => item.name)}
      intervalMs={3200}
    >
      {(step) => (
        <Svg width={640} height={290}>
          <Label x={320} y={20} on>{strategies[step].name}</Label>
          {Array.from({ length: devices }, (_, device) => {
            const x = 20 + device * 152;
            return (
              <g key={device}>
                <rect className="dg-box" x={x} y={34} width={140} height={170} rx={10} />
                <Label x={x + 70} y={52} small>GPU {device + 1}</Label>
                {step === 0 ? (
                  <g>
                    {Array.from({ length: 4 }, (_, layer) => <Box key={layer} x={x + 14} y={62 + layer * 26} w={112} h={20} label={`Layer ${layer + 1}`} state="alt" rx={4} />)}
                    <Box x={x + 14} y={170} w={112} h={24} label={`Batch part ${device + 1}`} state="on" rx={4} />
                  </g>
                ) : step === 1 ? (
                  <g>
                    {Array.from({ length: 4 }, (_, layer) => <Box key={layer} x={x + 14} y={62 + layer * 26} w={112} h={20} label={`L${layer + 1} slice ${device + 1}/4`} state="on" rx={4} />)}
                    <Box x={x + 14} y={170} w={112} h={24} label="Full batch" state="alt" rx={4} />
                  </g>
                ) : (
                  <g>
                    <Box x={x + 14} y={62} w={112} h={44} label={`Layer ${device + 1}`} sub="one stage" state="on" rx={4} />
                    {[0, 1, 2].map((micro) => {
                      const slot = micro + device;
                      return <rect key={micro} className="dg-fill-on" x={x + 14 + slot * 16} y={130} width={14} height={14} rx={3} opacity={0.4 + micro * 0.3} />;
                    })}
                    {Array.from({ length: 7 }, (_, slot) => (slot < device || slot > device + 2 ? <rect key={slot} className="dg-fill-off" x={x + 14 + slot * 16} y={130} width={14} height={14} rx={3} /> : null))}
                    <Label x={x + 70} y={168} small>time →</Label>
                  </g>
                )}
              </g>
            );
          })}
          {step === 0 ? <line className="dg-line dg-on" x1={40} y1={220} x2={600} y2={220} /> : null}
          {step === 1 ? Array.from({ length: devices - 1 }, (_, index) => <Arrow key={index} x1={160 + index * 152} y1={120} x2={172 + index * 152} y2={120} on />) : null}
          {step === 2 ? Array.from({ length: devices - 1 }, (_, index) => <Arrow key={index} x1={160 + index * 152} y1={84} x2={172 + index * 152} y2={84} on />) : null}
          <Label x={320} y={240} small>{step === 0 ? "All-reduce: average the gradients" : step === 1 ? "Exchange partial activations inside each layer" : "Send activations from stage to stage; grey cells are bubbles"}</Label>
          <foreignObject x={20} y={250} width={600} height={40}>
            <p style={{ margin: 0, fontSize: 12, color: "var(--muted)", textAlign: "center" }}>{strategies[step].note}</p>
          </foreignObject>
        </Svg>
      )}
    </DiagramFrame>
  );
}

const patterns = [
  { name: "Dense attention", see: (row: number, col: number) => col <= row },
  { name: "Local window (size 3)", see: (row: number, col: number) => col <= row && row - col < 3 },
  { name: "Local + global token", see: (row: number, col: number) => col <= row && (row - col < 3 || col === 0) },
  { name: "Strided links", see: (row: number, col: number) => col <= row && (row - col < 2 || (row - col) % 4 === 0) },
];

export function SparseAttentionDiagram() {
  const n = 10;
  const cell = 22;
  const ox = 40;
  const oy = 40;
  return (
    <DiagramFrame
      title="Which token pairs each attention pattern computes"
      caption="Each row is a query position. A green cell is a token pair that the model calculates. Sparse patterns calculate fewer pairs, so distant information must travel through more hops or through a global token."
      steps={patterns.length}
      stepLabels={patterns.map((item) => item.name)}
      intervalMs={2400}
    >
      {(step) => {
        const pattern = patterns[step];
        let count = 0;
        for (let row = 0; row < n; row += 1) for (let col = 0; col < n; col += 1) if (pattern.see(row, col)) count += 1;
        const dense = (n * (n + 1)) / 2;
        return (
          <Svg width={640} height={290}>
            <Label x={ox} y={26} small anchor="start">query ↓  key →</Label>
            {Array.from({ length: n }, (_, row) =>
              Array.from({ length: n }, (__, col) => (
                <rect key={`${row}-${col}`} x={ox + col * cell} y={oy + row * cell} width={cell - 3} height={cell - 3} rx={3} className={pattern.see(row, col) ? (step === 2 && col === 0 && row - col >= 3 ? "dg-fill-alt" : "dg-fill-on") : "dg-fill-off"} />
              )),
            )}
            <Label x={320} y={90} anchor="start" on>{pattern.name}</Label>
            <Label x={320} y={120} anchor="start">Pairs calculated: {count} of {dense}</Label>
            <rect className="dg-fill-off" x={320} y={134} width={260} height={14} rx={7} />
            <rect className="dg-fill-on" x={320} y={134} width={(260 * count) / dense} height={14} rx={7} style={{ transition: "width .5s ease" }} />
            <Label x={320} y={180} anchor="start" small>
              {step === 0 ? "Each token attends to all earlier tokens." : step === 1 ? "Each token sees only its near neighbors." : step === 2 ? "Token 1 is global: all tokens can read it." : "Some far links skip ahead in fixed steps."}
            </Label>
          </Svg>
        );
      }}
    </DiagramFrame>
  );
}

const sharing = [
  { name: "Multi-head attention", kv: 8 },
  { name: "Grouped-query attention", kv: 2 },
  { name: "Multi-query attention", kv: 1 },
];

export function KvSharingDiagram() {
  const queries = 8;
  return (
    <DiagramFrame
      title="How query heads share key and value heads"
      caption="All three designs have 8 query heads. The KV cache stores only the key and value heads, so fewer KV heads give a smaller cache."
      steps={3}
      stepLabels={sharing.map((item) => `${item.name}: ${item.kv} KV head${item.kv > 1 ? "s" : ""}`)}
      intervalMs={2600}
    >
      {(step) => {
        const { kv, name } = sharing[step];
        const qWidth = 64;
        const qx = (index: number) => 24 + index * 74;
        const kvSpan = (queries * 74) / kv;
        const kvx = (index: number) => 24 + index * kvSpan + (kvSpan - 74) / 2;
        return (
          <Svg width={640} height={250}>
            <Label x={320} y={20} on>{name}</Label>
            {Array.from({ length: queries }, (_, index) => {
              const group = Math.floor(index / (queries / kv));
              return (
                <g key={index}>
                  <Box x={qx(index)} y={36} w={qWidth} h={30} label={`Q${index + 1}`} mono rx={6} />
                  <line className="dg-line dg-on" x1={qx(index) + qWidth / 2} y1={68} x2={kvx(group) + qWidth / 2} y2={128} />
                </g>
              );
            })}
            {Array.from({ length: kv }, (_, index) => <Box key={index} x={kvx(index)} y={130} w={qWidth} h={34} label={`KV${index + 1}`} mono state="on" rx={6} />)}
            <Label x={24} y={198} anchor="start" small>KV cache size (relative)</Label>
            <rect className="dg-fill-off" x={24} y={208} width={592} height={14} rx={7} />
            <rect className="dg-fill-on" x={24} y={208} width={(592 * kv) / queries} height={14} rx={7} style={{ transition: "width .5s ease" }} />
            <Label x={620} y={242} anchor="end" small>{Math.round((kv / queries) * 100)}% of the multi-head cache</Label>
          </Svg>
        );
      }}
    </DiagramFrame>
  );
}
