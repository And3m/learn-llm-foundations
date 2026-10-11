"use client";

import { useEffect, useRef } from "react";

/**
 * A thin bar that shows how far the reader has scrolled. It writes a transform once per
 * animation frame, outside React state, so scrolling does not re-render or force a layout.
 */
export function ReadingProgress() {
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let max = 0;
    let frame = 0;
    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
    };
    const paint = () => {
      frame = 0;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const remeasure = () => {
      measure();
      schedule();
    };

    remeasure();
    // Diagrams and math can change the page height after load, so measure again when it changes.
    const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(remeasure);
    resize?.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    return () => {
      cancelAnimationFrame(frame);
      resize?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
    };
  }, []);

  return <div className="reading-progress" aria-hidden="true"><span ref={bar} /></div>;
}
