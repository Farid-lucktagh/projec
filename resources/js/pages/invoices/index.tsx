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
import type { BreadcrumbItem } from '@/types';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoices',
        href: '/invoices',
    },
];

interface Cliente {
    id: number;
    nombre: string;
    numero_documento: string;
}

interface Invoice {
    id: number;
    codigo: string;
    subtotal: number;
    porcentaje_iva: number;
    monto_iva: number;
    descuento: number;
    total: number;
    metodo_pago: string;
    estado: string;
    notas: string | null;
    fecha_emision: string;
    cliente?: Cliente | null;
}

export default function Index({ invoices, filters }: { invoices: Invoice[], filters: { search?: string } }) {
    const { processing, delete: destroy } = useForm();
    const page = usePage<{ flash?: { success?: string } }>();
    const success = page.props.flash?.success;

    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get('/invoices', { search }, {
                preserveState: true,
                replace: true,
            });
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const handleDelete = (id: number) => {
        if (window.confirm('Seguro que deseas eliminar esta factura?')) {
            destroy(`/invoices/${id}`);
        }
    };

    const estadoLabel = (estado: string) => {
        const map: Record<string, { label: string; className: string }> = {
            completada: { label: 'Completada', className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' },
            pendiente:  { label: 'Pendiente',  className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
            anulada:    { label: 'Anulada',    className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
        };

        const info = map[estado] ?? { label: estado, className: 'bg-gray-100 text-gray-800' };

        return (
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${info.className}`}>
                {info.label}
            </span>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices" />

            <div className="m-4">

                {success && (
                    <div className="mb-4 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-700 dark:bg-green-900/30 dark:text-green-200">
                        {success}
                    </div>
                )}

                <div className="flex justify-between items-center mb-4">
                    <Link href="/invoices/create">
                        <Button>
                            Crear Factura
                        </Button>
                    </Link>
                    <div className="w-96">
                        <Input
                            placeholder="Search by code, client name or document..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {invoices.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Codigo</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Documento</TableHead>
                                <TableHead className="text-right">Subtotal</TableHead>
                                <TableHead className="text-right">IVA</TableHead>
                                <TableHead className="text-right">Descuento</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead>Pago</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell className="font-medium">
                                        {invoice.codigo}
                                    </TableCell>

                                    <TableCell>
                                        {invoice.cliente?.nombre ?? '-'}
                                    </TableCell>

                                    <TableCell>
                                        {invoice.cliente?.numero_documento ?? '-'}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        ${Number(invoice.subtotal).toFixed(2)}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        ${Number(invoice.monto_iva).toFixed(2)}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        ${Number(invoice.descuento).toFixed(2)}
                                    </TableCell>

                                    <TableCell className="text-right font-semibold">
                                        ${Number(invoice.total).toFixed(2)}
                                    </TableCell>

                                    <TableCell className="capitalize">
                                        {invoice.metodo_pago}
                                    </TableCell>

                                    <TableCell>
                                        {estadoLabel(invoice.estado)}
                                    </TableCell>

                                    <TableCell>
                                        {new Date(invoice.fecha_emision).toLocaleDateString()}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <Button
                                            disabled={processing}
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(invoice.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center py-10 text-muted-foreground border rounded-lg bg-gray-50/50">
                        No se encontraron facturas.
                    </div>
                )}
            </div>
        </AppLayout>
    );
}