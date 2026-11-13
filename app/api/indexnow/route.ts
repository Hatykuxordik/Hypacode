import { NextResponse } from "next/server";
import { projects } from "@/lib/data";
import { INDEXNOW_KEY, SITE_URL } from "@/lib/seo";

const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;
const HOST = new URL(SITE_URL).host;

// All indexable URLs to submit to IndexNow (Bing, Yandex, Seznam)
const STATIC_URLS = [
  SITE_URL,
  `${SITE_URL}/services`,
  `${SITE_URL}/about`,
  `${SITE_URL}/projects`,
  `${SITE_URL}/skills`,
  `${SITE_URL}/estimate`,
  `${SITE_URL}/process`,
  `${SITE_URL}/contact`,
];

const PROJECT_URLS = projects
  .filter((p) => !["hypacode-portfolio", "e-commerce", "wild-oasis"].includes(p.slug))
  .map((p) => `${SITE_URL}/projects/${p.slug}`);

const ALL_URLS = [...STATIC_URLS, ...PROJECT_URLS];

export async function GET() {
  try {
    // Submit to IndexNow API (notifies Bing, Yandex, and Seznam simultaneously)
    const res = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
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
