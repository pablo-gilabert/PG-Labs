import { expect, test } from '@playwright/test';

test('mobile navbar opens, navigates, and closes', async ({ page }) => {
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Abrir menú' });
  await expect(menu).toBeVisible();
  await menu.click();
  await expect(page.getByRole('button', { name: 'Cerrar menú' })).toBeVisible();
  await page.locator('header').getByRole('link', { name: 'Proyectos' }).click();
  await expect(page).toHaveURL('/projects');
  await expect(page.getByRole('button', { name: 'Abrir menú' })).toBeVisible();
});

test('mobile screens have no unintended horizontal page overflow', async ({ page }) => {
  for (const width of [320, 375, 430]) {
    await page.setViewportSize({ width, height: 850 });
    for (const path of ['/', '/projects', '/lab', '/contact']) {
      await page.goto(path);
      await expect(page.locator('main h1')).toBeVisible();
      const metrics = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
      }));
      expect(metrics.scrollWidth, `${path} must fit viewport width ${width}`).toBeLessThanOrEqual(metrics.viewportWidth + 1);
    }
  }
});

test('SweetAlert2 dialogs remain visible on small screens', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 780 });
  await page.goto('/lab');
  await page.getByRole('button', { name: 'Nuevo alumno' }).click();
  const popup = page.locator('.swal2-popup');
  await expect(popup).toBeVisible();
  const bounds = await popup.boundingBox();
  expect(bounds).not.toBeNull();
  if (bounds) {
    expect(bounds.x).toBeGreaterThanOrEqual(-1);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(376);
  }
  await popup.locator('.swal2-cancel').click();
});
