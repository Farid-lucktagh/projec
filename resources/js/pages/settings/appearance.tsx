import { Head } from '@inertiajs/react';
import AppearanceTabs from '@/components/appearance-tabs';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit as editAppearance } from '@/routes/appearance';
import type { BreadcrumbItem } from '@/types';
import { useTranslation } from '@/hooks/use-translation';

export default function Appearance() {
    const { t } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Appearance settings'),
            href: editAppearance().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Appearance settings')} />

            <h1 className="sr-only">{t('Appearance settings')}</h1>

            <SettingsLayout>
                <div className="space-y-6">
                    <Heading
                        variant="small"
                        title={t('Appearance settings')}
                        description={t("Update your account's appearance settings")}
                    />
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <h2 className="text-sm font-medium">{t('Appearance')}</h2>
                            <AppearanceTabs />
                        </div>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
