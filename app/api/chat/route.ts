import { NextRequest, NextResponse } from "next/server";
import { chatMessageSchema } from "@/lib/validations";
import { matchOfflineKB, PORTFOLIO_SYSTEM_PROMPT } from "@/lib/chat-context";

// Simple in-memory rate limiting (production: use Vercel KV or Upstash)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (entry.count >= 20) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip = getIP(req);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please wait a minute." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = chatMessageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { messages } = parsed.data;

  // Try offline KB first (last user message)
  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
  if (lastUserMsg) {
    const offlineAnswer = matchOfflineKB(lastUserMsg.content);
    if (offlineAnswer) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          // Stream the offline answer character-by-character for visual effect
          const words = offlineAnswer.split(" ");
          let i = 0;
          function emit() {
            if (i >= words.length) {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              controller.close();
              return;
            }
            const chunk = (i > 0 ? " " : "") + words[i++];
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ delta: chunk })}\n\n`)
            );
            setTimeout(emit, 18);
          }
          emit();
        },
      });
      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }
  }

  // Check for API key
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "AI service not configured" },
      { status: 503 }
    );
  }

  const trimmed = messages.slice(-10);
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.ANTHROPIC_API_KEY!,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-haiku-4-5",
            max_tokens: 300,
            system: PORTFOLIO_SYSTEM_PROMPT,
            messages: trimmed,
            stream: true,
          }),
          signal: AbortSignal.timeout(30_000),
        });

        if (!response.ok || !response.body) {
          controller.enqueue(
            encoder.encode(`data: {"delta":"Sorry, I ran into an issue. Please try again."}\n\n`)
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
          return;
        }

        const reader = response.body.getReader();
        const dec = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = dec.decode(value);
          for (const line of chunk.split("\n")) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") continue;
            try {
              const event = JSON.parse(data);
              if (
                event.type === "content_block_delta" &&
                event.delta?.type === "text_delta" &&
                event.delta?.text
              ) {
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({ delta: event.delta.text })}\n\n`
                  )
                );
              }
            } catch {
              // ignore parse errors
            }
          }
        }
      } catch {
        controller.enqueue(
          encoder.encode(`data: {"delta":"Connection error. Please try again."}\n\n`)
        );
      } finally {
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
