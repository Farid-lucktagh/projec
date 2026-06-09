import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from '@/layouts/app-layout';
import productsRoutes from '@/routes/products';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: productsRoutes.index().url,
    },
    {
        title: 'Crear Producto',
        href: productsRoutes.create().url,
    },
];

interface Category {
    id: number;
    nombre: string;
}

interface Supplier {
    id: number;
    nombre: string;
}

interface Props {
    categorias: Category[];
    proveedores: Supplier[];
}

export default function Create({ categorias, proveedores }: Props) {

    const {data, setData, post, processing, errors} = useForm({
            nombre: '',
            descripcion: '',
            categoria_id: '',
            proveedor_id: '',
            precio: '',
            cantidad_stock: '',
            estado: 'disponible',
    }) ;

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(productsRoutes.store().url);
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos | crear" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={submit} className="flex flex-col gap-4 max-w-md">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="nombre">Nombre del producto</Label>
                        <Input
                            id="nombre"
                            placeholder='Nombre del producto'
                            value={data.nombre}
                            onChange={e => setData('nombre', e.target.value)}
                        />
                        {errors.nombre && <div className="text-red-500 text-sm">{errors.nombre}</div>}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="descripcion">Descripción del producto</Label>
                        <Textarea 
                            id="descripcion"
                            placeholder="Descripción del producto" 
                            value={data.descripcion}
                            onChange={e => setData('descripcion', e.target.value)}
                        />
                        {errors.descripcion && <div className="text-red-500 text-sm">{errors.descripcion}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="categoria_id">Categoría</Label>
                        <Select
                            value={data.categoria_id}
                            onValueChange={(value) => setData('categoria_id', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                {categorias.map((categoria) => (
                                    <SelectItem key={categoria.id} value={categoria.id.toString()}>
                                        {categoria.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.categoria_id && <div className="text-red-500 text-sm">{errors.categoria_id}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="proveedor_id">Proveedor</Label>
                        <Select
                            value={data.proveedor_id}
                            onValueChange={(value) => setData('proveedor_id', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un proveedor" />
                            </SelectTrigger>
                            <SelectContent>
                                {proveedores.map((proveedor) => (
                                    <SelectItem key={proveedor.id} value={proveedor.id.toString()}>
                                        {proveedor.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                         {errors.proveedor_id && <div className="text-red-500 text-sm">{errors.proveedor_id}</div>}
                    </div>     

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="precio">Precio</Label>
                        <Input
                            id="precio"
                            type="number"
                            placeholder='Precio del producto'
                            value={data.precio}
                            onChange={e => setData('precio', e.target.value)}
                        />
                        {errors.precio && <div className="text-red-500 text-sm">{errors.precio}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="cantidad_stock">Stock</Label>
                        <Input
                            id="cantidad_stock"
                            type="number"
                            placeholder='Stock del producto'
                            value={data.cantidad_stock}
                            onChange={e => setData('cantidad_stock', e.target.value)}
                        />
                         {errors.cantidad_stock && <div className="text-red-500 text-sm">{errors.cantidad_stock}</div>}
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
                                <SelectItem value="disponible">Disponible</SelectItem>
                                <SelectItem value="bajo">Bajo</SelectItem>
                                <SelectItem value="sin">Sin Stock</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.estado && <div className="text-red-500 text-sm">{errors.estado}</div>}
                    </div>  
                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Crear Producto
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
