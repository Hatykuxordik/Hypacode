import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hypacode — Frontend Engineer | Sodiq Atiku",
    short_name: "Hypacode",
    description:
      "Frontend engineering portfolio of Sodiq Atiku. Fast, accessible React & Next.js web apps, dashboards, and landing pages.",
    start_url: "/",
    display: "standalone",
    background_color: "#080d18",
    theme_color: "#080d18",
    icons: [
      {
        src: "/assets/Hypacodelogo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

