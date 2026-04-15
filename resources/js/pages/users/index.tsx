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
import userRoute from '@/routes/users';
import type { BreadcrumbItem } from '@/types';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: userRoute.index().url,
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    rol: string;
    estado: string;
}

export default function Index({ users, filters }: { users: User[], filters: { search?: string } }) {

    const { processing, delete: destroy } = useForm();
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(userRoute.index().url, { search }, {
                preserveState: true,
                replace: true,
            });
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const handleDelete = (id: number) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            destroy(userRoute.destroy(id).url);
        }

    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />
            <div className="m-4">
                <div className="flex justify-between items-center mb-4">
                    <Link href={userRoute.create().url}>
                        <Button>
                            Crear Usuario
                        </Button>
                    </Link>
                    <div className="w-64">
                        <Input
                            placeholder="Buscar usuarios por nombre..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                {users.length > 0 ? (
                    <Table>
                        <TableCaption>Una lista de usuarios.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead className="text-right">Email</TableHead>
                                <TableHead className="text-right">Rol</TableHead>
                                <TableHead className="text-right">Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name}</TableCell>
                                    <TableCell className="text-right">{user.email}</TableCell>
                                    <TableCell className="text-right">{user.rol}</TableCell>
                                    <TableCell className="text-right">{user.estado}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={userRoute.edit(user.id).url}>
                                            <Button className="mr-2">
                                                Editar
                                            </Button>
                                        </Link>
                                        <Button disabled={processing}
                                                className="bg-red-500 text-white" 
                                                onClick={() => handleDelete(user.id)}>
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center py-10 text-muted-foreground">
                        No se encontraron usuarios.
                    </div>
                )}                
            </div>


        </AppLayout>
    );
}
