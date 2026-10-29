import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../App';
import { Header } from '../Components/Header/Header';
import { Footer } from '../Components/Footer/Footer';
import { SiteProvider } from '../Contexts/SiteContext';
import { ContactDetails } from '../Data/PortfolioData';
import { Translations } from '../Data/Translations';

function renderHeaderAndFooter(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <SiteProvider><Header /><Footer /></SiteProvider>
    </MemoryRouter>,
  );
}

function renderApplication(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <SiteProvider><App /></SiteProvider>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  window.localStorage.clear();
  // jsdom does not implement layout scrolling, unlike the real browser.
  vi.stubGlobal('scrollTo', vi.fn());
});

describe('Header — navigation and theme controls', () => {
  it('renders the brand, navigation routes and contact links', () => {
    renderHeaderAndFooter();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /PG Labs.*WEB DEVELOPMENT/ })).toHaveAttribute('href', '/');
    expect(screen.getAllByRole('link', { name: Translations.es.nav.projects })[0]).toHaveAttribute('href', '/projects');
    expect(screen.getAllByRole('link', { name: Translations.es.nav.contact })[0]).toHaveAttribute('href', '/contact');
  });

  it('switches the logo artwork and theme button when toggling light mode', () => {
    renderHeaderAndFooter();
    const logos = screen.getAllByRole('img', { name: 'PG Labs' });
    expect(logos[0]).toHaveAttribute('src', '/brand/pgLabsLogoDark.png');
    fireEvent.click(screen.getByRole('button', { name: 'Switch to light theme' }));
    expect(screen.getAllByRole('img', { name: 'PG Labs' })[0]).toHaveAttribute('src', '/brand/pgLabsLogo.png');
    expect(screen.getByRole('button', { name: 'Cambiar a tema oscuro' })).toBeInTheDocument();
  });

  // jsdom has no responsive layout: an aria-labeled mobile button remains CSS-hidden.
  it('opens and closes the mobile navigation and closes it after navigation', () => {
    renderHeaderAndFooter();
    const toggle = screen.getByLabelText(Translations.es.nav.menu, { selector: 'button' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    const close = screen.getByLabelText(Translations.es.nav.close, { selector: 'button' });
    expect(close).toHaveAttribute('aria-expanded', 'true');
    const link = screen.getByRole('navigation', { name: 'Main navigation' }).querySelector('a[href="/projects"]');
    if (!link) throw new Error('Expected projects navigation link');
    fireEvent.click(link);
    expect(screen.getByLabelText(Translations.es.nav.menu, { selector: 'button' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the mobile navigation when the brand is selected', () => {
    renderHeaderAndFooter('/projects');
    fireEvent.click(screen.getByLabelText(Translations.es.nav.menu, { selector: 'button' }));
    fireEvent.click(screen.getByRole('link', { name: /PG Labs.*WEB DEVELOPMENT/ }));
    expect(screen.getByLabelText(Translations.es.nav.menu, { selector: 'button' })).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('Footer — company contact details', () => {
  it('exposes the configured email, WhatsApp and professional accounts', () => {
    renderHeaderAndFooter();
    const footer = screen.getByRole('contentinfo');
    expect(footer.querySelector(`a[href="mailto:${ContactDetails.email}"]`)).toBeInTheDocument();
    expect(footer.querySelector(`a[href="https://wa.me/${ContactDetails.whatsApp}"]`)).toHaveAttribute('target', '_blank');
    expect(footer.querySelector(`a[href="${ContactDetails.github}"]`)).toHaveAttribute('rel', 'noreferrer');
    expect(footer.querySelector(`a[href="${ContactDetails.linkedIn}"]`)).toBeInTheDocument();
    expect(footer.textContent).toContain(String(new Date().getFullYear()));
  });

  it('keeps the back-to-content anchor and internal navigation available', () => {
    renderHeaderAndFooter();
    const footer = screen.getByRole('contentinfo');
    expect(footer.querySelector('a[href="#main"]')).toHaveAttribute('aria-label', Translations.es.footer.toTop);
    expect(footer.querySelector('a[href="/lab"]')).toBeInTheDocument();
  });
});

describe('App — routing and document metadata', () => {
  it.each([
    ['/', Translations.es.nav.home],
    ['/projects', Translations.es.nav.projects],
    ['/services', Translations.es.nav.services],
    ['/lab', Translations.es.nav.lab],
    ['/about', Translations.es.nav.about],
    ['/contact', Translations.es.nav.contact],
  ])('renders %s with a meaningful document title', (path, label) => {
    renderApplication(path);
    expect(document.title).toBe(`${label} | PG Labs`);
    expect(document.querySelector('main#main')).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('es');
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
  });

  it('recognizes case-study routes and handles an unknown path', () => {
    const first = renderApplication('/projects/burger');
    expect(document.title).toBe('Blend Burger | PG Labs');
    first.unmount();
    renderApplication('/nonexistent-route');
    expect(document.title).toBe('404 | PG Labs');
    expect(screen.getByRole('heading', { level: 1, name: Translations.es.notFound.title })).toBeInTheDocument();
  });

  it('provides a skip link for keyboard navigation', () => {
    renderApplication('/');
    expect(screen.getByRole('link', { name: /Skip to content/ })).toHaveAttribute('href', '#main');
  });
});
