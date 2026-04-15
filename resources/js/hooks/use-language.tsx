import { useCallback, useSyncExternalStore } from 'react';

export type Locale = 'en' | 'es';

export type UseLanguageReturn = {
    readonly locale: Locale;
    readonly updateLanguage: (newLocale: Locale) => void;
};

const listeners = new Set<() => void>();
let currentLocale: Locale = 'en';

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') return;
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const getStoredLocale = (): Locale => {
    if (typeof window === 'undefined') return 'en';
    const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith('locale='))
        ?.split('=')[1];
    
    return (cookieValue as Locale) || (localStorage.getItem('locale') as Locale) || 'en';
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
};

const notify = (): void => listeners.forEach((listener) => listener());

export function initializeLanguage(): void {
    if (typeof window === 'undefined') return;
    currentLocale = getStoredLocale();
}

export function useLanguage(): UseLanguageReturn {
    const locale: Locale = useSyncExternalStore(
        subscribe,
        () => currentLocale,
        () => 'en',
    );

    const updateLanguage = useCallback((newLocale: Locale): void => {
        currentLocale = newLocale;
        localStorage.setItem('locale', newLocale);
        setCookie('locale', newLocale);
        notify();
        // Recargar la página para aplicar los cambios en el servidor y recibir las nuevas traducciones
        window.location.reload();
    }, []);

    return {
        locale,
        updateLanguage,
    };
}
