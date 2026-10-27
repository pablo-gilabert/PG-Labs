import { defineConfig, devices } from '@playwright/test';

// Browser tests exercise the production preview, not a mocked component tree.
const BaseUrl = 'http://127.0.0.1:4179';

export default defineConfig({
  testDir: './Tests/E2E',
  testMatch: '**/*.spec.ts',
  timeout: 30_000,
  expect: { timeout: 7_000 },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  outputDir: 'test-results',
  use: {
    baseURL: BaseUrl,
    locale: 'es-AR',
    reducedMotion: 'reduce',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
  },
  projects: [
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: '**/Responsive.spec.ts',
    },
    {
      name: 'chromium-mobile',
      use: { ...devices['Pixel 7'] },
      testMatch: '**/Responsive.spec.ts',
    },
  ],
  // Running the build first catches bundling problems before functional testing.
  webServer: {
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4179 --strictPort',
    url: BaseUrl,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
