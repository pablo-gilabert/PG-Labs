import { useContext } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SiteContext, SiteProvider } from '../Contexts/SiteContext';

function PreferenceControls() {
  const { language, theme, setLanguage, toggleTheme } = useContext(SiteContext);
  return (
    <div>
      <output aria-label="Current language">{language}</output>
      <output aria-label="Current theme">{theme}</output>
      <button type="button" onClick={() => setLanguage('pt')}>Português</button>
      <button type="button" onClick={toggleTheme}>Toggle theme</button>
    </div>
  );
}

describe('SiteProvider — visitors preferences', () => {
  beforeEach(() => window.localStorage.clear());

  it('starts in Spanish and dark mode with no saved preference', () => {
    render(<SiteProvider><PreferenceControls /></SiteProvider>);
    expect(screen.getByLabelText('Current language')).toHaveTextContent('es');
    expect(screen.getByLabelText('Current theme')).toHaveTextContent('dark');
    expect(document.documentElement.lang).toBe('es');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('restores saved language and theme preferences', () => {
    window.localStorage.setItem('gs-language', 'en');
    window.localStorage.setItem('gs-theme', 'light');
    render(<SiteProvider><PreferenceControls /></SiteProvider>);
    expect(screen.getByLabelText('Current language')).toHaveTextContent('en');
    expect(screen.getByLabelText('Current theme')).toHaveTextContent('light');
  });

  it('persists changes to language and theme', async () => {
    render(<SiteProvider><PreferenceControls /></SiteProvider>);
    fireEvent.click(screen.getByRole('button', { name: 'Português' }));
    fireEvent.click(screen.getByRole('button', { name: 'Toggle theme' }));
    await waitFor(() => {
      expect(window.localStorage.getItem('gs-language')).toBe('pt');
      expect(window.localStorage.getItem('gs-theme')).toBe('light');
    });
    expect(document.documentElement.lang).toBe('pt');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('ignores unknown saved preferences', () => {
    window.localStorage.setItem('gs-language', 'invalid');
    window.localStorage.setItem('gs-theme', 'rainbow');
    render(<SiteProvider><PreferenceControls /></SiteProvider>);
    expect(screen.getByLabelText('Current language')).toHaveTextContent('es');
    expect(screen.getByLabelText('Current theme')).toHaveTextContent('dark');
  });
});
