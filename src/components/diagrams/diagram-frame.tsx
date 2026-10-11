"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useInView, usePageVisible } from "./use-in-view";

type DiagramFrameProps = {
  title: string;
  caption: string;
  steps: number;
  stepLabels?: string[];
  intervalMs?: number;
  children: (step: number) => React.ReactNode;
};

// One shared media query list for all frames, created on first use in the browser.
let reducedMotionMedia: MediaQueryList | null = null;
const reducedMotion = () => (reducedMotionMedia ??= window.matchMedia("(prefers-reduced-motion: reduce)"));
const subscribeReducedMotion = (onChange: () => void) => {
  reducedMotion().addEventListener("change", onChange);
  return () => reducedMotion().removeEventListener("change", onChange);
};

/**
 * Shared frame for animated SVG diagrams. The diagram draws one state for each step.
 * The frame plays the steps in a loop only while it is on screen and the tab is visible,
 * and it starts paused when the reader asks for reduced motion. Screen readers hear the
 * step only when the reader moves to it, not at each autoplay tick.
 */
export function DiagramFrame({ title, caption, steps, stepLabels, intervalMs = 1600, children }: DiagramFrameProps) {
  const [step, setStep] = useState(0);
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const prefersReducedMotion = useSyncExternalStore(subscribeReducedMotion, () => reducedMotion().matches, () => true);
  const [ref, onScreen] = useInView<HTMLElement>({ threshold: 0.2 });
  const pageVisible = usePageVisible();
  const playing = userPlaying ?? !prefersReducedMotion;

  useEffect(() => {
    if (!playing || !onScreen || !pageVisible) return;
    const timer = window.setInterval(() => setStep((current) => (current + 1) % steps), intervalMs);
    return () => window.clearInterval(timer);
  }, [playing, onScreen, pageVisible, steps, intervalMs]);

  const go = (next: number) => {
    setUserPlaying(false);
    setStep((next + steps) % steps);
  };

  return (
    <figure className="diagram" ref={ref} data-playing={playing && onScreen && pageVisible}>
      <figcaption className="diagram__header">
        <span>Diagram</span>
        <strong>{title}</strong>
      </figcaption>
      <div className="diagram__canvas" role="img" aria-label={`${title}. ${caption}`}>
        {children(step)}
      </div>
      <div className="diagram__controls">
        <button type="button" onClick={() => go(step - 1)} aria-label="Previous step">‹</button>
        <button type="button" onClick={() => setUserPlaying(!playing)}>{playing ? "Pause" : "Play"}</button>
        <button type="button" onClick={() => go(step + 1)} aria-label="Next step">›</button>
        <output aria-live={playing ? "off" : "polite"}>
          Step {step + 1} / {steps}
          {stepLabels?.[step] ? <> · {stepLabels[step]}</> : null}
        </output>
      </div>
      <p className="diagram__caption">{caption}</p>
    </figure>
  );
}
