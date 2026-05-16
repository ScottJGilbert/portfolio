import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const WIDTH = 1200;
const HEIGHT = 630;

export default async function Image() {
  try {
    const svgPath = path.join(process.cwd(), "src", "app", "icon.svg");
    let svg = "";
    try {
      svg = fs.readFileSync(svgPath, "utf8");
    } catch {
      // fallback simple SVG if icon not found
      svg = `<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.5'><circle cx='12' cy='12' r='10'/></svg>`;
    }

    const svgDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px",
          boxSizing: "border-box",
          background:
            "linear-gradient(135deg,#1a241d 0%,#233126 50%,#345541 100%)",
          color: "white",
          fontFamily: "Inter, Roboto, -apple-system, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 220,
              height: 220,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
              borderRadius: 44,
              boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={svgDataUrl}
              alt="icon"
              style={{ width: 140, height: 140 }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1 }}>
              Scott Gilbert | Computer Engineer
            </div>
            <div style={{ fontSize: 28, opacity: 0.9, maxWidth: 700 }}>
              Personal projects, writing, and experiments — curated and
              maintained.
            </div>
            <div style={{ fontSize: 20, opacity: 0.75 }}>
              hello@scottgilbert.dev
            </div>
          </div>
          {/* <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
          </div> */}
        </div>
      </div>,
      {
        width: WIDTH,
        height: HEIGHT,
      },
    );
  } catch (err) {
    return new Response("Failed to generate the image: " + err, {
      status: 500,
    });
  }
}
