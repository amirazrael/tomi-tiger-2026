import { NextResponse } from "next/server";
import { mailerLiteGroupsFromEnv } from "@/lib/mailerlite";

const MAILERLITE_API = "https://connect.mailerlite.com/api/subscribers";

async function mailerLiteSubscribe(
  apiKey: string,
  payload: Record<string, unknown>
) {
  return fetch(MAILERLITE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });
}

/** MailerLite often returns 422 when a custom field or group id is invalid. */
function isDuplicateSubscriber(status: number, body: string): boolean {
  if (status !== 422 && status !== 409) return false;
  const lower = body.toLowerCase();
  return (
    lower.includes("already") ||
    lower.includes("duplicate") ||
    lower.includes("exists") ||
    lower.includes("taken")
  );
}

function subscribePayloadAttempts(
  email: string,
  source: string
): Record<string, unknown>[] {
  const groups = mailerLiteGroupsFromEnv(process.env.MAILERLITE_GROUP_ID);
  const resubscribe = { resubscribe: true as const };
  const candidates = [
    {
      email,
      ...resubscribe,
      ...(groups && { groups }),
      fields: { signup_source: source },
    },
    { email, ...resubscribe, ...(groups && { groups }) },
    { email, ...resubscribe, fields: { signup_source: source } },
    { email, ...resubscribe },
  ];
  const seen = new Set<string>();
  return candidates.filter((payload) => {
    const key = JSON.stringify(payload);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function POST(request: Request) {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email signup isn't switched on yet — please check back soon!" },
      { status: 503 }
    );
  }

  let body: { email?: string; source?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = body.email?.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const source = body.source ?? "website";
  let lastStatus = 0;
  let lastText = "";

  for (const payload of subscribePayloadAttempts(email, source)) {
    const res = await mailerLiteSubscribe(apiKey, payload);
    const text = await res.text();
    lastStatus = res.status;
    lastText = text;

    if (res.ok) {
      return NextResponse.json({ ok: true });
    }
    if (isDuplicateSubscriber(res.status, text)) {
      return NextResponse.json({ ok: true });
    }
    // Only try simpler payloads for validation errors.
    if (res.status !== 422) break;
  }

  if (lastStatus !== 0) {
    console.error(
      "MailerLite subscribe failed",
      lastStatus,
      lastText.slice(0, 2000)
    );
    return NextResponse.json(
      { error: "Something went wrong — please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
