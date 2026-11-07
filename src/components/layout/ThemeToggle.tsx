"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** False during server rendering and hydration, true afterwards. */
function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useHydrated();

  const isDark = hydrated && resolvedTheme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
    >
      {/* Both icons render; CSS shows the right one before hydration. */}
      <Sun className="hidden size-[18px] dark:block" aria-hidden />
      <Moon className="block size-[18px] dark:hidden" aria-hidden />
    </button>
  );
}
