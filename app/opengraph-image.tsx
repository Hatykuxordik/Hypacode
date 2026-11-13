import { ImageResponse } from "next/og";

export const alt = "Hypacode — Frontend Engineer | React & Next.js Developer";
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
          padding: "64px 72px",
          background:
            "radial-gradient(circle at 18% 20%, rgba(0, 110, 245, 0.28) 0%, rgba(8, 13, 24, 1) 58%)",
          backgroundColor: "#080d18",
          color: "#f0f4ff",
          fontFamily: "system-ui, sans-serif",
          border: "1px solid rgba(139, 163, 199, 0.16)",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                backgroundColor: "#006ef5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 800,
                color: "#ffffff",
              }}
            >
              H
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: -0.5,
              }}
            >
              <span>Hypa</span>
              <span style={{ color: "#4d9eff" }}>code</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 18px",
              borderRadius: 999,
              backgroundColor: "rgba(52, 211, 153, 0.12)",
              border: "1px solid rgba(52, 211, 153, 0.35)",
              color: "#34d399",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Available for Remote Projects
          </div>
        </div>

        {/* Center headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span
            style={{
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#8ba3c7",
            }}
          >
            Sodiq Atiku · Frontend Engineer
          </span>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              maxWidth: 960,
              gap: "0 16px",
            }}
          >
            <span>Interfaces that</span>
            <span style={{ color: "#4d9eff" }}>earn trust</span>
            <span>and drive results.</span>
          </div>
          <p
            style={{
              fontSize: 26,
              color: "#8ba3c7",
              lineHeight: 1.45,
              maxWidth: 880,
              margin: 0,
            }}
          >
            Fast, accessible Next.js, React & TypeScript web apps, fintech
            dashboards, and high-converting landing pages.
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(139, 163, 199, 0.16)",
            paddingTop: 24,
            fontSize: 20,
            color: "#8ba3c7",
          }}
        >
          <span>React · Next.js · TypeScript · Tailwind CSS</span>
          <span style={{ color: "#4d9eff", fontWeight: 600 }}>
            hypacode.vercel.app
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}

