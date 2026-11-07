import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="pt-12 pb-12 sm:pt-20 sm:pb-16">
      <Container>
        <p className="mb-5 font-mono text-xs tracking-[0.14em] text-muted uppercase">{eyebrow}</p>
        <h1 className="max-w-3xl font-display text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.03em] text-balance sm:text-6xl">
          {title}
        </h1>
        {intro ? <p className="mt-5 max-w-2xl text-lg text-muted">{intro}</p> : null}
        {children}
      </Container>
    </header>
  );
}
