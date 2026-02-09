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
    decripcion: string;
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
            <div>
                <Table>
                    <TableCaption>A list of categories.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead>Color</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className="text-right">{category.id}</TableCell>
                                <TableCell className="text-right">{category.nombre}</TableCell>
                                <TableCell className="text-right">{category.decripcion}</TableCell>
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
