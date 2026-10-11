"use client";

import { DiagramFrame } from "./diagram-frame";
import { Arrow, Box, Label, Meter, Svg } from "./svg";

const shots = [
  { name: "Zero-shot", examples: 0, confidence: 0.45 },
  { name: "One-shot", examples: 1, confidence: 0.66 },
  { name: "Few-shot", examples: 3, confidence: 0.84 },
];
const demos = ["“Site is down” → urgent", "“Typo on page” → normal", "“Cannot pay” → urgent"];

export function FewShotDiagram() {
  return (
    <DiagramFrame
      title="Zero-shot, one-shot and few-shot prompts"
      caption="Demonstrations go into the context. The weights do not change. Good examples show the label set and the boundary, so the model is more confident about the correct label."
      steps={3}
      stepLabels={shots.map((item) => `${item.name}: ${item.examples} example${item.examples === 1 ? "" : "s"}`)}
      intervalMs={2400}
    >
      {(step) => {
        const shot = shots[step];
        return (
          <Svg width={640} height={260}>
            <Label x={16} y={20} title anchor="start">Prompt ({shot.name})</Label>
            <Box x={16} y={30} w={260} h={34} label="Instruction: classify urgency" state="alt" rx={6} />
            {demos.map((demo, index) => (
              <g key={demo} opacity={index < shot.examples ? 1 : 0.15} className="dg-fade">
                <Box x={16} y={72 + index * 40} w={260} h={32} label={demo} state={index < shot.examples ? "on" : "off"} rx={6} />
              </g>
            ))}
            <Box x={16} y={196} w={260} h={34} label="“App crashes at login” → ?" rx={6} />
            <Arrow x1={282} y1={130} x2={340} y2={130} on />
            <Box x={344} y={104} w={120} h={52} label="Frozen LLM" sub="weights do not change" state="frozen" />
            <Arrow x1={468} y1={130} x2={500} y2={130} on />
            <Label x={570} y={110}>urgent</Label>
            <Meter x={504} y={122} w={130} value={shot.confidence} />
            <Label x={570} y={156} small>P(correct label) ≈ {shot.confidence.toFixed(2)}</Label>
            <Label x={570} y={176} small>(example values)</Label>
          </Svg>
        );
      }}
    </DiagramFrame>
  );
}

const subproblems = [
  { label: "Question", text: "3 books at $12, 10% discount. Total?" },
  { label: "Step 1", text: "Price of 3 books = $36" },
  { label: "Step 2", text: "Discount = 10% of $36 = $3.60" },
  { label: "Step 3", text: "Total = $36 − $3.60 = $32.40" },
  { label: "Answer", text: "$32.40" },
];

export function DecompositionDiagram() {
  return (
    <DiagramFrame
      title="Sequential problem decomposition"
      caption="Each subproblem has a clear input and a small output that you can check. The output of one step is the input of the next step, so a check after each step stops an early error from moving forward."
      steps={subproblems.length}
      stepLabels={subproblems.map((item) => item.label)}
      intervalMs={1700}
    >
      {(step) => (
        <Svg width={640} height={290}>
          {subproblems.map((item, index) => {
            const y = 14 + index * 54;
            const done = index < step;
            const active = index === step;
            return (
              <g key={item.label} opacity={index <= step ? 1 : 0.25} className="dg-fade">
                <Box x={20} y={y} w={90} h={40} label={item.label} state={active ? "on" : done ? "alt" : "off"} rx={6} />
                <Box x={124} y={y} w={380} h={40} label={item.text} mono={index > 0} state={active ? "on" : "off"} rx={6} />
                {index > 0 && index < subproblems.length - 1 && done ? <Label x={530} y={y + 25} on anchor="start">✓ checked</Label> : null}
                {index < subproblems.length - 1 ? <Arrow x1={314} y1={y + 42} x2={314} y2={y + 52} on={index === step - 1} /> : null}
              </g>
            );
          })}
        </Svg>
      )}
    </DiagramFrame>
  );
}

const promptVectors = [
  [0.3, 0.7, 0.5, 0.2],
  [0.6, 0.2, 0.8, 0.4],
  [0.4, 0.5, 0.3, 0.9],
];
const updatedVectors = [
  [0.5, 0.6, 0.7, 0.3],
  [0.4, 0.3, 0.9, 0.6],
  [0.6, 0.4, 0.2, 0.8],
];
const softSteps = ["Learned vectors + input tokens", "Forward pass through the frozen model", "Loss gradient updates only the soft prompt"];

export function SoftPromptDiagram() {
  return (
    <DiagramFrame
      title="How a soft prompt trains"
      caption="The soft prompt is a small set of vectors in front of the input. Training updates only these vectors. The model weights and the ordinary token embeddings stay frozen."
      steps={3}
      stepLabels={softSteps}
      intervalMs={2300}
    >
      {(step) => {
        const vectors = step === 2 ? updatedVectors : promptVectors;
        return (
          <Svg width={640} height={280}>
            <Label x={320} y={20} title>{softSteps[step]}</Label>
            {vectors.map((vector, index) => (
              <g key={index} className={step === 2 ? "dg-pulse" : undefined}>
                <rect className="dg-box dg-on" x={20 + index * 76} y={190} width={68} height={60} rx={6} />
                {vector.map((value, bar) => (
                  <rect key={bar} className="dg-fill-on" x={28 + index * 76 + bar * 14} y={242 - value * 40} width={10} height={value * 40} rx={2} />
                ))}
                <Label x={54 + index * 76} y={270} small>P{index + 1}</Label>
              </g>
            ))}
            {["Classify", "this", "review"].map((token, index) => (
              <Box key={token} x={260 + index * 80} y={196} w={72} h={48} label={token} mono state="frozen" rx={6} />
            ))}
            <Label x={130} y={182} small on>soft prompt (trainable)</Label>
            <Label x={376} y={182} small>token embeddings (frozen)</Label>
            <Arrow x1={300} y1={186} x2={300} y2={150} on={step >= 1} hidden={step === 0} />
            <Box x={150} y={92} w={340} h={54} label="Frozen language model" sub="no weight changes" state="frozen" />
            <Arrow x1={494} y1={119} x2={540} y2={119} on={step >= 1} hidden={step === 0} />
            <Box x={544} y={98} w={80} h={42} label="Loss" state={step >= 1 ? "alt" : "dim"} />
            {step === 2 ? (
              <g>
                <path className="dg-line dg-on" d="M584 94 C 584 50, 120 50, 120 186" />
                <Label x={350} y={50} on>gradient → soft prompt only</Label>
              </g>
            ) : null}
          </Svg>
        );
      }}
    </DiagramFrame>
  );
}
