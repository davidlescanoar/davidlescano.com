import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NoteCard } from "@/components/sections/Notes";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { getPublishedNotes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notes",
  description: "Notes from building things: engineering lessons, architecture decisions, and patterns.",
  alternates: { canonical: "/writing" },
};

/** Returns 404 until the first note is published, so there is never an empty blog. */
export default function WritingPage() {
  const notes = getPublishedNotes();
  if (notes.length === 0) notFound();
  return (
    <>
      <PageHeader eyebrow="Notes" title="Notes from building things" />
      <Container className="grid gap-5 md:grid-cols-2">
        {notes.map((n) => (
          <NoteCard key={n.slug} note={n} />
        ))}
      </Container>
    </>
  );
}
