import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LanguageSelector } from '../Components/LanguageSelector/LanguageSelector';
import { SiteProvider } from '../Contexts/SiteContext';

function renderSelector() {
  return render(<SiteProvider><LanguageSelector /><button type="button">Outside control</button></SiteProvider>);
}

// Query the visible option label instead of depending on CSS-driven accessible-name whitespace.
function getLanguageOption(name: string): HTMLButtonElement {
  const option = screen.getByText(name, { selector: 'span' }).closest('button');
  if (!(option instanceof HTMLButtonElement)) throw new Error(`Expected a button for ${name}`);
  return option;
}

beforeEach(() => window.localStorage.clear());

describe('LanguageSelector — accessible language selection', () => {
  it('defaults to Spanish with the correct flag and a closed list', () => {
    renderSelector();
    const trigger = screen.getByRole('button', { name: /Seleccionar idioma: ES/ });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger.querySelector('img')).toHaveAttribute('src', '/flags/Spain.svg');
    expect(trigger).not.toHaveAttribute('aria-controls');
    expect(screen.queryByRole('button', { name: /Português/ })).not.toBeInTheDocument();
  });

  it('lists three languages and exposes the pressed state of the current option', () => {
    renderSelector();
    fireEvent.click(screen.getByRole('button', { name: /Seleccionar idioma/ }));
    expect(screen.getByRole('button', { name: /Seleccionar idioma/ })).toHaveAttribute('aria-expanded', 'true');
    expect(getLanguageOption('Español')).toHaveAttribute('aria-pressed', 'true');
    expect(getLanguageOption('English')).toHaveAttribute('aria-pressed', 'false');
    expect(getLanguageOption('Português')).toHaveAttribute('aria-pressed', 'false');
  });

  it('switches to English, closes the list, and saves the preference', async () => {
    renderSelector();
    fireEvent.click(screen.getByRole('button', { name: /Seleccionar idioma/ }));
    fireEvent.click(getLanguageOption('English'));
    const trigger = screen.getByRole('button', { name: /Select language: EN/ });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger.querySelector('img')).toHaveAttribute('src', '/flags/England.svg');
    await waitFor(() => expect(window.localStorage.getItem('gs-language')).toBe('en'));
  });

  it('restores Portuguese and selects Spanish again', async () => {
    window.localStorage.setItem('gs-language', 'pt');
    renderSelector();
    fireEvent.click(screen.getByRole('button', { name: /Selecionar idioma: PT/ }));
    fireEvent.click(getLanguageOption('Español'));
    await waitFor(() => expect(window.localStorage.getItem('gs-language')).toBe('es'));
  });

  it('closes on Escape and returns focus to the trigger', () => {
    renderSelector();
    fireEvent.click(screen.getByRole('button', { name: /Seleccionar idioma/ }));
    fireEvent.keyDown(document, { key: 'Escape' });
    const trigger = screen.getByRole('button', { name: /Seleccionar idioma: ES/ });
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes when clicking outside and remains open when interacting inside', () => {
    renderSelector();
    fireEvent.click(screen.getByRole('button', { name: /Seleccionar idioma/ }));
    fireEvent.pointerDown(getLanguageOption('Español'));
    expect(screen.getByRole('button', { name: /Seleccionar idioma/ })).toHaveAttribute('aria-expanded', 'true');
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside control' }));
    expect(screen.getByRole('button', { name: /Seleccionar idioma/ })).toHaveAttribute('aria-expanded', 'false');
  });

  it('allows closing the options by clicking the trigger again', () => {
    renderSelector();
    fireEvent.click(screen.getByRole('button', { name: /Seleccionar idioma/ }));
    fireEvent.click(screen.getByRole('button', { name: /Seleccionar idioma/ }));
    expect(screen.queryByRole('button', { name: /Português/ })).not.toBeInTheDocument();
  });
});
