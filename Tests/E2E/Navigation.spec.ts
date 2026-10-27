import { expect, test } from '@playwright/test';

const Routes = [
  { path: '/', heading: /Tu negocio merece/ },
  { path: '/projects', heading: /Seis demos/ },
  { path: '/services', heading: /Desde la primera pantalla/ },
  { path: '/lab', heading: /Funcionalidades que podés probar/ },
  { path: '/about', heading: /Hola|Pablo/ },
  { path: '/contact', heading: /Tu próximo proyecto/ },
];

test('all six public pages render from their direct URLs', async ({ page }) => {
  for (const route of Routes) {
    await page.goto(route.path);
    await expect(page.locator('main h1')).toContainText(route.heading);
    await expect(page).toHaveTitle(/PG Labs/);
  }
});

test('brand logo navigates back to the home page', async ({ page }) => {
  await page.goto('/services');
  await page.getByRole('link', { name: /PG Labs.*Home/ }).click();
  await expect(page).toHaveURL('/');
});

test('navigation links and direct case URLs work', async ({ page }) => {
  await page.goto('/');
  await page.locator('header').getByRole('link', { name: 'Proyectos' }).click();
  await expect(page).toHaveURL('/projects');
  await page.goto('/projects/academy');
  await expect(page.getByRole('heading', { name: /Aula Studio/ }).first()).toBeVisible();
  await page.getByRole('link', { name: /Volver a proyectos/ }).click();
  await expect(page).toHaveURL('/projects');
});

test('unknown paths display the not-found page', async ({ page }) => {
  await page.goto('/a-route-that-does-not-exist');
  await expect(page.locator('main')).toContainText(/no existe|encontrar/i);
});

test('critical pages do not throw uncaught JavaScript errors on load', async ({ page }) => {
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  for (const path of ['/', '/projects', '/lab', '/contact']) {
    await page.goto(path);
    await expect(page.locator('main h1')).toBeVisible();
  }
  expect(pageErrors).toEqual([]);
});
