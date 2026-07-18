import { ImageResponse } from "next/og";

export const alt = "Gabriele Armento — Ideas are cheap. Evidence is the work.";
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
          color: "#151617",
          background: "#f4f1e9",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            width: "58%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "42px 50px",
            borderRight: "2px solid rgba(21,22,23,.25)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, textTransform: "uppercase", letterSpacing: 2.5 }}>
            <span>Gabriele Armento</span>
            <span>Builder · Italy</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 88, fontWeight: 700, lineHeight: 0.84, letterSpacing: -6 }}>
            <span>Ideas are cheap.</span>
            <span style={{ color: "#ff6b5e", WebkitTextStroke: "2px #151617" }}>
              Evidence is the work.
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 18, borderTop: "2px solid rgba(21,22,23,.25)", fontSize: 16 }}>
            <span>Research · Data · Markets · AI</span>
            <span>GA</span>
          </div>
        </div>

        <div
          style={{
            width: "42%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            color: "#f3f0e8",
            background: "#151617",
          }}
        >
          <div style={{ position: "absolute", top: 42, left: 38, right: 38, display: "flex", justifyContent: "space-between", fontSize: 15, textTransform: "uppercase", letterSpacing: 2 }}>
            <span>Ideas in motion</span>
            <span>04 active worlds</span>
          </div>
          <div style={{ width: 330, height: 330, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(243,240,232,.55)", borderRadius: 999, boxShadow: "0 0 0 58px rgba(243,240,232,.12), 0 0 0 116px rgba(243,240,232,.06)" }}>
            <div style={{ position: "absolute", top: 152, right: 95, width: 58, height: 58, display: "flex", borderRadius: 999, background: "#9ee8ff", boxShadow: "0 0 0 7px #151617, 0 0 0 9px #9ee8ff" }} />
            <div style={{ position: "absolute", bottom: 125, left: 78, width: 48, height: 48, display: "flex", borderRadius: 999, background: "#ff6b5e", boxShadow: "0 0 0 7px #151617, 0 0 0 9px #ff6b5e" }} />
            <div style={{ position: "absolute", bottom: 65, right: 145, width: 33, height: 33, display: "flex", borderRadius: 999, background: "#d7ff58" }} />
            <div style={{ width: 120, height: 120, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 999, background: "#f3f0e8", color: "#151617", fontSize: 32, fontWeight: 700 }}>
              GA
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
