"use client";

import { DiagramFrame } from "./diagram-frame";
import { Arrow, Box, Label, Meter, Svg } from "./svg";

const paradigms = [
  { name: "Unsupervised", data: "Unlabeled data", signal: "A criterion", detail: "reconstruct or cluster" },
  { name: "Supervised", data: "Text + human labels", signal: "Human annotators", detail: "one label per example" },
  { name: "Self-supervised", data: "Raw text only", signal: "The text itself", detail: "hide a token, predict it" },
];

export function SupervisionSourcesDiagram() {
  return (
    <DiagramFrame
      title="Where the supervision signal comes from"
      caption="All three paradigms train on data. The difference is the origin of the signal. Self-supervision makes the signal from the text, so it works with very large corpora."
      steps={3}
      stepLabels={paradigms.map((item) => item.name)}
      intervalMs={2200}
    >
      {(step) => (
        <Svg width={640} height={250}>
          <Label x={85} y={18} title>Paradigm</Label>
          <Label x={300} y={18} title>Training data</Label>
          <Label x={535} y={18} title>Signal comes from</Label>
          {paradigms.map((item, index) => {
            const y = 32 + index * 72;
            const state = index === step ? "on" : "dim";
            return (
              <g key={item.name}>
                <Box x={10} y={y} w={150} h={54} label={item.name} state={state} />
                <Arrow x1={162} y1={y + 27} x2={196} y2={y + 27} on={index === step} hidden={index !== step} />
                <Box x={200} y={y} w={200} h={54} label={item.data} state={state} />
                <Arrow x1={402} y1={y + 27} x2={436} y2={y + 27} on={index === step} hidden={index !== step} />
                <Box x={440} y={y} w={190} h={54} label={item.signal} sub={item.detail} state={index === step ? (index === 2 ? "on" : "alt") : "dim"} />
              </g>
            );
          })}
        </Svg>
      )}
    </DiagramFrame>
  );
}

const tokens = ["the", "cat", "sat", "on", "mat"];
const modes = [
  { name: "Decoder-only (causal)", see: (row: number, col: number) => col <= row, note: ["Each position sees itself", "and the positions on its left."] },
  { name: "Encoder-only (bidirectional)", see: () => true, note: ["Each position sees", "all the visible positions."] },
  { name: "Encoder-decoder", see: (row: number, col: number) => (row < 3 ? col < 3 : col < 3 || col <= row), note: ["Source (the cat sat): full view.", "Target (on mat): source + left."] },
];

export function AttentionAccessDiagram() {
  const cell = 36;
  const ox = 120;
  const oy = 60;
  return (
    <DiagramFrame
      title="Which tokens each position can see"
      caption="Rows are the positions that read. Columns are the positions that they can attend to. A green cell means that the row can see the column. The pulsing row shows one position at work."
      steps={3}
      stepLabels={modes.map((mode) => mode.name)}
      intervalMs={2600}
    >
      {(step) => {
        const mode = modes[step];
        const focus = step === 2 ? 3 : 2;
        return (
          <Svg width={640} height={260}>
            <Label x={ox + (tokens.length * cell) / 2} y={22} title>Attends to →</Label>
            <Label x={30} y={oy + 40} small anchor="start">Reads</Label>
            <Label x={30} y={oy + 55} small anchor="start">↓</Label>
            {tokens.map((token, index) => (
              <g key={token}>
                <Label x={ox + index * cell + cell / 2} y={oy - 10} mono>{token}</Label>
                <Label x={ox - 10} y={oy + index * cell + cell / 2 + 4} mono anchor="end">{token}</Label>
              </g>
            ))}
            {tokens.map((_, row) => (
              <g key={row} className={row === focus ? "dg-pulse" : undefined}>
                {tokens.map((__, col) => (
                  <rect
                    key={col}
                    x={ox + col * cell + 2}
                    y={oy + row * cell + 2}
                    width={cell - 4}
                    height={cell - 4}
                    rx={5}
                    className={mode.see(row, col) ? (step === 2 && row >= 3 && col >= 3 ? "dg-fill-alt" : "dg-fill-on") : "dg-fill-off"}
                  />
                ))}
              </g>
            ))}
            {step === 2 ? (
              <g>
                <line className="dg-line" x1={ox + 3 * cell} y1={oy - 4} x2={ox + 3 * cell} y2={oy + 5 * cell + 4} />
                <line className="dg-line" x1={ox - 4} y1={oy + 3 * cell} x2={ox + 5 * cell + 4} y2={oy + 3 * cell} />
              </g>
            ) : null}
            <Label x={330} y={90} anchor="start" on>{mode.name}</Label>
            <Label x={330} y={118} anchor="start">{mode.note[0]}</Label>
            <Label x={330} y={138} anchor="start">{mode.note[1]}</Label>
            <Label x={330} y={180} anchor="start" small>
              {step === 0 ? "Objective: predict the next token." : step === 1 ? "Objective: recover masked tokens." : "Objective: generate the target from the source."}
            </Label>
          </Svg>
        );
      }}
    </DiagramFrame>
  );
}

