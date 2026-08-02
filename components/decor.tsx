/* Hand-drawn decorative SVGs shared across the site. All colours come from
   currentColor or the palette so sections can tint them freely. */

export function Wave({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden
      className={`block w-full h-[45px] sm:h-[70px] ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path
        fill="currentColor"
        d="M0,45 C120,85 240,10 380,38 C520,66 610,88 760,52 C910,16 1020,70 1160,58 C1300,46 1380,20 1440,42 L1440,90 L0,90 Z"
      />
    </svg>
  );
}

export function Blob({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M43.6,-64.9C56.4,-56.1,66.5,-43.7,72.4,-29.4C78.2,-15.1,79.8,1,75.4,15.2C71,29.4,60.7,41.7,48.4,51.5C36.1,61.3,21.8,68.5,5.6,71.4C-10.5,74.2,-28.5,72.6,-42.3,64.2C-56.1,55.8,-65.6,40.6,-70.6,24.2C-75.6,7.8,-76,-9.8,-70.1,-24.7C-64.2,-39.7,-52,-51.9,-38.3,-60.4C-24.6,-68.9,-9.5,-73.7,3.4,-78.5C16.3,-83.3,30.8,-73.7,43.6,-64.9Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

export function Butterfly({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <g fill="currentColor">
        <ellipse cx="24" cy="24" rx="14" ry="12" opacity="0.85" />
        <ellipse cx="24" cy="42" rx="10" ry="9" opacity="0.7" />
        <ellipse cx="44" cy="24" rx="14" ry="12" opacity="0.85" />
        <ellipse cx="44" cy="42" rx="10" ry="9" opacity="0.7" />
        <rect x="32" y="18" width="4" height="32" rx="2" fill="#45311f" />
        <path
          d="M34 18 C30 10 24 8 22 6 M34 18 C38 10 44 8 46 6"
          stroke="#45311f"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function PawPrint({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <g fill="currentColor">
        <ellipse cx="32" cy="42" rx="14" ry="11" />
        <ellipse cx="14" cy="26" rx="6" ry="8" transform="rotate(-20 14 26)" />
        <ellipse cx="26" cy="18" rx="6" ry="8" transform="rotate(-6 26 18)" />
        <ellipse cx="38" cy="18" rx="6" ry="8" transform="rotate(6 38 18)" />
        <ellipse cx="50" cy="26" rx="6" ry="8" transform="rotate(20 50 26)" />
      </g>
    </svg>
  );
}

export function PawTrail({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-6 ${className}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <PawPrint
          key={i}
          className={`w-6 h-6 ${i % 2 ? "rotate-12 translate-y-1" : "-rotate-12"}`}
        />
      ))}
    </div>
  );
}

export function Leaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M52 8 C28 10 12 26 10 52 C36 54 54 36 52 8 Z"
      />
      <path
        d="M14 48 C24 36 36 24 48 14"
        stroke="#fdf6ea"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export function BrushUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 22"
      aria-hidden
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M4 14 C50 6 100 4 216 10 C160 12 60 14 10 18 Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

export function Sparkle({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`twinkle ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      <path
        fill="currentColor"
        d="M12 0 C13.2 7.4 16.6 10.8 24 12 C16.6 13.2 13.2 16.6 12 24 C10.8 16.6 7.4 13.2 0 12 C7.4 10.8 10.8 7.4 12 0 Z"
      />
    </svg>
  );
}

export function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 70" aria-hidden className={className}>
      <g fill="currentColor">
        <ellipse cx="60" cy="45" rx="50" ry="22" />
        <ellipse cx="110" cy="35" rx="42" ry="26" />
        <ellipse cx="155" cy="48" rx="40" ry="18" />
      </g>
    </svg>
  );
}

/** A butterfly that flies across its parent section on a winding path. */
export function FlightButterfly({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`butterfly-flight pointer-events-none absolute top-8 left-0 ${className}`}
    >
      <Butterfly className="w-9 h-9 animate-flutter" />
    </div>
  );
}

const FIREFLY_SPOTS = [
  { left: "6%", top: "18%", delay: 0 },
  { left: "14%", top: "62%", delay: 1200 },
  { left: "46%", top: "12%", delay: 2400 },
  { left: "68%", top: "70%", delay: 600 },
  { left: "84%", top: "28%", delay: 1800 },
  { left: "93%", top: "55%", delay: 3000 },
];

/** Softly glowing fireflies scattered over a jungle-toned section. */
export function Fireflies() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {FIREFLY_SPOTS.map((spot) => (
        <span
          key={`${spot.left}-${spot.top}`}
          className="firefly absolute"
          style={{
            left: spot.left,
            top: spot.top,
            animationDelay: `${spot.delay}ms, ${spot.delay}ms`,
          }}
        />
      ))}
    </div>
  );
}

/** Squiggly section heading with paw accents. */
export function SectionTitle({
  children,
  eyebrow,
  className = "",
}: {
  children: React.ReactNode;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <div className={`text-center ${className}`}>
      {eyebrow && (
        <p className="font-display text-tiger tracking-wide uppercase text-sm mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-ink">
        {children}
      </h2>
      <div className="mt-3 flex justify-center text-sunshine">
        <BrushUnderline className="w-40 h-4" />
      </div>
    </div>
  );
}
