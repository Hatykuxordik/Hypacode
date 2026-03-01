export const personalInfo = {
  name: "Sodiq Atiku",
  brandName: "Hypacode",
  title: "Frontend Engineer",
  niche: "Fintech dashboards and B2B platforms",
  location: "Lagos, Nigeria",
  timezone: "WAT (UTC+1)",
  availability: "Available for new projects",
  responseTime: "Usually within a few hours",
  displayEmail: "hatykuxordik@gmail.com",
  github: "https://github.com/hatykuxordik",
  linkedin: "https://www.linkedin.com/in/hatykuxordik",
  calBooking30: "https://cal.com/sodiq-atiku-ljdgnr/30min",
  calBooking15: "https://cal.com/sodiq-atiku-ljdgnr/15min",
  currentRole: "Frontend Engineer at Villeto",
  valueProposition: "Fast dashboards. Real users. Zero compromises.",
  subHeadline:
    "I build Interfaces that earn trust and drive results with precision — built for teams that refuse slow, fragile, or forgettable products.",
  resumeUrl: "/assets/Sodiq-Atiku-Frontend-Developer-Resume-CV.pdf",
  twitter: "https://x.com/Hypacode",
} as const;

export const certificates = [
  {
    n: "The Ultimate React Course 2024",
    y: "2024",
    url: "https://www.ude.my/UC-09ca897b-0405-4487-a8a3-3eb458190a6f",
  },
  {
    n: "The Complete JavaScript Course 2023",
    y: "2023",
    url: "https://ude.my/UC-b832f715-cc80-42da-9f31-6682f003dc2c",
  },
  {
    n: "Advanced CSS and Sass",
    y: "2023",
    url: "https://ude.my/UC-8cb8b128-afe5-4ec0-98b6-a996b0594406",
  },
  {
    n: "Build Responsive Websites with HTML & CSS",
    y: "2023",
    url: "https://ude.my/UC-4a96fb55-dec3-4fef-9f15-17c75eafbd64",
  },
] as const;

export const aboutNarrative = {
  pullQuote: "Engineering interfaces that users understand instantly.",
  story: [
    "I began writing code in 2019 while studying Biochemistry at Obafemi Awolowo University. What started as curiosity quickly became systems thinking applied differently — replacing lab experiments with interfaces, and hypotheses with production deployments.",

    "My scientific background shaped how I approach software: understand the system first, reduce complexity, and design for predictable outcomes. That mindset carried naturally into frontend engineering, where performance, clarity, and correctness directly affect user trust.",

    "After building production applications across fintech, hospitality, and web platforms as a freelance engineer, I transitioned into product development. Today, I work as a Frontend Engineer at Villeto, building a spend management platform for businesses — designing and shipping the dashboard through which companies manage transactions, virtual cards, permissions, and financial operations.",

    "My work focuses on interfaces where accuracy and responsiveness matter most. Financial software earns trust through speed, clarity, and reliability, and every architectural decision I make is guided by that principle.",

    "Based in Lagos, Nigeria, I collaborate with distributed teams and ship software used by real users daily. I’m most interested in product environments where frontend engineering directly influences business outcomes, not just visuals.",
  ],
  stats: [
    { label: "Years Building", value: "3+" },
    { label: "Based In", value: "Lagos, Nigeria" },
    { label: "Currently At", value: "Villeto" },
  ],
  values: [
    {
      icon: "Code2",
      title: "Clean Code",
      description:
        "Readable, maintainable, and purposeful. Code is read far more than it is written.",
    },
    {
      icon: "Users",
      title: "Collaboration",
      description:
        "Great software is built with clear communication, shared context, and mutual respect.",
    },
    {
      icon: "Lightbulb",
      title: "Innovation",
      description:
        "Bringing creative problem-solving to every technical challenge — not just the obvious solution.",
    },
    {
      icon: "Target",
      title: "Goal-Oriented",
      description:
        "Every decision tied back to outcomes. Features exist to serve users, not to impress resumes.",
    },
  ],
  outsideTheCode: {
    reading: "Atomic Habits — thinking about systems in code and in life",
    learning:
      "Rust (slowly), because understanding memory makes everything else click",
    obsession: "Building interfaces that feel faster than they are",
    perspective:
      "Good software is made by people who care about the person using it, not just the person paying for it.",
  },
  groundRules: [
    "Projects without a clear brief or defined scope",
    "Unpaid trial work or spec work of any kind",
    '"Just copy that app" projects that undervalue original thinking',
    "Work without a signed agreement and defined deliverables",
  ],
  openTo: [
    "Open-source contributions in the React/Next.js ecosystem",
    "Developer partnerships for complex projects needing multiple engineers",
    "Mentoring early-career developers in Lagos and beyond",
    "Community talks and technical writing",
  ],
} as const;

