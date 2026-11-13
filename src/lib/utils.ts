/** Joins class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Two-digit section index: 1 -> "01". */
export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Converts a CV-style month ("07/2024") to the machine-readable form `<time>` expects ("2024-07"). */
export function isoMonth(monthYear: string): string {
  const [month, year] = monthYear.split("/");
  return `${year}-${month}`;
}

/**
 * Formats an ISO date ("2026-11-15") for display. Parsed as UTC so the day
 * never shifts with the visitor's timezone.
 */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
