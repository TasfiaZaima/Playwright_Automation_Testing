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

test("Go to 4th Tool Card, View Site, Copy, and Bookmark", async ({ page }) => {
    await page.goto("https://aiaxio.com/");
    await page.locator('[data-testid="navbar-logo"]').click();
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.locator('[data-testid="email-input"]').fill('xemixiw966@fanwn.com');
    await page.locator('[data-testid="password-input"]').fill('Abc@123456');
    await page.locator('[data-testid="submit-button"]').click();
    await page.locator('[data-testid="nav-link-Tools"]').click();
    await page.waitForTimeout(5000);

    const fourthCard = page.locator('a[data-testid^="tool-card-link-"]').nth(3);
    await fourthCard.waitFor({ state: "visible", timeout: 10000 });
    await fourthCard.click();
    await page.waitForLoadState("networkidle");

    // Click "View Site" button
    const viewSiteBtn = page.locator('a[data-testid="visit-button"]');
    await viewSiteBtn.waitFor({ state: "visible", timeout: 10000 });
    await viewSiteBtn.click();
    await page.waitForTimeout(1500);

    // Click "Copy" button
    const copyBtn = page.locator('button[data-testid="copy-button"]');
    await copyBtn.waitFor({ state: "visible", timeout: 10000 });
    await copyBtn.click();
    await page.waitForTimeout(1500);

    // Click "Bookmark" button

    // const bookmarkBtn = page.locator('button[data-testid="bookmark-button"]');
    // await bookmarkBtn.waitFor({ state: "visible", timeout: 10000 });
    // await bookmarkBtn.click();
    // await page.waitForTimeout(1500);

    const bookmarkBtn = page.locator('button[data-testid="bookmark-button"], button[data-testid="bookmark-button-bookmarked"]');
    // wait for whichever is present because if already bookmarked, the state will change so we took both into account
    await expect(bookmarkBtn).toBeVisible({ timeout: 10000 });
    await bookmarkBtn.click();

});
test("Navigate to 10th Tool Card and click all section tabs", async ({ page }) => {
    await page.goto("https://aiaxio.com/");
    await page.locator('[data-testid="navbar-logo"]').click();
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.locator('[data-testid="email-input"]').fill('xemixiw966@fanwn.com');
    await page.locator('[data-testid="password-input"]').fill('Abc@123456');
    await page.locator('[data-testid="submit-button"]').click();
    await page.locator('[data-testid="nav-link-Tools"]').click();
    await page.waitForTimeout(5000);

    const tenthCard = page.locator('a[data-testid^="tool-card-link-"]').nth(1);
    await tenthCard.waitFor({ state: "visible", timeout: 10000 });
    await tenthCard.click();
    await page.waitForLoadState("networkidle");

    // Section tab names
    const tabNames = [
        "Description",
        "Pricing",
        "Release",
        "Review",
        "Pros & Cons",
        "Q&A",
        "Similar tool",
        "See more"
    ];

    for (const name of tabNames) {
        const tabBtn = page.getByRole('button', { name, exact: true });
        await tabBtn.waitFor({ state: "visible", timeout: 10000 });
        await tabBtn.click(); 
        await page.waitForTimeout(1000);
    }
});


test("Enter a random Tool Card, interact with buttons and tags, then click all section tabs", async ({ page }) => {
    await page.goto("https://aiaxio.com/");
    await page.locator('[data-testid="navbar-logo"]').click();
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.locator('[data-testid="email-input"]').fill('xemixiw966@fanwn.com');
    await page.locator('[data-testid="password-input"]').fill('Abc@123456');
    await page.locator('[data-testid="submit-button"]').click();
    await page.locator('[data-testid="nav-link-Tools"]').click();
    await page.waitForTimeout(5000);

    const cards = page.locator('a[data-testid^="tool-card-link-"]');
    const count = await cards.count();
    if (count === 0) {
        throw new Error("No tool cards found");
    }
    const randomIndex = Math.floor(Math.random() * count);
    const card = cards.nth(randomIndex);
    await card.waitFor({ state: "visible", timeout: 10000 });
    await card.click();
    await page.waitForLoadState("networkidle");

    // Click "View Site" button
    const viewSiteBtn = page.locator('a[data-testid="visit-button"]');
    await viewSiteBtn.waitFor({ state: "visible", timeout: 10000 });
    await viewSiteBtn.click();
    await page.waitForTimeout(1500);

    // Click "Copy" button
    const copyBtn = page.locator('button[data-testid="copy-button"]');
    await copyBtn.waitFor({ state: "visible", timeout: 10000 });
    await copyBtn.click();
    await page.waitForTimeout(1500);

    // Click "Bookmark" button
    const bookmarkBtn = page.locator('button[data-testid="bookmark-button"], button[data-testid="bookmark-button-bookmarked"]');
    await expect(bookmarkBtn).toBeVisible({ timeout: 10000 });
    await bookmarkBtn.click();
    await page.waitForTimeout(1500);

    // Click on all tags based on nth element
    const tags = page.locator('a[data-testid^="subtask-link-"]');
    const tagCount = await tags.count();
    for (let i = 0; i < tagCount; i++) {
        const tag = tags.nth(i);
        await tag.waitFor({ state: "visible", timeout: 10000 });
        await tag.click();
        await page.waitForTimeout(1000);
        await page.goBack();
        await page.waitForLoadState("networkidle");
    }

    // Click both "Popular alternative" buttons
    const popularAltBtns = page.locator('a[data-testid="popular-alternative-button"]');
    const altBtnCount = await popularAltBtns.count();
    for (let i = 0; i < altBtnCount; i++) {
        const altBtn = popularAltBtns.nth(i);
        await altBtn.waitFor({ state: "visible", timeout: 10000 });
        await altBtn.click();
        await page.waitForTimeout(1000);
        await page.goBack();
        await page.waitForLoadState("networkidle");
    }

    // Click all section tabs
    const tabNames = [
        "Description",
        "Pricing",
        "Release",
        "Review",
        "Pros & Cons",
        "Q&A",
        "Similar tool",
        "See more"
    ];
    for (const name of tabNames) {
        const tabBtn = page.getByRole('button', { name, exact: true });
        await tabBtn.waitFor({ state: "visible", timeout: 10000 });
        await tabBtn.click();
        await page.waitForTimeout(1000);
    }
});