export const skills = {
  core: [
    {
      name: "React",
      proficiency: "Expert" as const,
      yearsInUse: 3,
      description:
        "Component architecture, hooks, performance patterns, and complex state management for production apps.",
      seeIn: { project: "Villeto", slug: "villeto" },
    },
    {
      name: "Next.js",
      proficiency: "Expert" as const,
      yearsInUse: 2,
      description:
        "App Router, RSC, ISR, SSG — the full stack. This website is built with it.",
      seeIn: { project: "ODM Groove Hotel", slug: "odm-groove-hotel" },
    },
    {
      name: "TypeScript",
      proficiency: "Expert" as const,
      yearsInUse: 2,
      description:
        "Strict mode, advanced generics, utility types — type safety as a first-class concern.",
      seeIn: { project: "Villeto", slug: "villeto" },
    },
    {
      name: "Tailwind CSS",
      proficiency: "Expert" as const,
      yearsInUse: 3,
      description:
        "Design systems, responsive layouts, custom utility patterns. Fast and precise.",
      seeIn: { project: "ODM Groove Hotel", slug: "odm-groove-hotel" },
    },
    {
      name: "Zustand",
      proficiency: "Advanced" as const,
      yearsInUse: 1,
      description:
        "Lightweight global state without the Redux ceremony. Used extensively in Villeto's dashboard.",
      seeIn: { project: "Villeto", slug: "villeto" },
    },
    {
      name: "Motion",
      proficiency: "Advanced" as const,
      yearsInUse: 2,
      description:
        "Production animations that respect accessibility. Layout animations, gestures, and scroll-triggered effects.",
      seeIn: { project: "Global Finder", slug: "global-finder" },
    },
    {
      name: "Supabase",
      proficiency: "Advanced" as const,
      yearsInUse: 2,
      description:
        "Auth, real-time subscriptions, row-level security, and PostgreSQL queries.",
      seeIn: { project: "Fastpay", slug: "fastpay" },
    },
    {
      name: "REST APIs",
      proficiency: "Advanced" as const,
      yearsInUse: 3,
      description:
        "Designing and consuming REST endpoints — data fetching, error handling, optimistic updates.",
      seeIn: { project: "Global Finder", slug: "global-finder" },
    },
  ],
  alsoFamiliar: [
    "GSAP",
    "Redux Toolkit",
    "Shadcn/ui",
    "React Hook Form",
    "Figma-to-Code",
    "WCAG Accessibility",
    "Stripe",
    "Google Maps API",
    "SASS/SCSS",
    "Formspree",
    "Recharts",
    "React Query",
  ],
  currentlyLearning: [
    {
      topic: "Node.js backend architecture",
      reason: "Building fullstack systems beyond the UI layer",
    },
    {
      topic: "Python for automation and data workflows",
      reason: "Expanding problem-solving beyond frontend applications",
    },
    {
      topic: "WebAssembly",
      reason: "Performance-critical UI components",
    },
    {
      topic: "Advanced React Server Components patterns",
      reason: "Maximizing the Next.js App Router",
    },
  ],
} as const;

