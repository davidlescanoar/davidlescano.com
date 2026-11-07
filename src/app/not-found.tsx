import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getProjects } from "@/lib/content";

export default function NotFound() {
  const next =
    getProjects().length > 0 ? { href: "/projects", label: "See projects" } : { href: "/about", label: "About me" };
  return (
    <Container className="flex min-h-[65vh] flex-col justify-center py-20">
      <p className="font-mono text-sm text-accent">404 · route not found</p>
      <h1 className="mt-4 max-w-2xl font-display text-5xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
        This request didn&rsquo;t <span className="marker">resolve</span>.
      </h1>
      <p className="mt-5 max-w-lg text-lg text-muted">
        The page may have moved, or the link had a typo. Nothing is broken on your side.
      </p>
      <pre
        aria-hidden
        className="mt-8 w-fit rounded-xl border border-line bg-surface px-4 py-3 font-mono text-xs text-muted"
      >
        {`GET /this-page\n→ 404 Not Found\n→ try: / or ${next.href}`}
      </pre>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 font-medium text-accent-ink"
        >
          Go home
        </Link>
        <Link
          href={next.href}
          className="inline-flex min-h-11 items-center rounded-full border border-line px-5 font-medium hover:border-accent hover:text-accent"
        >
          {next.label}
        </Link>
      </div>
    </Container>
  );
}
