import { expect, test } from '@playwright/test';

const Cases = [
  ['burger', 'Blend Burger', 'https://blend-burger-demo.vercel.app/'],
  ['academy', 'Aula Studio', 'https://aula-studio-demo-eosin.vercel.app/login'],
  ['salon', 'The Perfect Cut', 'https://peluqueria-demo-gilt.vercel.app/'],
  ['tattoo', 'UMBRAL', 'https://tattoo-studio-demo-teal.vercel.app/'],
  ['store', 'Dummy Data Store', 'https://dummy-data-tawny-three.vercel.app/'],
  ['restaurant', 'Maison Aster', 'https://restaurant-demo-iota-taupe.vercel.app/'],
] as const;

test('all six case cards render and have exact published demo links', async ({ page }) => {
  await page.goto('/projects');
  const cards = page.locator('main article').filter({ has: page.locator('h3') });
  await expect(cards).toHaveCount(6);
  for (const [id, title, href] of Cases) {
    const card = cards.filter({ has: page.getByRole('heading', { name: title, exact: true }) });
    await expect(card).toBeVisible();
    await expect(card.locator(`a[href="/projects/${id}"]`)).toHaveCount(1);
    await expect(card.locator('a[target="_blank"]').filter({ hasText: /Ver sitio/ })).toHaveAttribute('href', href);
  }
});

test('filter counts match project categories', async ({ page }) => {
  await page.goto('/projects');
  // Count project cards themselves, not their heading descendants: the academy
  // artwork includes an additional decorative h3 inside its aria-hidden preview.
  const projectCards = page.locator('main article').filter({
    has: page.locator('a[href^="/projects/"]'),
  });
  await expect(projectCards).toHaveCount(6);
  await page.getByRole('button', { name: /Gastronomía/ }).click();
  await expect(projectCards).toHaveCount(2);
  await page.getByRole('button', { name: /Educación/ }).click();
  await expect(projectCards).toHaveCount(1);
  await expect(projectCards.first()).toContainText('Aula Studio');
  await page.getByRole('button', { name: /Belleza/ }).click();
  await expect(projectCards).toHaveCount(1);
  await expect(projectCards.first()).toContainText('The Perfect Cut');
  await page.getByRole('button', { name: /Marcas creativas/ }).click();
  await expect(projectCards).toHaveCount(1);
  await expect(projectCards.first()).toContainText('UMBRAL');
  await page.getByRole('button', { name: /Tiendas/ }).click();
  await expect(projectCards).toHaveCount(1);
  await expect(projectCards.first()).toContainText('Dummy Data Store');
  await page.getByRole('button', { name: /Todos los rubros/ }).click();
  await expect(projectCards).toHaveCount(6);
});

test('clicking the visual area of a card opens its case study', async ({ page }) => {
  await page.goto('/projects');
  const card = page.locator('main article').filter({ has: page.getByRole('heading', { name: 'Blend Burger' }) });
  // The full-card case-study link uses a CSS overlay; click at the real pixel
  // coordinate to test the user interaction rather than Playwright's hit-target check.
  const artwork = card.locator('div').first();
  await artwork.scrollIntoViewIfNeeded();
  const bounds = await artwork.boundingBox();
  expect(bounds).not.toBeNull();
  if (!bounds) throw new Error('Project card artwork is not visible');
  await page.mouse.click(bounds.x + 25, bounds.y + 25);
  await expect(page).toHaveURL('/projects/burger');
  await expect(page.getByRole('heading', { name: /Blend Burger/ }).first()).toBeVisible();
});

test('case studies include the business solution and an external demo link', async ({ page }) => {
  for (const [id, title, href] of Cases) {
    await page.goto(`/projects/${id}`);
    await expect(page.locator('main h1')).toContainText(title);
    await expect(page.locator('main')).toContainText('Solución desarrollada');
    await expect(page.locator('main a[target="_blank"][href]').first()).toHaveAttribute('href', href);
  }
});

test('unknown case ids use the not-found view', async ({ page }) => {
  await page.goto('/projects/not-a-case');
  await expect(page.locator('main')).toContainText(/no existe|encontrar/i);
});
