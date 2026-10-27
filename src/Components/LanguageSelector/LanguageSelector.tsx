import { useContext, useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SiteContext } from '../../Contexts/SiteContext';
import type { Language } from '../../Data/Translations';
import styles from './languageSelector.module.css';

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

const languageOptions: LanguageOption[] = [
  { code: 'es', name: 'Español', flag: '/flags/Spain.svg' },
  { code: 'en', name: 'English', flag: '/flags/England.svg' },
  { code: 'pt', name: 'Português', flag: '/flags/Brazil.svg' },
];

const selectorLabels: Record<Language, string> = {
  es: 'Seleccionar idioma',
  en: 'Select language',
  pt: 'Selecionar idioma',
};

export function LanguageSelector() {
  const { language, setLanguage } = useContext(SiteContext);
  const [open, setOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);
  const current = languageOptions.find((option) => option.code === language) ?? languageOptions[0];

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !selectorRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        selectorRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.selector} ref={selectorRef}>
      <button
        className={styles.trigger}
        type="button"
        aria-label={`${selectorLabels[language]}: ${current.name}`}
        aria-expanded={open}
        aria-controls="pg-labs-language-options"
        onClick={() => setOpen((value) => !value)}
      >
        <img className={styles.flag} src={current.flag} alt="" width={26} height={18} />
        <span>{current.code.toUpperCase()}</span>
        <ChevronDown className={open ? styles.chevronOpen : styles.chevron} size={14} aria-hidden="true" />
      </button>
      {open && (
        <div className={styles.options} id="pg-labs-language-options" aria-label={selectorLabels[language]}>
          {languageOptions.map((option) => (
            <button
              className={`${styles.option} ${option.code === language ? styles.active : ''}`}
              key={option.code}
              type="button"
              aria-pressed={option.code === language}
              onClick={() => {
                setLanguage(option.code);
                setOpen(false);
              }}
            >
              <img className={styles.flag} src={option.flag} alt="" width={26} height={18} />
              <span>{option.name}</span>
              <small>{option.code.toUpperCase()}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
