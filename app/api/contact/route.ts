import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(key, { count: 1, resetAt: now + 3_600_000 });
    return false;
  }
  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}

const PROJECT_TYPE_LABELS: Record<string, string> = {
  "landing-page": "Landing Page",
  "business-website": "Business Website",
  "web-app": "Web Application",
  dashboard: "Dashboard",
  "mobile-app": "Mobile App",
  "api-integration": "API Integration",
  other: "Other",
};

export async function POST(req: NextRequest) {
  const ip = getIP(req);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, email, projectType, budget, message } = parsed.data;

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
    // Log but return success to avoid exposing config issues
    console.error("Email service not configured");
    return NextResponse.json({
      success: true,
      message: "Message received. We'll be in touch soon.",
    });
  }

  try {
    // Send notification to owner
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Hypacode Contact <hatykuxordik@gmail.com>",
        to: [process.env.CONTACT_EMAIL],
        subject: `New Contact: ${PROJECT_TYPE_LABELS[projectType] ?? projectType} from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project Type:</strong> ${PROJECT_TYPE_LABELS[projectType] ?? projectType}</p>
          ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    // Send confirmation to submitter
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Sodiq Atiku <hatykuxordik@gmail.com>",
        to: [email],
        subject: "Got your message — I'll be in touch shortly",
        html: `
          <p>Hi ${name},</p>
          <p>Thanks for reaching out. I've received your message about your ${PROJECT_TYPE_LABELS[projectType] ?? projectType} project and I'll get back to you within a few hours.</p>
          <p>In the meantime, you can <a href="https://cal.com/sodiq-atiku-ljdgnr/30min">book a 30-min call</a> if you'd prefer to talk directly.</p>
          <p>—Sodiq</p>
          <p><small>Hypacode · Lagos, Nigeria · hypacode.com</small></p>
        `,
      }),
    });
  } catch (err) {
    console.error("Email send failed:", err);
  }

  return NextResponse.json({
    success: true,
    message: "Message received. I'll be in touch within a few hours.",
  });
}
