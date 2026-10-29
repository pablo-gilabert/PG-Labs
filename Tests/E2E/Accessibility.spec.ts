import { expect, test } from '@playwright/test';
import { assertAccessible } from './AccessibilityHelpers';

// Representative public routes are audited in the default Spanish/dark appearance.
const Routes = [
  { name: 'home', path: '/' },
  { name: 'projects', path: '/projects' },
  { name: 'services', path: '/services' },
  { name: 'laboratory', path: '/lab' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
  { name: 'case study', path: '/projects/burger' },
];

for (const route of Routes) {
  test(`${route.name} meets automated WCAG A/AA checks`, async ({ page }) => {
    await page.goto(route.path);
    await expect(page.locator('main h1')).toBeVisible();
    await assertAccessible(page);
  });
}

test('light theme meets automated WCAG A/AA checks', async ({ page }) => {
  await page.goto('/projects');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await assertAccessible(page);
});

test('English localization meets automated WCAG A/AA checks', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Seleccionar idioma/ }).click();
  await page.getByRole('button', { name: /English/ }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await assertAccessible(page);
});

test('Portuguese localization meets automated WCAG A/AA checks', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Seleccionar idioma/ }).click();
  await page.getByRole('button', { name: /Português/ }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt');
  await assertAccessible(page);
});

test('student creation modal meets automated WCAG A/AA checks', async ({ page }) => {
  await page.goto('/lab');
  await page.getByRole('button', { name: 'Nuevo alumno' }).click();
  await expect(page.locator('.swal2-popup')).toBeVisible();
  await assertAccessible(page);
});
