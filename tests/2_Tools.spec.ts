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
// Finds all the tool cards on the page.
// Iterates over the first 3 visible cards.
// For each: // Makes sure it’s visible,
            // Clicks it,
           // Waits for the new page to fully load,
          // Then navigates back to the original page.


        //----------- EXTRA TESTS APPENDED BELOW -------------------

// test.only("Tools: View Site opens external site in new tab", async ({ page, context }) => {
//   await page.goto("https://aiaxio.com/");
//   await page.getByRole('button', { name: 'Sign In' }).click();
//   await page.locator('[data-testid="email-input"]').fill('xemixiw966@fanwn.com');
//   await page.locator('[data-testid="password-input"]').fill('Abc@123456');
//   await page.locator('[data-testid="submit-button"]').click();
//   await page.locator('[data-testid="nav-link-Tools"]').click();

//   const cards = page.locator('a[data-testid^="tool-card-link-"]');
//   await cards.first().click();

//   const viewSite = page.locator('[data-testid="view-site-button"], a:has-text("View Site")').first();
//   await expect(viewSite).toBeVisible();

//   const [newTab] = await Promise.all([
//     context.waitForEvent('page'),
//     viewSite.click()
//   ]);

//   await newTab.waitForLoadState('domcontentloaded');
//   expect(newTab.url()).not.toMatch(/aiaxio\.com/i);
//   await newTab.close();
// });


// test.only('Tools detail: View Site, Copy, Bookmark (after entering a tool card)', async ({ page, context }) => {
//   // 1) Sign in and go to Tools
//   await page.goto("https://aiaxio.com/");
//   await page.getByRole('button', { name: 'Sign In' }).click();
//   await page.getByTestId('email-input').fill('xemixiw966@fanwn.com');
//   await page.getByTestId('password-input').fill('Abc@123456');
//   await page.getByTestId('submit-button').click();

//   await page.getByTestId('nav-link-Tools').click();
//   await page.waitForLoadState('domcontentloaded');

//   // 2) Open the FIRST tool card and make sure we are on the detail page
//   const cards = page.locator('a[data-testid^="tool-card-link-"]');
//   await expect(cards.first()).toBeVisible({ timeout: 10000 });
//   await cards.first().click();

//   // The detail page has the "View Site" button (testid: visit-button). Wait for it → proves we're in detail view.
//   const visitBtn = page.getByTestId('visit-button').first();
//   await expect(visitBtn).toBeVisible({ timeout: 10000 });

//   // 3) Click "View Site" and assert a new tab opens to a non-aiaxio URL
//   const [newTab] = await Promise.all([
//     context.waitForEvent('page'),
//     visitBtn.click()
//   ]);
//   await newTab.waitForLoadState('domcontentloaded');
//   expect(newTab.url()).not.toMatch(/aiaxio\.com/i);
//   await newTab.close();

//   // 4) Click "Copy" (testid: copy-button) and expect feedback to change to "Copied"
//   const copyBtn = page.getByTestId('copy-button');
//   await expect(copyBtn).toBeVisible();
//   await copyBtn.scrollIntoViewIfNeeded();
//   await copyBtn.click();

//   // Some apps update the button text to "Copied" or show toast. We assert the button text contains "Copied".
//   await expect(copyBtn).toHaveText(/Copied/i, { timeout: 4000 });

//   // Optional: check the inline SVG (tick) renders (your button has an <svg> inside)
//   const copyTick = copyBtn.locator('svg');
//   await expect(copyTick).toBeVisible();

//   // 5) Bookmark toggle AFTER entering tool card
//   // There may be two possible states: bookmarked or not. Handle both gracefully.
//   const bookmarkedBtn = page.getByTestId('bookmark-button-bookmarked');      // already bookmarked state (from your snippet)
//   const unbookmarkedBtn = page.getByTestId('bookmark-button');               // if your app has an unbookmarked testid

//   if (await bookmarkedBtn.count()) {
//     await bookmarkedBtn.scrollIntoViewIfNeeded();
//     await bookmarkedBtn.click(); // toggles off (or at least proves it's clickable on detail page)
//   } else if (await unbookmarkedBtn.count()) {
//     await unbookmarkedBtn.scrollIntoViewIfNeeded();
//     await unbookmarkedBtn.click(); // toggles on
//   } else {
//     // If only one variant exists in your build, just interact with the known one
//     // (kept as a no-op fallback to avoid hard failure)
//   }

//   // Optional: if you want to assert a state change, add a small wait and check which one exists now.
//   // await page.waitForTimeout(300);
//   // expect( (await bookmarkedBtn.count()) + (await unbookmarkedBtn.count()) ).toBeGreaterThan(0);
// });
