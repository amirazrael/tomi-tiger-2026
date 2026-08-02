import { NextResponse } from "next/server";

const MAILERLITE_API = "https://connect.mailerlite.com/api/subscribers";

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

  const groupId = process.env.MAILERLITE_GROUP_ID;
  const res = await fetch(MAILERLITE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email,
      ...(groupId ? { groups: [groupId] } : {}),
      fields: { signup_source: body.source ?? "website" },
    }),
  });

  if (!res.ok && res.status !== 200 && res.status !== 201) {
    console.error("MailerLite subscribe failed", res.status, await res.text());
    return NextResponse.json(
      { error: "Something went wrong — please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
