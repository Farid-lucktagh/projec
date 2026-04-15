import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, SharedData } from '@/types';
import { AlertTriangle, Users, Wallet } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

interface DashboardProps extends SharedData {
    stats: {
        money_today: number;
        customers_today: number;
        inventory: {
            out_of_stock: number;
            low_stock: number;
        };
        latest_transactions: {
            id: number;
            tipo: string;
            cliente: string;
            total: number;
            fecha: string;
        }[];
        customers_today_detailed: {
            nombre: string;
            atendido_por: string;
            fecha: string;
            tipo: string;
        }[];
        latest_products_sold: {
            nombre: string;
            cantidad: number;
            fecha: string;
        }[];
    }
}

export default function Dashboard() {
    const { stats } = usePage<DashboardProps>().props;
    const { t } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Dashboard'),
            href: dashboard().url,
        },
    ];

    return (        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Dashboard')} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Caja 1: Dinero acumulado hoy */}
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 flex flex-col justify-center items-center text-center bg-emerald-50/30 dark:bg-emerald-950/10">
                        <Wallet className="size-8 text-emerald-600 dark:text-emerald-400 mb-2" />
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                            {t('Dinero Hoy')}
                        </h3>
                        <span className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">
                            ${(stats?.money_today || 0).toLocaleString('es-CO', { minimumFractionDigits: 2 })}
                        </span>
                        <p className="text-[10px] text-muted-foreground mt-2 italic">
                            {t('Acumulado en caja hoy')}
                        </p>
                    </div>

                    {/* Caja 2: Clientes atendidos hoy */}
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 flex flex-col justify-center items-center text-center">
                        <Users className="size-8 text-blue-600 dark:text-blue-400 mb-2" />
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                            {t('Clientes Hoy')}
                        </h3>
                        <span className="text-3xl font-bold">
                            {stats?.customers_today || 0}
                        </span>
                        <p className="text-[10px] text-muted-foreground mt-2">
                            {t('atendidos el día de hoy')}
                        </p>
                    </div>

                    {/* Caja 3: Estado del Inventario */}
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6 flex flex-col justify-center items-center text-center bg-orange-50/30 dark:bg-orange-950/10">
                        <AlertTriangle className="size-8 text-orange-500 mb-2" />
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                            {t('Estado Inventario')}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="flex flex-col items-center">
                                <span className={`text-2xl font-bold ${(stats?.inventory?.out_of_stock || 0) > 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
                                    {stats?.inventory?.out_of_stock || 0}
                                </span>
                                <span className="text-[9px] text-muted-foreground uppercase font-medium">{t('Sin Stock')}</span>
                            </div>
                            <div className="flex flex-col items-center border-l border-sidebar-border/50">
                                <span className={`text-2xl font-bold ${(stats?.inventory?.low_stock || 0) > 0 ? 'text-orange-500' : 'text-muted-foreground'}`}>
                                    {stats?.inventory?.low_stock || 0}
                                </span>
                                <span className="text-[9px] text-muted-foreground uppercase font-medium">{t('Bajo Stock')}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Caja 4: Últimas ventas y facturas */}
                    <div className="relative min-h-[300px] overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
                        <h3 className="text-xs font-bold uppercase text-muted-foreground mb-4 border-b pb-2">{t('Últimas Transacciones')}</h3>
                        <div className="space-y-3">
                            {stats?.latest_transactions?.length > 0 ? (
                                stats.latest_transactions.map((t_item, i) => (
                                    <div key={i} className="flex items-center justify-between text-xs border-b border-sidebar-border/30 pb-2 last:border-0">
                                        <div className="flex flex-col">
                                            <span className="font-semibold">{t_item.cliente}</span>
                                            <span className="text-[10px] text-muted-foreground">{t(t_item.tipo)} - {new Date(t_item.fecha).toLocaleDateString()}</span>
                                        </div>
                                        <span className="font-bold text-emerald-600">${Number(t_item.total).toLocaleString()}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-muted-foreground italic text-center py-10">{t('No hay transacciones recientes')}</p>
                            )}
                        </div>
                    </div>

                    {/* Caja 5: Clientes atendidos hoy detallados */}
                    <div className="relative min-h-[300px] overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
                        <h3 className="text-xs font-bold uppercase text-muted-foreground mb-4 border-b pb-2">{t('Clientes de Hoy')}</h3>
                        <div className="space-y-3">
                            {stats?.customers_today_detailed?.length > 0 ? (
                                stats.customers_today_detailed.map((c, i) => (
                                    <div key={i} className="flex items-center justify-between text-xs border-b border-sidebar-border/30 pb-2 last:border-0">
                                        <div className="flex flex-col">
                                            <span className="font-semibold">{c.nombre}</span>
                                            <span className="text-[10px] text-muted-foreground">{t(c.tipo)} - {t('Por')}: <span className="font-medium">{c.atendido_por}</span></span>
                                        </div>
                                        <span className="text-[10px] bg-blue-50 dark:bg-blue-950/30 text-blue-600 px-2 py-0.5 rounded-full font-medium">{c.fecha}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-muted-foreground italic text-center py-10">{t('No hay clientes hoy todavía')}</p>
                            )}
                        </div>
                    </div>

                    {/* Caja 6: Últimos productos vendidos */}
                    <div className="relative min-h-[300px] overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
                        <h3 className="text-xs font-bold uppercase text-muted-foreground mb-4 border-b pb-2">{t('Últimos Productos Vendidos')}</h3>
                        <div className="space-y-3">
                            {stats?.latest_products_sold?.length > 0 ? (
                                stats.latest_products_sold.map((p, i) => (
                                    <div key={i} className="flex items-center justify-between text-xs border-b border-sidebar-border/30 pb-2 last:border-0">
                                        <div className="flex flex-col">
                                            <span className="font-semibold truncate max-w-[150px]">{p.nombre}</span>
                                            <span className="text-[10px] text-muted-foreground">{p.fecha ? new Date(p.fecha).toLocaleDateString() : ''}</span>
                                        </div>
                                        <span className="text-[10px] bg-orange-50 dark:bg-orange-950/30 text-orange-600 px-2 py-0.5 rounded-full font-bold">{p.cantidad} und</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-muted-foreground italic text-center py-10">{t('No hay productos vendidos recientemente')}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
