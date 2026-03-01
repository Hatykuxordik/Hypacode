"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Sparkles, X, Send, RotateCcw, Copy, Check } from "lucide-react";
import { matchOfflineKB } from "@/lib/chat-context";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const QUICK_REPLIES = [
  "Tell me about Sodiq",
  "What's your stack?",
  "What would a web app cost?",
  "Walk me through your process",
];

// ─────────────────────────────────────────────────────────────────────────────
// Inline renderer — bold + links with arrow icon
// ─────────────────────────────────────────────────────────────────────────────

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  const nodes: React.ReactNode[] = [];

  parts.forEach((part, i) => {
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const [, rawLabel, url] = linkMatch;
      // Strip trailing arrow characters that come from KB data (e.g. "Full skills page →")
      const label = rawLabel.replace(/\s*[→➜►▶→↗]\s*$/, "").trim();
      const isInternal = url.startsWith("/");
      nodes.push(
        isInternal ? (
          <Link
            key={`${keyPrefix}-l${i}`}
            href={url}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 3,
              color: "#22d3ee",
              fontWeight: 500,
              textDecoration: "none",
              lineHeight: "inherit",
            }}
          >
            {label}
            <svg
              width="9"
              height="9"
              viewBox="0 0 12 12"
              fill="none"
              style={{ flexShrink: 0, opacity: 0.7 }}
            >
              <path
                d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                stroke="#22d3ee"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        ) : (
          <a
            key={`${keyPrefix}-l${i}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 3,
              color: "#22d3ee",
              fontWeight: 500,
              textDecoration: "none",
              lineHeight: "inherit",
            }}
          >
            {label}
            <svg
              width="9"
              height="9"
              viewBox="0 0 12 12"
              fill="none"
              style={{ flexShrink: 0, opacity: 0.7 }}
            >
              <path
                d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                stroke="#22d3ee"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        ),
      );
    } else if (part) {
      const boldParts = part.split(/(\*\*.*?\*\*)/g);
      boldParts.forEach((bp, j) => {
        const boldMatch = bp.match(/^\*\*(.*?)\*\*$/);
        if (boldMatch) {
          nodes.push(
            <strong
              key={`${keyPrefix}-b${i}-${j}`}
              style={{ color: "var(--text-primary, #e8e8ff)", fontWeight: 600 }}
            >
              {boldMatch[1]}
            </strong>,
          );
        } else if (bp) {
          nodes.push(<span key={`${keyPrefix}-t${i}-${j}`}>{bp}</span>);
        }
      });
    }
  });

  return nodes;
}

// ─────────────────────────────────────────────────────────────────────────────
// Block renderer — paragraphs · bullet lists · numbered lists
// ─────────────────────────────────────────────────────────────────────────────

function parseContent(text: string): React.ReactNode {
  const rawBlocks = text.split(/\n{2,}/);
  const blocks: React.ReactNode[] = [];

  rawBlocks.forEach((block, bi) => {
    const lines = block
      .split("\n")
      .map((l) => l.trimEnd())
      .filter(Boolean);
    if (!lines.length) return;
    const gap = bi === 0 ? 0 : 10;

    // ── Bullet list ──────────────────────────────────────────────────────────
    if (lines.every((l) => /^[-•]\s/.test(l))) {
      blocks.push(
        <div
          key={`b${bi}`}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            marginTop: gap,
          }}
        >
          {lines.map((line, li) => (
            <div
              key={li}
              style={{ display: "flex", gap: 8, alignItems: "flex-start" }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "rgba(34,211,238,0.55)",
                  flexShrink: 0,
                  marginTop: 7,
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  lineHeight: 1.65,
                  color: "var(--text-primary, #e8e8ff)",
                }}
              >
                {renderInline(line.replace(/^[-•]\s/, ""), `b${bi}li${li}`)}
              </span>
            </div>
          ))}
        </div>,
      );
      return;
    }

    // ── Numbered list ────────────────────────────────────────────────────────
    if (lines.every((l) => /^\d+\.\s/.test(l))) {
      blocks.push(
        <div
          key={`b${bi}`}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 7,
            marginTop: gap,
          }}
        >
          {lines.map((line, li) => {
            const m = line.match(/^(\d+)\.\s(.*)/);
            if (!m) return null;
            return (
              <div
                key={li}
                style={{ display: "flex", gap: 9, alignItems: "flex-start" }}
              >
                <span
                  style={{
                    minWidth: 20,
                    height: 20,
                    borderRadius: 5,
                    flexShrink: 0,
                    marginTop: 1,
                    background: "rgba(124,58,237,0.18)",
                    border: "1px solid rgba(124,58,237,0.28)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#a78bfa",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {m[1]}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    lineHeight: 1.65,
                    color: "var(--text-primary, #e8e8ff)",
                  }}
                >
                  {renderInline(m[2], `b${bi}nl${li}`)}
                </span>
              </div>
            );
          })}
        </div>,
      );
      return;
    }

    // ── Follow-up question (starts with ~~) ─────────────────────────────────
    if (lines.length === 1 && lines[0].startsWith("~~")) {
      const question = lines[0].slice(2);
      blocks.push(
        <p
          key={`b${bi}`}
          style={{
            margin: 0,
            marginTop: 10,
            paddingTop: 10,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            fontSize: 12,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.38)",
            fontStyle: "italic",
          }}
        >
          {renderInline(question, `b${bi}fup`)}
        </p>,
      );
      return;
    }

    // ── Regular paragraph ────────────────────────────────────────────────────
    const paraNodes: React.ReactNode[] = [];
    lines.forEach((line, li) => {
      if (li > 0) paraNodes.push(<br key={`br${bi}-${li}`} />);
      paraNodes.push(...renderInline(line, `b${bi}p${li}`));
    });

    blocks.push(
      <p
        key={`b${bi}`}
        style={{
          margin: 0,
          marginTop: gap,
          fontSize: 13,
          lineHeight: 1.7,
          color: "var(--text-primary, #e8e8ff)",
        }}
      >
        {paraNodes}
      </p>,
    );
  });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>{blocks}</div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Typing dots indicator
// ─────────────────────────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <span
      style={{
        display: "inline-flex",
        gap: 5,
        alignItems: "center",
        padding: "3px 0",
      }}
    >
      {[0, 0.18, 0.36].map((delay) => (
        <span
          key={delay}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--accent-secondary, #22d3ee)",
            display: "inline-block",
            opacity: 0.5,
            animation: `aiWidgetBounce 1.1s ${delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function formatTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ─────────────────────────────────────────────────────────────────────────────
// Widget
// ─────────────────────────────────────────────────────────────────────────────

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [fabHovered, setFabHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hydration-safe
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show tooltip once per session after 2s
  useEffect(() => {
    if (!mounted) return;
    const seen = sessionStorage.getItem("hypacode_ai_seen");
    if (!seen) {
      const t = setTimeout(() => {
        setShowTooltip(true);
        sessionStorage.setItem("hypacode_ai_seen", "1");
        setTimeout(() => setShowTooltip(false), 4000);
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [mounted]);

  // Scroll to latest
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 130);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [isOpen]);

  // Track unread AI messages while panel is closed
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === "assistant" && lastMsg.content) {
        setUnreadCount((c) => c + 1);
      }
    }
  }, [messages]); // eslint-disable-line

  // Clear unread on open
  useEffect(() => {
    if (isOpen) setUnreadCount(0);
  }, [isOpen]);

  // ── Copy message ────────────────────────────────────────────────────────────
  const copyMessage = useCallback((id: string, content: string) => {
    // Strip markdown syntax for clean copy
    const plain = content
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/^[-•]\s/gm, "• ")
      .replace(/~~(.*)/g, "$1")
      .trim();
    navigator.clipboard.writeText(plain).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    });
  }, []);

  // ── Send ────────────────────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return;

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: text.trim(),
        timestamp: Date.now(),
      };
      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setInput("");
      setIsStreaming(true);

      const assistantId = crypto.randomUUID();

      // Add placeholder so typing dots show immediately
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: "assistant",
          content: "",
          timestamp: Date.now(),
        },
      ]);

      // ── Layer 1: offline KB ─────────────────────────────────────────────────
      const offlineAnswer = matchOfflineKB(text, updatedMessages);
      if (offlineAnswer) {
        // Simulate thinking — feels natural, not instant
        const thinkMs = 850 + Math.random() * 650;
        await new Promise((r) => setTimeout(r, thinkMs));
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: offlineAnswer } : m,
          ),
        );
        setIsStreaming(false);
        return;
      }

      // ── Layer 2: Claude API streaming ───────────────────────────────────────
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!res.ok || !res.body) throw new Error("API failure");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          for (const line of chunk.split("\n")) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.delta) {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId
                      ? { ...m, content: m.content + parsed.delta }
                      : m,
                  ),
                );
              }
            } catch {
              /* ignore */
            }
          }
        }
        // stream complete
      } catch {
        // API failed — silently re-run offline KB as fallback so user never
        // sees a "connection lost" error. If KB also has nothing, show a
        // soft contact prompt (no error styling, no retry button).
        const fallback =
          matchOfflineKB(text, updatedMessages) ||
          `I couldn't reach the server right now. You can [contact Sodiq](/contact) or [book a call](https://cal.com/sodiq-atiku-ljdgnr/30min) directly.`;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: fallback } : m,
          ),
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, isStreaming],
  );

  const handleReset = () => {
    setMessages([]);
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  if (!mounted) return null;

  return (
    <>
      {/* ── CSS keyframes ─────────────────────────────────────────────── */}
      <style>{`
        @keyframes aiWidgetBounce {
          0%, 100% { transform: translateY(0);   opacity: 0.4; }
          50%       { transform: translateY(-4px); opacity: 1;   }
        }
        @keyframes aiWidgetGlow {
          0%, 100% { box-shadow: 0 0 0 0   rgba(34,211,238,0.5), 0 6px 28px rgba(124,58,237,0.4); }
          50%       { box-shadow: 0 0 0 10px rgba(34,211,238,0),   0 6px 28px rgba(124,58,237,0.4); }
        }
        @keyframes aiWidgetSlideUp {
          from { opacity: 0; transform: translateY(14px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes aiWidgetTooltip {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes aiWidgetOnline {
          0%, 100% { opacity: 1;   }
          50%       { opacity: 0.35; }
        }
        @keyframes aiWidgetFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes aiWidgetMsgIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Backdrop overlay (visual hierarchy) ───────────────────────── */}
      {isOpen && (
        <div
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9990,
            background: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            animation: "aiWidgetFadeIn 0.22s ease forwards",
            // Only on mobile — on desktop the panel is small enough that
            // the overlay is subtle but still communicates layering
          }}
        />
      )}

      {/* ── Chat panel ────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Hypacode AI assistant"
          style={{
            // Desktop: bottom-right anchored
            position: "fixed",
            bottom: 96,
            right: 28,
            // Full-width bottom sheet on mobile
            left: "var(--ai-panel-left, auto)",
            width: "var(--ai-panel-width, min(400px, calc(100vw - 56px)))",
            height: "min(580px, calc(100vh - 130px))",
            zIndex: 9995,
            display: "flex",
            flexDirection: "column",
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(34,211,238,0.18)",
            background: "var(--bg-glass, rgba(8,8,18,0.96))",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            // Multi-layer shadow for strong depth
            boxShadow: [
              "0 32px 80px rgba(0,0,0,0.6)",
              "0 8px 24px rgba(0,0,0,0.4)",
              "0 0 0 1px rgba(255,255,255,0.04)",
              "inset 0 1px 0 rgba(255,255,255,0.06)",
            ].join(", "),
            animation:
              "aiWidgetSlideUp 0.3s cubic-bezier(0.16,1,0.3,1) forwards",
          }}
        >
          {/* Responsive: on mobile, override to centered bottom sheet */}
          <style>{`
            @media (max-width: 520px) {
              [data-ai-panel] {
                left: 12px !important;
                right: 12px !important;
                bottom: 80px !important;
                width: auto !important;
                border-radius: 16px !important;
                height: min(520px, calc(100vh - 110px)) !important;
              }
            }
          `}</style>

          {/* ── Header ──────────────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "13px 14px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              flexShrink: 0,
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* AI icon */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, rgba(124,58,237,0.35), rgba(34,211,238,0.2))",
                  border: "1px solid rgba(34,211,238,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#22d3ee",
                  flexShrink: 0,
                }}
              >
                <Sparkles size={15} strokeWidth={1.8} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--text-primary, #e8e8ff)",
                    fontFamily: "var(--font-body)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1,
                  }}
                >
                  Hypacode AI
                </span>
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--text-muted, #5a5a7a)",
                    fontFamily: "var(--font-mono, monospace)",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    lineHeight: 1,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#22c55e",
                      display: "inline-block",
                      animation: "aiWidgetOnline 2.2s ease-in-out infinite",
                    }}
                  />
                  online · claude-haiku-4-5
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {messages.length > 0 && (
                <button
                  onClick={handleReset}
                  aria-label="Clear conversation"
                  title="Clear conversation"
                  style={iconBtnStyle}
                  onMouseEnter={iconBtnHoverIn}
                  onMouseLeave={iconBtnHoverOut}
                >
                  <RotateCcw size={13} />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close AI chat"
                style={iconBtnStyle}
                onMouseEnter={iconBtnHoverIn}
                onMouseLeave={iconBtnHoverOut}
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* ── Accent line ─────────────────────────────────────────────── */}
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.3) 40%, rgba(124,58,237,0.3) 60%, transparent 100%)",
              flexShrink: 0,
            }}
            aria-hidden="true"
          />

          {/* ── Messages ────────────────────────────────────────────────── */}
          <div
            role="log"
            aria-live="polite"
            aria-atomic="false"
            aria-label="Chat messages"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.06) transparent",
            }}
          >
            {/* Empty state */}
            {messages.length === 0 && (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div style={aiBubbleStyle}>
                  Hey 👋 I know everything about Sodiq — his work, stack,
                  pricing, and availability. What do you want to know?
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {QUICK_REPLIES.map((qr) => (
                    <button
                      key={qr}
                      onClick={() => sendMessage(qr)}
                      style={pillStyle}
                      onMouseEnter={pillHoverIn}
                      onMouseLeave={pillHoverOut}
                    >
                      {qr}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                  gap: 4,
                  animation: "aiWidgetMsgIn 0.2s ease forwards",
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--text-muted, #5a5a7a)",
                    fontFamily: "var(--font-mono, monospace)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    display: "flex",
                    gap: 6,
                  }}
                >
                  {msg.role === "user" ? "you" : "sodiq ai"}
                  {msg.timestamp && (
                    <span style={{ opacity: 0.5, fontWeight: 400 }}>
                      {formatTime(msg.timestamp)}
                    </span>
                  )}
                </span>
                <div
                  style={{
                    position: "relative",
                    width: msg.role === "assistant" ? "100%" : "auto",
                    maxWidth: msg.role === "user" ? "82%" : "100%",
                    alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={
                      msg.role === "user" ? userBubbleStyle : aiBubbleStyle
                    }
                  >
                    {!msg.content && isStreaming && msg.role === "assistant" ? (
                      <TypingDots />
                    ) : (
                      parseContent(msg.content)
                    )}
                  </div>
                  {msg.role === "assistant" && msg.content && (
                    <button
                      onClick={() => copyMessage(msg.id, msg.content)}
                      aria-label="Copy message"
                      title="Copy message"
                      style={{
                        position: "absolute",
                        bottom: 7,
                        right: 8,
                        width: 22,
                        height: 22,
                        borderRadius: 5,
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(8,8,20,0.85)",
                        color:
                          copiedId === msg.id
                            ? "#22c55e"
                            : "rgba(255,255,255,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        opacity: 0,
                        transition: "opacity 0.15s, color 0.15s",
                        backdropFilter: "blur(4px)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.opacity = "1";
                        (e.currentTarget as HTMLElement).style.color =
                          copiedId === msg.id
                            ? "#22c55e"
                            : "rgba(255,255,255,0.7)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.opacity = "0";
                      }}
                    >
                      {copiedId === msg.id ? (
                        <Check size={11} strokeWidth={2.5} />
                      ) : (
                        <Copy size={11} strokeWidth={2} />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Input ───────────────────────────────────────────────────── */}
          <div
            style={{
              padding: "10px 12px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexShrink: 0,
              background: "rgba(255,255,255,0.01)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                color: "rgba(34,211,238,0.5)",
                fontFamily: "var(--font-mono, monospace)",
                fontSize: 14,
                flexShrink: 0,
                userSelect: "none",
              }}
            >
              ›
            </span>

            <label htmlFor="ai-widget-input" className="sr-only">
              Ask anything about Sodiq
            </label>
            <div
              style={{
                flex: 1,
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                id="ai-widget-input"
                ref={inputRef}
                type="text"
                value={input}
                maxLength={300}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder="Ask anything…"
                disabled={isStreaming}
                autoComplete="off"
                style={{
                  flex: 1,
                  background: "none",
                  border: "none",
                  outline: "none",
                  color: "var(--text-primary, #e8e8ff)",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  caretColor: "#22d3ee",
                  minHeight: 36,
                  paddingRight: input.length > 240 ? 36 : 0,
                }}
                aria-label="Type your message"
              />
              {input.length > 240 && (
                <span
                  aria-live="polite"
                  style={{
                    position: "absolute",
                    right: 0,
                    fontSize: 10,
                    fontFamily: "var(--font-mono, monospace)",
                    color:
                      input.length > 280 ? "#f87171" : "rgba(255,255,255,0.3)",
                    pointerEvents: "none",
                    flexShrink: 0,
                  }}
                >
                  {300 - input.length}
                </span>
              )}
            </div>

            <button
              onClick={() => sendMessage(input)}
              disabled={isStreaming || !input.trim()}
              aria-label="Send message"
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor:
                  isStreaming || !input.trim() ? "not-allowed" : "pointer",
                background:
                  isStreaming || !input.trim()
                    ? "rgba(255,255,255,0.04)"
                    : "linear-gradient(135deg, #7c3aed, #22d3ee)",
                color:
                  isStreaming || !input.trim()
                    ? "var(--text-muted, #5a5a7a)"
                    : "#fff",
                transition: "all 0.18s ease",
                flexShrink: 0,
              }}
            >
              {isStreaming ? (
                <span style={{ fontSize: 13, letterSpacing: 2 }}>···</span>
              ) : (
                <Send size={13} strokeWidth={2.5} />
              )}
            </button>
          </div>

          {/* ── Footer ──────────────────────────────────────────────────── */}
          <div
            style={{
              padding: "4px 14px 9px",
              textAlign: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.18)",
                fontFamily: "var(--font-mono, monospace)",
                letterSpacing: "0.04em",
              }}
            >
              Powered by Hypacode AI · Responses may be imperfect
            </span>
          </div>
        </div>
      )}

      {/* data attr for the mobile media query to target */}
      {isOpen && (
        <div
          data-ai-panel
          style={{
            position: "fixed",
            bottom: 96,
            right: 28,
            width: "min(400px, calc(100vw - 56px))",
            zIndex: 9996,
            pointerEvents: "none",
            height: 0,
          }}
        />
      )}

      {/* ── FAB ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          zIndex: 9997,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 10,
        }}
      >
        {/* First-visit tooltip */}
        {showTooltip && !isOpen && (
          <div
            role="tooltip"
            style={{
              background: "var(--bg-card, #0d0d1f)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 9,
              padding: "7px 13px",
              fontSize: 12,
              color: "var(--text-secondary, #9494b8)",
              fontFamily: "var(--font-body)",
              whiteSpace: "nowrap",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              animation: "aiWidgetTooltip 0.3s ease forwards",
              pointerEvents: "none",
            }}
          >
            Ask me anything about Sodiq ✦
          </div>
        )}

        {/* FAB — only shows when panel is closed */}
        {!isOpen && (
          <>
            {/* Hover tooltip */}
            {fabHovered && (
              <div
                role="tooltip"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 10px)",
                  right: 0,
                  background: "rgba(8,8,20,0.96)",
                  border: "1px solid rgba(34,211,238,0.2)",
                  borderRadius: 9,
                  padding: "7px 13px",
                  fontSize: 12,
                  color: "var(--text-secondary, #c4c4e0)",
                  fontFamily: "var(--font-body)",
                  whiteSpace: "nowrap",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)",
                  pointerEvents: "none",
                  animation: "aiWidgetTooltip 0.18s ease forwards",
                  // Arrow pointing down
                }}
              >
                Chat with Hypacode AI
                {/* Arrow */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: -5,
                    right: 20,
                    width: 9,
                    height: 9,
                    background: "rgba(8,8,20,0.96)",
                    border: "1px solid rgba(34,211,238,0.2)",
                    borderTop: "none",
                    borderLeft: "none",
                    transform: "rotate(45deg)",
                  }}
                />
              </div>
            )}

            <button
              onClick={() => {
                setIsOpen(true);
                setShowTooltip(false);
                setFabHovered(false);
              }}
              aria-label="Open Hypacode AI assistant"
              aria-expanded={false}
              aria-haspopup="dialog"
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                border: "1px solid rgba(34,211,238,0.3)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, #7c3aed 0%, rgba(34,211,238,0.9) 100%)",
                color: "#fff",
                transition: "transform 0.2s ease",
                animation: "aiWidgetGlow 2.8s ease-in-out infinite",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(1.08)";
                setFabHovered(true);
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(1)";
                setFabHovered(false);
              }}
            >
              <Sparkles size={22} strokeWidth={1.8} />
              {/* Unread badge */}
              {unreadCount > 0 && (
                <span
                  aria-label={`${unreadCount} unread message${unreadCount > 1 ? "s" : ""}`}
                  style={{
                    position: "absolute",
                    top: -3,
                    right: -3,
                    minWidth: 18,
                    height: 18,
                    borderRadius: 999,
                    background: "#ef4444",
                    border: "2px solid rgba(8,8,20,1)",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-mono, monospace)",
                    padding: "0 3px",
                    lineHeight: 1,
                  }}
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
          </>
        )}
      </div>
    </>
  );
}

// ── Shared style objects ───────────────────────────────────────────────────────

const iconBtnStyle: React.CSSProperties = {
  background: "none",
  border: "1px solid transparent",
  color: "var(--text-muted, #5a5a7a)",
  cursor: "pointer",
  width: 30,
  height: 30,
  borderRadius: 7,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "color 0.15s, border-color 0.15s, background 0.15s",
};

const iconBtnHoverIn = (e: React.MouseEvent) => {
  const el = e.currentTarget as HTMLElement;
  el.style.color = "var(--text-secondary, #9494b8)";
  el.style.borderColor = "rgba(255,255,255,0.08)";
  el.style.background = "rgba(255,255,255,0.04)";
};

const iconBtnHoverOut = (e: React.MouseEvent) => {
  const el = e.currentTarget as HTMLElement;
  el.style.color = "var(--text-muted, #5a5a7a)";
  el.style.borderColor = "transparent";
  el.style.background = "none";
};

const aiBubbleStyle: React.CSSProperties = {
  padding: "11px 14px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "12px 12px 12px 4px",
  fontSize: 13,
  color: "var(--text-primary, #e8e8ff)",
  lineHeight: 1.7,
  fontFamily: "var(--font-body)",
  width: "100%",
  boxSizing: "border-box" as const,
};

const userBubbleStyle: React.CSSProperties = {
  padding: "10px 14px",
  background: "rgba(124,58,237,0.18)",
  border: "1px solid rgba(124,58,237,0.3)",
  borderRadius: "12px 12px 4px 12px",
  fontSize: 13,
  color: "var(--text-primary, #e8e8ff)",
  lineHeight: 1.7,
  fontFamily: "var(--font-body)",
  wordBreak: "break-word" as const,
};

const pillStyle: React.CSSProperties = {
  padding: "6px 12px",
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 999,
  fontSize: 11.5,
  color: "var(--text-muted, #5a5a7a)",
  cursor: "pointer",
  transition: "border-color 0.18s, color 0.18s, background 0.18s",
  fontFamily: "var(--font-body)",
  lineHeight: 1.4,
};

const pillHoverIn = (e: React.MouseEvent) => {
  const el = e.currentTarget as HTMLElement;
  el.style.borderColor = "rgba(34,211,238,0.35)";
  el.style.color = "var(--text-primary)";
  el.style.background = "rgba(34,211,238,0.05)";
};

const pillHoverOut = (e: React.MouseEvent) => {
  const el = e.currentTarget as HTMLElement;
  el.style.borderColor = "rgba(255,255,255,0.08)";
  el.style.color = "var(--text-muted)";
  el.style.background = "transparent";
};
