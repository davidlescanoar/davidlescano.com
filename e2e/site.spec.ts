import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const pages = ["/", "/about", "/does-not-exist"];

async function expectNoA11yViolations(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([]);
}

test.describe("home page", () => {
  test("shows who David is and how to reach him", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("David");
    await expect(page.getByText("German citizen, no visa required").first()).toBeVisible();
    await expect(page.getByRole("link", { name: /download cv/i }).first()).toHaveAttribute(
      "href",
      "/david-lescano-cv.pdf",
    );
    await expect(page.locator("#experience")).toContainText("Glofy LLC");
    await expect(page.locator("#contact").getByRole("link", { name: /get in touch/i })).toHaveAttribute(
      "href",
      /^mailto:/,
    );
  });

  test("never renders draft placeholders in production", async ({ page }) => {
    for (const path of ["/", "/about"]) {
      await page.goto(path);
      await expect(page.getByText("DRAFT", { exact: true })).toHaveCount(0);
    }
  });

  test("hides the projects section and route while there are no projects", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#work")).toHaveCount(0);
    const response = await page.goto("/projects");
    expect(response?.status()).toBe(404);
  });

  test("publishes structured data for search engines", async ({ page }) => {
    await page.goto("/");
    const json = await page.locator('script[type="application/ld+json"]').textContent();
    expect(JSON.parse(json ?? "{}")).toMatchObject({ "@type": "Person", name: "David Lescano" });
  });
});

test.describe("navigation", () => {
  test("desktop nav reaches every section", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop navigation only");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    await nav.getByRole("link", { name: "Experience" }).click();
    await expect(page).toHaveURL(/#experience$/);
    await nav.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Munich");
  });

  test("mobile menu opens, traps focus and closes with Escape", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile menu only");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    const menu = page.getByRole("navigation", { name: "Mobile" });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link").first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  });
});

test.describe("theme", () => {
  test("follows the system theme and remembers a manual choice", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/dark/);

    await page.getByRole("button", { name: "Switch to light theme" }).first().click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
    await page.reload();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });
});

test.describe("assets and metadata", () => {
  test("serves the CV as a PDF", async ({ request }) => {
    const response = await request.get("/david-lescano-cv.pdf");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
  });

  test("sends security headers", async ({ request }) => {
    const headers = (await request.get("/")).headers();
    expect(headers["content-security-policy"]).toContain("default-src 'self'");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["x-powered-by"]).toBeUndefined();
  });

  test("lists only real pages in the sitemap", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml).toContain("https://davidlescano.com/about");
    expect(xml).not.toContain("/projects");
  });

  test("shows a friendly 404", async ({ page }) => {
    const response = await page.goto("/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("link", { name: "Go home" })).toBeVisible();
  });
});

test.describe("accessibility", () => {
  for (const scheme of ["light", "dark"] as const) {
    for (const path of pages) {
      test(`${path} has no axe violations in ${scheme} mode`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: "reduce" });
        await page.goto(path);
        await expectNoA11yViolations(page);
      });
    }
  }
});
