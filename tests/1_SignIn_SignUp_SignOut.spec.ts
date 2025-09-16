import { test, expect } from '@playwright/test';
test('Sign up with random credentials and skip verification', async ({ page }) => {
  await page.goto('https://aiaxio.com/signup');
  function randomString(length: number) {
    return Math.random().toString(36).substring(2, 2 + length);
  }
  const name = `User${randomString(5)}`;
  const email = `${randomString(8)}@example.com`;
  const password = `P@ssw0rd${randomString(4)}`;

  await page.goto('https://aiaxio.com/signin/');
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Sign Up' }).click();
  await page.waitForLoadState('networkidle');
  await page.locator('[data-testid="name-input"]').fill(name);
  //await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);
  await page.locator('[data-testid="email-input"]').fill(email);
  //await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);
  await page.locator('[data-testid="password-input"]').fill(password);
  await page.waitForTimeout(1500);
  await page.locator('[data-testid="confirm-password-input"]').fill(password);
  await page.waitForTimeout(1500);
  await page.locator('[data-testid="submit-button"]').click();
  await page.waitForLoadState('networkidle');

  // Skip verification if possible
  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL(/email-?verification/i); // adjust if your flow differs
});

test.only("Sign out after Sign In", async ({ page }) => {
await page.goto("https://aiaxio.com/");

await page.locator('[data-testid="navbar-logo"]').click();
await page.getByRole('button', { name: 'Sign In' }).click();
await page.locator('[data-testid="email-input"]').click();
await page.locator('[data-testid="email-input"]').fill('xemixiw966@fanwn.com');
await page.locator('[data-testid="password-input"]').click();
await page.locator('[data-testid="password-input"]').fill('Abc@123456');
await page.locator('[data-testid="submit-button"]').click();
await page.locator('[data-testid="user-profile-link"]').click();
await page.waitForTimeout(1500);
await page.locator('[data-testid="dropdown-sign-out-button"]').click();
await page.waitForTimeout(500);
});
