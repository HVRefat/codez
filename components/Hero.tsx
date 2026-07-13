"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import HeroStatic from "@/components/HeroStatic";

const Hero3D = dynamic(() => import("@/components/Hero3D"), {
  ssr: false,
  loading: () => <HeroStatic />,
});

type NavigatorWithMemory = Navigator & { deviceMemory?: number };

export default function Hero() {
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const deviceMemory = (navigator as NavigatorWithMemory).deviceMemory;
    const memoryOk = deviceMemory === undefined || deviceMemory >= 4;

    // One-time capability probe: matchMedia/deviceMemory don't exist during SSR,
    // so this can only be resolved after mount — not derivable during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUse3D(fine && !reducedMotion && memoryOk);
  }, []);

  return use3D ? <Hero3D /> : <HeroStatic />;
}
