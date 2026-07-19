import { expect, test } from "@playwright/test";

test("primary destinations render without browser-console errors", async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });

  await page.goto("/");
  await expect(page.locator('main[data-hydrated="true"]')).toBeVisible();
  const navigation = page.locator(".topbar nav");

  await expect(page.getByText("TWO WAYS TO STUDY")).toBeVisible();
  await page.getByRole("button", { name: "D2 Advanced" }).click();
  await expect(page.getByText("Both modes use your D2 path.")).toBeVisible();

  await navigation.getByRole("button", { name: "Practice" }).click();
  await expect(page.getByRole("heading", { name: "18 questions, balanced across the official categories" })).toBeVisible();

  await navigation.getByRole("button", { name: "Math & formulas" }).click();
  await expect(page.getByRole("heading", { name: "Understand it. Work it. Check the official sheet." })).toBeVisible();

  await navigation.getByRole("button", { name: "Certification" }).click();
  await expect(page.getByRole("heading", { name: "Only the decisions you need to make next." })).toBeVisible();

  await navigation.getByRole("button", { name: "Glossary" }).click();
  await expect(page.getByRole("heading", { name: "Words you can use with confidence" })).toBeVisible();

  await navigation.getByRole("button", { name: "Learn" }).click();
  await expect(page.getByText("TWO WAYS TO STUDY")).toBeVisible();
  expect(consoleErrors).toEqual([]);
});
