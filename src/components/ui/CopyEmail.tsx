"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

/** Copies the address and announces the result to screen readers. */
export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = window.setTimeout(() => setState("idle"), 2400);
    return () => window.clearTimeout(t);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 text-[0.95rem] font-medium transition-colors hover:border-accent hover:text-accent active:translate-y-px"
      >
        {state === "copied" ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
        {state === "copied" ? "Copied" : "Copy email"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied"
          ? "Email address copied to clipboard"
          : state === "failed"
            ? `Copy failed. The address is ${email}`
            : ""}
      </span>
    </>
  );
}
