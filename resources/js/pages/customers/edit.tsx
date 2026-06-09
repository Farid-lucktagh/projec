import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from '@/layouts/app-layout';
import customersRoutes from '@/routes/customers';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clientes',
        href: customersRoutes.index().url,
    },
    {
        title: 'Editar Cliente',
        href: window.location.pathname,
    },
];

interface customer {
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


export default function Edit({ customer }: { customer: customer }) {

    const {data, setData, put, processing, errors} = useForm({
            nombre: customer.nombre,
            tipo_documento: customer.tipo_documento,
            numero_documento: customer.numero_documento,
            telefono: customer.telefono,
            correo: customer.correo,
            direccion: customer.direccion,
            total_compras: customer.total_compras,
            estado: customer.estado,
    }) ;

    const Update = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(customersRoutes.update(customer.id).url);
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clientes | Editar" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={Update} className="flex flex-col gap-4 max-w-md">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="nombre">Nombre del cliente</Label>
                        <Input
                            id="nombre"
                            placeholder='Nombre del cliente'
                            value={data.nombre}
                            onChange={e => setData('nombre', e.target.value)}
                        />
                        {errors.nombre && <div className="text-red-500 text-sm">{errors.nombre}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="tipo_documento">Tipo de documento</Label>
                        <Select
                            value={data.tipo_documento}
                            onValueChange={(value) => setData('tipo_documento', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un tipo de documento" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cedula">Cédula</SelectItem>
                                <SelectItem value="tarjeta_identidad">Tarjeta de Identidad</SelectItem>
                                <SelectItem value="pasaporte">Pasaporte</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.tipo_documento && <div className="text-red-500 text-sm">{errors.tipo_documento}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="numero_documento">Número de documento</Label>
                        <Input
                            id="numero_documento"
                            placeholder='Número de documento'
                            value={data.numero_documento}
                            onChange={e => setData('numero_documento', e.target.value)}
                        />
                        {errors.numero_documento && <div className="text-red-500 text-sm">{errors.numero_documento}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input
                            id="telefono"
                            placeholder='Teléfono'
                            value={data.telefono}
                            onChange={e => setData('telefono', e.target.value)}
                        />
                        {errors.telefono && <div className="text-red-500 text-sm">{errors.telefono}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="correo">Correo electrónico</Label>
                        <Input
                            id="correo"
                            type="email"
                            placeholder='Correo electrónico'
                            value={data.correo}
                            onChange={e => setData('correo', e.target.value)}
                        />
                        {errors.correo && <div className="text-red-500 text-sm">{errors.correo}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="direccion">Dirección</Label>
                        <Input
                            id="direccion"
                            placeholder='Dirección'
                            value={data.direccion}
                            onChange={e => setData('direccion', e.target.value)}
                        />
                        {errors.direccion && <div className="text-red-500 text-sm">{errors.direccion}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="total_compras">Total de compras</Label>
                        <Input
                            id="total_compras"
                            type="number"
                            placeholder='Total de compras'
                            value={data.total_compras}
                            onChange={e => setData('total_compras', Number(e.target.value))}
                        />
                        {errors.total_compras && <div className="text-red-500 text-sm">{errors.total_compras}</div>}
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

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Actualizar Cliente
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
