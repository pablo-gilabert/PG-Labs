import { beforeEach, describe, expect, it } from 'vitest';
import type { ReactElement } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SiteProvider } from '../Contexts/SiteContext';
import { HomePage } from '../Pages/HomePage/HomePage';
import { ProjectsPage } from '../Pages/ProjectsPage/ProjectsPage';
import { ProjectCasePage } from '../Pages/ProjectCasePage/ProjectCasePage';
import { ServicesPage } from '../Pages/ServicesPage/ServicesPage';
import { AboutPage } from '../Pages/AboutPage/AboutPage';
import { ContactPage } from '../Pages/ContactPage/ContactPage';
import { NotFoundPage } from '../Pages/NotFoundPage/NotFoundPage';
import { PortfolioProjects, ProfessionalStack, ContactDetails } from '../Data/PortfolioData';
import { Translations } from '../Data/Translations';
import { Routes, Route } from 'react-router-dom';

function renderPage(page: ReactElement, path = '/') {
  return render(<MemoryRouter initialEntries={[path]}><SiteProvider>{page}</SiteProvider></MemoryRouter>);
}

beforeEach(() => window.localStorage.clear());

describe('HomePage — primary business journeys', () => {
  it('shows the Spanish pitch, six demos and calls to action', () => {
    renderPage(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(Translations.es.home.titleOne);
    expect(screen.getByRole('link', { name: Translations.es.home.primary })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: Translations.es.home.secondary })).toHaveAttribute('href', '/projects');
    expect(screen.getAllByRole('link', { name: /Explorar solución/ })).toHaveLength(PortfolioProjects.length);
    expect(screen.getByText(Translations.es.projects.note)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: Translations.es.home.labCta })).toHaveAttribute('href', '/lab');
  });

  it('uses the saved English language throughout the presentation', () => {
    window.localStorage.setItem('gs-language', 'en');
    renderPage(<HomePage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(Translations.en.home.titleOne);
    expect(screen.getByRole('link', { name: Translations.en.home.primary })).toHaveAttribute('href', '/contact');
    expect(screen.getByText(Translations.en.home.valueTitle)).toBeInTheDocument();
  });
});

describe('ProjectsPage — category filtering', () => {
  it('shows all six projects and their count before filtering', () => {
    renderPage(<ProjectsPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(Translations.es.projects.title);
    expect(screen.getAllByRole('link', { name: /Explorar solución/ })).toHaveLength(6);
    expect(screen.getByText(`6 ${Translations.es.projects.resultsWord}`)).toBeInTheDocument();
    expect(screen.getByText(Translations.es.projects.note)).toBeInTheDocument();
  });

  it('filters gastronomy to two projects and restores all six', () => {
    renderPage(<ProjectsPage />);
    fireEvent.click(screen.getByRole('button', { name: /Gastronomía/ }));
    expect(screen.getAllByRole('link', { name: /Explorar solución/ })).toHaveLength(2);
    expect(screen.getByText(`2 ${Translations.es.projects.resultsWord}`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Gastronomía/ })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: /Todos los rubros/ }));
    expect(screen.getAllByRole('link', { name: /Explorar solución/ })).toHaveLength(6);
  });

  it.each([
    ['Educación', 'Aula Studio'],
    ['Belleza', 'The Perfect Cut'],
    ['Marcas creativas', 'UMBRAL'],
    ['Tiendas', 'Dummy Data Store'],
  ])('selects the %s category and keeps the correct project', (category, projectName) => {
    renderPage(<ProjectsPage />);
    fireEvent.click(screen.getByRole('button', { name: new RegExp(category) }));
    expect(screen.getAllByRole('link', { name: /Explorar solución/ })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 3, name: projectName })).toBeInTheDocument();
  });
});

