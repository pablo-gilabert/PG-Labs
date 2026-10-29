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
      reporter: ['text', 'html', 'json-summary', 'lcov'],
      // Include untested source files so the overall report is not artificially inflated.
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/Tests/**',
        'src/Data/**',
        'src/Main.tsx',
        'src/ViteEnv.d.ts',
      ],
      // Until the global baseline is measured, gate only the well-tested cart logic.
      // The full-app coverage report remains visible in CI for future targets.
      thresholds: {
        'src/Utils/CartLogic.ts': {
          statements: 90,
          branches: 75,
          functions: 90,
          lines: 90,
        },
      },
    },
  },
});
