import { ImageResponse } from "next/og";

export const alt = "Learn LLM Foundations - the foundations of language models, explained interactively";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#f7f6f0", color: "#171914", padding: 72, alignItems: "center", gap: 72 }}>
      <div style={{ width: 280, height: 420, padding: 32, borderRadius: 16, background: "#153f2b", color: "#f5fff8", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 25px 60px rgba(11,51,31,.25)" }}>
        <div style={{ color: "#58e58f", fontSize: 24, display: "flex" }}>01 / 05</div>
        <div style={{ fontSize: 46, lineHeight: .95, fontWeight: 700, display: "flex", flexDirection: "column" }}>
          <span>LEARN</span><span>LLM</span><span>FOUNDATIONS</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
        <div style={{ color: "#178f52", fontSize: 22, letterSpacing: 3, textTransform: "uppercase", display: "flex" }}>Interactive field guide</div>
        <div style={{ marginTop: 22, fontSize: 72, lineHeight: .98, letterSpacing: -4, display: "flex" }}>See how language models learn.</div>
        <div style={{ marginTop: 28, color: "#686c61", fontSize: 27, display: "flex" }}>From pre-training objectives to useful foundation models.</div>
      </div>
    </div>,
    size,
  );
}
