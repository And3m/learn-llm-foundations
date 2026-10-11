"use client";

import { DiagramFrame } from "./diagram-frame";
import { normalizedProbabilities } from "@/lib/simulators";
import { Arrow, Box, Label, Meter, Svg } from "./svg";

const promptTokens = ["Explain", "KV", "caches", "in", "brief"];
const outputTokens = ["They", "store", "past", "keys"];

export function PrefillDecodeDiagram() {
  return (
    <DiagramFrame
      title="Prefill compared with decode"
      caption="Prefill processes all prompt tokens in one parallel pass and fills the KV cache. Each decode step processes only one new token and reads the full cache. The timeline shows one wide prefill block and then many small decode steps."
      steps={outputTokens.length + 1}
      stepLabels={["Prefill: all prompt tokens in parallel", ...outputTokens.map((token, index) => `Decode step ${index + 1}: “${token}”`)]}
      intervalMs={1700}
    >
      {(step) => {
        const cacheSize = promptTokens.length + step;
        return (
          <Svg width={640} height={290}>
            <Label x={16} y={20} title anchor="start">{step === 0 ? "Prefill" : `Decode step ${step}`}</Label>
            {promptTokens.map((token, index) => (
              <g key={token}>
                <Box x={16 + index * 72} y={32} w={66} h={30} label={token} mono state={step === 0 ? "on" : "off"} rx={5} />
                {step === 0 ? <Arrow x1={49 + index * 72} y1={64} x2={49 + index * 72} y2={96} on /> : null}
              </g>
            ))}
            {outputTokens.slice(0, step).map((token, index) => (
              <g key={token}>
                <Box x={376 + index * 66} y={32} w={60} h={30} label={token} mono state={index === step - 1 ? "on" : "alt"} rx={5} />
                {index === step - 1 ? <Arrow x1={406 + index * 66} y1={64} x2={406 + index * 66} y2={96} on /> : null}
              </g>
            ))}
            <Box x={16} y={100} w={608} h={40} label={step === 0 ? "Transformer: large parallel matrix operations" : "Transformer: small operation for one token"} state="on" />
            <Label x={16} y={168} small anchor="start">KV cache ({cacheSize} positions)</Label>
            {Array.from({ length: promptTokens.length + outputTokens.length }, (_, index) => (
              <rect key={index} x={16 + index * 40} y={176} width={34} height={22} rx={4} className={index < cacheSize ? (index === cacheSize - 1 ? "dg-fill-on" : "dg-fill-alt") : "dg-fill-off"} opacity={index < cacheSize - 1 ? 0.55 : 1} />
            ))}
            <Label x={16} y={228} small anchor="start">Timeline</Label>
            <rect className={step === 0 ? "dg-fill-on" : "dg-fill-alt"} x={16} y={236} width={220} height={22} rx={4} opacity={step === 0 ? 1 : 0.55} />
            <Label x={126} y={251} small>prefill</Label>
            {outputTokens.map((_, index) => (
              <rect key={index} x={244 + index * 40} y={236} width={34} height={22} rx={4} className={index < step ? (index === step - 1 ? "dg-fill-on" : "dg-fill-alt") : "dg-fill-off"} opacity={index < step - 1 ? 0.55 : 1} />
            ))}
            <Label x={420} y={278} small>{step === 0 ? "TTFT includes this prefill time." : "Each small block adds inter-token latency."}</Label>
          </Svg>
        );
      }}
    </DiagramFrame>
  );
}

const vocab = ["blue", "clear", "gray", "dark", "green", "loud"];
const logits = [2.0, 1.5, 1.0, 0.5, 0.0, -0.5];
const settings = [
  { name: "Temperature 1.0", t: 1 },
  { name: "Temperature 0.5 (sharper)", t: 0.5 },
  { name: "Temperature 1.5 (flatter)", t: 1.5 },
  { name: "Top-k, k = 3", t: 1, k: 3 },
  { name: "Top-p, p = 0.9", t: 1, p: 0.9 },
];

function distribution({ t, k, p }: { t: number; k?: number; p?: number }) {
  const probs = normalizedProbabilities(logits.map((value) => value / t));
  let keep = probs.map(() => true);
  if (k) keep = probs.map((_, index) => index < k);
  if (p) {
    let total = 0;
    keep = probs.map((value) => {
      const inside = total < p;
      total += value;
      return inside;
    });
  }
  const kept = probs.reduce((total, value, index) => total + (keep[index] ? value : 0), 0);
  return probs.map((value, index) => ({ value: keep[index] ? value / kept : 0, original: value, keep: keep[index] }));
}

