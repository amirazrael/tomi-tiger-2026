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
    lower.includes("exists")
  );
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

  const groups = mailerLiteGroupsFromEnv(process.env.MAILERLITE_GROUP_ID);
  const basePayload: Record<string, unknown> = { email };
  if (groups) basePayload.groups = groups;

  const withSource = {
    ...basePayload,
    fields: { signup_source: body.source ?? "website" },
  };

  let res = await mailerLiteSubscribe(apiKey, withSource);
  let text = await res.text();

  // Custom field missing in MailerLite — retry without optional fields.
  if (!res.ok && res.status === 422 && text.toLowerCase().includes("field")) {
    res = await mailerLiteSubscribe(apiKey, basePayload);
    text = await res.text();
  }

  if (isDuplicateSubscriber(res.status, text)) {
    return NextResponse.json({ ok: true });
  }

  if (!res.ok) {
    console.error("MailerLite subscribe failed", res.status, text);
    return NextResponse.json(
      { error: "Something went wrong — please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
