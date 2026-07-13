"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import type { HeroSceneHandle } from "@/components/Hero3DScene";

type NavigatorWithMemory = Navigator & { deviceMemory?: number };

/**
 * Overlays the (already-visible) static SVG hero with a Three.js canvas that
 * cross-fades in once its first frame has rendered. The Three chunk is
 * preloaded during idle time via a dynamic import(), so it never blocks the
 * hero-headline LCP and refresh feels instant — the SVG is the hero until the
 * canvas is genuinely ready.
 */
export default function Hero3DMount() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HeroSceneHandle | null>(null);
  const [visible, setVisible] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const eligible =
      window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      (() => {
        const mem = (navigator as NavigatorWithMemory).deviceMemory;
        return mem === undefined || mem >= 4;
      })();

    if (!eligible) return;

    let disposed = false;

    const mount = async () => {
      const mod = await import("@/components/Hero3DScene");
      if (disposed || !containerRef.current) return;
      sceneRef.current = mod.createHeroScene(containerRef.current, {
        isDark: document.documentElement.classList.contains("dark"),
        onFirstFrame: () => {
          if (!disposed) setVisible(true);
        },
      });
    };

    // Preload + mount during idle time (fallback to a 1s timeout).
    const ric = window.requestIdleCallback;
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    if (typeof ric === "function") {
      idleId = ric(() => {
        void mount();
      });
    } else {
      timeoutId = window.setTimeout(() => {
        void mount();
      }, 1000);
    }

    return () => {
      disposed = true;
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    sceneRef.current?.setTheme(resolvedTheme === "dark");
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 transition-opacity duration-[400ms] ease-out"
      style={{ opacity: visible ? 1 : 0, background: "var(--bg)" }}
    />
  );
}
