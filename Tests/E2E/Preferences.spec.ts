import { expect, test } from '@playwright/test';

test('first visit defaults to Spanish and dark mode', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('header img[src="/flags/Spain.svg"]')).toBeVisible();
});

test('language selector switches English, Portuguese and Spanish and persists', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Seleccionar idioma/ }).click();
  await page.getByRole('button', { name: /English/ }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('header img[src="/flags/England.svg"]')).toBeVisible();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('button', { name: /Select language/ }).click();
  await page.getByRole('button', { name: /Português/ }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt');
  await expect(page.locator('header img[src="/flags/Brazil.svg"]')).toBeVisible();
  await page.getByRole('button', { name: /Selecionar idioma/ }).click();
  await page.getByRole('button', { name: /Español/ }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
});

test('language selector closes with Escape', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: /Seleccionar idioma/ });
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('theme toggles and persists after navigation and reload', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.goto('/projects');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Cambiar a tema oscuro' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
