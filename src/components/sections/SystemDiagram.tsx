"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The hero's one interactive detail: a three-layer system drawn like a
 * blueprint. A request packet travels from interface to data and back.
 * Hovering or focusing a layer highlights it and explains what David does
 * there. Works fully without motion and without a pointer.
 */

const layers = [
  {
    id: "interface",
    label: "Interface",
    stack: "React · TypeScript · Next.js",
    note: "Interfaces that feel obvious to use: accessible, fast, and clear about what happens next.",
  },
  {
    id: "api",
    label: "API",
    stack: "C# · .NET Core · Node.js · REST",
    note: "Services with clear contracts, predictable errors, and code the next person can change safely.",
  },
  {
    id: "data",
    label: "Data",
    stack: "PostgreSQL · SQL Server",
    note: "Data models that stay understandable as the product grows.",
  },
] as const;

type LayerId = (typeof layers)[number]["id"];

const defaultNote = "Point at a layer, or focus one with Tab, to see what I care about there.";

export function SystemDiagram() {
  const [active, setActive] = useState<LayerId | null>(null);
  const current = layers.find((l) => l.id === active);

  return (
    <figure className="relative">
      <div className="blueprint relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-[var(--shadow-card)] sm:p-7">
        <div className="mb-5 flex items-center justify-between font-mono text-[0.68rem] tracking-[0.12em] text-muted uppercase">
          <span>fig. 01 — a request, end to end</span>
          <span aria-hidden className="flex gap-1">
            <span className="size-2 rounded-full bg-line" />
            <span className="size-2 rounded-full bg-line" />
            <span className="size-2 rounded-full bg-peach" />
          </span>
        </div>

        <div className="relative">
          {/* Connector rail and travelling packet. */}
          {/* Rows are a fixed 68px with 14px gaps, so centres sit 82px apart. */}
          <div
            aria-hidden
            className="absolute top-[34px] bottom-[34px] left-[27px] w-px border-l border-dashed border-muted/50"
          />
          <div
            aria-hidden
            className="packet absolute top-[29.5px] left-[23px] z-10 size-[9px] rounded-full bg-peach shadow-[0_0_0_4px_var(--surface)]"
            style={{ ["--travel" as string]: "164px" }}
          />

          <ul className="relative space-y-3.5">
            {layers.map((layer, i) => {
              const dim = active !== null && active !== layer.id;
              const on = active === layer.id;
              return (
                <li key={layer.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(layer.id)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(layer.id)}
                    onBlur={() => setActive(null)}
                    onClick={() => setActive(on ? null : layer.id)}
                    aria-pressed={on}
                    aria-describedby="diagram-note"
                    className={cn(
                      "flex h-[68px] w-full items-center gap-4 rounded-2xl border bg-bg/70 p-3 pr-4 text-left backdrop-blur-[2px] transition-all duration-300",
                      on ? "border-accent shadow-[0_0_0_4px_var(--highlight)]" : "border-line",
                      dim && "opacity-45",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-[30px] shrink-0 place-items-center rounded-full border font-mono text-[0.7rem] transition-colors",
                        on ? "border-accent bg-accent text-accent-ink" : "border-line bg-surface text-muted",
                      )}
                    >
                      0{i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[1.05rem] font-semibold">{layer.label}</span>
                      <span className="block truncate font-mono text-[0.72rem] text-muted">{layer.stack}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <p
          id="diagram-note"
          aria-live="polite"
          className="mt-5 min-h-[3.2em] border-t border-dashed border-line pt-4 text-[0.92rem] leading-snug text-muted"
        >
          {current ? (
            <>
              <span className="font-medium text-ink">{current.label}. </span>
              {current.note}
            </>
          ) : (
            defaultNote
          )}
        </p>
      </div>
      <figcaption className="sr-only">
        Diagram of an application in three layers, interface, API and data, which David works across.
      </figcaption>
    </figure>
  );
}
