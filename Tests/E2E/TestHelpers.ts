import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

/** Open the laboratory and select the requested interactive demo. */
export async function openLabTab(page: Page, name: string): Promise<void> {
  await page.goto('/lab');
  await selectLabTab(page, name);
}

/** Select a demo after navigation or reload without resetting the current page. */
export async function selectLabTab(page: Page, name: string): Promise<void> {
  const tab = page.getByRole('tab').filter({ hasText: name });
  await expect(tab).toHaveCount(1);
  await tab.click();
  await expect(tab).toHaveAttribute('aria-selected', 'true');
}

/** Find the visible SweetAlert2 popup, including its form controls. */
export function modal(page: Page): Locator {
  return page.locator('.swal2-popup:visible');
}

/** Save values entered in a SweetAlert2 form. */
export async function saveModal(page: Page): Promise<void> {
  const popup = modal(page);
  await expect(popup).toBeVisible();
  await popup.locator('.swal2-confirm').click();
}

/** Confirm a SweetAlert2 confirmation or informational dialog. */
export async function confirmModal(page: Page): Promise<void> {
  const popup = modal(page);
  await expect(popup).toBeVisible();
  await popup.locator('.swal2-confirm').click();
}

/** Cancel a SweetAlert2 action without modifying the underlying demo data. */
export async function cancelModal(page: Page): Promise<void> {
  const popup = modal(page);
  await expect(popup).toBeVisible();
  await popup.locator('.swal2-cancel').click();
}

/** Read the exact browser storage used by the demo, without inventing fixture data. */
export async function readDemoStorage(page: Page, key: string): Promise<unknown> {
  return page.evaluate((storageKey) => {
    const raw = window.localStorage.getItem(`gs-demo-${storageKey}`);
    if (raw === null) return null;
    const parsed: unknown = JSON.parse(raw);
    return parsed;
  }, key);
}
