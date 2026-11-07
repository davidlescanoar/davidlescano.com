import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.72rem] leading-5 text-muted">
      {children}
    </li>
  );
}

export function TagList({ items, label }: { items: string[]; label: string }) {
  if (items.length === 0) return null;
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  );
}
