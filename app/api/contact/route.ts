import { NextResponse } from "next/server";
import { mailerLiteGroupsFromEnv } from "@/lib/mailerlite";

const MAILERLITE_API = "https://connect.mailerlite.com/api/subscribers";

/**
 * Contact enquiries are stored in MailerLite (per site owner's choice):
 * the sender is upserted as a subscriber in the "contact" group with the
 * message stored in custom fields, so every enquiry is visible in the
 * MailerLite dashboard alongside the mailing list.
 */
export async function POST(request: Request) {
  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "The contact form isn't switched on yet — please email hello@tomithetiger.com instead.",
      },
      { status: 503 }
    );
  }

  let body: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };
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
  if (!body.message?.trim()) {
    return NextResponse.json(
      { error: "Please write a message." },
      { status: 400 }
    );
  }

  const groups = mailerLiteGroupsFromEnv(process.env.MAILERLITE_CONTACT_GROUP_ID);
  const res = await fetch(MAILERLITE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email,
      ...(groups ? { groups } : {}),
      fields: {
        name: body.name?.trim().slice(0, 190) ?? "",
        contact_subject: body.subject?.trim().slice(0, 190) ?? "",
        contact_message: body.message.trim().slice(0, 950),
      },
    }),
  });

  if (!res.ok && res.status !== 200 && res.status !== 201) {
    console.error("MailerLite contact failed", res.status, await res.text());
    return NextResponse.json(
      { error: "Something went wrong — please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
