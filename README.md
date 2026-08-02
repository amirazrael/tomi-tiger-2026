# tomithetiger.com

The website for the **Tomi the Tiger** picture book series by April Summers
(Tiny Paws Press, Singapore).

Built with Next.js (App Router) + TypeScript + Tailwind CSS + Sanity CMS,
designed for Vercel, with MailerLite email capture and Plausible analytics.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The site works immediately with built-in sample
content — no accounts or API keys needed for local preview.

## Going live: the three connections

Copy `.env.example` to `.env.local` and fill things in as you complete each
step. Everything degrades gracefully until then.

### 1. Sanity (the content dashboard)

1. Create a free account and project at https://www.sanity.io/manage
2. Copy the **Project ID** into `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID`
3. In the Sanity project settings, add `http://localhost:3000` and
   `https://tomithetiger.com` to **CORS origins** (with credentials)
4. Restart the dev server and open http://localhost:3000/studio — that's your
   dashboard. Add the 7 books, and the site switches from sample content to
   your real content automatically.

### 2. MailerLite (email signups)

1. In MailerLite: **Integrations → Developer API → Generate token**, put it in
   `.env.local` as `MAILERLITE_API_KEY`
2. Create a group (e.g. "Colouring Page") and put its ID in
   `MAILERLITE_GROUP_ID`; optionally a second group for contact-form
   enquiries in `MAILERLITE_CONTACT_GROUP_ID`
3. Create custom subscriber fields named `signup_source`, `name`,
   `contact_subject`, `contact_message` (Subscribers → Fields)
4. Set up an automation: "when someone joins the Colouring Page group, send
   the colouring page PDF" — that's the lead magnet delivery.

### 3. Vercel (hosting)

1. Push this folder to a GitHub repository
2. Import it at https://vercel.com/new
3. Add the same environment variables in the Vercel project settings
4. Point the `tomithetiger.com` domain at Vercel (it walks you through DNS)

Plausible analytics is already wired for the `tomithetiger.com` domain —
create the site at https://plausible.io when ready (paid after trial; the
site works fine without it).

## Where things live

- `app/(site)/` — all normal pages (home, books, about, press, …)
- `app/(lead)/free-colouring-page/` — distraction-free lead-magnet page
- `app/studio/` — the embedded Sanity dashboard
- `app/api/subscribe`, `app/api/contact` — MailerLite endpoints
- `sanity/schemaTypes/` — the content model (books, reviews, events, FAQs, …)
- `lib/seed.ts` — sample content shown until Sanity is connected
- `components/decor.tsx` — the hand-drawn SVG bits (waves, paws, butterflies)

## Content notes

- A book with **Coming soon** switched on (or with no buy links yet) shows a
  newsletter signup instead of buy buttons.
- Reviews marked **featured** appear on the homepage.
- Past events hide themselves automatically.
- The press strip on the homepage only appears once press items exist.
