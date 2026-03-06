// Here is the completed project data for UniStudyHub!
// You can copy this object and paste it directly into your `projects` array in \`lib/data.ts\`

export const unistudyhubProject = {
  slug: "unistudyhub",
  name: "UniStudyHub",
  tagline: "The Ultimate University Study & Assessment Platform",
  category: ["EdTech", "Web App", "AI & Data"],
  status: "In Progress", // Or "Live" if you have deployed it
  liveUrl: null, // Update this if deployed
  githubUrl: "https://github.com/Hatykuxordik/unistudyhub", // Assuming this is the repo
  color: "#f59e0b", // Amber theme
  image: "/assets/projects/unistudyhub.png", // Add a screenshot to your assets folder!
  imageAlt: "UniStudyHub reading interface with AI explanations, mathematical rendering, and global leaderboard",
  outcome: "A comprehensive academic platform featuring OCR digitization, bulk CSV processing, and AI-driven mathematical assessments.",
  stack: [
    "Next.js",
    "TypeScript",
    "Supabase",
    "Python",
    "OCR Processing",
    "MathVisual",
    "Tailwind CSS"
  ],
  featured: true,
  overview: "UniStudyHub is an advanced educational ecosystem built for university students. It provides a structured hierarchy containing rich notes, dynamic quizzes, and an integrated AI tutor. The platform supports heavy data ingestion through Python-based OCR for digitizing physical past questions and CSV bulk uploads for rapid curriculum onboarding.",
  problem: "University study materials are often scattered, and STEM students specifically struggle with platforms that cannot render complex mathematical notation correctly. Furthermore, educators faced a massive bottleneck trying to digitize decades of physical past exam papers and manually input hundreds of student records.",
  process: "I built the core infrastructure with Next.js and Supabase. To solve the data-entry bottleneck, I integrated Python-based OCR workflows to automatically extract and structure text from scanned past questions, alongside a robust CSV upload system for bulk-importing quizzes and users. For STEM subjects, I integrated MathVisual to perfectly render complex mathematical constraints directly in the browser.",
  technicalDeepDive: "Building the multi-modal data ingestion pipeline was a massive challenge—specifically ensuring the OCR extraction accurately preserved mathematical formulas before being passed to MathVisual for frontend rendering, and validating large CSV payloads gracefully. On the gamification side, I designed a normalized ranking engine for the Global Leaderboard that calculates percentage accuracy and speed-per-question to fairly rank quizzes of wildly varying lengths.",
  results: "A highly scalable educational platform capable of onboarding any university's curriculum. The OCR and CSV pipelines reduced content digitization time by over 90%. The AI-integrated reading view and MathVisual support ensure complex STEM topics are easily digestible, while the global leaderboard drives engagement.",
  codeSnippet: {
    language: "typescript",
    description: "Normalized ranking algorithm — fairly ranks quizzes of different lengths by accuracy percentage and speed per question.",
    code: `// lib/leaderboard.ts
function rankEntries(raw: LeaderboardEntry[]) {
  // Sort by Accuracy (Percentage) first, then Speed (Time per question)
  const sorted = [...raw].sort((a, b) => {
    const pctA = a.max_score > 0 ? a.score / a.max_score : 0;
    const pctB = b.max_score > 0 ? b.score / b.max_score : 0;
    if (pctA !== pctB) return pctB - pctA;

    const timePerQuestionA = a.max_score > 0 ? a.time_taken_seconds / a.max_score : Infinity;
    const timePerQuestionB = b.max_score > 0 ? b.time_taken_seconds / b.max_score : Infinity;
    return timePerQuestionA - timePerQuestionB;
  });

  let pos = 1;
  return sorted.map((entry, i) => {
    if (i > 0) {
      const prev = sorted[i - 1];
      const prevPct = prev.max_score > 0 ? prev.score / prev.max_score : 0;
      const currPct = entry.max_score > 0 ? entry.score / entry.max_score : 0;
      const prevTPQ = prev.max_score > 0 ? prev.time_taken_seconds / prev.max_score : Infinity;
      const currTPQ = entry.max_score > 0 ? entry.time_taken_seconds / entry.max_score : Infinity;

      // Only increment position if the accuracy or speed actually differs
      if (currPct !== prevPct || currTPQ !== prevTPQ) pos = i + 1;
    }
    return { ...entry, rank: pos };
  });
}`
  }
};


// If you want to add this to your \`currentlyBuilding\` array:
export const unistudyhubCurrentlyBuilding = {
  name: "UniStudyHub",
  description: "AI-powered university study & assessment platform",
  status: "In Progress",
  url: null,
  github: "https://github.com/Hatykuxordik/unistudyhub",
};
