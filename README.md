# PG Labs — Freelance Developer Portfolio

**Current version:** 1.2.1

> **GitHub description:** PG Labs is a multilingual React and TypeScript freelance portfolio with six live case studies, responsive design, interactive SweetAlert2 administration demos, a shopping cart, and dark/light themes.

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
- **Quality checks:** Oxlint configured for React automatic JSX runtime, semantic project filters, and explicit global-style imports.
- **Deployment ready:** Vite production build, TypeScript checks, Oxlint, and Vercel SPA rewrites.

## Stack

React 19 · TypeScript 5 · SweetAlert2 11 · Vite 7 · @vitejs/plugin-react 5 · React Router 7 · CSS Modules · Lucide React 1 · Oxlint · Vercel. Brand icons are implemented as isolated SVG components.

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
├── Utils/
│   └── DemoStorage.ts
├── App.tsx
└── Main.tsx
```

React components, types, and new TypeScript filenames use **PascalCase**. CSS module filenames and CSS classes use **camelCase**. Code and code comments are in **English**; user-facing text is localized.

## Development

| Script | Purpose |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start Vite development server |
| `npm run typecheck` | Run TypeScript project checks |
| `npm run lint` | Run Oxlint with type-aware checks |
| `npm run build` | Create production files in `dist/` |
| `npm run preview` | Preview a production build |

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

## Quality checks

The project uses the automatic JSX runtime and semantic UI controls. TypeScript, Oxlint, and Vite build are available through the project scripts; all three must pass before a production deployment. The demo table uses named row headers, chart decoration is hidden from assistive technology, order confirmation uses a live `output` element, and student status changes are runtime-validated.

## Navigation and localization details

- Selecting a language shows the country flag and endonym (Spain / Español, England / English, Brazil / Português); choosing one updates the interface and retains the preference. The menu closes on Escape or outside click.
- Clicking anywhere on a portfolio card (including its artwork) opens its own case study. The separate “View site” and source-code links remain independent and open in new tabs.
- All browser navigation uses semantic React Router links so cards also support keyboard navigation.

## Version 1.2.1

- Corrected the language selector effect to return `undefined` explicitly while closed, keeping React effect cleanup consistent without disabling lint rules.
