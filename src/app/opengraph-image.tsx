import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name}, ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social sharing card, generated at build time. Uses the built-in font to avoid network fetches. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "#f8f7f2",
        color: "#18241f",
        backgroundImage:
          "linear-gradient(rgba(24,36,31,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(24,36,31,0.06) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", fontSize: 34, fontWeight: 700 }}>
        david
        <div
          style={{ width: 14, height: 14, borderRadius: 999, background: "#18634e", marginLeft: 4, marginTop: 14 }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{site.name}</div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 40, color: "#52665c" }}>
          <span style={{ background: "#c8f7ab", color: "#18241f", padding: "0 10px" }}>
            {`${site.title} · ${site.focus}`}
          </span>
        </div>
      </div>
      <div style={{ fontSize: 26, color: "#52665c", fontFamily: "monospace" }}>
        {`${site.location} · davidlescano.com`}
      </div>
    </div>,
    size,
  );
}
