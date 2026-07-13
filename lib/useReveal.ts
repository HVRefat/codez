"use client";

import { useEffect, useRef } from "react";

let sharedObserver: IntersectionObserver | null = null;

function getObserver() {
  if (typeof window === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            sharedObserver?.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );
  }
  return sharedObserver;
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("reveal-visible");
      return;
    }

    const observer = getObserver();
    observer?.observe(el);
    return () => observer?.unobserve(el);
  }, []);

  return ref;
}
