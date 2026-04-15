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
import productsRoutes from '@/routes/products';
import type { BreadcrumbItem } from '@/types';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [

    {
        title: 'Productos',
        href: productsRoutes.index().url,
    },
];

interface Product {
    id: number;
    nombre: string;
    categoria_id: number;
    precio: number;
    cantidad_stock: number;
    proveedor_id: number;
    estado: string;
    categoria?: {
        id: number;
        nombre: string;
    };
    proveedor?: {
        id: number;
        nombre: string;
    };
}

export default function Index({ products, filters }: { products: Product[], filters: { search?: string } }) {

    const { processing, delete: destroy } = useForm();
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(productsRoutes.index().url, { search }, {
                preserveState: true,
                replace: true,
            });
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        destroy(productsRoutes.destroy(id).url);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos | Lista" />
            <div className="m-4">
                <div className="flex justify-between items-center mb-4">
                    <Link href={productsRoutes.create().url}>
                        <Button>
                            Crear Producto
                        </Button>
                    </Link>
                    <div className="w-96">
                        <Input
                            placeholder="Buscar por nombre, categoría o proveedor..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                {products.length > 0 ? (
                    <Table>
                        <TableCaption>Una lista de tus productos recientes.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead className="text-right">Categoría</TableHead>
                                <TableHead className="text-right">Precio</TableHead>
                                <TableHead className="text-right">Stock</TableHead>
                                <TableHead className="text-right">Proveedor</TableHead>
                                <TableHead className="text-right">Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.nombre}</TableCell>
                                    <TableCell className="text-right">{product.categoria?.nombre || product.categoria_id}</TableCell>
                                    <TableCell className="text-right">{product.precio}</TableCell>
                                    <TableCell className="text-right">{product.cantidad_stock}</TableCell>
                                    <TableCell className="text-right">{product.proveedor?.nombre || product.proveedor_id}</TableCell>
                                    <TableCell className="text-right">{product.estado}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={productsRoutes.edit(product.id).url}>
                                            <Button className="mr-2">
                                                Editar
                                            </Button>
                                        </Link>
                                        <Button disabled={processing}
                                                className="bg-red-500 text-white" 
                                                onClick={() => handleDelete(product.id)}>
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center py-10 text-muted-foreground">
                        No se encontraron productos.
                    </div>
                )}            
            </div>


        </AppLayout>
    );
}
