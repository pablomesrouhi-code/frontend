import { NextResponse } from "next/server";

const DEFAULT_REMOTE_API = "https://api.nabtalabo.store";

function serverApiBase(): string {
  return (
    process.env.SHEET_LEAD_API_BASE?.trim() ||
    process.env.BACKEND_INTERNAL_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    DEFAULT_REMOTE_API
  ).replace(/\/+$/, "");
}

/**
 * Proxies thank-you "Meta Lead" sheet row to FastAPI with `SHEET_LEAD_INGEST_SECRET`
 * (never exposed to the browser).
 */
export async function POST(request: Request) {
  const secret = process.env.SHEET_LEAD_INGEST_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const base = serverApiBase();
  try {
    const r = await fetch(`${base}/api/sheet-leads/marketing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Sheet-Lead-Ingest-Secret": secret,
      },
      body: JSON.stringify(body),
    });
    const text = await r.text();
    let parsed: unknown = null;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch {
      parsed = { detail: text.slice(0, 200) };
    }
    return NextResponse.json(parsed ?? { ok: r.ok }, { status: r.status });
  } catch {
    return NextResponse.json({ ok: false, error: "upstream_fetch_failed" }, { status: 502 });
  }
}
