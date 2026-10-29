# PG Labs — Freelance Developer Portfolio

[![Quality Checks](https://github.com/pablo-gilabert/PG-Labs/actions/workflows/ci.yml/badge.svg)](https://github.com/pablo-gilabert/PG-Labs/actions/workflows/ci.yml)

**Current version:** 1.7.2

> **GitHub description:** PG Labs is a multilingual React and TypeScript freelance portfolio featuring six live projects, interactive business demos, Vitest and Playwright tests, GitHub Actions CI, responsive design, and dark/light themes.

A production-oriented, mobile-first portfolio built for **Pablo Gilabert**, a freelance frontend developer based in Buenos Aires, Argentina. It showcases existing portfolio demos, web development and redesign services, technical experience, and a hands-on feature playground for potential clients.

## PG Labs identity

The PG Labs logo is displayed in the header and footer with theme-adapted image variants.
The favicon uses the square PG Labs identity and is provided as PNG and ICO.
The brand assets live under `public/brand/` and `public/`.

## Highlights

- **Seven page types:** Home, Projects, Project Case Study, Services, Playground, About, and Contact, plus a custom 404 page.
- **Three languages:** Spanish (default), English, and Brazilian Portuguese, with a keyboard-accessible flag selector (Spain, England and Brazil), centralized typed translations, and persisted preferences.
- **Two themes:** dark (default) and light, with saved user preferences and a pre-render theme initializer to prevent visual flashes.
- **Project gallery:** six live Vercel demos across five industries, a category filter, localized sector labels, clickable cards linking to each case study, separate demo/GitHub links, honest demo labeling, and handcrafted concept previews.
- **Interactive playground:** SweetAlert2 forms for student/service/section creation and editing; confirmation dialogs for deletion, reset, cart clearing, and test orders; service visibility changes, section ordering, cart quantity controls, and simulated order history.
- **Cart controls:** remove every unit of one product, empty the entire cart with confirmation, set product quantities in a SweetAlert2 modal, and retain convenient stepper buttons.
- **Client-only demonstration data:** stored in browser `localStorage`; no real authentication, payment processing, API, or database is implied.
- **Accessibility and responsiveness:** semantic pages, keyboard navigation, focus states, labeled controls, reduced-motion support, and styles from 320px through large/4K displays.
- **Quality checks:** Vitest unit/component tests, Playwright Chromium desktop/mobile E2E tests, V8 coverage reports, Oxlint configured for the automatic JSX runtime, and GitHub Actions CI on pushes and pull requests.
- **Deployment ready:** Vite production build, TypeScript checks, Oxlint, and Vercel SPA rewrites.

## Stack

React 19 · TypeScript 5 · SweetAlert2 11 · Vite 7 · @vitejs/plugin-react 5 · React Router 7 · CSS Modules · Lucide React 1 · Vitest 4 · React Testing Library · jsdom · Playwright 1 · Oxlint · Vercel. Brand icons are implemented as isolated SVG components.

## Project layout

```text
src/
├── Components/
│   ├── BrandIcons/
│   ├── Footer/
│   ├── Header/
│   ├── LanguageSelector/
│   ├── ProjectArtwork/
│   ├── ProjectCard/
│   ├── ShowcaseVisual/
│   └── SweetAlertForms/
├── Contexts/
│   └── SiteContext.tsx
├── Data/
│   ├── PortfolioData.ts
│   ├── ProjectStories.ts
│   └── Translations.ts
├── Pages/
│   ├── AboutPage/
│   ├── ContactPage/
│   ├── HomePage/
│   ├── LabPage/
│   ├── NotFoundPage/
│   ├── ProjectCasePage/
│   ├── ProjectsPage/
│   └── ServicesPage/
├── Styles/
│   └── global.css
├── Tests/
│   ├── Artwork.test.tsx
│   ├── CartLogic.test.ts
│   ├── DemoStorage.test.ts
│   ├── LabOperations.test.tsx
│   ├── LabPage.test.tsx
│   ├── LanguageSelector.test.tsx
│   ├── NavigationAndLayout.test.tsx
│   ├── Pages.test.tsx
│   ├── ProjectCard.test.tsx
│   ├── SiteContext.test.tsx
│   ├── SweetAlertForms.test.ts
│   └── TestSetup.ts
├── Utils/
│   ├── CartLogic.ts
│   └── DemoStorage.ts
├── App.tsx
└── Main.tsx
Tests/
└── E2E/
    ├── TestHelpers.ts
    ├── Navigation.spec.ts
    ├── Portfolio.spec.ts
    ├── Preferences.spec.ts
    ├── Students.spec.ts
    ├── Services.spec.ts
    ├── Sections.spec.ts
    ├── Cart.spec.ts
    ├── Contact.spec.ts
    └── Responsive.spec.ts
Playwright.config.ts
tsconfig.e2e.json
.github/
└── workflows/
    └── ci.yml
```

React components, types, and new TypeScript filenames use **PascalCase**. CSS module filenames and CSS classes use **camelCase**. Code and code comments are in **English**; user-facing text is localized.

## E2E reliability

The Playwright suite selects the active laboratory tab after reload before asserting visible content.
Portfolio filters count project card articles (not decorative headings inside artwork), and the full-card overlay is exercised with a real pointer click in the artwork area.
The E2E tests continue to assert saved browser data independently of the active tab.

## Development

| Script | Purpose |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start Vite development server |
| `npm run typecheck` | Run TypeScript project checks |
| `npm run lint` | Run Oxlint with type-aware checks |
| `npm run build` | Create production files in `dist/` |
| `npm run preview` | Preview a production build |
| `npm test` | Execute all Vitest unit/component tests once |
| `npm run test:watch` | Run Vitest in interactive watch mode |
| `npm run test:unit` | Alias for the one-shot unit/component suite |
| `npm run test:coverage` | Generate terminal and HTML V8 coverage reports |
| `npm run test:e2e` | Build and run Playwright E2E tests in Chromium |
| `npm run test:e2e:ui` | Open Playwright’s interactive test runner |
| `npm run test:e2e:headed` | Run browser tests with a visible browser |
| `npm run test:e2e:report` | Open the last Playwright HTML report |
| `npm run test:all` | Typecheck, lint, unit tests, build, and E2E tests |

## Continuous integration (GitHub Actions)

The workflow in [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs automatically on every push to `main`, every pull request targeting `main`, and manually through **Actions → Quality Checks → Run workflow**. GitHub reports the result as a check on the commit or pull request. It does **not** deploy, modify repository content, or merge pull requests.

On an Ubuntu runner with Node.js 22, the workflow installs the committed dependencies with `npm ci`, runs `npm audit --audit-level=moderate`, checks TypeScript and Oxlint, executes Vitest unit/component tests, produces a Vite build, installs Chromium with its required Linux libraries, and runs the Playwright desktop/mobile E2E suite. The v1.6.2 baseline validated locally and on GitHub Actions was **44 Vitest tests and 45 Playwright tests (including 13 accessibility audits)**. The v1.7.1 component/route tests are pending a fresh run; CI runs the updated suites independently on Linux.

**Lockfile requirement:** `npm ci` requires a committed `package-lock.json` consistent with `package.json`. Keep the existing lockfile in the repository when copying an updated source ZIP over a clone. After changing package metadata or dependencies, run `npm install` locally and commit **both** `package.json` and `package-lock.json` before pushing. Do not delete the lockfile or add it to `.gitignore`. A fresh clone can install with `npm ci` once these files are present.

When Playwright reports failures, the workflow uploads `playwright-report/` and `test-results/` as a downloadable **playwright-diagnostics** artifact (retained for 14 days); the Playwright configuration captures screenshots, videos, and traces for failing tests. Open the failing run in **GitHub → Actions → Quality Checks** to view the failed step and download the artifact. The workflow grants the token read-only repository access and does not use deployment secrets. A green check does not automatically prevent direct pushes to `main`; to require it for merges, configure a branch protection rule or ruleset with the `TypeScript · Oxlint · Vitest · Playwright` job as a required status check after its first successful run.

Local verification remains available with `npm run test:all`. The local Playwright CLI may need `npx playwright install chromium` once, whereas the CI runner installs Chromium automatically. The GitHub Actions workflow is separate from Vercel deployment and is not a post-deployment live-site test.

The project deploys on **Vercel** using the Vite framework preset. The `vercel.json` rewrite supports direct navigation to React Router pages such as `/projects`, `/projects/academy`, and `/lab`. Use `npm run build` as the build command and `dist` as output directory. For a commercial production deployment, use a Vercel plan that permits commercial use.

## Configuration and content

- Edit `src/Data/PortfolioData.ts` to manage published project URLs, public repository links, category tags, and contact information.
- Edit `src/Data/ProjectStories.ts` for each project’s localized challenge, solution, capabilities, audience, and suggested walkthrough.
- Edit `src/Data/Translations.ts` to update all three localized copies, including modal copy.
- SweetAlert2 modal form helpers live in `src/Components/SweetAlertForms/`; the component’s CSS module inherits the current light or dark theme.
- The site starts in Spanish and dark mode; language and theme persist in `localStorage` using existing keys to preserve visitor preferences across the rebrand.
- Playground data also persists in the browser with runtime validation, can be reset, and **must not** be used for real students, orders, or business operations.
- The contact form deliberately opens the visitor's mail client via `mailto:`; it does not claim to send email through a backend.
- The About page is based on the author's CV. Portuguese is available as a site translation, not presented as an independently verified spoken-language qualification.

## Published portfolio demonstrations

The showcase contains six Vercel-hosted examples, which are presented as portfolio work rather than commissioned or revenue-generating client projects:

| Demo | Industry | Website |
| --- | --- | --- |
| Blend Burger | Food & dining | https://blend-burger-demo.vercel.app/ |
| Aula Studio | Education platform | https://aula-studio-demo-eosin.vercel.app/login |
| The Perfect Cut | Hair salon | https://peluqueria-demo-gilt.vercel.app/ |
| UMBRAL | Tattoo studio | https://tattoo-studio-demo-teal.vercel.app/ |
| Dummy Data Store | Online catalog | https://dummy-data-tawny-three.vercel.app/ |
| Maison Aster | Restaurant | https://restaurant-demo-iota-taupe.vercel.app/ |

Every project card has a full-surface case-study link (`/projects/:id`) using a stretched link overlay that preserves independent live demo and GitHub actions. Each card has a localized sector label. Every project has a case-study route (`/projects/:id`) outlining the business need, a corresponding design solution, relevant features, applicability to similar sectors, and the live link. Case-study visuals are **conceptual CSS illustrations**, not screenshots of the destination website. Technology badges only assert established project details or broadly applicable design concepts, and code links appear only when an associated repository is known.

## Portfolio links

- [Hair Salon Demo](https://github.com/pablo-gilabert/hair-salon-demo) · [Live preview](https://peluqueria-demo-gilt.vercel.app/)
- [Aula Studio Demo](https://github.com/pablo-gilabert/aula-studio-demo)
- [Tattoo Studio Demo](https://github.com/pablo-gilabert/tattoo-studio-demo)
- [GitHub profile](https://github.com/pablo-gilabert)

## Tooling compatibility

- Vite 7 uses `@vitejs/plugin-react` 5. The plugin 6 line depends on newer Vite internals and must not be mixed into this project.
- Lucide React 1 removed trademarked brand icons; PG Labs includes its GitHub and LinkedIn SVG icon components in `Components/BrandIcons/`.
- Oxlint disables `react/react-in-jsx-scope` because this project uses the automatic JSX transform (`react-jsx`).

## Deployment considerations

A static frontend is suitable for this public-facing portfolio, but actual client dashboards require backend authorization, a database, privacy controls, secure APIs, and a separately scoped hosting budget. Demo data in local browser storage should never be interpreted as a secure production persistence layer.

## Author

**Pablo Gilabert** · Frontend Developer · Freelance Web Developer (June 2022–present)

[GitHub](https://github.com/pablo-gilabert) · [LinkedIn](https://www.linkedin.com/in/pablo-gilabert-5917aa3b5/) · [Email](mailto:gilabertpablo62@gmail.com)

---

Built to communicate capabilities clearly, demonstrate functionality honestly, and grow alongside a freelance development business.

## Automated testing (Vitest and React Testing Library)

The automated suite exercises **production logic and real React components**, not just test-only reimplementations:

- `CartLogic.test.ts` verifies totals, unknown product IDs, quantity updates, max quantity, targeted removal, and immutability. `LabPage.tsx` calls these same `CartLogic.ts` functions.
- `DemoStorage.test.ts` covers browser persistence, invalid JSON, runtime validation, denied storage access, and ARS localization.
- `SiteContext.test.tsx` checks default language/theme, remembered preferences, switching, and invalid settings.
- `ProjectCard.test.tsx` checks project case-study routes, live demo and repository links, and industry labels.
- `LabPage.test.tsx` checks real React state transitions for student management, service/section creation, cart operations, reset and localStorage. SweetAlert2 presentation is mocked so these tests do not depend on animation timing.
- `LabOperations.test.tsx` adds editing, deletion, visibility, section ordering, order registration, and invalid saved-data regressions.
- `NavigationAndLayout.test.tsx` checks the header, footer, application routes and page metadata. `LanguageSelector.test.tsx` exercises all three languages, Escape/outside-click behavior, focus, and persistence.
- `Pages.test.tsx` exercises page content, links, project filters, case studies, localized copy, contact-field validation, and not-found navigation.
- `Artwork.test.tsx` covers the six illustrative project variants and dashboard rendering.
- `SweetAlertForms.test.ts` checks the real form-builder DOM, required fields, quantity bounds, string trimming, checkbox state, focus, safe text handling, confirmation, and success dialogs. Only the SweetAlert2 dialog host is mocked.

Run `npm install` before running the tests for the first time. Use `npm run test:unit` for a single pass, `npm run test:watch` for interactive development, or `npm run test:coverage` for a coverage report in `coverage/` (gitignored). Vitest is configured in the existing `vite.config.ts`, with `jsdom` and `src/Tests/TestSetup.ts`. The tests do not require a real API or a deployed Vercel instance.

These unit tests complement the Playwright end-to-end suite; neither suite replaces all manual usability checks or independently verifies the availability of third-party websites.

## Quality checks

The project uses the automatic JSX runtime and semantic UI controls. TypeScript, Oxlint, and Vite build are available through the project scripts; all three must pass before a production deployment. The demo table uses named row headers, chart decoration is hidden from assistive technology, order confirmation uses a live `output` element, and student status changes are runtime-validated.

## Navigation and localization details

- Selecting a language shows the country flag and endonym (Spain / Español, England / English, Brazil / Português); choosing one updates the interface and retains the preference. The menu closes on Escape or outside click.
- Clicking anywhere on a portfolio card (including its artwork) opens its own case study. The separate “View site” and source-code links remain independent and open in new tabs.
- All browser navigation uses semantic React Router links so cards also support keyboard navigation.

## Version 1.2.1

- Corrected the language selector effect to return `undefined` explicitly while closed, keeping React effect cleanup consistent without disabling lint rules.

## Version 1.3.0

- Added Vitest and React Testing Library as the initial automated testing stage.
- Extracted pure cart operations into `CartLogic.ts` for unit tests and reuse by the real shopping-cart UI.
- Added coverage tooling; no extra installation or deployment guide files were created.

## Version 1.4.0 — Playwright browser testing

The E2E suite runs the built site in **Chromium** with Playwright’s own isolated browser contexts. Browser tests are independent of the published Vercel domain and do not submit real contact forms or financial transactions.

- **Navigation:** direct routes, header/footer navigation, unknown routes, and JavaScript exceptions.
- **Portfolio:** six cases, filter counts, card-wide navigation, and exact published demo link attributes (no request sent to external sites).
- **Preferences:** Spain/England/Brazil language switcher, Escape handling, light/dark theme, and persistence across reloads.
- **Laboratory:** real SweetAlert2 dialogs for students, services, sections, shopping cart, reset, validation, cancellation, and localStorage persistence.
- **Responsive:** mobile menu, three small viewport widths, overflow checks, and narrow-screen modal geometry using mobile Chromium emulation.
- **Contact:** link destinations and client-side form requirements, without opening an external mail handler.

**One-time local setup:** install Node dependencies via `npm install`, then obtain the Playwright browser using `npm exec playwright install chromium`. `npm run test:e2e` launches the production preview automatically on `127.0.0.1:4179` after building the app. **Do not start a separate preview on that port.** The configuration can reuse an existing preview when developing locally, but CI always starts its own server.

Use `npm run test:e2e:ui` for an interactive runner, `npm run test:e2e:headed` to see browser windows, and `npm run test:e2e:report` after a run. On failures Playwright saves **screenshots, videos and traces** in `test-results/` and a report in `playwright-report/`; both paths are gitignored.

The E2E tests default to Spanish and dark mode, with browser-context isolation. The desktop suite and mobile suite are deliberately separated by Playwright projects. The tests **do not** click live demo URLs, so third-party outages do not produce false failures. Browser tests validate interactions and basic layout invariants, not visual taste or full WCAG accessibility conformance.

The `package.json` minimum versions of `vitest` and `@vitest/coverage-v8` are **4.1.12** to avoid the previously reported advisories. Keep those versions aligned in the lockfile.

## E2E helper consistency (1.4.1)

`Tests/E2E/TestHelpers.ts` exports the shared Playwright modal, navigation, and localStorage helpers used by the student, service, section, and cart specifications. The helper reads the actual `gs-demo-*` keys and interacts with SweetAlert2 via accessible buttons and stable selectors.

## Accessibility and coverage (v1.6.1)

The v1.6.1 accessibility fixes align the brand and language-switcher accessible names with visible text and strengthen text contrast in dashboard illustrations, project previews, and the light-theme footer link. These are application fixes, not suppressed axe rules.

PG Labs runs automated accessibility audits with `@axe-core/playwright` (axe-core) in Chromium. Scans cover public pages, a case study, both themes, the three supported languages, the student modal, and a mobile menu. These checks use WCAG 2.0/2.1/2.2 Level A and AA tagged rules. They are **not** a certification of WCAG conformance: manual keyboard, screen-reader and usability checks remain necessary. A failed scan attaches `accessibility-violations.json` to the Playwright HTML report, with affected elements and remediation links.

```bash
npm install
npm exec playwright install chromium
npm run test:a11y       # Accessibility cases only (desktop and mobile)
npm run test:e2e        # Functional + accessibility E2E tests
npm run test:coverage   # Vitest suite + full source coverage report
npm run test:all        # TypeScript, Oxlint, coverage, build and Playwright
```

The coverage report is written to `coverage/index.html`; `coverage/coverage-summary.json` and `coverage/lcov.info` are also generated. All application source files (including untested files) are counted except translation/demo content, the entry point, test helpers and type declarations. A minimum of 90% statements/lines/functions and 75% branches is enforced specifically for `src/Utils/CartLogic.ts`, which is well covered by unit tests. The previous v1.6.2 baseline was **38.95% global line coverage**. The v1.7.1 suite was measured locally at **95.02% global line coverage**, **92.87% statement coverage**, **86.16% branch coverage**, and **94.62% function coverage**, with **117 Vitest tests passing**. The 45 Playwright tests, including 13 axe-core accessibility audits, passed independently and are not included in Vitest V8 coverage. The cart-logic threshold remains enforced; a global threshold can be selected after results are consistent across CI runs.

The `Quality Checks` GitHub Actions job retains the exact name `TypeScript · Oxlint · Vitest · Playwright`, so the existing protected-branch status check remains valid. CI runs Vitest with coverage, all Playwright E2E and accessibility audits, and uploads the Vitest coverage report for 14 days. On E2E failures, it also uploads Playwright screenshots/traces and accessibility JSON diagnostics.

For the protected `main` branch, create a `feature/` branch, run `npm install` to update the committed `package-lock.json` after the new accessibility dependency is added, then open a Pull Request. Never commit `node_modules`, `coverage`, `dist`, or browser artifacts.

## Maintenance update (v1.6.2)

Renamed the default `@axe-core/playwright` import used in accessibility checks to avoid Oxlint `import/no-named-as-default` confusion with the package’s named `AxeBuilder` export. The scanner and WCAG assertions remain unchanged.


## Improved unit and component coverage (v1.7.1)

- Added React Testing Library suites for application routing and metadata, the shared header/footer, three-language selection, portfolio filters, detailed project pages, service and contact screens, and all six project illustrations.
- Added direct validation tests for SweetAlert2 form helpers, including malformed numbers, missing required fields, safe DOM text handling, and confirm/cancel behavior.
- Added stateful laboratory regressions for editing records, service visibility, section ordering and removal, cart order registration, and invalid persisted data.
- Kept all existing Playwright E2E/accessibility tests and the protected branch's required **TypeScript · Oxlint · Vitest · Playwright** CI check unchanged. No third-party dependencies are added.
- Fixed selectors in the language option and mobile navigation tests: option buttons are identified by their visible labels, while the CSS-hidden mobile toggle is found by its ARIA label in jsdom. This does not change UI behavior or relax assertions.
- The Vitest coverage report is authoritative for the new percentage; E2E browser tests are complementary and are not included in the Vitest V8 percentage.

To validate on a local feature branch, retain your existing `package-lock.json` when extracting the archive, run `npm install` to align its project version, then run `npm run test:all`. Merge only when that command and GitHub Actions pass on the Pull Request.

## Lint consistency (v1.7.2)

Removed unsafe or unnecessary type assertions from the new Vitest suites without disabling Oxlint rules. Stored demo data is checked at runtime before assertions, DOM element types are narrowed with `instanceof`, and the SweetAlert2 test host uses a hoisted, strongly typed mock state. The production application and existing E2E tests are unchanged.
