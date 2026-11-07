import Link from "next/link";
import { site } from "@/config/site";

export function Wordmark() {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, home`}
      className="group inline-flex min-h-11 items-center font-display text-xl font-semibold tracking-tight"
    >
      <span>{site.firstName.toLowerCase()}</span>
      <span
        aria-hidden
        className="ml-0.5 inline-block size-2 translate-y-[5px] rounded-full bg-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-125"
      />
    </Link>
  );
}
