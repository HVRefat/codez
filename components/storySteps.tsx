import type { ReactNode } from "react";

export type StoryStep = {
  title: string;
  description: string;
  icon: ReactNode;
};

const iconProps = {
  "aria-hidden": true as const,
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const STORY_STEPS: StoryStep[] = [
  {
    title: "Threats emerge everywhere",
    description:
      "Scams, breaches, and fraud surface across the internet every day — scattered, fast-moving, and easy to miss.",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21C9.5 18.5 8.2 15.3 8.2 12S9.5 5.5 12 3Z" />
      </svg>
    ),
  },
  {
    title: "We analyze and verify",
    description:
      "Code Z investigates each signal, confirms the facts, and turns raw incidents into trustworthy intelligence.",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3 4 6v6c0 4.5 3.2 8.4 8 9 4.8-.6 8-4.5 8-9V6l-8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Crime reports, decoded",
    description:
      "Cybercrime cases and scam patterns are broken down into clear, evidence-based reports you can act on.",
    icon: (
      <svg {...iconProps}>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.35-4.35M8 11h6M11 8v6" />
      </svg>
    ),
  },
  {
    title: "Stay ahead with Code Z",
    description:
      "Follow Code Z for early warnings and analysis that keep you and your business a step ahead of the threat.",
    icon: (
      <svg {...iconProps}>
        <path d="M7 7h10l-10 10h10" />
      </svg>
    ),
  },
];
