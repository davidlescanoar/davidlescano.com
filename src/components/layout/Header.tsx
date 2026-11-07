"use client";

import { FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Wordmark } from "@/components/layout/Wordmark";
import type { NavItem } from "@/lib/content";
import { cn, pad2 } from "@/lib/utils";

interface Props {
  items: NavItem[];
  resumeUrl: string | null;
}

export function Header({ items, resumeUrl }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation (adjusting state during render, not in an effect).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  // Mobile menu: focus first link, trap Tab, Escape closes, lock scroll.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusables = () => Array.from(panel?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const els = [buttonRef.current, ...focusables()].filter((el): el is HTMLElement => Boolean(el));
      const first = els[0];
      const last = els[els.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300",
        scrolled || open ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1160px] items-center justify-between px-5 sm:px-8">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.92rem] text-muted transition-colors hover:text-ink",
                    "aria-[current=page]:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {resumeUrl ? (
            <a
              href={resumeUrl}
              className="ml-2 inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line px-4 text-[0.92rem] font-medium transition-colors hover:border-accent hover:text-accent"
            >
              <FileText className="size-4" aria-hidden />
              CV
            </a>
          ) : null}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-2"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg md:hidden"
      >
        <nav aria-label="Mobile" className="px-5 pt-6 pb-10">
          <ul className="flex flex-col">
            {items.map((item, i) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-baseline gap-4 font-display text-2xl font-medium"
                >
                  <span className="font-mono text-xs text-accent">{pad2(i + 1)}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {resumeUrl ? (
            <a
              href={resumeUrl}
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 font-medium text-accent-ink"
            >
              <FileText className="size-4" aria-hidden />
              Download CV
            </a>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
