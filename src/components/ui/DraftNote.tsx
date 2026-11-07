import type { ReactNode } from "react";
import { showDrafts } from "@/lib/drafts";
import { cn } from "@/lib/utils";

/**
 * A clearly marked placeholder. Renders nothing unless draft mode is on,
 * so it can be left in components safely.
 */
export function DraftNote({ children, className }: { children: ReactNode; className?: string }) {
  if (!showDrafts) return null;
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-peach bg-peach/10 px-4 py-3 font-mono text-xs leading-relaxed text-ink",
        className,
      )}
    >
      <span className="mr-2 rounded bg-peach px-1.5 py-0.5 font-semibold text-[#3b1f08]">DRAFT</span>
      {children}
    </div>
  );
}
