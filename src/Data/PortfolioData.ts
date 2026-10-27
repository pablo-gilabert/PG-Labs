export type ProjectCategory = 'gastronomy' | 'education' | 'beauty' | 'creative' | 'commerce';
export type ProjectId = 'burger' | 'academy' | 'salon' | 'tattoo' | 'store' | 'restaurant';
export type ProjectVisual = ProjectId;

export interface PortfolioProject {
  id: ProjectId;
  title: string;
  category: ProjectCategory;
  stack: string[];
  live: string;
  repo?: string;
  visual: ProjectVisual;
}

// These published websites are portfolio demos, not claims of contracted client work.
// Technical tags are limited to known implementation details or demonstrable concepts.
export const PortfolioProjects: PortfolioProject[] = [
  {
    id: 'burger',
    title: 'Blend Burger',
    category: 'gastronomy',
    stack: ['Web design', 'Gastronomy', 'Responsive UI'],
    live: 'https://blend-burger-demo.vercel.app/',
    visual: 'burger',
  },
  {
    id: 'academy',
    title: 'Aula Studio',
    category: 'education',
    stack: ['React', 'TypeScript', 'Role-based UI', 'Dashboards'],
    repo: 'https://github.com/pablo-gilabert/aula-studio-demo',
    live: 'https://aula-studio-demo-eosin.vercel.app/login',
    visual: 'academy',
  },
  {
    id: 'salon',
    title: 'The Perfect Cut',
    category: 'beauty',
    stack: ['React', 'TypeScript', 'CSS Modules', 'Responsive UI'],
    repo: 'https://github.com/pablo-gilabert/hair-salon-demo',
    live: 'https://peluqueria-demo-gilt.vercel.app/',
    visual: 'salon',
  },
  {
    id: 'tattoo',
    title: 'UMBRAL',
    category: 'creative',
    stack: ['React', 'TypeScript', 'i18n', 'Themes'],
    repo: 'https://github.com/pablo-gilabert/tattoo-studio-demo',
    live: 'https://tattoo-studio-demo-teal.vercel.app/',
    visual: 'tattoo',
  },
  {
    id: 'store',
    title: 'Dummy Data Store',
    category: 'commerce',
    stack: ['Product catalog', 'Storefront UI', 'Demo data'],
    live: 'https://dummy-data-tawny-three.vercel.app/',
    visual: 'store',
  },
  {
    id: 'restaurant',
    title: 'Maison Aster',
    category: 'gastronomy',
    stack: ['Web design', 'Restaurant', 'Brand presence'],
    live: 'https://restaurant-demo-iota-taupe.vercel.app/',
    visual: 'restaurant',
  },
];

export const ProfessionalStack = [
  'React', 'TypeScript', 'JavaScript', 'Vite', 'CSS Modules', 'React Router',
  'Redux Toolkit', 'TanStack Query', 'React Hook Form', 'Zod',
  'REST APIs', 'Git & GitHub', 'Vitest', 'React Testing Library',
  'MSW', 'Playwright', 'GitHub Actions', 'Oxlint',
];

export const ContactDetails = {
  email: 'gilabertpablo62@gmail.com',
  phone: '+54 11-5152-8070',
  whatsApp: '541151528070',
  github: 'https://github.com/pablo-gilabert',
  linkedIn: 'https://www.linkedin.com/in/pablo-gilabert-5917aa3b5/',
};
