import { ImageResponse } from "next/og";

export const alt = "Gabriele Armento — Ideas are cheap. Evidence is the work.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "44px 52px",
          color: "#eeeae1",
          background: "#0b0d10",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 18, borderBottom: "1px solid rgba(238,234,225,.2)", fontSize: 15, letterSpacing: 2.2, textTransform: "uppercase" }}>
          <span>Gabriele Armento</span>
          <span style={{ color: "#8b919a" }}>Founder + software builder · Italy</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 102, fontWeight: 600, lineHeight: 0.9, letterSpacing: -7 }}>
          <span>Ideas are cheap.</span>
          <span style={{ marginTop: 16, color: "#d2cec5", fontFamily: "Didot, Bodoni MT, Times New Roman, serif", fontWeight: 400, letterSpacing: -4 }}>
            Evidence is the work.
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 18, borderTop: "1px solid rgba(238,234,225,.2)", color: "#8b919a", fontSize: 14, letterSpacing: 1.7, textTransform: "uppercase" }}>
          <span>Markets · Energy · Data · Forecasting</span>
          <span>Make the reasoning visible</span>
        </div>

        <div style={{ position: "absolute", top: -40, right: 90, width: 155, height: 155, display: "flex", borderRadius: 999, background: "#dd785f", opacity: 0.75, boxShadow: "inset -30px -24px 45px rgba(0,0,0,.38)" }} />
        <div style={{ position: "absolute", right: -45, bottom: 88, width: 125, height: 125, display: "flex", borderRadius: 999, background: "#7c9ac8", opacity: 0.7, boxShadow: "inset -25px -20px 38px rgba(0,0,0,.4)" }} />
        <div style={{ position: "absolute", bottom: -58, left: 175, width: 112, height: 112, display: "flex", transform: "rotate(24deg)", background: "#96b29a", opacity: 0.68, boxShadow: "inset -22px -18px 35px rgba(0,0,0,.38)" }} />
      </div>
    ),
    size,
  );
}
