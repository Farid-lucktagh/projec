import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import productsRoutes from '@/routes/products';
import type { BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: productsRoutes.index().url,
    },
    {
        title: 'Edit Product',
        href: window.location.pathname,
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

interface Product {
    id: number;
    nombre: string;
    descripcion: string;
    categoria_id: number;
    proveedor_id: number;
    precio: number;
    cantidad_stock: number;
    estado: string;
}

interface Props {
    categorias: Category[];
    proveedores: Supplier[];
    product: Product;
}

export default function Edit({ product, categorias, proveedores }: Props) {

    const {data, setData, put, processing, errors} = useForm({
            nombre: product.nombre,
            descripcion: product.descripcion,
            categoria_id: product.categoria_id,
            proveedor_id: product.proveedor_id,
            precio: product.precio,
            cantidad_stock: product.cantidad_stock,
            estado: product.estado,
    }) ;

    const Update = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(productsRoutes.update(product.id).url);
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products | Edit" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={Update} className="flex flex-col gap-4 max-w-md">
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
                        <Label htmlFor="categoria_id">Category</Label>
                        <Select
                            value={data.categoria_id.toString()}
                            onValueChange={(value) => setData('categoria_id', Number(value))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
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
                        <Label htmlFor="proveedor_id">Supplier</Label>
                        <Select
                            value={data.proveedor_id.toString()}
                            onValueChange={(value) => setData('proveedor_id', Number(value))}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a supplier" />
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
                        <Label htmlFor="precio">Price</Label>
                        <Input
                            id="precio"
                            type="number"
                            placeholder='Product price'
                            value={data.precio}
                            onChange={e => setData('precio', Number(e.target.value))}
                        />
                        {errors.precio && <div className="text-red-500 text-sm">{errors.precio}</div>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="cantidad_stock">Stock</Label>
                        <Input
                            id="cantidad_stock"
                            type="number"
                            placeholder='Product stock'
                            value={data.cantidad_stock}
                            onChange={e => setData('cantidad_stock', Number(e.target.value))}
                        />
                         {errors.cantidad_stock && <div className="text-red-500 text-sm">{errors.cantidad_stock}</div>}
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
                                <SelectItem value="disponible">Disponible</SelectItem>
                                <SelectItem value="bajo">Bajo</SelectItem>
                                <SelectItem value="sin">Sin Stock</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.estado && <div className="text-red-500 text-sm">{errors.estado}</div>}
                    </div>  
                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Update Product
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
