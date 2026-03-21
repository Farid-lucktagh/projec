import { Head, Link, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import AppLayout from '@/layouts/app-layout';
import customersRoutes from '@/routes/customers';
import type { BreadcrumbItem } from '@/types';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [

    {
        title: 'Customers',
        href: customersRoutes.index().url,
    },
];

interface Customer {
    id: number;
    nombre: string;
    tipo_documento: string;
    numero_documento: string;
    telefono: string;
    correo: string;
    direccion: string;
    total_compras: number;
    estado: string;
}

export default function Index({ customers, filters }: { customers: Customer[], filters: { search?: string } }) {

    const { processing, delete: destroy } = useForm();
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(customersRoutes.index().url, { search }, {
                preserveState: true,
                replace: true,
            });
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
        destroy(customersRoutes.destroy(id).url);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers | list" />
            <div className="m-4">
                <div className="flex justify-between items-center mb-4">
                    <Link href={customersRoutes.create().url}>
                        <Button>
                            Create Customer
                        </Button>
                    </Link>
                    <div className="w-64">
                        <Input
                            placeholder="Search customers by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                {customers.length > 0 ? (
                    <Table>
                        <TableCaption>A list of your recent customers.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead className="text-right">Nombre</TableHead>
                                <TableHead className="text-right">Tipo Documento</TableHead>
                                <TableHead className="text-right">Número Documento</TableHead>
                                <TableHead className="text-right">Teléfono</TableHead>
                                <TableHead className="text-right">Correo</TableHead>
                                <TableHead className="text-right">Dirección</TableHead>
                                <TableHead className="text-right">Total Compras</TableHead>
                                <TableHead className="text-right">Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell className="w-[100px]">{customer.id}</TableCell>
                                    <TableCell className="text-right">{customer.nombre}</TableCell>
                                    <TableCell className="text-right">{customer.tipo_documento}</TableCell>
                                    <TableCell className="text-right">{customer.numero_documento}</TableCell>
                                    <TableCell className="text-right">{customer.telefono}</TableCell>
                                    <TableCell className="text-right">{customer.correo}</TableCell>
                                    <TableCell className="text-right">{customer.direccion}</TableCell>
                                    <TableCell className="text-right">{customer.total_compras}</TableCell>
                                    <TableCell className="text-right">{customer.estado}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={customersRoutes.edit(customer.id).url}>
                                            <Button className="mr-2">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button disabled={processing}
                                                className="bg-red-500 text-white" 
                                                onClick={() => handleDelete(customer.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center py-10 text-muted-foreground">
                        No customers found.
                    </div>
                )}            
            </div>


        </AppLayout>
    );
}
