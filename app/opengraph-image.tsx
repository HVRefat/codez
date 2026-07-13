import { OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = "Code Z — Cyber Security, Technology & Crime Analysis";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage();
}
