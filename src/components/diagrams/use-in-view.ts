"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type InViewOptions = {
  rootMargin?: string;
  threshold?: number;
  /** Stop observing after the first intersection, so the value stays true. */
  once?: boolean;
};

/**
 * Tracks whether an element is in (or near) the viewport. When IntersectionObserver is not
 * available, the element counts as visible, so that the content still loads and plays.
 */
export function useInView<T extends Element>({ rootMargin, threshold, once = false }: InViewOptions = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setInView(true));
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!once) {
        setInView(entry.isIntersecting);
      } else if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { rootMargin, threshold });
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return [ref, inView] as const;
}

const subscribeVisibility = (onChange: () => void) => {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
};

/** True while the browser tab is visible. Hidden tabs should not run animations. */
export function usePageVisible() {
  return useSyncExternalStore(subscribeVisibility, () => document.visibilityState === "visible", () => false);
}
