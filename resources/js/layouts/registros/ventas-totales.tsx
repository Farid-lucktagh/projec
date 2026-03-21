import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

interface RegistrosTotals extends SharedData {
    totals: {
        sales_count: number;
        invoices_count: number;
    };
}

export default function RegistrosVentas() {
    const { totals } = usePage<RegistrosTotals>().props;

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Ventas Totales
            </h3>
            <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {totals.sales_count + totals.invoices_count}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    registros realizados
                </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-gray-50 dark:border-gray-700/50">
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Ventas (Sales)</p>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{totals.sales_count}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Facturas (Invoices)</p>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{totals.invoices_count}</p>
                </div>
            </div>
        </div>
    );
}
