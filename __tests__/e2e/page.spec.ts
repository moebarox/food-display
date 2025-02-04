import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Home page', () => {
  test('should navigate to the home page', async ({ page }) => {
    // Check the URL
    await expect(page).toHaveURL('http://127.0.0.1:3000');

    // Check form search element
    await expect(page.getByTestId('searchbox')).toBeVisible();
    await expect(page.getByTestId('search-button')).toBeVisible();

    // Check category filter element
    const categoryFilters = await page.getByTestId(/category-\w+/i).all();
    for (const category of categoryFilters) {
      await expect(category).toBeVisible();
    }

    // Check food card catalog
    const foodCards = await page.getByTestId(/catalog-item-\w+/i).all();
    for (const item of foodCards) {
      await expect(item).toBeVisible();
    }
    await expect(page.getByTestId('catalog-more')).toBeVisible();
  });

  test('should be able to search by name', async ({ page }) => {
    const searchbox = await page.getByTestId('searchbox');

    // Simulate search
    await searchbox.fill('pizza');
    await searchbox.press('Enter');

    // Check the URL
    await expect(page).toHaveURL('http://127.0.0.1:3000?keywords=pizza');

    // Check the food results
    const foodCards = await page.getByTestId(/catalog-item-\w+/i).all();
    for (const item of foodCards) {
      await expect(item).toContainText(/pizza/i);
    }
  });

  test('should be able to filter by category', async ({ page }) => {
    const category = await page
      .getByTestId(/category-\w+/i)
      .getByText('Drinks');

    // Simulate filter by category
    await category.click();

    // Check the URL
    await expect(page).toHaveURL(/http:\/\/127\.0\.0\.1:3000\/\?category=\w+/);

    // Check the food results
    const foodCards = await page.getByTestId(/catalog-item-\w+/i).all();
    for (const item of foodCards) {
      await expect(item).toContainText('Drinks');
    }
  });

  test('should be able to load more food', async ({ page }) => {
    const moreButton = await page.getByTestId('catalog-more');

    // Simulate load more data
    await moreButton.click();

    // Wait for request finished
    await page.waitForLoadState('networkidle');

    // Check the food results
    const count = await page.getByTestId(/catalog-item-\w+/i).count();
    await expect(count).toBeGreaterThan(9);
  });
});
