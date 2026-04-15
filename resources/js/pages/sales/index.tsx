import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import AppLayout from '@/layouts/app-layout';
import salesRoutes from '@/routes/sales';
import type { BreadcrumbItem } from '@/types';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ventas',
        href: salesRoutes.index().url,
    },
];

interface Cliente {
    nombre: string;
    numero_documento: string;
}

interface Sale {
    id: number;
    subtotal: number;
    impuesto: number;
    total: number;
    created_at: string;
    cliente?: Cliente;
}

export default function Index({ sales, filters }: { sales: Sale[], filters: { search?: string } }) {
    const { processing, delete: destroy } = useForm();
    const page = usePage<{ flash?: { success?: string } }>();
    const success = page.props.flash?.success;

    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(salesRoutes.index().url, { search }, {
                preserveState: true,
                replace: true,
            });
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta venta?')) {
            destroy(salesRoutes.destroy(id).url);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ventas" />
            <div className="m-4">
                {success && (
                    <div className="mb-4 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-700 dark:bg-green-900/30 dark:text-green-200">
                        {success}
                    </div>
                )}
                <div className="flex justify-between items-center mb-4">
                    <Link href={salesRoutes.create().url}>
                        <Button>
                            Crear Venta
                        </Button>
                    </Link>
                    <div className="w-96">
                        <Input
                            placeholder="Buscar por nombre de cliente o documento..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                {sales.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Documento</TableHead>
                                <TableHead className="text-right">Subtotal</TableHead>
                                <TableHead className="text-right">Impuesto</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sales.map((sale) => (
                                <TableRow key={sale.id}>
                                    <TableCell className="font-medium">{sale.cliente?.nombre ?? '-'}</TableCell>
                                    <TableCell>{sale.cliente?.numero_documento ?? '-'}</TableCell>
                                    <TableCell className="text-right">{Number(sale.subtotal).toFixed(2)}</TableCell>
                                    <TableCell className="text-right">{Number(sale.impuesto).toFixed(2)}</TableCell>
                                    <TableCell className="text-right">{Number(sale.total).toFixed(2)}</TableCell>
                                    <TableCell>{new Date(sale.created_at).toLocaleString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            disabled={processing}
                                            className="bg-red-500 text-white"
                                            onClick={() => handleDelete(sale.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center py-10 text-muted-foreground">
                        No se encontraron ventas.
                    </div>
                )}
            </div>

        </AppLayout>
    );
}
