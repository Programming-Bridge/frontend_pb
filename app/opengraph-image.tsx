import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Programming Bridge | Full-Stack Digital Engineering Studio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0B0F12",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #182226 2%, transparent 0%), radial-gradient(circle at 75px 75px, #182226 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          padding: "80px",
          color: "#F8FAFC",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow orb */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            backgroundColor: "rgba(0, 196, 102, 0.15)",
            filter: "blur(90px)",
          }}
        />

        {/* Top bar: Brand Pill */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              backgroundColor: "rgba(0, 196, 102, 0.15)",
              border: "1.5px solid rgba(0, 196, 102, 0.4)",
              color: "#00C466",
              fontSize: "28px",
              fontWeight: "900",
            }}
          >
            PB
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "24px", fontWeight: "800", color: "#FFFFFF", letterSpacing: "-0.5px" }}>
              Programming Bridge
            </span>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#00C466", textTransform: "uppercase", letterSpacing: "1.5px" }}>
              Digital Engineering Studio
            </span>
          </div>
        </div>

        {/* Middle: Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "980px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(0, 196, 102, 0.1)",
              border: "1px solid rgba(0, 196, 102, 0.3)",
              borderRadius: "9999px",
              padding: "6px 18px",
              width: "max-content",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: "700", color: "#00C466" }}>
              ✦ Full-Stack Web • Native Mobile • Distributed Cloud
            </span>
          </div>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: "900",
              lineHeight: "1.15",
              letterSpacing: "-1.5px",
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            Bespoke Digital Systems Engineered for <span style={{ color: "#00C466" }}>Extreme Scale</span>.
          </h1>
          <p
            style={{
              fontSize: "22px",
              color: "#94A3B8",
              lineHeight: "1.4",
              margin: 0,
            }}
          >
            We design, build, and scale production Next.js, Flutter, Kotlin, and Cloud AI microservices for startups and enterprise teams.
          </p>
        </div>

        {/* Bottom bar: Tech badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid #1E2B30",
            paddingTop: "28px",
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            {["Next.js 15", "React 19", "Node.js", "Python FastAPI", "Kotlin", "Flutter", "AWS"].map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#E2E8F0",
                  backgroundColor: "#182226",
                  border: "1px solid #2B3B42",
                  borderRadius: "8px",
                  padding: "6px 12px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span style={{ fontSize: "16px", fontWeight: "700", color: "#00C466" }}>
            programmingbridge.org →
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
