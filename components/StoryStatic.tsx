import Reveal from "@/components/Reveal";
import { STORY_STEPS } from "@/components/storySteps";

// Mobile / tablet / reduced-motion experience: the same 4 steps as a clean
// vertical sequence, revealed with the shared IntersectionObserver fade-up.
// No 3D, no sticky canvas — fast and jank-free.
export default function StoryStatic() {
  return (
    <section className="story-static container-max px-4 py-16 sm:px-6">
      <Reveal className="mb-10">
        <p className="label-eyebrow mb-2 text-xs text-accent">How Code Z protects you</p>
        <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">
          From scattered threats to clarity
        </h2>
      </Reveal>

      <ol className="flex flex-col gap-6">
        {STORY_STEPS.map((s, i) => (
          <Reveal key={s.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
            <li className="panel flex items-start gap-4 p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                {s.icon}
              </span>
              <div>
                <p className="label-eyebrow mb-1 text-[11px] text-text-dim">
                  Step {i + 1} / {STORY_STEPS.length}
                </p>
                <h3 className="font-display text-lg font-bold text-text">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-dim">{s.description}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