export const experience = [
  {
    company: "Villeto",
    role: "Frontend Engineer",
    type: "Full-time",
    period: "January 2026 — Present",
    location: "Lagos, Nigeria",
    description:
      "Building the core spend management dashboard for Villeto's business clients. Responsible for the full frontend — from onboarding flows to real-time transaction tracking, virtual card management, and role-based access control.",
    highlights: [
      "Architected and shipped the primary dashboard used by Villeto's business clients",
      "Implemented optimistic updates for transactions — reducing perceived latency",
      "Built the card operations module: issue, freeze, and configure virtual cards",
      "Collaborated closely with design and backend teams for API contract design",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Zustand",
      "Shadcn/ui",
      "Tailwind CSS",
      "React Query",
    ],
  },
  {
    company: "Freelance",
    role: "Frontend Engineer",
    type: "Freelance",
    period: "2023 — December 2025",
    location: "Remote",
    description:
      "Built production web applications for clients across hospitality, fintech, and B2B sectors. Delivered complete projects from design handoff to deployment.",
    highlights: [
      "Delivered ODM Groove Hotel — a full hospitality platform with AI concierge and WhatsApp booking integration",
      "Built Global Finder — WCAG AA compliant, multi-API platform with advanced search and filtering",
      "Built Taskify — PWA with Supabase Auth, real-time sync, and offline support",
      "Maintained consistent delivery quality with zero missed deadlines across all client engagements",
    ],
    stack: ["React", "Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
  },
] as const;

export type ProjectStatus = "Live" | "In Progress";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  category: string[];
  status: ProjectStatus;
  liveUrl: string | null;
  githubUrl: string | null;
  color: string;
  image: string;
  imageAlt: string;
  outcome: string;
  stack: string[];
  featured: boolean;
  overview: string;
  problem: string;
  process: string;
  technicalDeepDive: string;
  results: string;
  codeSnippet: {
    language: string;
    code: string;
    description: string;
  };
}

