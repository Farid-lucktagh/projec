import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import customerRoutes from '@/routes/customers';
import type { BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customers',
        href: customerRoutes.index().url,
    },
    {
        title: 'Edit Customer',
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
        put(customerRoutes.update(customer.id).url);
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers | Edit" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={Update} className="flex flex-col gap-4 max-w-md">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="nombre">Customer name</Label>
                        <Input
                            id="nombre"
                            placeholder='Customer name'
                            value={data.nombre}
                            onChange={e => setData('nombre', e.target.value)}
                        />
                        {errors.nombre && <div className="text-red-500 text-sm">{errors.nombre}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="tipo_documento">Document type</Label>
                        <Input
                            id="tipo_documento"
                            placeholder='Document type'
                            value={data.tipo_documento}
                            onChange={e => setData('tipo_documento', e.target.value)}
                        />
                        {errors.tipo_documento && <div className="text-red-500 text-sm">{errors.tipo_documento}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="numero_documento">Document number</Label>
                        <Input
                            id="numero_documento"
                            placeholder='Document number'
                            value={data.numero_documento}
                            onChange={e => setData('numero_documento', e.target.value)}
                        />
                        {errors.numero_documento && <div className="text-red-500 text-sm">{errors.numero_documento}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="telefono">Phone</Label>
                        <Input
                            id="telefono"
                            placeholder='Phone'
                            value={data.telefono}
                            onChange={e => setData('telefono', e.target.value)}
                        />
                        {errors.telefono && <div className="text-red-500 text-sm">{errors.telefono}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="correo">Email</Label>
                        <Input
                            id="correo"
                            placeholder='Email'
                            value={data.correo}
                            onChange={e => setData('correo', e.target.value)}
                        />
                        {errors.correo && <div className="text-red-500 text-sm">{errors.correo}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="direccion">Address</Label>
                        <Input
                            id="direccion"
                            placeholder='Address'
                            value={data.direccion}
                            onChange={e => setData('direccion', e.target.value)}
                        />
                        {errors.direccion && <div className="text-red-500 text-sm">{errors.direccion}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="total_compras">Total purchases</Label>
                        <Input
                            id="total_compras"
                            placeholder='Total purchases'
                            value={data.total_compras}
                            onChange={e => setData('total_compras', Number(e.target.value))}
                        />
                        {errors.total_compras && <div className="text-red-500 text-sm">{errors.total_compras}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="estado">Status</Label>
                        <Select
                            value={data.estado}
                            onValueChange={(value) => setData('estado', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="activo">activo</SelectItem>
                                <SelectItem value="inactivo">inactivo</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.estado && <div className="text-red-500 text-sm">{errors.estado}</div>}
                    </div> 

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Update Customer
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
