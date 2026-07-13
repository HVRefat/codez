import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0b0e11",
          backgroundImage:
            "linear-gradient(#1e242b 1px, transparent 1px), linear-gradient(90deg, #1e242b 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "64px 96px",
            border: "1px solid #1e242b",
            borderRadius: 16,
            backgroundColor: "#12161b",
          }}
        >
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>
            <span style={{ color: "#d7dee4" }}>CODE&nbsp;</span>
            <span style={{ color: "#4ae3b5" }}>Z</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 30,
              color: "#7a868f",
              letterSpacing: 1,
            }}
          >
            Decode the threat. Read the evidence.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 40,
              fontSize: 22,
              color: "#4ae3b5",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            codez.monmoto.com
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
