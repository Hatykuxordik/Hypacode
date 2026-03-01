// lib/chat-context.ts
// ─────────────────────────────────────────────────────────────────────────────
// Offline KB with:
//  • Dynamic answer variants (same meaning, different phrasing each time)
//  • Contextual follow-up questions (only where conversationally appropriate)
//  • Conversation-aware continuation (handles "tell me more", "yes", "which one")
//  • Fuzzy typo matching
//  • Inline math + date/time resolution
// ─────────────────────────────────────────────────────────────────────────────

import {
  personalInfo,
  projects,
  experience,
  skills,
  certificates,
  aboutNarrative,
} from "@/lib/data";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type ChatMessage = { role: string; content: string };

type AnswerFn = () => string;

interface KBEntry {
  patterns: string[];
  /** Multiple phrasings — one is picked at random each time */
  answers: (string | AnswerFn)[];
  /**
   * Optional follow-up question appended after the answer.
   * One is picked at random. Omit for small-talk, math, date, goodbye entries.
   */
  followUps?: string[];
  /** Internal topic tag — used for continuation detection */
  topic?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────────────────

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Levenshtein + fuzzy matching ─────────────────────────────────────────────

function levenshtein(a: string, b: string): number {
  const m = a.length,
    n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function fuzzyIncludes(query: string, pattern: string): boolean {
  if (query.includes(pattern)) return true;
  const words = query.split(/\s+/);
  for (const word of words) {
    if (word.length >= 4 && pattern.length >= 4) {
      const maxDist = Math.max(1, Math.floor(pattern.length * 0.25));
      if (levenshtein(word, pattern) <= maxDist) return true;
    }
  }
  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Context-aware continuation detection
// ─────────────────────────────────────────────────────────────────────────────

const CONTINUATION_TRIGGERS = [
  "tell me more",
  "more details",
  "more info",
  "elaborate",
  "expand",
  "yes please",
  "yes",
  "sure",
  "okay",
  "go on",
  "go ahead",
  "continue",
  "what else",
  "anything else",
  "what about",
  "how about",
  "and then",
  "sounds good",
  "interesting",
  "that sounds",
  "i see",
  "got it",
  "ok",
];

function isContinuation(input: string): boolean {
  const q = input.toLowerCase().trim();
  const wordCount = q.split(/\s+/).length;
  // Only treat short messages (≤ 6 words) as continuations
  return wordCount <= 6 && CONTINUATION_TRIGGERS.some((t) => q.includes(t));
}

function detectLastTopic(history: ChatMessage[]): string | null {
  const lastAI = [...history].reverse().find((m) => m.role === "assistant");
  if (!lastAI) return null;
  const c = lastAI.content.toLowerCase();

  if (
    c.includes("villeto") &&
    (c.includes("card") || c.includes("dashboard") || c.includes("spend"))
  )
    return "villeto-deep";
  if (c.includes("villeto")) return "villeto";
  if (c.includes("fastpay")) return "fastpay";
  if (c.includes("odm") || c.includes("groove hotel")) return "hotel";
  if (c.includes("global finder")) return "globalfinder";
  if (c.includes("taskify")) return "taskify";
  if (c.includes("gamesnap")) return "gamesnap";
  if (
    c.includes("landing page") ||
    c.includes("$350") ||
    c.includes("saas dashboard")
  )
    return "pricing";
  if (
    c.includes("core stack") ||
    (c.includes("react") && c.includes("next.js") && c.includes("typescript"))
  )
    return "skills";
  if (c.includes("available for new freelance") || c.includes("q2 2026"))
    return "availability";
  if (
    c.includes("production work since 2023") ||
    (c.includes("biochemistry") && c.includes("2019"))
  )
    return "experience";
  if (c.includes("hypacode") || c.includes("specialising in")) return "about";
  if (
    c.includes("email:") ||
    c.includes("30-minute call") ||
    c.includes("book a call")
  )
    return "contact";
  if (c.includes("discovery call") || c.includes("signed agreement"))
    return "process";
  if (c.includes("currently learning") || c.includes("also familiar"))
    return "skills";

  return null;
}

/** Expanded answers when user says "tell me more" after a topic */
type ContinuationResponse = string | (() => string);

const CONTINUATION_EXPANSIONS: Record<string, ContinuationResponse[]> = {
  villeto: [
    `Villeto's the most complex thing ${personalInfo.name} has built to date. The dashboard handles virtual card operations, real-time transaction feeds, multi-role permissions (admin vs member vs viewer), and expense analytics — all in a single Next.js app.\n\nThe trickiest part was optimistic UI updates: when a user freezes a card, the state has to reflect that instantly before the API confirms it, then gracefully rollback if it fails. He built a custom hook for that.\n\n[Full case study →](/projects/villeto)`,
    `Diving deeper into Villeto — it's a fintech spend management platform in production with live business clients. ${personalInfo.name} owns the entire frontend: onboarding, the main dashboard, card operations, transaction history, and reporting.\n\nStack-wise: Next.js with App Router, TypeScript strict mode, Zustand for global state (chosen over Redux for its flat store model), and React Query for server state. Shadcn/ui for the component layer.\n\n[Case study →](/projects/villeto)`,
  ],
  fastpay: [
    `Fastpay goes deeper than most banking demos. It has real Supabase auth with token refresh handling, row-level security policies so each user only ever sees their own data, real-time transaction sync across browser tabs using Supabase's Postgres realtime subscriptions, and a Recharts analytics layer.\n\nThe PWA side uses a service worker for asset caching and background sync — so if you go offline after loading, it still works.\n\n[Live →](https://fastpayy.vercel.app/) · [GitHub →](https://github.com/hatykuxordik/fastpay)`,
    `What makes Fastpay interesting technically: the transaction engine uses Supabase RLS policies designed from scratch — proper production-level security in a demo app. The Recharts analytics handles edge cases like empty states and loading skeletons without layout shift. PWA Lighthouse score is 100.\n\n[Try it live →](https://fastpayy.vercel.app/)`,
  ],
  hotel: [
    `The ODM Groove Hotel project had an interesting constraint: most Lagos hotel bookings happen over WhatsApp, not web forms. So the booking flow is conversational — guests click a button, it opens WhatsApp with a pre-filled message including room, dates, and price already calculated.\n\nThe AI concierge handles the top ~80% of guest questions automatically. The animation system uses Framer Motion scroll-linked effects — built without a lightbox library, saving ~45kB from the bundle.\n\n[Live →](https://odmgroove.vercel.app/)`,
  ],
  globalfinder: [
    `Global Finder's interesting from an architecture standpoint. It pulls from multiple public APIs (geography, weather, currency, points of interest), normalises different response shapes into one consistent data model, and handles each API's error states and rate limits independently.\n\nAll filters sync to URL params — so every search result is shareable and bookmarkable. WCAG AA compliant throughout.\n\n[Live →](https://global-finder.vercel.app/)`,
  ],
  pricing: [
    `To give more context on the pricing — those are starting points, not quotes. The actual number depends on design complexity, number of integrations, whether there's existing design or if ${personalInfo.name} is working from scratch, and timeline.\n\nThe add-ons stack up fast: a web app with auth, payments, and an admin dashboard would land closer to $2,500–$3,000 rather than $1,500. [The estimate tool →](/estimate) gives a more precise number.\n\nWhat kind of project are you thinking about?`,
    `The ranges are conservative — scope is what really drives the final number. A "simple" landing page with heavy animations and a CMS could hit $800; a "basic" web app with auth + integrations could hit $2,500+.\n\n[Use the estimate tool →](/estimate) — it walks through the key variables and gives a real number. Takes about 2 minutes.`,
  ],
  skills: [
    `Going deeper on the stack — React and Next.js are the foundation (3 and 2 years respectively, both at expert level). TypeScript strict mode across everything. Tailwind CSS v4 for styling.\n\nFor state: Zustand for global (used heavily in Villeto), React Query for server state. Supabase for backend — auth, real-time, database. Framer Motion for animations.\n\nFamiliar with but less frequently used: GSAP, Redux Toolkit, Stripe, Google Maps API, Recharts, React Query.\n\n[Full breakdown →](/skills)`,
    `The core stack in more detail:\n\n**React** (expert, 3yr) — hooks, perf patterns, complex state\n**Next.js App Router** (expert, 2yr) — RSC, ISR, SSG\n**TypeScript** (expert, 2yr) — strict mode, generics, utility types\n**Tailwind CSS** (expert, 3yr) — design systems, custom tokens\n**Zustand** (advanced, 1yr) — global state without Redux\n**Supabase** (advanced, 2yr) — auth, realtime, RLS\n**Motion** (advanced, 2yr) — production animations\n\n[Full skills page →](/skills)`,
  ],
  availability: [
    `More on availability — ${personalInfo.name} is currently full-time at Villeto (started January 2026), so freelance capacity is limited during that period. From Q2 2026, he opens up properly for new client projects.\n\nFor timeline: response time is ${personalInfo.responseTime} during Lagos business hours (WAT, UTC+1). Discovery calls can be booked directly at [cal.com →](${personalInfo.calBooking30}).\n\nDo you have a rough project type or timeline in mind?`,
  ],
  experience: [
    `More on the background — ${personalInfo.name} graduated from OAU with a Biochemistry degree in 2024, but had been building software seriously since 2022. He went fully professional in 2023 with his first client projects.\n\nFreelance work spanned hospitality (ODM Groove Hotel), utilities (Global Finder, Taskify), and fintech (Fastpay). Then Villeto brought him in full-time in January 2026.\n\nThe science background isn't just a fun fact — systems thinking, precision, and handling complex interdependencies all transferred directly.\n\n[Full story →](/about)`,
  ],
  about: [
    `A bit more about ${personalInfo.name} — he describes himself as "methodical by training, curious by nature." The Biochemistry degree gave him a framework for thinking about complex systems with real consequences, which maps directly to fintech and B2B software.\n\nOutside the code, he's reading Atomic Habits, slowly learning Rust, and a bit obsessed with making interfaces feel faster than they technically are.\n\n"${aboutNarrative.outsideTheCode.perspective}"\n\n[Full story →](/about)`,
  ],
  contact: [
    `The fastest way is the [contact form →](/contact) — ${personalInfo.name} gets notified instantly and responds within ${personalInfo.responseTime}. If you'd rather talk first, grab a [30-minute call →](${personalInfo.calBooking30}) or a quick [15-minute intro →](${personalInfo.calBooking15}).\n\nEmail directly works too: ${personalInfo.displayEmail}\n\nWhat's the project about?`,
  ],
  process: [
    `More on the process — the signed agreement step is non-negotiable, but it's a simple document that protects both sides: scope, timeline, payment schedule. No surprises.\n\nFor ongoing projects, ${personalInfo.name} does weekly or bi-weekly check-ins (async or video, your preference). Revisions are built into the timeline, not billed separately — as long as they're within the original scope.\n\n[Get an estimate →](/estimate) to get the ball rolling.`,
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Offline Knowledge Base
// ─────────────────────────────────────────────────────────────────────────────

const coreSkillNames = skills.core.map((s) => s.name).join(", ");
const liveProjects = projects.filter((p) => p.status === "Live");

export const OFFLINE_KB: KBEntry[] = [
  // ── Greetings ────────────────────────────────────────────────────────────────
  {
    patterns: [
      "hello",
      "hi",
      "hey",
      "hiya",
      "howdy",
      "what's up",
      "wassup",
      "sup",
    ],
    answers: [
      `Hey there! 👋 I'm Sodiq's AI assistant — ask me anything about his work, stack, pricing, or availability.`,
      `Hi! 👋 I'm Hypacode AI — I know everything about Sodiq's work and can answer questions about his stack, projects, pricing, or how to get in touch.`,
      `Hey! Good to see you here. I'm Sodiq's AI assistant — what would you like to know?`,
    ],
    // No follow-up — let them navigate naturally
  },

  {
    patterns: [
      "how are you",
      "how you doing",
      "how are you doing",
      "how do you do",
      "you good",
      "you okay",
    ],
    answers: [
      `Doing great, thanks for asking! 😊 Ready to help. What would you like to know about Sodiq's work?`,
      `All good on my end! 😄 What can I help you with today?`,
      `Fantastic, thank you! What's on your mind?`,
    ],
  },

  {
    patterns: ["good morning", "good afternoon", "good evening", "good night"],
    answers: [
      `Same to you! ☀️ Hope your day is going well. Ask me anything about Sodiq — projects, stack, availability, or pricing.`,
      `And to you! 😊 What would you like to know?`,
    ],
  },

  {
    patterns: [
      "thank you",
      "thanks",
      "thank u",
      "cheers",
      "appreciate it",
      "appreciated",
    ],
    answers: [
      `You're welcome! 😊 Let me know if there's anything else you'd like to know.`,
      `Happy to help! Anything else on your mind?`,
      `Of course! Feel free to ask anything else.`,
    ],
  },

  {
    patterns: [
      "who are you",
      "what are you",
      "are you human",
      "are you an ai",
      "are you a bot",
      "are you real",
    ],
    answers: [
      `I'm Hypacode AI — an AI assistant built into Sodiq Atiku's portfolio. Not human, but I know everything about his work, projects, skills, pricing, and availability. What would you like to know?`,
      `I'm an AI assistant, not a human — but I'm trained specifically on Sodiq's work, so I can answer most questions you'd normally ask him directly. What's on your mind?`,
    ],
    followUps: [
      `Is there something specific about Sodiq's work you were hoping to find out?`,
      `What brought you to the portfolio today?`,
    ],
  },

  {
    patterns: ["what can you do", "what do you know", "help", "what can i ask"],
    answers: [
      `I can answer questions about:\n\n- **Sodiq's projects** — Villeto, Fastpay, ODM Groove Hotel, and more\n- **His stack** — React, Next.js, TypeScript, Tailwind, Supabase...\n- **Pricing** — rough ballparks by project type\n- **Availability** — when he's free and how to book\n- **Background** — career, experience, education\n- **Contact** — email, booking links, CV download\n\nBasic things too — date, time, math. Just ask.`,
    ],
    followUps: [
      `Where would you like to start?`,
      `What's most relevant to you right now?`,
    ],
  },

  {
    patterns: [
      "you're great",
      "you're awesome",
      "you're amazing",
      "you're helpful",
      "great job",
      "well done",
      "nice work",
      "love this",
      "this is cool",
      "this is great",
    ],
    answers: [
      `That means a lot — thank you! 😊 Anything else you'd like to know?`,
      `Glad I could help! 😄 What else can I tell you?`,
      `Thank you! That's kind of you to say. Is there anything else on your mind?`,
    ],
  },

  {
    patterns: [
      "bye",
      "goodbye",
      "see you",
      "see ya",
      "take care",
      "talk later",
      "ciao",
      "later",
    ],
    answers: [
      `Take care! 👋 If you ever want to get a project started or learn more, come back anytime.\n\n[Contact →](/contact) · [Book a call →](${personalInfo.calBooking30})`,
      `Goodbye! 👋 Feel free to come back whenever you're ready to start a project.\n\n[Book a call →](${personalInfo.calBooking30})`,
    ],
  },

  {
    patterns: [
      "interesting",
      "wow",
      "impressive",
      "that's good",
      "sounds good",
      "cool",
    ],
    answers: [
      `Glad you think so! 😊 Anything else you'd like to dig into?`,
      `Right? 😄 There's more where that came from — what else would you like to know?`,
      `Happy to go deeper on anything. What would you like to know more about?`,
    ],
  },

  // ── Date / time ───────────────────────────────────────────────────────────────
  {
    patterns: [
      "what day is it",
      "what day is today",
      "today's date",
      "what is today's date",
      "current date",
      "what date is it",
    ],
    answers: [
      () => {
        const now = new Date();
        return `Today is **${now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}**.`;
      },
    ],
    // No follow-up for factual queries
  },

  {
    patterns: [
      "what time is it",
      "current time",
      "what's the time",
      "time now",
    ],
    answers: [
      () => {
        const now = new Date();
        const lagosTime = now.toLocaleTimeString("en-GB", {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          minute: "2-digit",
        });
        const userTime = now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        });
        return `It's **${userTime}** on your device.\n\nIn Lagos (where Sodiq is based), it's **${lagosTime}** (WAT, UTC+1).`;
      },
    ],
  },

  {
    patterns: ["what year is it", "current year"],
    answers: [() => `It's **${new Date().getFullYear()}**.`],
  },

  {
    patterns: ["what month is it", "current month"],
    answers: [
      () =>
        `It's **${new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}**.`,
    ],
  },

  {
    patterns: ["days of the week", "days in a week", "how many days in"],
    answers: [
      `There are **7 days** in a week: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.`,
    ],
  },

  // ── Availability ─────────────────────────────────────────────────────────────
  {
    patterns: [
      "available",
      "availability",
      "free",
      "hire",
      "open to work",
      "new project",
      "take on",
      "booking",
    ],
    topic: "availability",
    answers: [
      `${personalInfo.name} is **${personalInfo.availability.toLowerCase()}** — taking on new freelance projects from Q2 2026. Response time is ${personalInfo.responseTime} during Lagos business hours.\n\n[Get a tailored estimate →](/estimate) · [Book a 30-min call →](${personalInfo.calBooking30})`,
      `Good news — ${personalInfo.name} is open to new freelance work starting Q2 2026. He typically responds ${personalInfo.responseTime} during Lagos hours.\n\n[Book a call →](${personalInfo.calBooking30}) · [Get an estimate →](/estimate)`,
      `${personalInfo.name} is currently available for new projects from Q2 2026. If you have something in mind, the best first step is a quick call or an estimate.\n\n[30-minute call →](${personalInfo.calBooking30}) · [Estimate tool →](/estimate)`,
    ],
    followUps: [
      `Do you have a project in mind already?`,
      `What kind of project are you thinking about?`,
      `Is there a timeline or deadline you're working toward?`,
    ],
  },

  // ── Pricing ───────────────────────────────────────────────────────────────────
  {
    patterns: [
      "price",
      "cost",
      "charge",
      "rate",
      "how much",
      "pricing",
      "quote",
      "budget",
      "pay",
      "fee",
    ],
    topic: "pricing",
    answers: [
      `Here are rough ballparks by project type:\n\n- **Landing page** — $350–$600 (1–2 weeks)\n- **Business website** — $800–$1,500 (2–3 weeks)\n- **Web app / SaaS dashboard** — $1,500–$4,000 (3–8 weeks)\n- **Mobile app (React Native / PWA)** — $6,000–$15,000 (8–16 weeks)\n\n**Common add-ons:** Auth +$300 · Payments +$500 · Admin dashboard +$400 · API integration +$200 · CMS +$250 · Maintenance +$200/mo\n\n[Get a proper estimate →](/estimate)`,
      `Pricing depends on scope, but here's a starting point:\n\n- **Landing page:** $350–$600\n- **Business site:** $800–$1,500\n- **Web app or dashboard:** $1,500–$4,000\n- **Mobile app:** $6,000–$15,000\n\nThose are ranges, not quotes — actual cost depends on features and timeline. [The estimate tool →](/estimate) gives a more accurate number in about 2 minutes.`,
    ],
    followUps: [
      `What kind of project are you scoping out?`,
      `Is there a particular project type you had in mind?`,
      `Do you want me to walk through what affects the final price?`,
    ],
  },

  // ── Skills overview ────────────────────────────────────────────────────────────
  {
    patterns: [
      "skill",
      "skills",
      "stack",
      "technology",
      "technologies",
      "tech",
      "tools",
      "built with",
      "framework",
      "expertise",
      "proficient",
      "know",
      "programming",
    ],
    topic: "skills",
    answers: [
      `**Core stack:** ${coreSkillNames}.\n\n**Also works with:** ${skills.alsoFamiliar.join(", ")}.\n\n**Currently learning:** ${skills.currentlyLearning.map((l) => l.topic).join(", ")}.\n\n[Full breakdown →](/skills)`,
      `${personalInfo.name}'s primary tools: ${coreSkillNames}.\n\nHe's also familiar with ${skills.alsoFamiliar.slice(0, 7).join(", ")}, and more.\n\n[Full skills page →](/skills)`,
    ],
    followUps: [
      `Is there a specific technology you'd like to know more about?`,
      `Any particular part of the stack you're curious about?`,
      `Are you asking because you have a project that uses a specific tech?`,
    ],
  },

  // ── React ──────────────────────────────────────────────────────────────────────
  {
    patterns: ["react", "hooks", "component architecture"],
    topic: "skills",
    answers: [
      `React is ${personalInfo.name}'s primary tool — 3 years, expert level. Component architecture, custom hooks, performance patterns (memoisation, code-splitting), and complex state management for production apps.\n\nSeen in: [Villeto](/projects/villeto), [Fastpay](/projects/fastpay), and every other project.\n\n[Full skills →](/skills)`,
      `React is where ${personalInfo.name} is most at home. 3 years of production use — he works across the full spectrum from simple hooks to complex render optimisation and custom hook patterns.\n\n[See it in action →](/projects/villeto)`,
    ],
    followUps: [
      `Are you building something in React? Happy to tell you how he'd approach it.`,
      `Want to know about any other part of the stack?`,
    ],
  },

  // ── Next.js ────────────────────────────────────────────────────────────────────
  {
    patterns: ["next", "nextjs", "app router", "server component", "rsc"],
    topic: "skills",
    answers: [
      `Next.js (App Router) is the primary framework — 2 years in production. RSC, ISR, SSG, API routes, Partial Prerendering. This portfolio is built with it.\n\nSeen in: [ODM Groove Hotel](/projects/odm-groove-hotel), [Villeto](/projects/villeto).`,
      `${personalInfo.name} uses Next.js (App Router) for everything — RSC, ISR, SSG, and server actions. 2 years of production experience. This portfolio itself runs on it.\n\n[See the work →](/projects)`,
    ],
    followUps: [
      `Are you building a Next.js project? I can tell you more about how he'd approach it.`,
      `Want to know about another part of the stack?`,
    ],
  },

  // ── TypeScript ─────────────────────────────────────────────────────────────────
  {
    patterns: ["typescript", "type safety", "types"],
    topic: "skills",
    answers: [
      `TypeScript strict mode is a non-negotiable across all of ${personalInfo.name}'s work — advanced generics, utility types, proper type contracts. He treats it as a quality baseline, not overhead.\n\n[Full skills →](/skills)`,
      `Everything ${personalInfo.name} builds is TypeScript first, strict mode. Not just for type safety but for better DX — proper autocomplete, safer refactors, and catching bugs before runtime.\n\n[Full skills →](/skills)`,
    ],
    followUps: [`Curious about anything else in the stack?`],
  },

  // ── Tailwind ───────────────────────────────────────────────────────────────────
  {
    patterns: ["tailwind", "styling", "design system", "css"],
    topic: "skills",
    answers: [
      `Tailwind CSS v4 combined with CSS Custom Properties is the styling foundation. He uses design tokens via CSS variables, custom utility patterns, and zero runtime overhead.\n\n[Full skills →](/skills)`,
    ],
    followUps: [`Want to know about how he handles animations or motion?`],
  },

  // ── Supabase ───────────────────────────────────────────────────────────────────
  {
    patterns: [
      "supabase",
      "database",
      "realtime",
      "postgresql",
      "postgres",
      "auth",
    ],
    topic: "skills",
    answers: [
      `${personalInfo.name} uses Supabase for auth (including token refresh edge cases), real-time subscriptions, row-level security policies, and PostgreSQL queries — used in production on [Fastpay](/projects/fastpay) and [Taskify](/projects/taskify).`,
      `Supabase is the database and auth layer of choice — RLS policies, real-time Postgres subscriptions, and full auth flows including session management. Production use in two projects.\n\n[Fastpay →](/projects/fastpay) · [Taskify →](/projects/taskify)`,
    ],
    followUps: [`Want to know how it was used in a specific project?`],
  },

  // ── All projects overview ──────────────────────────────────────────────────────
  {
    patterns: [
      "projects",
      "portfolio",
      "work",
      "built",
      "examples",
      "case study",
      "show me",
      "what have you",
    ],
    topic: "projects",
    answers: [
      `${personalInfo.name} has shipped **${projects.length} projects**:\n\n${projects.map((p) => `- **[${p.name}](/projects/${p.slug})** — ${p.tagline} (${p.status})`).join("\n")}\n\n${liveProjects.length > 0 ? `Live now: ${liveProjects.map((p) => `[${p.name}](${p.liveUrl})`).join(" · ")}.\n\n` : ""}[See all work →](/projects)`,
      `Here's what ${personalInfo.name} has built:\n\n${projects.map((p) => `- **[${p.name}](/projects/${p.slug})** — ${p.tagline}`).join("\n")}\n\n[Full portfolio →](/projects)`,
    ],
    followUps: [
      `Want me to go deeper on any of these?`,
      `Which one is most relevant to what you're building?`,
      `Any of these catch your eye? I can tell you a lot more about any of them.`,
    ],
  },

  // ── Villeto ────────────────────────────────────────────────────────────────────
  {
    patterns: [
      "villeto",
      "spend management",
      "current job",
      "current role",
      "fintech dashboard",
    ],
    topic: "villeto",
    answers: [
      `Villeto is ${personalInfo.name}'s current full-time role — Frontend Engineer at a Lagos fintech startup building spend management tools for businesses.\n\n**What he owns:** Virtual card management, real-time transaction tracking, expense analytics, role-based access control, onboarding flows.\n\n**Stack:** Next.js, TypeScript, Zustand, React Query, Tailwind, Shadcn/ui.\n\nIn production with live business users since January 2026.\n\n[Case study →](/projects/villeto)`,
      `${personalInfo.name} joined Villeto full-time in January 2026 as Frontend Engineer. He built the entire dashboard from scratch — cards, transactions, team permissions, analytics, onboarding.\n\nIt's in production with real business users. Stack: Next.js, TypeScript, Zustand, React Query.\n\n[Case study →](/projects/villeto)`,
    ],
    followUps: [
      `Want to know more about the technical side of how it was built?`,
      `Curious about any particular feature — like the card operations or transaction handling?`,
    ],
  },

  // ── Fastpay ────────────────────────────────────────────────────────────────────
  {
    patterns: ["fastpay", "banking simulator", "banking app", "digital bank"],
    topic: "fastpay",
    answers: [
      `Fastpay is a full-featured digital banking simulation — real auth, real-time cross-device sync via Supabase, Recharts analytics, and full PWA support.\n\n**Stack:** Next.js, TypeScript, Supabase, Recharts, Tailwind CSS.\n\n[Live demo →](https://fastpayy.vercel.app/) · [GitHub →](https://github.com/hatykuxordik/fastpay)`,
      `${personalInfo.name} built Fastpay as a production-quality fintech demo — real Supabase auth, RLS policies, real-time transaction sync, and a full PWA install. Lighthouse PWA score: 100.\n\n[Try it →](https://fastpayy.vercel.app/)`,
    ],
    followUps: [
      `Want me to walk through the technical architecture?`,
      `Curious about how the real-time sync works?`,
    ],
  },

  // ── ODM Groove Hotel ───────────────────────────────────────────────────────────
  {
    patterns: ["odm", "groove hotel", "hotel", "hospitality", "concierge"],
    topic: "hotel",
    answers: [
      `ODM Groove Hotel is a complete hospitality platform with an AI concierge and WhatsApp booking integration — built to drive direct reservations and cut third-party commissions.\n\n**Stack:** Next.js, TypeScript, Tailwind CSS, Framer Motion, WhatsApp API.\n\nDrove measurable direct bookings from the first month.\n\n[Live →](https://odmgroove.vercel.app/) · [Case study →](/projects/odm-groove-hotel)`,
      `The ODM Groove Hotel site is one of ${personalInfo.name}'s more complete projects — AI concierge for guest questions, WhatsApp booking integration (the standard in Lagos), and a Framer Motion animation system that cuts 45kB vs a third-party lightbox.\n\n[Live site →](https://odmgroove.vercel.app/)`,
    ],
    followUps: [
      `Want to know more about how the WhatsApp booking integration works?`,
      `Curious about the AI concierge or the animation system?`,
    ],
  },

  // ── Global Finder ──────────────────────────────────────────────────────────────
  {
    patterns: [
      "global finder",
      "country explorer",
      "geography",
      "wcag",
      "accessibility",
    ],
    topic: "globalfinder",
    answers: [
      `Global Finder aggregates data from multiple public APIs — geography, weather, currency, points of interest — into one WCAG AA compliant, filterable interface.\n\n**Stack:** React, TypeScript, Framer Motion, REST APIs, Tailwind CSS.\n\n[Live →](https://global-finder.vercel.app/) · [GitHub →](https://github.com/Hatykuxordik/global-finder)`,
    ],
    followUps: [
      `Want to know how the multi-API architecture works?`,
      `Curious about how the URL-synced filter state was implemented?`,
    ],
  },

  // ── Taskify ────────────────────────────────────────────────────────────────────
  {
    patterns: ["taskify", "task manager", "pwa", "offline"],
    topic: "taskify",
    answers: [
      `Taskify is a PWA task manager with Supabase auth, real-time cross-device sync, and offline support via IndexedDB background sync. Lighthouse PWA score: 100.\n\n**Stack:** React, TypeScript, Supabase, Tailwind CSS.\n\n[Live →](https://hypacode-taskify.vercel.app/) · [GitHub →](https://github.com/Hatykuxordik/taskify)`,
    ],
    followUps: [`Want to know how the offline sync queue works?`],
  },

  // ── GameSnap ───────────────────────────────────────────────────────────────────
  {
    patterns: ["gamesnap", "sports platform", "football scores", "live scores"],
    topic: "gamesnap",
    answers: [
      `GameSnap is a live sports data platform — real-time scores, league standings, and match analytics via API-Football. Still in progress, but the adaptive polling layer is live.\n\n**Stack:** React, TypeScript, React Query, API-Football, Tailwind CSS.\n\n[GitHub →](https://github.com/hatykuxordik/gamesnap)`,
    ],
    followUps: [`Want to hear about the adaptive polling strategy?`],
  },

  // ── Experience ─────────────────────────────────────────────────────────────────
  {
    patterns: [
      "experience",
      "background",
      "career",
      "history",
      "how long",
      "worked",
      "employment",
    ],
    topic: "experience",
    answers: [
      `${personalInfo.name} has been writing code since 2019 — production work since 2023.\n\n**${experience[0].role} at ${experience[0].company}** (${experience[0].period})\n${experience[0].description}\n\n**Freelance ${experience[1].role}** (${experience[1].period})\n${experience[1].description}\n\nBackground: Biochemistry degree, OAU (2019–2024).\n\n[Full story →](/about)`,
      `Started coding in 2019 out of curiosity during Biochemistry studies. First production work in 2023 — freelance projects across hospitality, fintech, and utilities. Joined Villeto full-time in January 2026.\n\n[Full career story →](/about)`,
    ],
    followUps: [
      `Want to hear more about a specific project from his freelance period?`,
      `Curious about how the Biochemistry background influenced his approach to engineering?`,
    ],
  },

  // ── About / who ────────────────────────────────────────────────────────────────
  {
    patterns: [
      "who",
      "about",
      "story",
      "tell me about",
      "describe yourself",
      "sodiq",
      "hypacode",
    ],
    topic: "about",
    answers: [
      `${personalInfo.name} (${personalInfo.brandName}) is a ${personalInfo.title} based in ${personalInfo.location}, specialising in ${personalInfo.niche}.\n\n"${aboutNarrative.pullQuote}"\n\nSelf-taught since 2019, Biochemistry graduate (OAU 2024), production software since 2023. Currently ${personalInfo.currentRole}.\n\n[Full story →](/about)`,
      `${personalInfo.name} is a ${personalInfo.title} from ${personalInfo.location}. He specialises in ${personalInfo.niche} — products where performance and precision actually matter.\n\nSelf-taught, started in 2019 during his Biochemistry degree. By 2023 he was shipping production software. Currently full-time at Villeto.\n\n[About page →](/about)`,
    ],
    followUps: [
      `Want to know more about his technical work or how to get in touch?`,
      `Anything specific you'd like to know — his process, his stack, or his availability?`,
    ],
  },

  // ── Values ─────────────────────────────────────────────────────────────────────
  {
    patterns: [
      "values",
      "philosophy",
      "principles",
      "mindset",
      "clean code",
      "approach",
    ],
    topic: "about",
    answers: [
      `${personalInfo.name}'s engineering values:\n\n${aboutNarrative.values.map((v) => `- **${v.title}** — ${v.description}`).join("\n")}\n\n[Full story →](/about)`,
    ],
    followUps: [`Want to know how these show up in his actual projects?`],
  },

  // ── Process ────────────────────────────────────────────────────────────────────
  {
    patterns: [
      "process",
      "workflow",
      "steps",
      "how do you work",
      "what to expect",
      "how it works",
    ],
    topic: "process",
    answers: [
      `How a typical project works:\n\n1. **Discovery call** — understand scope, goals, timeline\n2. **Proposal + estimate** — clear deliverables, fixed price\n3. **Signed agreement** — no work starts without it\n4. **Build + feedback loops** — regular check-ins, no surprises\n5. **Handoff + support** — clean code, docs, optional maintenance\n\n[Get an estimate →](/estimate) · [Book a call →](${personalInfo.calBooking30})`,
      `${personalInfo.name}'s process is straightforward: discovery call → proposal with fixed price → signed agreement → build with regular check-ins → handoff with documentation.\n\nNo surprises on scope or billing. [Book a discovery call →](${personalInfo.calBooking30})`,
    ],
    followUps: [
      `Ready to get the ball rolling? I can point you to the estimate tool.`,
      `Any part of the process you'd like me to expand on?`,
    ],
  },

  // ── Contact ────────────────────────────────────────────────────────────────────
  {
    patterns: [
      "contact",
      "reach",
      "email",
      "message",
      "talk",
      "get in touch",
      "respond",
    ],
    topic: "contact",
    answers: [
      `Best ways to reach ${personalInfo.name}:\n\n- **Email:** ${personalInfo.displayEmail}\n- **Response time:** ${personalInfo.responseTime} during Lagos business hours\n\n[Contact form →](/contact) · [30-min call →](${personalInfo.calBooking30}) · [15-min intro →](${personalInfo.calBooking15})`,
      `${personalInfo.name} is reachable at ${personalInfo.displayEmail} — usually responds ${personalInfo.responseTime}.\n\nPrefer a call? [Book 30 minutes →](${personalInfo.calBooking30}) or a [quick 15-min intro →](${personalInfo.calBooking15}).\n\n[Contact form →](/contact)`,
    ],
    followUps: [
      `Is there a specific project you'd like to discuss with him?`,
      `What's the best way for me to help you move forward?`,
    ],
  },

  // ── Social ─────────────────────────────────────────────────────────────────────
  {
    patterns: [
      "twitter",
      "social media",
      "github",
      "linkedin",
      "follow",
      "find you online",
    ],
    answers: [
      `Find ${personalInfo.name} online:\n\n- **X (Twitter):** [@Hypacode](${personalInfo.twitter})\n- **GitHub:** [hatykuxordik](${personalInfo.github})\n- **LinkedIn:** [hatykuxordik](${personalInfo.linkedin})`,
      `${personalInfo.name} is most active on X ([@Hypacode](${personalInfo.twitter})). Also on [GitHub](${personalInfo.github}) and [LinkedIn](${personalInfo.linkedin}).`,
    ],
  },

  // ── Location ───────────────────────────────────────────────────────────────────
  {
    patterns: [
      "location",
      "where are you",
      "lagos",
      "nigeria",
      "timezone",
      "remote",
      "utc",
    ],
    answers: [
      `${personalInfo.name} is based in ${personalInfo.location} (${personalInfo.timezone}). He works with clients globally — async-first, with overlap-friendly calls for European and US timezones.`,
      `Lagos, Nigeria — ${personalInfo.timezone} (UTC+1). ${personalInfo.name} works fully remote with clients across multiple time zones. Async by default, video calls on request.`,
    ],
    followUps: [`Does timezone overlap matter for your project?`],
  },

  // ── Resume ─────────────────────────────────────────────────────────────────────
  {
    patterns: ["resume", "curriculum vitae", "download cv", "pdf"],
    answers: [
      `Download the CV here:\n\n[Sodiq Atiku — Frontend Engineer CV →](${personalInfo.resumeUrl})`,
      `Here's the direct download link:\n\n[Frontend Engineer CV (PDF) →](${personalInfo.resumeUrl})`,
    ],
  },

  // ── Education / certificates ───────────────────────────────────────────────────
  {
    patterns: [
      "certificate",
      "certification",
      "course",
      "udemy",
      "self-taught",
      "education",
      "degree",
      "university",
      "school",
    ],
    answers: [
      `${personalInfo.name} is self-taught with verified Udemy certifications:\n\n${certificates.map((c) => `- [${c.n}](${c.url}) — ${c.y}`).join("\n")}\n\nAlso holds a Biochemistry degree from OAU (2019–2024). Started coding in 2019, in production since 2023.`,
    ],
    followUps: [
      `Want to know more about how he transitioned from Biochemistry to software?`,
    ],
  },

  // ── Currently building ─────────────────────────────────────────────────────────
  {
    patterns: [
      "currently building",
      "working on right now",
      "in progress",
      "latest project",
    ],
    topic: "projects",
    answers: [
      `Right now ${personalInfo.name} is:\n\n- **Full-time:** Frontend Engineer at [Villeto](/projects/villeto) — spend management dashboard\n- **In progress:** [Fastpay](https://fastpayy.vercel.app/) — digital banking simulator\n- **In progress:** [GameSnap](https://github.com/hatykuxordik/gamesnap) — live sports data platform`,
      `${personalInfo.name}'s currently juggling three things: Villeto full-time, Fastpay as a side project in fintech, and GameSnap — a live sports data platform.\n\n[Fastpay →](https://fastpayy.vercel.app/) · [GameSnap →](https://github.com/hatykuxordik/gamesnap)`,
    ],
    followUps: [`Want to know more about any of these?`],
  },

  // ── Uses / setup ───────────────────────────────────────────────────────────────
  {
    patterns: ["uses", "setup", "tools you use", "editor", "deploy", "vercel"],
    answers: [
      `${personalInfo.name}'s setup in brief:\n\n- **Framework:** Next.js 16 (App Router, React 19)\n- **Language:** TypeScript 5 — strict mode\n- **Styling:** Tailwind CSS v4\n- **Animations:** Framer Motion 12\n- **State:** Zustand 5\n- **Database:** Supabase\n- **Deployment:** Vercel\n- **AI:** Anthropic SDK 0.78\n\n[Full uses page →](/uses)`,
    ],
    followUps: [`Curious about why any particular tool was chosen?`],
  },

  // ── Niche ──────────────────────────────────────────────────────────────────────
  {
    patterns: ["speciali", "niche", "focus area", "best at", "good at", "saas"],
    topic: "about",
    answers: [
      `${personalInfo.name}'s focus is **${personalInfo.niche}** — products where performance, data accuracy, and user trust matter. He goes deep on dashboard UX, complex state, real-time data, and accessible interfaces.\n\n[See the work →](/projects)`,
      `He specialises in **${personalInfo.niche}** — not generalist agency work, but focused B2B and fintech product engineering. Dashboards, real-time data, role-based systems.\n\n[See the work →](/projects)`,
    ],
    followUps: [`Does that match what you're building?`],
  },

  // ── What he won't do ───────────────────────────────────────────────────────────
  {
    patterns: [
      "won't take",
      "wont take",
      "decline",
      "spec work",
      "unpaid trial",
      "ground rules",
    ],
    answers: [
      `To be direct — ${personalInfo.name} doesn't take on:\n\n${aboutNarrative.groundRules.map((r) => `- ${r}`).join("\n")}\n\nIf your project has a clear brief and defined scope, he's all in. [Let's talk →](/contact)`,
    ],
    followUps: [`Does your project fit those parameters?`],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Math resolver
// ─────────────────────────────────────────────────────────────────────────────

function tryMath(input: string): string | null {
  const q = input.toLowerCase().trim();

  const squaredMatch = q.match(/(\d+\.?\d*)\s*squared/);
  if (squaredMatch) {
    const n = parseFloat(squaredMatch[1]);
    return `${n} squared is **${n * n}**.`;
  }

  const sqrtMatch = q.match(/(?:sqrt|square root)\s*(?:of)?\s*(\d+\.?\d*)/);
  if (sqrtMatch) {
    const n = parseFloat(sqrtMatch[1]);
    const result = Math.sqrt(n);
    return `The square root of ${n} is **${Number.isInteger(result) ? result : result.toFixed(4)}**.`;
  }

  const percentMatch = q.match(/(\d+\.?\d*)\s*%\s*of\s*(\d+\.?\d*)/);
  if (percentMatch) {
    const pct = parseFloat(percentMatch[1]);
    const of = parseFloat(percentMatch[2]);
    return `${pct}% of ${of} is **${((pct / 100) * of).toFixed(2).replace(/\.00$/, "")}**.`;
  }

  let expr = q
    .replace(/what\s*is|calculate|compute|solve/gi, "")
    .replace(/\btimes\b/g, "*")
    .replace(/\bmultiplied\s+by\b/g, "*")
    .replace(/\bdivided\s+by\b/g, "/")
    .replace(/\bover\b/g, "/")
    .replace(/\bplus\b/g, "+")
    .replace(/\bminus\b/g, "-")
    .replace(/\bsubtract\b/g, "-")
    .replace(/\badd\b/g, "+")
    .trim();

  if (/^[\d\s+\-*/.()?]+$/.test(expr)) {
    try {
      // eslint-disable-next-line no-new-func
      const result = new Function(`"use strict"; return (${expr})`)();
      if (typeof result === "number" && isFinite(result)) {
        const display = Number.isInteger(result)
          ? result
          : parseFloat(result.toFixed(6));
        return `${expr.trim()} = **${display}**`;
      }
    } catch {
      /* not a valid expression */
    }
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────

export function matchOfflineKB(
  input: string,
  history: ChatMessage[] = [],
): string | null {
  const q = input.toLowerCase().trim();

  // 1. Math
  const mathResult = tryMath(input);
  if (mathResult) return mathResult;

  // 2. Continuation — user is responding to a follow-up question
  if (isContinuation(input) && history.length >= 2) {
    const topic = detectLastTopic(history);
    if (topic && CONTINUATION_EXPANSIONS[topic]) {
      const raw = pick(CONTINUATION_EXPANSIONS[topic]);
      return typeof raw === "function" ? raw() : raw;
    }
  }

  // 3. Normal KB match
  for (const entry of OFFLINE_KB) {
    if (entry.patterns.some((p) => fuzzyIncludes(q, p))) {
      const rawAnswer = pick(entry.answers);
      const answer = typeof rawAnswer === "function" ? rawAnswer() : rawAnswer;

      // Append follow-up — prefixed so the renderer styles it as a dimmer question
      if (entry.followUps && entry.followUps.length > 0) {
        const followUp = pick(entry.followUps);
        return `${answer}\n\n~~${followUp}`;
      }

      return answer;
    }
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// System prompt for Claude API fallback
// ─────────────────────────────────────────────────────────────────────────────

export const PORTFOLIO_SYSTEM_PROMPT = `You are the AI assistant for ${personalInfo.name}'s portfolio website (brand: ${personalInfo.brandName}). Speak naturally in first person as Sodiq — direct, warm, technically precise. Never robotic. Never say "As an AI language model...".

ABOUT SODIQ:
- ${personalInfo.title} based in ${personalInfo.location} (${personalInfo.timezone})
- ${personalInfo.currentRole} since January 2026
- Available for freelance from Q2 2026 | Response time: ${personalInfo.responseTime}
- Self-taught since 2019, production work since 2023
- Biochemistry degree, OAU 2019–2024
- Email: ${personalInfo.displayEmail}
- X: ${personalInfo.twitter} | GitHub/LinkedIn: ${personalInfo.github}

CORE STACK: ${coreSkillNames}
ALSO KNOWS: ${skills.alsoFamiliar.join(", ")}

PROJECTS:
${projects.map((p) => `- ${p.name}: ${p.tagline} (${p.status})${p.liveUrl ? ` → ${p.liveUrl}` : ""}`).join("\n")}

PRICING:
- Landing page: $350–$600 | Business site: $800–$1,500 | Web app: $1,500–$4,000 | Mobile: $6,000–$15,000
- Always direct to /estimate for tailored quote

LINKS: Book → ${personalInfo.calBooking30} | Contact → /contact | Estimate → /estimate | CV → ${personalInfo.resumeUrl}

RULES:
- Keep responses under 120 words. Crisp and conversational.
- Use [label](/path) for internal links, [label](https://...) for external
- End responses with a natural follow-up question when appropriate
- NEVER fabricate metrics or client names
- NEVER claim to be human if directly asked
- If genuinely unsure, say so and link to /contact`;
