import { test, expect } from '@playwright/test';
test("Sign In and Navigate to Tools and click on the first 3 Tool Cards (nth child)", async ({ page }) => {
await page.goto("https://aiaxio.com/");

await page.locator('[data-testid="navbar-logo"]').click();
await page.getByRole('button', { name: 'Sign In' }).click();
await page.locator('[data-testid="email-input"]').click();
await page.locator('[data-testid="email-input"]').fill('xemixiw966@fanwn.com');
await page.locator('[data-testid="password-input"]').click();
await page.locator('[data-testid="password-input"]').fill('Abc@123456');
await page.locator('[data-testid="submit-button"]').click();
await page.locator('[data-testid="nav-link-Tools"]').click();
await page.waitForTimeout(5000);

const cards = page.locator('a[data-testid^="tool-card-link-"]');
const count = await cards.count();

for (let i = 0; i < Math.min(3, count); i++) {
    const card = cards.nth(i);
    const isAttached = await card.isVisible().catch(() => false);
    if (!isAttached) {
        continue;
    }
    await card.waitFor({ state: "visible", timeout: 10000 });
    await card.click();
    await page.waitForLoadState("networkidle");
    await page.goBack();
}
});