import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
// oxlint-disable-next-line import/no-unassigned-import -- Register DOM matchers for Vitest.
import '@testing-library/jest-dom/vitest';

// Each component test starts with a clean, unmounted document.
afterEach(() => {
  cleanup();
  window.localStorage.clear();
});
