import type { Metadata } from "next";
import ProcessPage from "./ProcessPage";

export const metadata: Metadata = {
  title: "How I Work — My Process",
  description:
    "From discovery call to launch and handoff — here's exactly how I deliver projects. Clear timelines, weekly updates, and zero surprises.",
};

export default function Page() {
  return <ProcessPage />;
}
