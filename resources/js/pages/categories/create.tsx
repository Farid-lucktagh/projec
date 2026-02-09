import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import categoriesRoutes from '@/routes/categories';
import type { BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: categoriesRoutes.index().url,
    },
    {
        title: 'Create Category',
        href: categoriesRoutes.create().url,
    },
];


export default function Create() {

    const {data, setData, post, processing, errors} = useForm({
            nombre: '',
            descripcion: '',
            color: '',
            estado: 'activo',
    }) ;

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(categoriesRoutes.store().url);
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories | create" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={submit} className="flex flex-col gap-4 max-w-md">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="nombre">Product name</Label>
                        <Input
                            id="nombre"
                            placeholder='Product name'
                            value={data.nombre}
                            onChange={e => setData('nombre', e.target.value)}
                        />
                        {errors.nombre && <div className="text-red-500 text-sm">{errors.nombre}</div>}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="descripcion">Product description</Label>
                        <Textarea 
                            id="descripcion"
                            placeholder="Product description" 
                            value={data.descripcion}
                            onChange={e => setData('descripcion', e.target.value)}
                        />
                        {errors.descripcion && <div className="text-red-500 text-sm">{errors.descripcion}</div>}
                    </div>    

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="color">Color</Label>
                        <Input
                            id="color"
                            type='color'
                            placeholder='Product color'
                            value={data.color}
                            onChange={e => setData('color', e.target.value)}
                        />
                        {errors.color && <div className="text-red-500 text-sm">{errors.color}</div>}
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
                                <SelectItem value="activo">Activo</SelectItem>
                                <SelectItem value="inactivo">Inactivo</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.estado && <div className="text-red-500 text-sm">{errors.estado}</div>}
                    </div>  
                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Create Category
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
