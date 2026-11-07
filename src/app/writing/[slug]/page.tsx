import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { getPublishedNotes } from "@/lib/content";
import { formatDate } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPublishedNotes().map((n) => ({ slug: n.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const note = getPublishedNotes().find((n) => n.slug === slug);
  if (!note) return {};
  return { title: note.title, description: note.summary, alternates: { canonical: `/writing/${note.slug}` } };
}

export default async function NotePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const note = getPublishedNotes().find((n) => n.slug === slug);
  if (!note) notFound();
  return (
    <Container className="max-w-[720px] py-16">
      <p className="font-mono text-xs text-muted">
        <time dateTime={note.date}>{formatDate(note.date)}</time>
      </p>
      <h1 className="mt-3 font-display text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
        {note.title}
      </h1>
      <div className="mt-10 space-y-5 text-[1.08rem] leading-relaxed">
        {note.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </Container>
  );
}