export const projects: Project[] = [
  {
    slug: "villeto",
    name: "Villeto",
    tagline: "Spend Management Platform",
    category: ["Fintech", "Frontend"],
    status: "In Progress",
    liveUrl: null,
    githubUrl: null,
    color: "#6366f1",
    image: "/assets/projects/villeto.png",
    imageAlt:
      "Villeto spend management dashboard showing expense tracking interface with transaction list and analytics",
    outcome:
      "Production platform actively powering Villeto's business operations",
    stack: [
      "Next.js",
      "TypeScript",
      "Zustand",
      "React Query",
      "Tailwind CSS",
      "Shadcn/ui",
    ],
    featured: true,
    overview:
      "Villeto is a fintech startup building spend management tools for businesses. As their Frontend Engineer, I own the full dashboard — the primary interface through which business clients control their spending, cards, and vendor operations.",
    problem:
      "Businesses using Villeto needed a single interface to manage their entire financial stack: virtual cards, expense tracking, vendor payments, and team permissions. Existing solutions were either too complex for SMBs or too limited for growing teams. The product needed to be fast, clear, and trustworthy — finance software earns trust through precision.",
    process:
      "I worked directly with the design and backend teams to define API contracts before any UI was built. This upfront alignment prevented the most common source of frontend rework. I chose Zustand over Redux for global state — the spend dashboard has deeply nested state across cards, transactions, and user permissions, and Zustand's flat store model kept things manageable without boilerplate overhead.",
    technicalDeepDive:
      "The most interesting technical challenge was optimistic updates for transaction state. When a user freezes a virtual card, the UI must reflect that immediately — before the API confirms it — while gracefully handling failures. I built a custom hook that manages pending states as a Set of IDs, enabling per-item optimism without global loading flags.",
    results:
      "The dashboard is in production, actively used by Villeto's business clients. The optimistic update pattern reduced perceived latency on card operations, and the role-based access system handles the full permission matrix without performance impact.",
    codeSnippet: {
      language: "typescript",
      description:
        "Custom optimistic update hook — used throughout Villeto's card operations",
      code: `// hooks/useOptimisticTransaction.ts — from Villeto codebase
export function useOptimisticTransaction<T extends { id: string }>(
  mutationFn: (item: T) => Promise<void>
) {
  const [pending, setPending] = useState<Set<string>>(new Set());

  const execute = useCallback(async (item: T) => {
    setPending(prev => new Set(prev).add(item.id));
    try {
      await mutationFn(item);
    } finally {
      setPending(prev => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }
  }, [mutationFn]);

  return { execute, isPending: (id: string) => pending.has(id) };
}`,
    },
  },
  {
    slug: "fastpay",
    name: "Fastpay",
    tagline: "Digital Banking Simulation Platform",
    category: ["Fintech", "Web App"],
    status: "In Progress",
    liveUrl: "https://fastpayy.vercel.app/",
    githubUrl: "https://github.com/hatykuxordik/fastpay",
    color: "#10b981",
    image: "/assets/projects/fastpay.png",
    imageAlt:
      "Fastpay banking app — real-time transaction analytics dashboard showing account balance and recent transfers",
    outcome:
      "Full-featured banking simulator with real-time sync and PWA support",
    stack: ["Next.js", "TypeScript", "Supabase", "Recharts", "Tailwind CSS"],
    featured: true,
    overview:
      "Fastpay is a full-featured digital banking simulation platform that replicates the core experience of a modern banking app — account management, fund transfers, transaction history, and analytics dashboards — built to demonstrate production-level fintech frontend architecture.",
    problem:
      "Most banking app demos are shallow: a single screen with hardcoded data. Fastpay was designed to be the opposite — a complete simulation with real authentication, real-time data updates, and actual charts that respond to user actions. The challenge was making it feel like a real product without a real bank behind it.",
    process:
      "Supabase provided the real-time foundation — its PostgreSQL realtime subscriptions mean transaction tables update live across browser tabs. I used Recharts for the analytics layer because it's tree-shakeable and handles financial data visualization cleanly. The PWA layer was added to enable offline access to account summaries.",
    technicalDeepDive:
      "The transaction engine uses Supabase row-level security policies to ensure each user only ever sees their own data — even in a shared simulation environment. This gave me the opportunity to design proper RLS policies from scratch, which is a skill directly transferable to production fintech work.",
    results:
      "A live, deployed platform demonstrating end-to-end fintech product skills. The real-time sync works across devices, the PWA install works on mobile, and the analytics charts handle edge cases like empty states and loading skeletons without layout shift.",
    codeSnippet: {
      language: "typescript",
      description: "Real-time transaction subscription with Supabase",
      code: `// hooks/useTransactions.ts
export function useTransactions(userId: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  useEffect(() => {
    const channel = supabase
      .channel('transactions')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'transactions',
        filter: \`user_id=eq.\${userId}\`,
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setTransactions(prev => [payload.new as Transaction, ...prev]);
        }
      })
      .subscribe();
      
    return () => { supabase.removeChannel(channel); };
  }, [userId]);
  
  return transactions;
}`,
    },
  },
  {
    slug: "odm-groove-hotel",
    name: "ODM Groove Hotel",
    tagline: "Hospitality Platform with AI Concierge",
    category: ["Hospitality"],
    status: "Live",
    liveUrl: "https://odmgroove.vercel.app/",
    githubUrl: null,
    color: "#f59e0b",
    image: "/assets/projects/odmgroove.png",
    imageAlt:
      "ODM Groove Hotel website homepage showing luxury hotel photography, room listings, and booking interface",
    outcome:
      "Hospitality platform with AI concierge that drove real reservations",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "WhatsApp API",
    ],
    featured: true,
    overview:
      "A complete digital presence for ODM Groove Hotel — a boutique hotel brand. The platform covers everything: room discovery, AI-powered concierge, direct WhatsApp booking integration, and a content management layer for hotel staff. Built to drive reservations, not just look good.",
    problem:
      "The hotel was losing bookings to third-party platforms (Booking.com, Airbnb) and paying significant commission on every reservation. They needed a direct booking channel that felt as trustworthy as the big platforms but was entirely theirs. The AI concierge was the differentiator — giving guests instant answers without requiring a human on standby.",
    process:
      "The WhatsApp integration was built first, because that's how most Lagos-area hotel bookings actually happen. Guests initiate a conversation via WhatsApp, and the booking flow is conversational. The AI concierge handles the top 80% of guest questions automatically — room types, pricing, availability, nearby attractions.",
    technicalDeepDive:
      "The animation system uses Framer Motion's scroll-linked animations to create a cinematic browsing experience without sacrificing performance. Every animation respects prefers-reduced-motion. The room gallery uses a custom lightbox built on Framer's layout animations rather than a third-party library — reducing bundle size by ~45kB.",
    results:
      "The platform drove measurable direct bookings from the first month of launch. The AI concierge deflected the majority of routine guest enquiries, reducing staff response time. The hotel now has a direct booking channel independent of third-party platforms.",
    codeSnippet: {
      language: "typescript",
      description:
        "WhatsApp booking integration — converts intent to a pre-filled message",
      code: `// lib/whatsapp.ts
export function buildBookingMessage(room: Room, dates: DateRange): string {
  const nights = differenceInDays(dates.checkout, dates.checkin);
  return encodeURIComponent(
    \`Hi, I'd like to book the \${room.name} from \` +
    \`\${format(dates.checkin, 'MMM d')} to \${format(dates.checkout, 'MMM d, yyyy')} \` +
    \`(\${nights} night\${nights !== 1 ? 's' : ''}). \` +
    \`Total: ₦\${(room.pricePerNight * nights).toLocaleString()}. \` +
    \`Please confirm availability.\`
  );
}

export function getWhatsAppUrl(phone: string, message: string): string {
  return \`https://wa.me/\${phone}?text=\${message}\`;
}`,
    },
  },
  {
    slug: "global-finder",
    name: "Global Finder",
    tagline: "Multi-API Search & Discovery Platform",
    category: ["Web App", "API"],
    status: "Live",
    liveUrl: "https://global-finder.vercel.app/",
    githubUrl: "https://github.com/Hatykuxordik/global-finder",
    color: "#3b82f6",
    image: "/assets/projects/global-finder.png",
    imageAlt:
      "Global Finder search platform showing country and city discovery interface with filtering options and map integration",
    outcome:
      "WCAG AA compliant platform with multi-API integration and advanced filtering",
    stack: [
      "React",
      "TypeScript",
      "Framer Motion",
      "REST APIs",
      "Tailwind CSS",
    ],
    featured: false,
    overview:
      "Global Finder is a country and city discovery platform that aggregates data from multiple public APIs — geography, weather, currency, and points of interest — into a single, searchable interface. Built with accessibility as a first-class concern.",
    problem:
      "Travel and geography research is fragmented across multiple tools. Global Finder consolidates the most useful data points — demographics, climate, currency conversion, and local highlights — into one fast, filterable interface.",
    process:
      "Accessibility was designed in from day one, not retrofitted. Every interactive element has visible focus states, ARIA labels, and keyboard navigation. The filter system uses URL state (search params) rather than component state — enabling shareable, bookmarkable searches.",
    technicalDeepDive:
      "The multi-API orchestration layer handles different response shapes, error states, and rate limits from each provider. A unified data transformer normalizes all responses into a consistent shape before they hit the component layer.",
    results:
      "Passes WCAG AA criteria across all pages. The URL-based filter state enables direct linking to any search result — a UX detail that makes it genuinely useful for researchers and educators.",
    codeSnippet: {
      language: "typescript",
      description:
        "URL-synchronized filter state — makes searches bookmarkable",
      code: `// hooks/useFilterState.ts
export function useFilterState() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const filters = useMemo(() => ({
    region: searchParams.get('region') ?? 'all',
    population: searchParams.get('population') ?? 'any',
    language: searchParams.get('language') ?? '',
  }), [searchParams]);
  
  const setFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === '' || value === 'all' || value === 'any') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(\`?\${params.toString()}\`, { scroll: false });
  }, [router, searchParams]);
  
  return { filters, setFilter };
}`,
    },
  },
  {
    slug: "taskify",
    name: "Taskify",
    tagline: "PWA Task Manager with Real-time Sync",
    category: ["Web App"],
    status: "Live",
    liveUrl: "https://hypacode-taskify.vercel.app/",
    githubUrl: "https://github.com/Hatykuxordik/taskify",
    color: "#8b5cf6",
    image: "/assets/projects/taskify.png",
    imageAlt:
      "Taskify PWA task manager showing project board with drag-and-drop tasks, priority labels, and completion tracking",
    outcome:
      "PWA with offline support, real-time sync, and full authentication flow",
    stack: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
    featured: false,
    overview:
      "Taskify is a progressive web app for personal task and project management. It features full Supabase authentication, real-time cross-device sync, offline functionality, and a clean board-based interface.",
    problem:
      "Personal task managers are either too simple (no sync) or too complex (team overhead). Taskify hits the middle ground: a fast, offline-capable app with real sync that works on any device without an app store.",
    process:
      "The offline-first architecture uses a local state cache that syncs to Supabase when connectivity is restored. Service workers handle asset caching and background sync.",
    technicalDeepDive:
      "The PWA manifest and service worker are configured to cache all static assets on install, giving the app a near-instant first load on repeat visits. The background sync queue persists task mutations in IndexedDB and flushes them when the network reconnects.",
    results:
      "A fully installable PWA with Lighthouse PWA score of 100. Works offline, syncs in real-time, and handles the authentication edge cases (token refresh, session expiry) that most demos ignore.",
    codeSnippet: {
      language: "typescript",
      description: "Offline-first task mutation with background sync",
      code: `// lib/offline-queue.ts
const QUEUE_KEY = 'taskify_sync_queue';

export async function queueMutation(mutation: TaskMutation): Promise<void> {
  const queue = await getQueue();
  queue.push({ ...mutation, timestamp: Date.now(), id: crypto.randomUUID() });
  await setQueue(queue);
  
  if (navigator.onLine) {
    await flushQueue();
  }
}

export async function flushQueue(): Promise<void> {
  const queue = await getQueue();
  const failed: TaskMutation[] = [];
  
  for (const mutation of queue) {
    try {
      await applyMutation(mutation);
    } catch {
      failed.push(mutation);
    }
  }
  
  await setQueue(failed);
}`,
    },
  },
  {
    slug: "gamesnap",
    name: "GameSnap",
    tagline: "Live Sports Scores & Predictions",
    category: ["Web App", "API"],
    status: "In Progress",
    liveUrl: null,
    githubUrl: "https://github.com/hatykuxordik/gamesnap",
    color: "#ef4444",
    image: "/assets/projects/fastpay.png",
    imageAlt:
      "GameSnap sports platform showing live match scores, league standings, and match prediction interface",
    outcome:
      "Real-time sports data platform with live scores and match analytics",
    stack: [
      "React",
      "TypeScript",
      "React Query",
      "API-Football",
      "Tailwind CSS",
    ],
    featured: false,
    overview:
      "GameSnap is a live sports data platform that pulls real-time match scores, league standings, and match statistics from the API-Football data provider. In progress — the foundation is built and the data layer is live.",
    problem:
      "Sports data platforms are either paywalled or ad-saturated. GameSnap is a clean, focused interface for match tracking built as an exploration of real-time data management and React Query's caching model.",
    process:
      "React Query handles the polling and caching layer. Live matches poll every 60 seconds automatically; completed matches are cached indefinitely. The query configuration adapts based on match status.",
    technicalDeepDive:
      "The adaptive polling strategy reduces API calls by 80% compared to naive interval polling. Completed matches never re-fetch; live matches poll on a short interval; scheduled matches poll hourly.",
    results:
      "In progress. The core data layer is live with adaptive polling, league filtering, and live score updates. Match prediction and user favourites are the next features.",
    codeSnippet: {
      language: "typescript",
      description:
        "Adaptive polling — live matches refresh every 60s, completed matches never re-fetch",
      code: `// hooks/useMatch.ts
export function useMatch(matchId: number, status: MatchStatus) {
  return useQuery({
    queryKey: ['match', matchId],
    queryFn: () => fetchMatch(matchId),
    refetchInterval: status === 'LIVE' ? 60_000 : false,
    staleTime: status === 'FINISHED' ? Infinity : 30_000,
    gcTime: status === 'FINISHED' ? Infinity : 5 * 60_000,
  });
}`,
    },
  },
];

