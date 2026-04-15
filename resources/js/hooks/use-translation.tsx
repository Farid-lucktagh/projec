import { usePage } from '@inertiajs/react';

export function useTranslation() {
    const { translations = {} } = usePage().props as any;

    const t = (key: string) => {
        // Diccionario de respaldo rápido para strings comunes en español
        const fallback: Record<string, string> = {
            'Dashboard': 'Panel de control',
            'Products': 'Productos',
            'Categories': 'Categorías',
            'Customers': 'Clientes',
            'Invoices': 'Facturas',
            'Sales': 'Ventas',
            'Reports': 'Reportes',
            'Users': 'Usuarios',
            'Settings': 'Configuración',
            'Log out': 'Cerrar sesión',
            'Appearance settings': 'Configuración de apariencia',
            'Appearance': 'Apariencia',
            'Update your account\'s appearance settings': 'Actualiza la configuración de apariencia de tu cuenta',
            'Platform': 'Plataforma',
            'Repository': 'Repositorio',
            'Documentation': 'Documentación',
            'Light': 'Claro',
            'Dark': 'Oscuro',
            'System': 'Sistema',
            'Money Today': 'Dinero Hoy',
            'Customers Today': 'Clientes Hoy',
            'Inventory Status': 'Estado Inventario',
            'Out of Stock': 'Sin Stock',
            'Low Stock': 'Bajo Stock',
            'Latest Transactions': 'Últimas Transacciones',
            'Today\'s Customers': 'Clientes de Hoy',
            'Latest Products Sold': 'Últimos Productos Vendidos',
            'Sale': 'Venta',
            'Invoice': 'Factura',
            'By': 'Por'
        };

        return translations[key] || fallback[key] || key;
    };

    return { t };
}