// This test fails if there comes a non clickable tag on a random tool card but if one of the tabs are absent it works fine

test.only("Random Tool Card: interact, cross site, go back, click View All Trending", async ({ page }) => {
    await page.goto("https://aiaxio.com/");
    await page.locator('[data-testid="navbar-logo"]').click();
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.locator('[data-testid="email-input"]').fill('xemixiw966@fanwn.com');
    await page.locator('[data-testid="password-input"]').fill('Abc@123456');
    await page.locator('[data-testid="submit-button"]').click();
    await page.locator('[data-testid="nav-link-Tools"]').click();
    await page.waitForTimeout(5000);

    const cards = page.locator('a[data-testid^="tool-card-link-"]');
    const count = await cards.count();
    if (count === 0) {
        throw new Error("No tool cards found");
    }
    const randomIndex = Math.floor(Math.random() * count);
    const card = cards.nth(randomIndex);
    await card.waitFor({ state: "visible", timeout: 10000 });
    await card.click();
    await page.waitForLoadState("networkidle");

    // Click "View Site" button and cross site (go to external site, then go back)
    const viewSiteBtn = page.locator('a[data-testid="visit-button"]');
    await viewSiteBtn.waitFor({ state: "visible", timeout: 10000 });
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        viewSiteBtn.click()
    ]);
    await newPage.waitForLoadState("domcontentloaded");
    await newPage.close();
    await page.bringToFront();
    await page.waitForTimeout(1500);

    // Click "Copy" button
    const copyBtn = page.locator('button[data-testid="copy-button"]');
    await copyBtn.waitFor({ state: "visible", timeout: 10000 });
    await copyBtn.click();
    await page.waitForTimeout(1500);

    // Click "Bookmark" button
    const bookmarkBtn = page.locator('button[data-testid="bookmark-button"], button[data-testid="bookmark-button-bookmarked"]');
    await expect(bookmarkBtn).toBeVisible({ timeout: 10000 });
    await bookmarkBtn.click();
    await page.waitForTimeout(1500);

     //Click Task Link if present
    const taskLink = await page.$('a[data-testid="task-link"]');
     if (taskLink) {

    await taskLink.click();
    await page.waitForTimeout(1000);
    await page.goBack();
    await page.waitForLoadState("networkidle");

    }

    // Click on all tags based on nth element
    const tags = page.locator('a[data-testid^="subtask-link-"]');
    const tagCount = await tags.count();
    for (let i = 0; i < tagCount; i++) {
        const tag = tags.nth(i);
        await tag.waitFor({ state: "visible", timeout: 10000 });
        await tag.click();
        await page.waitForTimeout(1000);
        await page.goBack();
        await page.waitForLoadState("networkidle");
    }

    // Click  "Popular alternative" buttons
    const popularAltBtns = page.locator('a[data-testid="popular-alternative-button"]');
    const altBtnCount = await popularAltBtns.count();
    for (let i = 0; i < altBtnCount; i++) {
        const altBtn = popularAltBtns.nth(i);
        await altBtn.waitFor({ state: "visible", timeout: 10000 });
        await altBtn.click();
        await page.waitForTimeout(1000);
        await page.goBack();
        await page.waitForLoadState("networkidle");
    }
    // Click "View Alternatives" buttons
    const viewAlternativesBtn = page.locator('a[data-testid="view-alternatives-button"]');
    const viewAltCount = await viewAlternativesBtn.count();
    for (let i = 0; i < viewAltCount; i++) {
        const btn = viewAlternativesBtn.nth(i);
        await btn.waitFor({ state: "visible", timeout: 10000 });
        await btn.click();
        await page.waitForTimeout(1000);
        await page.goBack();
        await page.waitForLoadState("networkidle");
    }

    // Click all section tabs
    const tabNames = [
        "Description",
        "Pricing",
        "Release",
        "Review",
        "Pros & Cons",
        "Q&A",
        "Similar tool",
        "See more"
    ];
    for (const name of tabNames) {
        const tabBtn = page.getByRole('button', { name, exact: true });
        await tabBtn.waitFor({ state: "visible", timeout: 0 });
        await tabBtn.click();
        await page.waitForTimeout(1000);
    }

});

//show more, text reviews , trending view all, other view all - X