export const currentlyBuilding = [
  {
    name: "Fastpay",
    description: "Digital banking simulation platform",
    status: "In Progress" as const,
    url: "https://fastpayy.vercel.app/",
    github: "https://github.com/hatykuxordik/fastpay",
  },
  {
    name: "GameSnap",
    description: "Live sports scores & predictions platform",
    status: "In Progress" as const,
    url: null,
    github: "https://github.com/hatykuxordik/gamesnap",
  },
] as const;

export const usesPage = {
  framework: {
    name: "Next.js 16 (App Router, React 19)",
    reason: "RSC, Partial Prerendering, native image optimization",
  },
  language: {
    name: "TypeScript 5 — strict mode",
    reason: "Refactor confidence, better DX, catches problems before they ship",
  },
  styling: {
    name: "Tailwind CSS v4 + CSS Custom Properties",
    reason: "Design tokens via CSS vars, zero runtime, perfect with RSC",
  },
  animations: {
    name: "Framer Motion 12 + Motion 12",
    reason: "The best production animation library for React, period",
  },
  fonts: {
    name: "Instrument Serif (display) · Geist (body) · JetBrains Mono (code)",
    reason: "Distinctive without being loud. Geist is optimized for screens.",
  },
  ai: {
    name: "Anthropic SDK 0.78 via streaming API",
    reason: "Fastest, cheapest, good enough for a chat interface",
  },
  email: {
    name: "Resend 6 + React Email",
    reason: "Reliable delivery, beautiful developer experience",
  },
  deployment: {
    name: "Vercel (Edge Network, ISR, Analytics)",
    reason: "First-class Next.js deployment, zero config, global CDN",
  },
  forms: {
    name: "React Hook Form 7 + Zod 4",
    reason: "Type-safe validation with minimal re-renders",
  },
  state: {
    name: "Zustand 5",
    reason: "Lightweight global state without Redux ceremony",
  },
  ui: {
    name: "Radix UI primitives + shadcn/ui",
    reason:
      "Accessible headless components, custom-styled to match the design system",
  },
  pdf: {
    name: "jsPDF 4",
    reason: "Client-side PDF generation for the estimate tool",
  },
  design: {
    name: "Custom — no UI library for layout. shadcn/ui primitives where helpful.",
  },
} as const;

