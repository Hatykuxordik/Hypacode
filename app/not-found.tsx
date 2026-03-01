import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "var(--space-8)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div
        className="bg-grid"
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
        aria-hidden="true"
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, var(--accent-glow), transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <p
          style={{
            fontFamily: "var(--font-code)",
            fontSize: "var(--text-xs)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: "var(--space-3)",
          }}
        >
          Error 404
        </p>

        <h1
          className="font-display"
          style={{
            fontSize: "var(--text-hero)",
            color: "var(--text-primary)",
            fontWeight: "normal",
            lineHeight: 1.1,
            marginBottom: "var(--space-4)",
          }}
        >
          Page not found
        </h1>

        <p
          style={{
            fontSize: "var(--text-lg)",
            color: "var(--text-secondary)",
            maxWidth: 420,
            margin: "0 auto var(--space-6)",
            lineHeight: 1.65,
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" className="hypa-cta-pill">
            Go Home
          </Link>
          <Link
            href="/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 20px",
              border: "1px solid var(--border-strong)",
              borderRadius: 999,
              color: "var(--text-primary)",
              fontWeight: 600,
              fontSize: 14,
              minHeight: 40,
            }}
          >
            View Work
          </Link>
        </div>
      </div>
    </div>
  );
}
