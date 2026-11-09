/**
 * Projects and notes with `status: "draft"` are visible while running
 * `npm run dev`, so you can preview them, and are never built for
 * production.
 */
export const showDrafts = process.env.NODE_ENV === "development";
