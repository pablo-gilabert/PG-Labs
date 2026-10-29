import { expect, test } from '@playwright/test';
import { assertAccessible } from './AccessibilityHelpers';

test('mobile home meets automated WCAG A/AA checks', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main h1')).toBeVisible();
  await assertAccessible(page);
});

test('open mobile navigation meets automated WCAG A/AA checks', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Abrir menú' }).click();
  await expect(page.getByRole('button', { name: 'Cerrar menú' })).toBeVisible();
  await assertAccessible(page);
});
