import { ImageResponse } from "next/og";

export const alt = "Gabriele Armento — I build systems for uncertain worlds";
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
          color: "#f3efe6",
          background: "#0b0c0d",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, textTransform: "uppercase", letterSpacing: 3 }}>
          <span>Gabriele Armento</span>
          <span style={{ color: "#ff6b2c" }}>Builder · Italy</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 118, fontWeight: 800, lineHeight: 0.84, letterSpacing: -8, textTransform: "uppercase" }}>
          <span>I build systems</span>
          <span style={{ color: "#ff6b2c", fontSize: 104, fontWeight: 500, letterSpacing: -7, textTransform: "none" }}>
            for uncertain worlds.
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "2px solid #343537", paddingTop: 20, fontSize: 18 }}>
          <span>Research · Data · Decisions · Automation</span>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 12, height: 12, borderRadius: 999, background: "#ff6b2c" }} />
            gabrielearmento.com
          </span>
        </div>
      </div>
    ),
    size,
  );
}
