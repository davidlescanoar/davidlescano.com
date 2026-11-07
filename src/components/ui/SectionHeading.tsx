import type { ReactNode } from "react";

interface Props {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
}

/** Numbered section heading: a mono index, a label, and a display title. */
export function SectionHeading({ index, label, title, intro, id }: Props) {
  return (
    <div className="mb-10 max-w-2xl sm:mb-14">
      <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-[0.14em] text-muted uppercase">
        <span className="text-accent">{index}</span>
        <span aria-hidden className="h-px w-8 bg-line" />
        {label}
      </p>
      <h2
        id={id}
        className="font-display text-[2.15rem] leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl"
      >
        {title}
      </h2>
      {intro ? <p className="mt-4 text-lg text-muted">{intro}</p> : null}
    </div>
  );
}
