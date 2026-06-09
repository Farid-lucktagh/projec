import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import userRoute from '@/routes/users';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: userRoute.index().url,
    },
    {
        title: 'Editar Usuario',
        href: window.location.pathname,
    },
];

const modules = [
    { id: 'products', label: 'Productos' },
    { id: 'categories', label: 'Categorías' },
    { id: 'customers', label: 'Clientes' },
    { id: 'users', label: 'Usuarios' },
    { id: 'sales', label: 'Ventas' },
    { id: 'invoices', label: 'Facturas' },
    { id: 'reports', label: 'Reportes' },
];

interface user {
    id: number;
    name: string;
    email: string;
    password: string;
    rol: string;
    estado: string;
    permissions: string[] | null;
}


export default function Edit({ user }: { user: user }) {

    const {data, setData, put, processing, errors} = useForm({
            name: user.name,
            email: user.email,
            password: '',
            rol: user.rol,
            estado: user.estado,
            permissions: user.permissions || [] as string[],
    }) ;

    const Update = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(userRoute.update(user.id).url);
    };

    const handlePermissionChange = (moduleId: string, checked: boolean) => {
        if (checked) {
            setData('permissions', [...data.permissions, moduleId]);
        } else {
            setData('permissions', data.permissions.filter(id => id !== moduleId));
        }
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios | Editar" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={Update} className="flex flex-col gap-4 max-w-md">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Nombre del usuario</Label>
                        <Input
                            id="name"
                            placeholder='Nombre del usuario'
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Correo electrónico del usuario</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder='Correo electrónico del usuario'
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                        />
                        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password">Contraseña del usuario (dejar en blanco para no cambiar)</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder='Contraseña'
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                        />
                        {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="rol">Rol del usuario</Label>
                        <Select
                            value={data.rol}
                            onValueChange={(value) => setData('rol', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un rol" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Administrador</SelectItem>
                                <SelectItem value="vendedor">Vendedor</SelectItem>
                                <SelectItem value="cajero">Cajero</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.rol && <div className="text-red-500 text-sm">{errors.rol}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="estado">Estado</Label>
                        <Select
                            value={data.estado}
                            onValueChange={(value) => setData('estado', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="activo">Activo</SelectItem>
                                <SelectItem value="inactivo">Inactivo</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.estado && <div className="text-red-500 text-sm">{errors.estado}</div>}
                    </div>  

                    <div className="flex flex-col gap-2">
                        <Label>Permisos de Acceso (Vistas)</Label>
                        <div className="grid grid-cols-2 gap-2 border rounded-md p-4">
                            {modules.map((module) => (
                                <div key={module.id} className="flex items-center space-x-2">
                                    <Checkbox 
                                        id={module.id} 
                                        checked={data.permissions.includes(module.id)}
                                        onCheckedChange={(checked) => handlePermissionChange(module.id, checked as boolean)}
                                    />
                                    <Label htmlFor={module.id} className="text-sm font-normal cursor-pointer">
                                        {module.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {errors.permissions && <div className="text-red-500 text-sm">{errors.permissions}</div>}
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Actualizar Usuario
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
