import { expect, test } from '@playwright/test';
import { cancelModal, confirmModal, modal, openLabTab, readDemoStorage, saveModal } from './TestHelpers';

test('creating and editing a service updates the UI and saved data', async ({ page }) => {
  await openLabTab(page, 'Servicios');
  await page.getByRole('button', { name: 'Nuevo servicio' }).click();
  await modal(page).locator('[data-modal-field="name"]').fill('Servicio QA');
  await modal(page).locator('[data-modal-field="category"]').fill('Categoría QA');
  await modal(page).locator('[data-modal-field="price"]').fill('25000');
  await saveModal(page);
  const tile = page.locator('article').filter({ has: page.getByRole('heading', { name: 'Servicio QA' }) });
  await expect(tile).toBeVisible();
  await expect(tile).toContainText('25.000');
  await tile.getByRole('button', { name: 'Editar: Servicio QA' }).click();
  await modal(page).locator('[data-modal-field="price"]').fill('30000');
  await saveModal(page);
  await expect(tile).toContainText('30.000');
  await expect.poll(async () => readDemoStorage(page, 'services')).toContainEqual(
    expect.objectContaining({ name: 'Servicio QA', price: 30000 }),
  );
});

test('service visibility toggles and delete confirmation can be cancelled', async ({ page }) => {
  await openLabTab(page, 'Servicios');
  const tile = page.locator('article').filter({ has: page.getByRole('heading', { name: 'Corte y styling' }) });
  await expect(tile).toContainText('Publicado');
  await tile.getByRole('button', { name: 'Oculto' }).click();
  await expect(tile).toContainText('Oculto');
  await tile.getByRole('button', { name: 'Eliminar: Corte y styling' }).click();
  await cancelModal(page);
  await expect(tile).toBeVisible();
  await tile.getByRole('button', { name: 'Eliminar: Corte y styling' }).click();
  await confirmModal(page);
  await expect(tile).toHaveCount(0);
});
