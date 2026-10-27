import { createContext, useEffect, useState, type ReactNode } from 'react';
import { Translations, type Language, type Translation } from '../Data/Translations';
export type Theme = 'dark' | 'light';
export interface SiteContextValue {
    language: Language;
    setLanguage: (language: Language) => void;
    theme: Theme;
    toggleTheme: () => void;
    text: Translation;
}
export const SiteContext = createContext<SiteContextValue>({
    language: 'es', setLanguage: () => undefined, theme: 'dark',
    toggleTheme: () => undefined, text: Translations.es,
});
function ReadPreference<Key extends string>(key: string, allowed: readonly Key[], fallback: Key): Key {
    try {
        const value = localStorage.getItem(key);
        return allowed.find((option) => option === value) ?? fallback;
    }
    catch {
        return fallback;
    }
}
export function SiteProvider({ children }: {
    children: ReactNode;
}) {
    const [language, setLanguage] = useState<Language>(() => ReadPreference('gs-language', ['es', 'en', 'pt'], 'es'));
    const [theme, setTheme] = useState<Theme>(() => ReadPreference('gs-theme', ['dark', 'light'], 'dark'));
    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dataset.theme = theme;
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0b0e14' : '#f4f6f5');
        try {
            localStorage.setItem('gs-language', language);
            localStorage.setItem('gs-theme', theme);
        }
        catch { /* Browsing preferences remain active for the current session. */ }
    }, [language, theme]);
    return (<SiteContext.Provider value={{ language, setLanguage, theme, toggleTheme: () => setTheme((current) => current === 'dark' ? 'light' : 'dark'), text: Translations[language] }}>
      {children}
    </SiteContext.Provider>);
}

