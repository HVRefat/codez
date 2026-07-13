import StoryStatic from "@/components/StoryStatic";
import StoryScrolly from "@/components/StoryScrolly";

// Renders BOTH layouts; CSS (in globals.css) picks exactly one:
//   - mobile/tablet OR reduced-motion  -> StoryStatic (vertical sequence)
//   - desktop with motion allowed      -> StoryScrolly (300vh sticky 3D)
// This keeps SSR content present and avoids a JS-driven layout swap/flash.
export default function HowItWorks() {
  return (
    <>
      <StoryStatic />
      <StoryScrolly />
    </>
  );
}
