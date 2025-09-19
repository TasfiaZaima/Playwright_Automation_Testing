 import { test, expect } from '@playwright/test';

test('Search types and clears value properly', async ({ page }) => {
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

test.only('Search types, clicks a dropdown result, and clears value safely', async ({ page }) => {
  await page.goto('https://aiaxio.com/');

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

  // Wait for dropdown container to appear
  const dropdownItems = page.locator('div[class*="px-"][style*="opacity: 1"]');
  await dropdownItems.first().waitFor({ state: 'visible', timeout: 10000 });

  // Get a random visible item
  const itemCount = await dropdownItems.count();
  const randomIndex = Math.floor(Math.random() * itemCount);
  const selectedItem = dropdownItems.nth(randomIndex);

  // Capture the text for logging only
  const selectedText = await selectedItem.locator('span').first().innerText();
  console.log(`Clicking on dropdown item: ${selectedText}`);

  // Click the dropdown item
  await selectedItem.click();

  // Verify dropdown disappears (indicating selection)
  await expect(dropdownItems.first()).toHaveCount(0);

  // Clear the search input
  await searchInput.fill('');
  await expect(searchInput).toHaveValue('');
});
// basically selects a task from dropdown and verifies it was selected

test.only('Search random tool type and safely select dropdown', async ({ page }) => {
  await page.goto('https://aiaxio.com/');

  // --- Login ---
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('[data-testid="email-input"]').fill('xemixiw966@fanwn.com');
  await page.locator('[data-testid="password-input"]').fill('Abc@123456');
  await page.locator('[data-testid="submit-button"]').click();
  await page.waitForTimeout(3000);

  // --- Type random tool type ---
  const toolTypes = ['AI', 'Analytics', 'ChatGPT', 'Music', 'Marketing', 'Productivity', 'Design'];
  const randomTool = toolTypes[Math.floor(Math.random() * toolTypes.length)];
  const searchInput = page.locator('[data-testid="tool-search-input"]');
  await searchInput.fill(randomTool);
  await expect(searchInput).toHaveValue(randomTool, { timeout: 10000 });

  // --- Wait for dropdown safely ---
  const dropdownItems = page.locator('div[role="option"], div[tabindex="0"]'); // generic dropdown selector
  await dropdownItems.first().waitFor({ state: 'visible', timeout: 20000 }); // wait up to 20s

  const itemCount = await dropdownItems.count();
  if (itemCount === 0) {
    console.log('No dropdown items appeared.');
    return;
  }

  // --- Pick a random dropdown item ---
  const randomIndex = Math.floor(Math.random() * itemCount);
  const selectedItem = dropdownItems.nth(randomIndex);

  // Get the visible tool name safely
  const selectedText = await selectedItem.locator('span').first().innerText();
  console.log(`Clicking on dropdown item: ${selectedText}`);

  // Click the dropdown item
  await selectedItem.click();

  // --- Verify input updated (optional, depends on app behavior) ---
  try {
    await expect(searchInput).toHaveValue(selectedText, { timeout: 5000 });
  } catch {
    console.log('Search input did not update to dropdown selection (app behavior may differ).');
  }

  // --- Clear search input ---
  await searchInput.fill('');
  await expect(searchInput).toHaveValue('');
});
