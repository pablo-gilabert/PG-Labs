import { expect, test } from '@playwright/test';

test('contact links point to expected destinations', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.locator('main a[href="mailto:gilabertpablo62@gmail.com"]')).toHaveCount(1);
  await expect(page.locator('main a[href="https://wa.me/541151528070"]')).toHaveCount(1);
  await expect(page.locator('main a[href="https://github.com/pablo-gilabert"]')).toHaveCount(1);
});

test('contact form requires a subject and a message of at least ten characters', async ({ page }) => {
  await page.goto('/contact');
  const subject = page.locator('#contact-subject');
  const message = page.locator('#contact-message');
  await expect(subject).toHaveAttribute('required', '');
  await expect(message).toHaveAttribute('minlength', '10');
  await subject.fill('Proyecto QA');
  await message.fill('corto');
  const valid = await message.evaluate((element) => element instanceof HTMLTextAreaElement ? element.checkValidity() : false);
  expect(valid).toBe(false);
  await message.fill('Necesito una web responsive para mi negocio.');
  const ready = await message.evaluate((element) => element instanceof HTMLTextAreaElement ? element.checkValidity() : false);
  expect(ready).toBe(true);
  await expect(page.locator('form')).toContainText(/aplicación de correo|correo electrónico/i);
});