const distributions = settings.map(distribution);

export function SamplingDiagram() {
  return (
    <DiagramFrame
      title="How temperature, top-k and top-p change the next-token distribution"
      caption="The prompt is “The sky is …”. Lower temperature puts more probability on the top token. Top-k and top-p remove the unlikely tokens and then normalize the probabilities of the remaining tokens."
      steps={settings.length}
      stepLabels={settings.map((item) => item.name)}
      intervalMs={2300}
    >
      {(step) => {
        const setting = settings[step];
        const dist = distributions[step];
        return (
          <Svg width={640} height={270}>
            <Label x={320} y={20} on>{setting.name}</Label>
            {dist.map((item, index) => {
              const x = 40 + index * 98;
              const height = item.value * 260;
              return (
                <g key={vocab[index]}>
                  <rect className="dg-fill-off" x={x} y={40} width={60} height={180} rx={6} opacity={0.5} />
                  <rect className={item.keep ? (index === 0 ? "dg-fill-on" : "dg-fill-alt") : "dg-fill-off"} x={x} y={220 - Math.min(height, 180)} width={60} height={Math.min(height, 180)} rx={6} />
                  <Label x={x + 30} y={238} mono on={index === 0}>{vocab[index]}</Label>
                  <Label x={x + 30} y={258} small>{item.keep ? item.value.toFixed(2) : "removed"}</Label>
                </g>
              );
            })}
          </Svg>
        );
      }}
    </DiagramFrame>
  );
}

export function KvCacheDiagram() {
  const total = 6;
  return (
    <DiagramFrame
      title="Why the KV cache saves calculation"
      caption="Without a cache, each decode step calculates the keys and values of all earlier tokens again. With a cache, each step calculates only the newest token and reads the stored keys and values. The cost is memory, which increases at each step."
      steps={total}
      stepLabels={Array.from({ length: total }, (_, index) => `Generate token ${index + 1}`)}
      intervalMs={1500}
    >
      {(step) => {
        const tokens = step + 1;
        const without = (tokens * (tokens + 1)) / 2;
        return (
          <Svg width={640} height={270}>
            <Label x={160} y={20} title>Without KV cache</Label>
            <Label x={480} y={20} title>With KV cache</Label>
            {Array.from({ length: total }, (_, row) => (
              <g key={row} opacity={row <= step ? 1 : 0.15} className="dg-fade">
                <Label x={24} y={52 + row * 30} small anchor="start">step {row + 1}</Label>
                {Array.from({ length: row + 1 }, (__, col) => (
                  <rect key={col} x={80 + col * 34} y={38 + row * 30} width={28} height={20} rx={4} className={col === row ? "dg-fill-on" : "dg-fill-alt"} opacity={col === row ? 1 : 0.6} />
                ))}
                {Array.from({ length: row + 1 }, (__, col) => (
                  <rect key={col} x={360 + col * 34} y={38 + row * 30} width={28} height={20} rx={4} className={col === row ? "dg-fill-on" : "dg-fill-off"} />
                ))}
              </g>
            ))}
            <Label x={160} y={232}>Token calculations: {without}</Label>
            <Label x={480} y={232}>Token calculations: {tokens}</Label>
            <Label x={480} y={254} small>Stored in memory: {tokens} positions</Label>
            <Label x={160} y={254} small>Grows with the square of the length</Label>
          </Svg>
        );
      }}
    </DiagramFrame>
  );
}

type Cell = string | null;
const staticSchedule: Cell[][] = [
  ["A", "A", "A", "·", "·", "·", "E", "E", "E", "·"],
  ["B", "B", "B", "B", "B", "B", "F", "F", "·", "·"],
  ["C", "C", "·", "·", "·", "·", "G", "G", "G", "G"],
  ["D", "D", "D", "D", "·", "·", null, null, null, null],
];
const continuousSchedule: Cell[][] = [
  ["A", "A", "A", "E", "E", "E", null, null, null, null],
  ["B", "B", "B", "B", "B", "B", null, null, null, null],
  ["C", "C", "F", "F", "G", "G", "G", "G", null, null],
  ["D", "D", "D", "D", null, null, null, null, null, null],
];

/** The decode step at which each request in a schedule finishes. */
function finishTimes(schedule: Cell[][]) {
  return schedule.flatMap((row) => row.flatMap((value, t) => (value && value !== "·" && row[t + 1] !== value ? [t] : [])));
}

