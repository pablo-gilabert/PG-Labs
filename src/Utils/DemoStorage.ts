export function ReadDemo<T>(
  key: string,
  fallback: T,
  validate: (value: unknown) => value is T,
): T {
  try {
    const stored = window.localStorage.getItem(`gs-demo-${key}`);
    if (stored === null) return fallback;
    const parsed: unknown = JSON.parse(stored);
    return validate(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function WriteDemo(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(`gs-demo-${key}`, JSON.stringify(value));
  } catch {
    // The demo remains functional in memory if browser storage is restricted.
  }
}

export function formatMoney(amount: number, language: string): string {
  const locale = language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-AR';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}
