import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[0.95rem] font-medium transition-[transform,background-color,border-color,color] duration-200 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:brightness-110",
  secondary: "border border-line bg-surface text-ink hover:border-accent hover:text-accent",
  ghost: "text-ink hover:text-accent",
};

interface Props {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  download?: boolean;
  className?: string;
}

export function ButtonLink({ href, children, variant = "primary", external, download, className }: Props) {
  const classes = cn(base, variants[variant], className);
  if (external || download || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: true } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