function Lane({ title, schedule, y, time }: { title: string; schedule: Cell[][]; y: number; time: number }) {
  const cell = 46;
  const ends = finishTimes(schedule);
  const finished = ends.filter((end) => end <= time).length;
  return (
    <g>
      <Label x={16} y={y - 8} title anchor="start">{title}</Label>
      <Label x={624} y={y - 8} small anchor="end">finished: {finished} of {ends.length}</Label>
      {schedule.map((row, slot) =>
        row.map((value, t) => {
          if (t > time || value === null) return <rect key={`${slot}-${t}`} x={70 + t * cell} y={y + slot * 24} width={cell - 4} height={20} rx={4} className="dg-fill-off" opacity={0.35} />;
          const padding = value === "·";
          return (
            <g key={`${slot}-${t}`}>
              <rect x={70 + t * cell} y={y + slot * 24} width={cell - 4} height={20} rx={4} className={padding ? "dg-fill-off" : "ABCD".includes(value) ? "dg-fill-alt" : "dg-fill-on"} opacity={padding ? 1 : 0.85} />
              <text x={70 + t * cell + (cell - 4) / 2} y={y + slot * 24 + 14} textAnchor="middle" className={padding ? "dg-small" : "dg-on-fill"}>{padding ? "idle" : value}</text>
            </g>
          );
        }),
      )}
      {schedule.map((_, slot) => <Label key={slot} x={16} y={y + slot * 24 + 14} small anchor="start">slot {slot + 1}</Label>)}
    </g>
  );
}

export function ContinuousBatchingDiagram() {
  const steps = 10;
  return (
    <DiagramFrame
      title="Static batching compared with continuous batching"
      caption="Requests A to D start together. E, F and G wait. Static batching waits for the full batch to finish, so slots stay idle. Continuous batching puts a waiting request into a slot as soon as the slot is free, so all seven requests finish sooner."
      steps={steps}
      stepLabels={Array.from({ length: steps }, (_, index) => `Decode step ${index + 1}`)}
      intervalMs={1100}
    >
      {(step) => (
        <Svg width={640} height={270}>
          <Lane title="Static batching" schedule={staticSchedule} y={30} time={step} />
          <Lane title="Continuous batching" schedule={continuousSchedule} y={160} time={step} />
          <line className="dg-line dg-on" x1={70 + step * 46 + 42} y1={20} x2={70 + step * 46 + 42} y2={262} />
        </Svg>
      )}
    </DiagramFrame>
  );
}

const candidates = [
  { text: "x = 7", score: 0.22 },
  { text: "x = 12", score: 0.91 },
  { text: "x = 9", score: 0.35 },
  { text: "x = 12 (other path)", score: 0.78 },
];
const bonSteps = ["Sample N = 4 candidates", "A verifier scores each candidate", "Select the best candidate"];

const best = candidates.reduce((top, item, index) => (item.score > candidates[top].score ? index : top), 0);

export function BestOfNDiagram() {
  return (
    <DiagramFrame
      title="Best-of-N sampling with a verifier"
      caption="The model samples several candidates. A verifier, for example a test or a reward model, gives each one a score. The system returns the best candidate. This works only when the score agrees with real quality."
      steps={3}
      stepLabels={bonSteps}
      intervalMs={2100}
    >
      {(step) => (
        <Svg width={640} height={260}>
          <Label x={320} y={20} title>{bonSteps[step]}</Label>
          <Box x={20} y={100} w={120} h={50} label="Problem" sub="solve for x" state="alt" />
          {candidates.map((item, index) => {
            const y = 36 + index * 52;
            const chosen = step === 2 && index === best;
            return (
              <g key={item.text}>
                <Arrow x1={142} y1={125} x2={196} y2={y + 20} on={step === 0} />
                <Box x={200} y={y} w={200} h={40} label={chosen ? `${item.text} ✓ returned` : item.text} mono state={chosen ? "on" : step === 2 ? "dim" : "off"} rx={6} />
                {step >= 1 ? (
                  <g>
                    <Meter x={420} y={y + 13} w={140} value={item.score} tone={chosen ? "on" : "alt"} />
                    <Label x={572} y={y + 25} small anchor="start">{item.score.toFixed(2)}</Label>
                  </g>
                ) : null}
              </g>
            );
          })}
        </Svg>
      )}
    </DiagramFrame>
  );
}
