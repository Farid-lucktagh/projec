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
        title: 'Users',
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
        if (window.confirm('Are you sure you want to delete this user?')) {
            destroy(userRoute.destroy(id).url);
        }

    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="m-4">
                <div className="flex justify-between items-center mb-4">
                    <Link href={userRoute.create().url}>
                        <Button>
                            Create User
                        </Button>
                    </Link>
                    <div className="w-64">
                        <Input
                            placeholder="Search users by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                {users.length > 0 ? (
                    <Table>
                        <TableCaption>A list of users.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead className="text-right">Name</TableHead>
                                <TableHead className="text-right">Email</TableHead>
                                <TableHead className="text-right">Rol</TableHead>
                                <TableHead className="text-right">Estado</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="w-[100px]">{user.id}</TableCell>
                                    <TableCell className="text-right">{user.name}</TableCell>
                                    <TableCell className="text-right">{user.email}</TableCell>
                                    <TableCell className="text-right">{user.rol}</TableCell>
                                    <TableCell className="text-right">{user.estado}</TableCell>
                                    <TableCell className="text-right">
                                        <Link href={userRoute.edit(user.id).url}>
                                            <Button className="mr-2">
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button disabled={processing}
                                                className="bg-red-500 text-white" 
                                                onClick={() => handleDelete(user.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center py-10 text-muted-foreground">
                        No users found.
                    </div>
                )}                
            </div>


        </AppLayout>
    );
}
