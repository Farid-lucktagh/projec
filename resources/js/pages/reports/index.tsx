import { Head, usePage } from '@inertiajs/react';
import SalesChart from '@/components/sales-chart';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import reportsRoutes from '@/routes/reports';
import type { BreadcrumbItem, SharedData } from '@/types';

interface RegistrosTotals extends SharedData {
    totals: {
        sales_count: number;
        invoices_count: number;
        customers_today_count: number;
        products_sold_count: number;
        money_today_total: number;
    };
}

 

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reports',
        href: reportsRoutes.index().url,
    },
];

export default function Dashboard() {
    const { totals } = usePage<RegistrosTotals>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">


                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col justify-center items-center text-center">
                        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                            Ventas Totales
                        </h3>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold">
                                {totals.sales_count + totals.invoices_count}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                                registros realizados
                            </span>
                        </div>
                        <div className="mt-2 w-full grid grid-cols-2 gap-2 pt-2 border-t border-sidebar-border/50">
                            <div>
                                <p className="text-[9px] text-muted-foreground">Ventas</p>
                                <p className="text-sm font-semibold">{totals.sales_count}</p>
                            </div>
                            <div>
                                <p className="text-[9px] text-muted-foreground">Facturas</p>
                                <p className="text-sm font-semibold">{totals.invoices_count}</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col justify-center items-center text-center">
                        <h3 className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                            Dinero Hoy
                        </h3>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                                ${totals.money_today_total.toLocaleString('es-CO', { minimumFractionDigits: 2 })}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                                acumulado en caja hoy
                            </span>
                        </div>
                        <div className="mt-2 w-full pt-2 border-t border-sidebar-border/50">
                            <p className="text-[9px] text-muted-foreground italic">
                                Ventas + Facturas del día
                            </p>
                        </div>
                    </div>

                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col justify-center items-center text-center">
                        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                            Clientes Hoy
                        </h3>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold">
                                {totals.customers_today_count}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                                atendidos el día de hoy
                            </span>
                        </div>
                        <div className="mt-2 w-full pt-2 border-t border-sidebar-border/50">
                            <p className="text-[9px] text-muted-foreground italic">
                                {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col justify-center items-center text-center">
                        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                            Productos Vendidos
                        </h3>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold">
                                {totals.products_sold_count}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                                unidades totales entregadas
                            </span>
                        </div>
                        <div className="mt-2 w-full pt-2 border-t border-sidebar-border/50">
                            <p className="text-[9px] text-muted-foreground">
                                Incluye Ventas y Facturas
                            </p>
                        </div>
                    </div>


                </div>
                <div className="grid gap-4 md:grid-cols-2 h-screen">


                    <div className="relative h-full overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
                        <SalesChart />
                    </div>

                    <div className="relative h-full overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>

                    
                </div>            
            </div>
        </AppLayout>
    );
}
