"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { STORY_STEPS } from "@/components/storySteps";
import StoryVisualFallback from "@/components/StoryVisualFallback";
import type { StorySceneHandle } from "@/components/StoryScene";

type NavigatorWithMemory = Navigator & { deviceMemory?: number };

export default function StoryScrolly() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const stepRef = useRef(0);
  const sceneRef = useRef<StorySceneHandle | null>(null);

  const [step, setStep] = useState(0);
  const [canvasVisible, setCanvasVisible] = useState(false);
  const { resolvedTheme } = useTheme();

  // Passive scroll -> progress ref (no per-event React state). Step index is
  // the ONLY state, and only updates when it actually changes.
  useEffect(() => {
    const scrollyActive =
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!scrollyActive) return;

    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      progressRef.current = p;
      const s = Math.min(STORY_STEPS.length - 1, Math.floor(p * STORY_STEPS.length));
      if (s !== stepRef.current) {
        stepRef.current = s;
        setStep(s);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Idle-preload + mount the Three scene, guarded like the hero.
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
      const mod = await import("@/components/StoryScene");
      if (disposed || !canvasRef.current) return;
      sceneRef.current = mod.createStoryScene(canvasRef.current, {
        isDark: document.documentElement.classList.contains("dark"),
        getProgress: () => progressRef.current,
        onFirstFrame: () => {
          if (!disposed) setCanvasVisible(true);
        },
      });
    };

    const ric = window.requestIdleCallback;
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    if (typeof ric === "function") {
      idleId = ric(() => void mount());
    } else {
      timeoutId = window.setTimeout(() => void mount(), 1000);
    }

    return () => {
      disposed = true;
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    sceneRef.current?.setTheme(resolvedTheme === "dark");
  }, [resolvedTheme]);

  return (
    <section ref={sectionRef} className="story-scrolly relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="container-max grid h-full grid-cols-2 items-center gap-16 px-6">
          {/* Text side — one panel per step, cross-faded via data-active. */}
          <div className="relative">
            <p className="label-eyebrow mb-6 text-xs text-accent">How Code Z protects you</p>
            <div className="relative min-h-[240px]">
              {STORY_STEPS.map((s, i) => (
                <div
                  key={s.title}
                  data-active={i === step}
                  className="story-step absolute inset-0"
                >
                  <p className="label-eyebrow mb-3 text-xs text-text-dim">
                    Step {i + 1} / {STORY_STEPS.length}
                  </p>
                  <h3 className="font-display text-3xl font-extrabold leading-tight text-text">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-text-dim">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
            {/* Progress dots */}
            <div className="mt-8 flex gap-2">
              {STORY_STEPS.map((s, i) => (
                <span
                  key={s.title}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === step ? 28 : 10,
                    backgroundColor: i === step ? "var(--brand)" : "var(--line)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Visual side — SVG fallback with the canvas cross-fading over it. */}
          <div className="flex justify-center">
            <div className="relative aspect-square w-full max-w-md">
              <StoryVisualFallback />
              <div
                ref={canvasRef}
                aria-hidden="true"
                className="absolute inset-0 transition-opacity duration-[400ms] ease-out"
                style={{ opacity: canvasVisible ? 1 : 0, background: "var(--bg)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
