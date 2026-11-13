import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getNotes } from "@/lib/content";
import type { Note } from "@/content/writing";
import { formatDate } from "@/lib/utils";

export function NoteCard({ note }: { note: Note }) {
  return (
    <article className="group relative rounded-[var(--radius-card)] border border-line bg-surface p-6 transition-colors hover:border-accent/60">
      <p className="font-mono text-xs text-muted">
        <time dateTime={note.date}>{formatDate(note.date)}</time>
      </p>
      <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
        <Link href={`/writing/${note.slug}`} className="after:absolute after:inset-0">
          {note.title}
        </Link>
      </h3>
      <p className="mt-2 text-muted">{note.summary}</p>
    </article>
  );
}

/** The home page shows it only once at least one note is published. */
export function Notes({ index }: { index: string }) {
  const notes = getNotes().slice(0, 3);
  return (
    <section id="notes" aria-labelledby="notes-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading id="notes-title" index={index} label="Writing" title="Notes from building things" />
        <div className="grid gap-5 md:grid-cols-3">
          {notes.map((n) => (
            <NoteCard key={n.slug} note={n} />
          ))}
        </div>
      </Container>
    </section>
  );
}
