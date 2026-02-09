import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import categoriesRoute from '@/routes/categories';
import type { BreadcrumbItem } from '@/types';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: categoriesRoute.index().url,
    },
];

interface Category {
    id: number;
    nombre: string;
    descripcion: string;
    color: string;
    estado: string;
}

export default function index({ categories }: { categories: Category[] }) {

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            destroy(categoriesRoute.destroy(id).url);
        }

    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="m-4">
                <Link href={categoriesRoute.create().url}>
                    <Button className="mb-4">
                        Create Category
                    </Button>
                </Link>
                <Table>
                    <TableCaption>A list of categories.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead className="text-right">Nombre</TableHead>
                            <TableHead className="text-right">Descripción</TableHead>
                            <TableHead className="text-right">Color</TableHead>
                            <TableHead className="text-right">Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className="w-[100px]">{category.id}</TableCell>
                                <TableCell className="text-right">{category.nombre}</TableCell>
                                <TableCell className="text-right">{category.descripcion}</TableCell>
                                <TableCell className="text-right">{category.color}</TableCell>
                                <TableCell className="text-right">{category.estado}</TableCell>
                                <TableCell className="text-right">
                                    <Link href={categoriesRoute.edit(category.id).url}>
                                        <Button className="mr-2">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button disabled={processing}
                                            className="bg-red-500 text-white" 
                                            onClick={() => handleDelete(category.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>                
            </div>


        </AppLayout>
    );
}
