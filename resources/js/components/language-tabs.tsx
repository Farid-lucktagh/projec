import { Languages } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import type { Locale } from '@/hooks/use-language';
import { useLanguage } from '@/hooks/use-language';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

export default function LanguageTabs({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { locale, updateLanguage } = useLanguage();
    const { t } = useTranslation();

    const tabs: { value: Locale; label: string }[] = [
        { value: 'en', label: t('English') },
        { value: 'es', label: t('Spanish') },
    ];

    return (
        <div
            className={cn(
                'inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800',
                className,
            )}
            {...props}
        >
            {tabs.map(({ value, label }) => (
                <button
                    key={value}
                    onClick={() => updateLanguage(value)}
                    className={cn(
                        'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                        locale === value
                            ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                    )}
                >
                    <Languages className="-ml-1 h-4 w-4" />
                    <span className="ml-1.5 text-sm">{label}</span>
                </button>
            ))}
        </div>
    );
}
