import { expect, test } from '@playwright/test';
import { cancelModal, confirmModal, modal, openLabTab, selectLabTab, readDemoStorage, saveModal } from './TestHelpers';

async function addProduct(page: import('@playwright/test').Page, name: string, count: number) {
  const product = page.locator('article').filter({ has: page.getByRole('heading', { name, exact: true }) });
  await product.getByRole('button', { name: 'Agregar al carrito' }).click();
  await modal(page).locator('[data-modal-field="quantity"]').fill(String(count));
  await saveModal(page);
}

test('cart calculates totals, persists, and edits quantities with SweetAlert2', async ({ page }) => {
  await openLabTab(page, 'Carrito');
  await addProduct(page, 'Studio Notebook', 2);
  await addProduct(page, 'Everyday Tote', 1);
  const cart = page.locator('aside').filter({ has: page.getByRole('heading', { name: 'Tu carrito' }) });
  await expect(cart).toContainText(/48[.,]000/);
  await expect.poll(async () => readDemoStorage(page, 'cart')).toMatchObject({ p1: 2, p2: 1 });
  await cart.getByRole('button', { name: 'Editar cantidad: Studio Notebook' }).click();
  await modal(page).locator('[data-modal-field="quantity"]').fill('3');
  await saveModal(page);
  await expect.poll(async () => readDemoStorage(page, 'cart')).toMatchObject({ p1: 3, p2: 1 });
  await page.reload();
  await expect.poll(async () => readDemoStorage(page, 'cart')).toMatchObject({ p1: 3, p2: 1 });
  await selectLabTab(page, 'Carrito');
  await expect(cart).toContainText('Studio Notebook');
  await expect(cart).toContainText('Everyday Tote');
});

test('remove one product type while preserving other products', async ({ page }) => {
  await openLabTab(page, 'Carrito');
  await addProduct(page, 'Studio Notebook', 2);
  await addProduct(page, 'Everyday Tote', 1);
  const cart = page.locator('aside').filter({ has: page.getByRole('heading', { name: 'Tu carrito' }) });
  const row = cart.locator('[class*="cartItem_"]').filter({ hasText: 'Studio Notebook' });
  await row.getByRole('button', { name: 'Quitar producto' }).click();
  await cancelModal(page);
  await expect(cart).toContainText('Studio Notebook');
  await row.getByRole('button', { name: 'Quitar producto' }).click();
  await confirmModal(page);
  await expect.poll(async () => readDemoStorage(page, 'cart')).toEqual({ p2: 1 });
});

test('clear cart can be cancelled and confirmed', async ({ page }) => {
  await openLabTab(page, 'Carrito');
  await addProduct(page, 'Ceramic Mug', 1);
  await page.getByRole('button', { name: 'Vaciar carrito' }).click();
  await cancelModal(page);
  await expect.poll(async () => readDemoStorage(page, 'cart')).toEqual({ p3: 1 });
  await page.getByRole('button', { name: 'Vaciar carrito' }).click();
  await confirmModal(page);
  await expect.poll(async () => readDemoStorage(page, 'cart')).toEqual({});
  await expect(page.getByText('Tu carrito está vacío.')).toBeVisible();
});

test('test order clears cart and adds an order to history', async ({ page }) => {
  await openLabTab(page, 'Carrito');
  await addProduct(page, 'Desk Calendar', 2);
  await page.getByRole('button', { name: 'Registrar pedido de prueba' }).click();
  await expect(modal(page)).toBeVisible();
  await modal(page).locator('.swal2-confirm').click();
  await expect(modal(page)).toContainText('¡Pedido de prueba registrado!');
  await confirmModal(page);
  await expect.poll(async () => readDemoStorage(page, 'cart')).toEqual({});
  await expect.poll(async () => readDemoStorage(page, 'orders')).toContainEqual(
    expect.objectContaining({ total: 18000, quantity: 2 }),
  );
});

test('reset all demo modules restores initial data without changing theme', async ({ page }) => {
  await openLabTab(page, 'Carrito');
  await addProduct(page, 'Studio Notebook', 1);
  await page.getByRole('button', { name: 'Restablecer demo' }).click();
  await confirmModal(page);
  await expect.poll(async () => readDemoStorage(page, 'cart')).toEqual({});
  await expect.poll(async () => readDemoStorage(page, 'students')).toHaveLength(4);
  await expect.poll(async () => readDemoStorage(page, 'services')).toHaveLength(4);
  await expect.poll(async () => readDemoStorage(page, 'sections')).toHaveLength(2);
});
