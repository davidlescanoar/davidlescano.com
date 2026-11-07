/**
 * Draft mode renders placeholders and unfinished content so you can see
 * where real content belongs. It is off unless NEXT_PUBLIC_SHOW_DRAFTS=true,
 * so production never shows draft material.
 */
export const showDrafts = process.env.NEXT_PUBLIC_SHOW_DRAFTS === "true";
