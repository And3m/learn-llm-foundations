"use client";

import { DiagramFrame } from "./diagram-frame";
import { Arrow, Box, Label, Svg } from "./svg";

const pairs = [
  { instruction: "Summarize this report.", response: "The report shows three risks…", loss: 2.1 },
  { instruction: "Translate to French: Good morning.", response: "Bonjour.", loss: 1.6 },
  { instruction: "Write SQL for the top 5 users.", response: "SELECT name FROM users …", loss: 1.2 },
  { instruction: "How do I make a weapon?", response: "I cannot help with that. …", loss: 0.9 },
];

export function InstructionDataDiagram() {
  return (
    <DiagramFrame
      title="Supervised fine-tuning on instruction-response pairs"
      caption="Each example has an instruction and a desired response. The instruction tokens give context, but only the response tokens add to the loss. Across many diverse pairs, the loss decreases and the model learns to follow instructions."
      steps={pairs.length}
      stepLabels={pairs.map((_, index) => `Training example ${index + 1}`)}
      intervalMs={2000}
    >
      {(step) => {
        const pair = pairs[step];
        return (
          <Svg width={640} height={270}>
            <Label x={16} y={20} title anchor="start">Instruction dataset</Label>
            {pairs.map((item, index) => (
              <g key={item.instruction}>
                <Box x={16} y={32 + index * 40} w={270} h={32} label={item.instruction} state={index === step ? "on" : "dim"} rx={6} />
              </g>
            ))}
            <Arrow x1={292} y1={48 + step * 40} x2={336} y2={110} on />
            <Box x={340} y={84} w={140} h={52} label="LLM being tuned" sub="next-token loss" state="on" />
            <Label x={16} y={210} small anchor="start">Tokens of this example:</Label>
            <rect className="dg-box dg-frozen" x={16} y={218} width={250} height={30} rx={6} />
            <Label x={141} y={238} small>instruction: no loss (masked)</Label>
            <rect className="dg-box dg-on" x={272} y={218} width={350} height={30} rx={6} />
            <Label x={447} y={238} on>{pair.response}</Label>
            <Label x={500} y={70} small anchor="start">SFT loss</Label>
            <rect className="dg-fill-off" x={500} y={80} width={120} height={14} rx={7} />
            <rect className="dg-fill-on" x={500} y={80} width={(120 * pair.loss) / 2.4} height={14} rx={7} style={{ transition: "width .5s ease" }} />
            <Label x={500} y={114} small anchor="start">{pair.loss.toFixed(1)} (example)</Label>
          </Svg>
        );
      }}
    </DiagramFrame>
  );
}

const rmSteps = ["One prompt, two responses", "An annotator selects the better response", "The reward model scores both", "The loss pushes the scores apart"];

export function RewardModelDiagram() {
  return (
    <DiagramFrame
      title="How a reward model learns from one comparison"
      caption="The reward model does not learn an absolute score. It learns to give the chosen response a higher score than the rejected response. Here the difference is 2.2, so σ(2.2) ≈ 0.90 and the loss is about 0.11."
      steps={4}
      stepLabels={rmSteps}
      intervalMs={2100}
    >
      {(step) => (
        <Svg width={640} height={280}>
          <Label x={320} y={20} title>{rmSteps[step]}</Label>
          <Box x={200} y={32} w={240} h={34} label="Prompt: “My laptop will not start.”" state="alt" rx={6} />
          <Arrow x1={280} y1={68} x2={160} y2={94} />
          <Arrow x1={360} y1={68} x2={480} y2={94} />
          <Box x={30} y={96} w={260} h={50} label="A: Check power, then hold the" sub="power button for 10 seconds…" state={step >= 1 ? "on" : "off"} rx={6} />
          <Box x={350} y={96} w={260} h={50} label="B: Buy a new laptop." state={step >= 1 ? "dim" : "off"} rx={6} />
          {step >= 1 ? (
            <g>
              <Label x={160} y={166} on>chosen y⁺</Label>
              <Label x={480} y={166} small>rejected y⁻</Label>
            </g>
          ) : null}
          {step >= 2 ? (
            <g>
              <Box x={220} y={180} w={200} h={36} label="Reward model r_φ" state="on" />
              <Label x={160} y={204} on mono>r⁺ = 1.8</Label>
              <Label x={480} y={204} mono>r⁻ = −0.4</Label>
            </g>
          ) : null}
          {step >= 3 ? (
            <g>
              <Label x={320} y={244} mono>L = −log σ(1.8 − (−0.4)) = −log σ(2.2) ≈ 0.11</Label>
              <Label x={320} y={266} small>A larger gap between r⁺ and r⁻ gives a smaller loss.</Label>
            </g>
          ) : null}
        </Svg>
      )}
    </DiagramFrame>
  );
}

const chain = [
  { text: "Problem: (8 + 4) × 5 = ?", correct: null },
  { text: "Step 1: 8 + 4 = 13", correct: false },
  { text: "Step 2: 13 × 5 = 65", correct: true },
  { text: "Step 3: 65 − 5 = 60", correct: false },
  { text: "Answer: 60", correct: true },
];
const supervisionModes = ["A solution with a hidden error", "Outcome supervision", "Process supervision"];

export function ProcessSupervisionDiagram() {
  return (
    <DiagramFrame
      title="Outcome supervision compared with process supervision"
      caption="The final answer is correct, but two steps are wrong and cancel out. Outcome supervision rewards this solution. Process supervision checks each step and finds the first error."
      steps={3}
      stepLabels={supervisionModes}
      intervalMs={2600}
    >
      {(step) => (
        <Svg width={640} height={290}>
          <Label x={320} y={20} title>{supervisionModes[step]}</Label>
          {chain.map((item, index) => {
            const y = 34 + index * 48;
            const isAnswer = index === chain.length - 1;
            const judged = (step === 1 && isAnswer) || (step === 2 && item.correct !== null && !isAnswer) || (step === 2 && isAnswer);
            const ok = item.correct;
            return (
              <g key={item.text}>
                <Box x={60} y={y} w={340} h={36} label={item.text} mono state={judged ? (ok ? "on" : "alt") : "off"} rx={6} />
                {judged ? <Label x={420} y={y + 23} anchor="start" on={Boolean(ok)}>{ok ? "✓ reward" : "✗ error found"}</Label> : null}
                {step === 1 && !isAnswer && index > 0 ? <Label x={420} y={y + 23} anchor="start" small>not checked</Label> : null}
              </g>
            );
          })}
          {step === 1 ? <Label x={320} y={284} small>Score: 1.0. The wrong steps get the same reward as correct steps.</Label> : null}
          {step === 2 ? <Label x={320} y={284} small>The first error is at step 1, so the model learns where the reasoning failed.</Label> : null}
        </Svg>
      )}
    </DiagramFrame>
  );
}
