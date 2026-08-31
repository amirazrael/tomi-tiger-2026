"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PawPrint } from "./decor";
import InstagramLink from "./InstagramLink";

const links = [
  { href: "/books", label: "The Books" },
  { href: "/about", label: "About" },
  { href: "/parents-educators", label: "Parents & Educators" },
  { href: "/school-visits", label: "School Visits" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact" },
];

export default function Header({
  announcement,
  instagramUrl,
}: {
  announcement?: string | null;
  instagramUrl?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40">
      {announcement && (
        <div className="bg-jungle-deep text-cream text-center text-sm font-semibold px-4 py-2">
          {announcement}
        </div>
      )}
      <div className="bg-cream/90 backdrop-blur border-b border-tiger/15">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-18">
            <Link
              href="/"
              className="flex items-center gap-2 group"
              onClick={() => setOpen(false)}
            >
              <span className="grid place-items-center w-10 h-10 rounded-full bg-tiger text-cream shadow-storybook transition-transform group-hover:-rotate-12">
                <PawPrint className="w-6 h-6" />
              </span>
              <span className="font-display text-xl sm:text-2xl text-tiger-deep leading-none">
                Tomi the Tiger
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`font-semibold text-sm transition-colors hover:text-tiger-deep ${
                    pathname.startsWith(l.href) ? "text-tiger-deep" : "text-ink-soft"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              {instagramUrl && (
                <InstagramLink
                  url={instagramUrl}
                  showHandle={false}
                  className="text-ink-soft hover:text-tiger-deep"
                />
              )}
              <Link
                href="/free-colouring-page"
                className="rounded-full bg-tiger px-5 py-2.5 font-display text-cream shadow-storybook transition hover:bg-tiger-deep hover:-translate-y-0.5"
              >
                Free Colouring Page
              </Link>
            </nav>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="lg:hidden grid place-items-center w-11 h-11 rounded-full bg-cream-deep text-tiger-deep"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav className="lg:hidden border-t border-tiger/15 bg-cream px-6 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 font-semibold text-ink hover:bg-cream-deep"
              >
                {l.label}
              </Link>
            ))}
            {instagramUrl && (
              <InstagramLink
                url={instagramUrl}
                showHandle={false}
                className="rounded-xl px-3 py-3 text-ink hover:bg-cream-deep hover:text-tiger-deep"
              />
            )}
            <Link
              href="/free-colouring-page"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-tiger px-5 py-3 text-center font-display text-cream shadow-storybook"
            >
              Free Colouring Page
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
