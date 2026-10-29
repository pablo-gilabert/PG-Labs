import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import AccessibilityScanner from '@axe-core/playwright';

// Audit WCAG 2.0, 2.1 and 2.2 A/AA rules across the rendered browser document.
// Automated checks complement, but do not replace, manual accessibility review.
export async function assertAccessible(page: Page): Promise<void> {
  const results = await new AccessibilityScanner({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();

  const violations = results.violations.map((issue) => ({
    id: issue.id,
    impact: issue.impact,
    help: issue.help,
    helpUrl: issue.helpUrl,
    nodes: issue.nodes.map((node) => ({
      target: node.target,
      failureSummary: node.failureSummary,
    })),
  }));

  // Keep a readable report in Playwright's HTML results when a scan fails.
  if (violations.length > 0) {
    await test.info().attach('accessibility-violations.json', {
      body: JSON.stringify({ url: page.url(), violations }, null, 2),
      contentType: 'application/json',
    });
  }

  expect(violations, `WCAG A/AA violations detected on ${page.url()}`)
    .toEqual([]);
}
