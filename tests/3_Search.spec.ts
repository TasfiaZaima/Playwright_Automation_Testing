 import { test, expect } from '@playwright/test';

test.only('Search types and clears value properly', async ({ page }) => {
  await page.goto("https://aiaxio.com/");

  // Login
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('[data-testid="email-input"]').fill('xemixiw966@fanwn.com');
  await page.locator('[data-testid="password-input"]').fill('Abc@123456');
  await page.locator('[data-testid="submit-button"]').click();
  await page.waitForTimeout(3000);

  // Type in search
  const searchInput = page.locator('[data-testid="tool-search-input"]');
  await searchInput.fill('Analytics');
  await expect(searchInput).toHaveValue('Analytics');
  await page.waitForLoadState('networkidle');

  // Clear field
  await searchInput.fill('');
  await expect(searchInput).toHaveValue('');
});