const sentence = ["[CLS]", "the", "early", "bird", "catches", "the", "worm", "[SEP]"];
const selected: Record<number, { rule: string; shown: string }> = {
  2: { rule: "80% → [MASK]", shown: "[MASK]" },
  3: { rule: "10% → keep", shown: "bird" },
  6: { rule: "10% → random", shown: "apple" },
};
const maskSteps = ["Original input", "Select some tokens", "Change them: one example of each case", "Predict the original tokens"];

export function BertMaskingDiagram() {
  const w = 70;
  const gap = 6;
  const x0 = 16;
  return (
    <DiagramFrame
      title="BERT masking, step by step"
      caption="An illustration, not real proportions. In training, BERT selects about 15% of the tokens, and the 80/10/10 split applies across many selected tokens. The unselected tokens do not add to the loss."
      steps={4}
      stepLabels={maskSteps}
      intervalMs={2000}
    >
      {(step) => (
        <Svg width={640} height={270}>
          <Label x={320} y={22} title>{maskSteps[step]}</Label>
          {sentence.map((token, index) => {
            const x = x0 + index * (w + gap);
            const pick = selected[index];
            const isSelected = Boolean(pick) && step >= 1;
            const shown = pick && step >= 2 ? pick.shown : token;
            return (
              <g key={index}>
                <Box x={x} y={50} w={w} h={36} label={shown} mono state={isSelected ? (step >= 2 && pick?.shown !== token ? "on" : "alt") : step >= 1 ? "dim" : "off"} rx={6} />
                {pick && step >= 2 ? <Label x={x + w / 2} y={104} small>{pick.rule}</Label> : null}
                {pick && step >= 3 ? (
                  <g>
                    <Arrow x1={x + w / 2} y1={150} x2={x + w / 2} y2={196} on />
                    <Box x={x} y={200} w={w} h={34} label={token} mono state="on" rx={6} />
                  </g>
                ) : null}
              </g>
            );
          })}
          {step >= 3 ? (
            <g>
              <rect className="dg-box dg-alt" x={x0} y={118} width={sentence.length * (w + gap) - gap} height={28} rx={6} />
              <Label x={320} y={137}>Bidirectional encoder reads the full changed sequence</Label>
              <Label x={320} y={258} small>Loss = −log P(early) − log P(bird) − log P(worm)</Label>
            </g>
          ) : null}
        </Svg>
      )}
    </DiagramFrame>
  );
}

const tuneModes = [
  { name: "Frozen feature extraction", trainable: 0, memory: 0.12, note: "Only the task head learns." },
  { name: "Partial fine-tuning", trainable: 2, memory: 0.45, note: "The head and the top 2 layers learn." },
  { name: "Full fine-tuning", trainable: 6, memory: 1, note: "The head and all the layers learn." },
];

export function FineTuneLayersDiagram() {
  const layers = 6;
  return (
    <DiagramFrame
      title="Which parameters change during adaptation"
      caption="Green parts get gradient updates. Grey parts stay frozen. More trainable layers give more task capacity, but they need more memory and can overfit a small dataset."
      steps={3}
      stepLabels={tuneModes.map((mode) => mode.name)}
      intervalMs={2400}
    >
      {(step) => {
        const mode = tuneModes[step];
        return (
          <Svg width={640} height={300}>
            <Box x={60} y={14} w={220} h={34} label="Task head ω" state="on" />
            {Array.from({ length: layers }, (_, index) => {
              const layer = layers - index;
              const trainable = layer > layers - mode.trainable;
              return <Box key={layer} x={60} y={58 + index * 32} w={220} h={26} label={`Encoder layer ${layer}${trainable ? "" : " (frozen)"}`} state={trainable ? "on" : "frozen"} rx={5} />;
            })}
            <Box x={60} y={254} w={220} h={30} label="Input tokens" />
            <Arrow x1={300} y1={30} x2={300} y2={mode.trainable === 0 ? 46 : 54 + mode.trainable * 32} on />
            <Label x={312} y={30} small anchor="start">gradient</Label>
            <Label x={360} y={80} anchor="start" on>{mode.name}</Label>
            <Label x={360} y={106} anchor="start">{mode.note}</Label>
            <Label x={360} y={150} anchor="start" small>Training memory (relative)</Label>
            <Meter x={360} y={160} w={240} value={mode.memory} />
            <Label x={360} y={206} anchor="start" small>Task capacity</Label>
            <Meter x={360} y={216} w={240} value={0.25 + mode.memory * 0.75} tone="alt" />
          </Svg>
        );
      }}
    </DiagramFrame>
  );
}
