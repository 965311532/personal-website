import { ImageResponse } from "next/og";

export const alt = "Gabriele Armento — I make ambiguity operational";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 56px",
          color: "#111214",
          background: "#ff5a1f",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, textTransform: "uppercase", letterSpacing: 3 }}>
          <span>Independent builder</span>
          <span>Italy · 44° N</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 142, fontWeight: 800, lineHeight: 0.72, letterSpacing: -10, textTransform: "uppercase" }}>
          <span>Gabriele</span>
          <span style={{ color: "transparent", WebkitTextStroke: "3px #111214", fontSize: 142, fontWeight: 800, letterSpacing: -10 }}>
            Armento
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "2px solid rgba(17,18,20,.35)", paddingTop: 20, fontSize: 18 }}>
          <span>I make ambiguity operational.</span>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 12, height: 12, borderRadius: 999, background: "#111214" }} />
            gabrielearmento.com
          </span>
        </div>
      </div>
    ),
    size,
  );
}
