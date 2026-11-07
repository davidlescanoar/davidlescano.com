"use client";

import { ThemeProvider as NextThemes } from "next-themes";
import type { ReactNode } from "react";

/**
 * Follows the visitor's system theme until they pick one; a manual choice
 * is stored in localStorage. next-themes injects a blocking script, so
 * there is no flash of the wrong theme.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemes attribute="class" defaultTheme="system" enableSystem storageKey="dl-theme">
      {children}
    </NextThemes>
  );
}
