/**
 * Wording rules from AGENTS.md, shared by the unit tests (content files,
 * including drafts) and the e2e tests (the rendered text of every page).
 */
export const contentRules: { rule: string; pattern: RegExp }[] = [
  { rule: "never claims a degree", pattern: /\b(bachelor|master'?s|degree|thesis|graduated)\b/i },
  { rule: "never shows achievement percentages", pattern: /\d+\s?%/ },
  { rule: "never publishes a street address", pattern: /\b\p{L}+(straße|strasse|str\.)\s*\d+/iu },
  { rule: "never publishes a phone number", pattern: /\+\d{2}[\d\s/-]{8,}/ },
];

/** Names of the rules the text breaks, empty when it follows all of them. */
export function brokenContentRules(text: string): string[] {
  return contentRules.filter(({ pattern }) => pattern.test(text)).map(({ rule }) => rule);
}
