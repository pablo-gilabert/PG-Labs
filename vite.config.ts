import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    css: true,
    setupFiles: ['./src/Tests/TestSetup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/Utils/**', 'src/Components/SweetAlertForms/**'],
      exclude: ['src/**/*.test.{ts,tsx}'],
    },
  },
});
