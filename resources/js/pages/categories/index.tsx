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
import categoriesRoute from '@/routes/categories';
import type { BreadcrumbItem } from '@/types';
import { useEffect, useState } from 'react';

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

export default function Index({ categories, filters }: { categories: Category[], filters: { search?: string } }) {

    const { processing, delete: destroy } = useForm();
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(categoriesRoute.index().url, { search }, {
                preserveState: true,
                replace: true,
            });
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            destroy(categoriesRoute.destroy(id).url);
        }

    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="m-4">
                <div className="flex justify-between items-center mb-4">
                    <Link href={categoriesRoute.create().url}>
                        <Button>
                            Create Category
                        </Button>
                    </Link>
                    <div className="w-64">
                        <Input
                            placeholder="Search categories by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                {categories.length > 0 ? (
                    <Table>
                        <TableCaption>A list of categories.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead className="text-right">Descripción</TableHead>
                                <TableHead className="text-right">Color</TableHead>
                                <TableHead className="text-right">Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">{category.nombre}</TableCell>
                                    <TableCell className="text-right">{category.descripcion}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <span className="text-xs font-mono text-muted-foreground">{category.color}</span>
                                            <div 
                                                className="size-4 rounded-full border border-black/10 shadow-sm" 
                                                style={{ backgroundColor: category.color }}
                                                title={category.color}
                                            />
                                        </div>
                                    </TableCell>
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
                ) : (
                    <div className="text-center py-10 text-muted-foreground">
                        No categories found.
                    </div>
                )}                
            </div>


        </AppLayout>
    );
}