describe('ProjectCasePage — data-driven case studies', () => {
  it('renders the correct demo link and story for a known project', () => {
    renderPage(<Routes><Route path="/projects/:id" element={<ProjectCasePage />} /></Routes>, '/projects/burger');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Blend Burger');
    expect(screen.getByRole('link', { name: Translations.es.common.live })).toHaveAttribute('href', PortfolioProjects[0].live);
    expect(screen.getByRole('link', { name: Translations.es.projects.detailBack })).toHaveAttribute('href', '/projects');
    expect(screen.getByText(Translations.es.projects.detailDisclaimer)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: Translations.es.common.source })).not.toBeInTheDocument();
  });

  it('offers the source repository when a case has one', () => {
    renderPage(<Routes><Route path="/projects/:id" element={<ProjectCasePage />} /></Routes>, '/projects/academy');
    expect(screen.getByRole('link', { name: Translations.es.common.source })).toHaveAttribute('href', PortfolioProjects[1].repo);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Aula Studio');
  });

  it('uses the Portuguese story when that preference is saved', () => {
    window.localStorage.setItem('gs-language', 'pt');
    renderPage(<Routes><Route path="/projects/:id" element={<ProjectCasePage />} /></Routes>, '/projects/restaurant');
    expect(screen.getByRole('link', { name: Translations.pt.projects.detailBack })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Maison Aster');
  });

  it('renders the not-found page for unknown projects', () => {
    renderPage(<Routes><Route path="/projects/:id" element={<ProjectCasePage />} /></Routes>, '/projects/unknown');
    expect(screen.getByRole('heading', { level: 1, name: Translations.es.notFound.title })).toBeInTheDocument();
  });
});

describe('Other pages — truthful content and navigation', () => {
  it('lists all six services, four process steps and the contact call to action', () => {
    renderPage(<ServicesPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(Translations.es.services.title);
    for (const title of [Translations.es.services.s1, Translations.es.services.s2, Translations.es.services.s3, Translations.es.services.s4, Translations.es.services.s5, Translations.es.services.s6]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    }
    for (const title of [Translations.es.services.step1, Translations.es.services.step2, Translations.es.services.step3, Translations.es.services.step4]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    }
    expect(screen.getByRole('link', { name: Translations.es.common.start })).toHaveAttribute('href', '/contact');
  });

  it('presents the professional profile and the declared technology stack', () => {
    renderPage(<AboutPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(Translations.es.about.title);
    expect(screen.getByRole('heading', { name: 'Pablo Gilabert.' })).toBeInTheDocument();
    for (const technology of ProfessionalStack) {
      expect(screen.getByText(technology, { exact: true })).toBeInTheDocument();
    }
    expect(screen.getAllByRole('link', { name: /GitHub/ })[0]).toHaveAttribute('href', ContactDetails.github);
  });

  it('provides contact channels and validates required subject and message fields', () => {
    renderPage(<ContactPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(Translations.es.contact.title);
    const subject = screen.getByRole('textbox', { name: Translations.es.contact.subject });
    const message = screen.getByRole('textbox', { name: Translations.es.contact.message });
    if (!(subject instanceof HTMLInputElement) || !(message instanceof HTMLTextAreaElement)) {
      throw new Error('Expected the labeled subject input and message textarea');
    }
    expect(subject).toBeRequired();
    expect(message).toBeRequired();
    expect(message).toHaveAttribute('minlength', '10');
    expect(subject.checkValidity()).toBe(false);
    fireEvent.change(subject, { target: { value: 'Sitio institucional' } });
    fireEvent.change(message, { target: { value: 'Necesito renovar la web de mi negocio.' } });
    expect(subject.checkValidity()).toBe(true);
    expect(message.checkValidity()).toBe(true);
    const form = subject.closest('form');
    if (!form) throw new Error('Expected a contact form');
    expect(within(form).getByRole('button', { name: Translations.es.contact.emailMe })).toBeInTheDocument();
    expect(screen.getByText(Translations.es.contact.note)).toBeInTheDocument();
    expect(document.querySelector(`a[href="mailto:${ContactDetails.email}"]`)).toBeInTheDocument();
  });

  it('offers a working return link when a route is missing', () => {
    renderPage(<NotFoundPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(Translations.es.notFound.title);
    expect(screen.getByRole('link', { name: Translations.es.common.back })).toHaveAttribute('href', '/');
  });
});
