"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type DiagramFrameProps = {
  title: string;
  caption: string;
  steps: number;
  stepLabels?: string[];
  intervalMs?: number;
  children: (step: number) => React.ReactNode;
};

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

/**
 * Shared frame for animated SVG diagrams. The diagram draws one state for each step.
 * The frame plays the steps in a loop only while it is on screen, and it starts paused
 * when the reader asks for reduced motion.
 */
export function DiagramFrame({ title, caption, steps, stepLabels, intervalMs = 1600, children }: DiagramFrameProps) {
  const [step, setStep] = useState(0);
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(reducedMotionQuery).matches, () => true);
  const playing = userPlaying ?? !reducedMotion;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    const timer = window.setInterval(() => setStep((current) => (current + 1) % steps), intervalMs);
    return () => window.clearInterval(timer);
  }, [playing, visible, steps, intervalMs]);

  const go = (next: number) => {
    setUserPlaying(false);
    setStep((next + steps) % steps);
  };

  return (
    <figure className="diagram" ref={ref}>
      <figcaption className="diagram__header">
        <span>Diagram</span>
        <strong>{title}</strong>
      </figcaption>
      <div className="diagram__canvas" role="img" aria-label={`${title}. Step ${step + 1} of ${steps}${stepLabels?.[step] ? `: ${stepLabels[step]}` : ""}`}>
        {children(step)}
      </div>
      <div className="diagram__controls">
        <button type="button" onClick={() => go(step - 1)} aria-label="Previous step">‹</button>
        <button type="button" onClick={() => setUserPlaying(!playing)} aria-pressed={playing}>{playing ? "Pause" : "Play"}</button>
        <button type="button" onClick={() => go(step + 1)} aria-label="Next step">›</button>
        <output aria-live="polite">
          Step {step + 1} / {steps}
          {stepLabels?.[step] ? <> · {stepLabels[step]}</> : null}
        </output>
      </div>
      <p className="diagram__caption">{caption}</p>
    </figure>
  );
}
