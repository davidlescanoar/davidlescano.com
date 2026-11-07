import { Mail } from "lucide-react";
import type { ReactElement } from "react";
import { site } from "@/config/site";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** Icon links for whatever profiles are configured. Renders nothing if none are. */
export function SocialLinks({ className, includeEmail = false }: { className?: string; includeEmail?: boolean }) {
  const links = [
    site.githubUrl && { href: site.githubUrl, label: "GitHub", icon: <GitHubIcon />, external: true },
    site.linkedinUrl && { href: site.linkedinUrl, label: "LinkedIn", icon: <LinkedInIcon />, external: true },
    includeEmail &&
      site.email && {
        href: `mailto:${site.email}`,
        label: "Email",
        icon: <Mail className="size-[18px]" aria-hidden />,
        external: false,
      },
  ].filter((l): l is { href: string; label: string; icon: ReactElement; external: boolean } => Boolean(l));

  if (links.length === 0) return null;

  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            aria-label={`${site.firstName} on ${link.label}`}
            className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-accent"
            {...(link.external ? { target: "_blank", rel: "noopener noreferrer me" } : {})}
          >
            {link.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
