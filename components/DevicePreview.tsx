"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "device-preview-preset";

const PRESETS = [
  { id: "desktop", label: "Desktop", width: null as number | null },
  { id: "ipad", label: "iPad", width: 820 },
  { id: "iphone", label: "iPhone", width: 390 },
  { id: "iphone-se", label: "SE", width: 375 },
] as const;

type PresetId = (typeof PRESETS)[number]["id"];

function isPresetId(value: string): value is PresetId {
  return PRESETS.some((preset) => preset.id === value);
}

/** Dev-only responsive preview frame with common device width presets. */
export default function DevicePreview({
  children,
}: {
  children: React.ReactNode;
}) {
  const [presetId, setPresetId] = useState<PresetId>("desktop");

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved && isPresetId(saved)) setPresetId(saved);
  }, []);

  function selectPreset(id: PresetId) {
    setPresetId(id);
    sessionStorage.setItem(STORAGE_KEY, id);
  }

  const preset = PRESETS.find((item) => item.id === presetId) ?? PRESETS[0];
  const constrained = preset.width !== null;

  return (
    <div
      className={`flex min-h-full flex-1 flex-col ${constrained ? "bg-ink/10" : ""}`}
    >
      <div
        className={`mx-auto flex w-full flex-1 flex-col transition-[max-width] duration-300 ${
          constrained ? "bg-cream shadow-storybook" : ""
        }`}
        style={constrained ? { maxWidth: preset.width! } : undefined}
      >
        {children}
      </div>

      <div
        className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full border border-tiger/20 bg-paper/95 px-2 py-1.5 font-body text-xs shadow-lifted backdrop-blur"
        role="toolbar"
        aria-label="Device preview sizes"
      >
        <span className="hidden px-2 font-display text-[0.65rem] tracking-wide text-ink-soft uppercase sm:inline">
          Preview
        </span>
        {PRESETS.map((item) => {
          const active = item.id === presetId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => selectPreset(item.id)}
              aria-pressed={active}
              className={`rounded-full px-3 py-1.5 font-display text-sm transition ${
                active
                  ? "bg-tiger text-cream shadow-storybook"
                  : "text-ink-soft hover:bg-cream-deep hover:text-tiger-deep"
              }`}
            >
              {item.label}
            </button>
          );
        })}
        <span className="ml-1 hidden border-l border-tiger/15 pl-2 font-semibold text-ink-soft sm:inline">
          {preset.width ? `${preset.width}px` : "Full"}
        </span>
      </div>
    </div>
  );
}
