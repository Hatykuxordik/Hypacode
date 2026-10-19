import { NextResponse } from "next/server";
import { projects } from "@/lib/data";

const BASE_URL = "https://hypacode.vercel.app";
const INDEXNOW_KEY = "46d9d51704a346c885dd34524d24a0e1";
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;

// All URLs to submit to IndexNow (Bing, Yandex, Seznam)
const STATIC_URLS = [
  BASE_URL,
  `${BASE_URL}/about`,
  `${BASE_URL}/projects`,
  `${BASE_URL}/skills`,
  `${BASE_URL}/estimate`,
  `${BASE_URL}/process`,
  `${BASE_URL}/contact`,
  `${BASE_URL}/uses`,
];

const PROJECT_URLS = projects
  .filter((p) => !["hypacode-portfolio", "e-commerce", "wild-oasis"].includes(p.slug))
  .map((p) => `${BASE_URL}/projects/${p.slug}`);

const ALL_URLS = [...STATIC_URLS, ...PROJECT_URLS];

export async function GET() {
  try {
    // Submit to IndexNow API (notifies Bing, Yandex, and Seznam simultaneously)
    const res = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: "hypacode.vercel.app",
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: ALL_URLS,
      }),
    });

    if (res.ok || res.status === 200) {
      return NextResponse.json({
        success: true,
        message: `✅ Successfully submitted ${ALL_URLS.length} URLs to IndexNow (Bing + Yandex + Seznam)`,
        urls: ALL_URLS,
        status: res.status,
      });
    }

    return NextResponse.json({
      success: false,
      message: `IndexNow returned status ${res.status}`,
      status: res.status,
    }, { status: 500 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to contact IndexNow API",
      error: String(error),
    }, { status: 500 });
  }
}
