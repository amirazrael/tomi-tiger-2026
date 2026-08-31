import Link from "next/link";
import InstagramLink from "./InstagramLink";
import { PawTrail, Wave } from "./decor";
import SignupForm from "./SignupForm";

export default function Footer({
  instagramUrl,
}: {
  instagramUrl?: string | null;
}) {
  return (
    <footer className="mt-auto">
      <div className="text-jungle-deep">
        <Wave />
      </div>
      <div className="bg-jungle-deep text-cream">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-10 pt-4">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <p className="font-display text-2xl mb-3">Tomi the Tiger</p>
              <p className="text-cream/80 text-sm leading-relaxed">
                Heart-warming picture books for ages 3–6 by April Summers,
                illustrated by Moonrags Studio. Published by Tiny Paws Press, Singapore.
              </p>
              {instagramUrl && (
                <div className="mt-4">
                  <InstagramLink url={instagramUrl} light />
                </div>
              )}
              <PawTrail className="mt-5 text-cream/30" />
            </div>
            <div>
              <p className="font-display text-lg mb-3">Explore</p>
              <ul className="space-y-2 text-sm text-cream/85">
                <li><Link className="hover:text-sunshine" href="/books">The Books</Link></li>
                <li><Link className="hover:text-sunshine" href="/about">About April & Tiny Paws Press</Link></li>
                <li><Link className="hover:text-sunshine" href="/parents-educators">For Parents & Educators</Link></li>
                <li><Link className="hover:text-sunshine" href="/school-visits">School Visits & Events</Link></li>
                <li><Link className="hover:text-sunshine" href="/press">Press & Media Kit</Link></li>
                <li><Link className="hover:text-sunshine" href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-display text-lg mb-3">Join Tomi&apos;s jungle post</p>
              <p className="text-cream/80 text-sm mb-4">
                A free colouring page now, and first news on new books later.
              </p>
              <SignupForm source="footer" buttonText="Join in" light />
            </div>
          </div>
          <div className="mt-10 border-t border-cream/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/60">
            <p>
              © {new Date().getFullYear()} Tiny Paws Press · Singapore · Made
              with a bouncy tail
            </p>
            <div className="flex gap-5">
              <Link className="hover:text-sunshine" href="/privacy">Privacy</Link>
              <Link className="hover:text-sunshine" href="/terms">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
