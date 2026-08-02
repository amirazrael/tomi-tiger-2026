import { NextStudio } from "next-sanity/studio";
import Link from "next/link";
import config from "@/sanity.config";
import { sanityConfigured } from "@/lib/sanity/client";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!sanityConfigured) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-cream px-6">
        <div className="max-w-lg rounded-3xl bg-paper p-8 shadow-storybook">
          <h1 className="font-display text-2xl text-tiger-deep mb-4">
            The Studio isn&apos;t connected yet
          </h1>
          <p className="mb-3">
            To switch on the content dashboard, create a free project at{" "}
            <a
              className="text-jungle-deep underline"
              href="https://www.sanity.io/manage"
            >
              sanity.io/manage
            </a>{" "}
            and add its ID to <code>.env.local</code>:
          </p>
          <pre className="rounded-xl bg-cream-deep p-4 text-sm mb-4">
            {"NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id\nNEXT_PUBLIC_SANITY_DATASET=production"}
          </pre>
          <p className="text-ink-soft text-sm">
            Until then, the site runs on built-in sample content.{" "}
            <Link href="/" className="text-jungle-deep underline">
              Back to the site
            </Link>
          </p>
        </div>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