/** Uses page data as an array of { category, items[] } for easy rendering */

export const usesItems = [
  {
    category: "Framework & Language",
    items: [
      { name: usesPage.framework.name, description: usesPage.framework.reason },
      { name: usesPage.language.name, description: usesPage.language.reason },
    ],
  },
  {
    category: "Styling & Animation",
    items: [
      { name: usesPage.styling.name, description: usesPage.styling.reason },
      {
        name: usesPage.animations.name,
        description: usesPage.animations.reason,
      },
    ],
  },
  {
    category: "Forms & State",
    items: [
      { name: usesPage.forms.name, description: usesPage.forms.reason },
      { name: usesPage.state.name, description: usesPage.state.reason },
    ],
  },
  {
    category: "UI & Components",
    items: [
      { name: usesPage.ui.name, description: usesPage.ui.reason },
      { name: usesPage.pdf.name, description: usesPage.pdf.reason },
      { name: usesPage.design.name, description: undefined },
    ],
  },
  {
    category: "Typography",
    items: [{ name: usesPage.fonts.name, description: usesPage.fonts.reason }],
  },
  {
    category: "Services & Infrastructure",
    items: [
      { name: usesPage.ai.name, description: usesPage.ai.reason },
      { name: usesPage.email.name, description: usesPage.email.reason },
      {
        name: usesPage.deployment.name,
        description: usesPage.deployment.reason,
      },
    ],
  },
] as const;
// ── Convenience aliases for page imports ──────────────────────────────────

/** Core Stack items shaped for the Skills page (uses `level` + `note` fields) */
export const coreStack = skills.core.map((s) => ({
  name: s.name,
  level: s.proficiency,
  note: s.description,
  icon: undefined as string | undefined,
}));

/** All "also familiar" techs as a flat array */
export const familiarWith: readonly string[] = skills.alsoFamiliar;
