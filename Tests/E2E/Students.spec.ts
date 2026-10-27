import { expect, test } from '@playwright/test';
import { cancelModal, confirmModal, modal, openLabTab, readDemoStorage, saveModal } from './TestHelpers';

test('search filters students and an unknown name returns an empty state', async ({ page }) => {
  await openLabTab(page, 'Alumnos');
  const search = page.getByRole('textbox', { name: 'Buscar...' });
  await search.fill('Camila');
  await expect(page.getByRole('row', { name: /Camila Rodríguez/ })).toBeVisible();
  await expect(page.getByRole('row', { name: /Mateo Silva/ })).toHaveCount(0);
  await search.fill('Not-Found-Student');
  await expect(page.getByText('No hay alumnos que coincidan con tu búsqueda.')).toBeVisible();
});

test('adding a student with SweetAlert2 persists after reload', async ({ page }) => {
  await openLabTab(page, 'Alumnos');
  await page.getByRole('button', { name: 'Nuevo alumno' }).click();
  await modal(page).locator('[data-modal-field="name"]').fill('QA Alumna');
  await modal(page).locator('[data-modal-field="course"]').fill('QA Curso');
  await saveModal(page);
  await expect(page.getByRole('row', { name: /QA Alumna/ })).toBeVisible();
  await expect.poll(async () => readDemoStorage(page, 'students')).toContainEqual(
    expect.objectContaining({ name: 'QA Alumna', course: 'QA Curso', status: 'enrolled' }),
  );
  await page.reload();
  await expect(page.getByRole('row', { name: /QA Alumna/ })).toBeVisible();
});

test('invalid student form stays open; cancelling does not create a student', async ({ page }) => {
  await openLabTab(page, 'Alumnos');
  await page.getByRole('button', { name: 'Nuevo alumno' }).click();
  await modal(page).locator('.swal2-confirm').click();
  await expect(modal(page)).toBeVisible();
  await expect(modal(page).locator('.swal2-validation-message')).toBeVisible();
  await cancelModal(page);
  await expect(page.locator('tbody tr')).toHaveCount(4);
});

test('editing and deleting students use confirmation and persist', async ({ page }) => {
  await openLabTab(page, 'Alumnos');
  await page.getByRole('button', { name: 'Editar: Camila Rodríguez' }).click();
  await modal(page).locator('[data-modal-field="course"]').fill('QA Nuevo Curso');
  await modal(page).locator('[data-modal-field="status"]').selectOption('graduated');
  await saveModal(page);
  await expect(page.getByRole('row', { name: /Camila Rodríguez/ })).toContainText('QA Nuevo Curso');
  await page.getByRole('button', { name: 'Eliminar: Camila Rodríguez' }).click();
  await cancelModal(page);
  await expect(page.getByRole('row', { name: /Camila Rodríguez/ })).toBeVisible();
  await page.getByRole('button', { name: 'Eliminar: Camila Rodríguez' }).click();
  await confirmModal(page);
  await expect(page.getByRole('row', { name: /Camila Rodríguez/ })).toHaveCount(0);
  await page.reload();
  await expect(page.getByRole('row', { name: /Camila Rodríguez/ })).toHaveCount(0);
});
