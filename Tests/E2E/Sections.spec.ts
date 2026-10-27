import { expect, test } from '@playwright/test';
import { confirmModal, modal, openLabTab, selectLabTab, readDemoStorage, saveModal } from './TestHelpers';

test('adding a section updates the preview and survives reload', async ({ page }) => {
  await openLabTab(page, 'Secciones');
  await page.getByRole('button', { name: 'Agregar sección' }).click();
  await modal(page).locator('[data-modal-field="heading"]').fill('Sección QA');
  await modal(page).locator('[data-modal-field="body"]').fill('Contenido de prueba para el sitio.');
  await saveModal(page);
  await expect(page.getByText('Sección QA')).toHaveCount(2);
  await expect.poll(async () => readDemoStorage(page, 'sections')).toContainEqual(
    expect.objectContaining({ heading: 'Sección QA' }),
  );
  await page.reload();
  await expect.poll(async () => readDemoStorage(page, 'sections')).toContainEqual(
    expect.objectContaining({ heading: 'Sección QA' }),
  );
  await selectLabTab(page, 'Secciones');
  await expect(page.getByText('Sección QA')).toHaveCount(2);
});

test('section order and removal update the editor and preview', async ({ page }) => {
  await openLabTab(page, 'Secciones');
  await page.getByRole('button', { name: /Bajar: Bienvenidos a nuestro estudio/ }).click();
  const headings = page.locator('[class*="sectionItem"] h3');
  await expect(headings.first()).toHaveText('Nuestros servicios');
  await page.getByRole('button', { name: 'Editar: Nuestros servicios' }).click();
  await modal(page).locator('[data-modal-field="heading"]').fill('Servicios editados QA');
  await saveModal(page);
  await expect(page.getByText('Servicios editados QA')).toHaveCount(2);
  await page.getByRole('button', { name: 'Eliminar: Servicios editados QA' }).click();
  await confirmModal(page);
  await expect(page.getByText('Servicios editados QA')).toHaveCount(0);
});
