import { Head, useForm } from '@inertiajs/react';
import { Trash2, Plus } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface Customer {
    id: number;
    nombre: string;
    numero_documento: string;
}

interface Category {
    id: number;
    nombre: string;
}

interface Product {
    id: number;
    nombre: string;
    precio: number;
    cantidad_stock: number;
    categoria: Category;
}

interface Props {
    customers: Customer[];
    products: Product[];
}

interface InvoiceItem {
    producto_id: number;
    nombre_producto: string;
    categoria_producto: string;
    precio_unitario: number;
    cantidad: number;
    subtotal: number;
    stock_disponible: number;
}


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoices',
        href: '/invoices',
    },
    {
        title: 'Crear Factura',
        href: '/invoices/create',
    },
];

export default function Create({ customers, products }: Props) {
    const [selectedItems, setSelectedItems] = useState<InvoiceItem[]>([]);
    const [currentProductId, setCurrentProductId] = useState<string>("");
    const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
    const [porcentajeIva, setPorcentajeIva] = useState<number>(16);
    const [descuento, setDescuento] = useState<number>(0);

    const { data, setData, post, processing, errors, transform } = useForm<{
        cliente_id: number | null;
        metodo_pago: string;
        porcentaje_iva: number;
        descuento: number;
        notas: string;
        items: InvoiceItem[];
        subtotal: number;
        monto_iva: number;
        total: number;
    }>({
        cliente_id: null,
        metodo_pago: 'efectivo',
        porcentaje_iva: 16,
        descuento: 0,
        notas: '',
        items: [],
        subtotal: 0,
        monto_iva: 0,
        total: 0,
    });

    const selectedCustomer = useMemo(() => {
        if (!selectedCustomerId) return null;
        return customers.find(c => c.id === Number(selectedCustomerId)) ?? null;
    }, [selectedCustomerId, customers]);

    const totals = useMemo(() => {
        const subtotal = selectedItems.reduce((acc, item) => acc + item.subtotal, 0);
        const montoIva = subtotal * (porcentajeIva / 100);
        const total = subtotal + montoIva - descuento;
        return { subtotal, montoIva, total: Math.max(total, 0) };
    }, [selectedItems, porcentajeIva, descuento]);

    const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setData('cliente_id', Number(customerId));
    };

    const handleAddProduct = () => {
        if (!currentProductId) return;

        const product = products.find(p => p.id === Number(currentProductId));
        if (!product) return;

        const existingItem = selectedItems.find(item => item.producto_id === product.id);

        if (existingItem) {
            if (existingItem.cantidad + 1 > product.cantidad_stock) {
                alert("No hay suficiente stock disponible");
                return;
            }
            setSelectedItems(selectedItems.map(item =>
                item.producto_id === product.id
                    ? { ...item, cantidad: item.cantidad + 1, subtotal: (item.cantidad + 1) * item.precio_unitario }
                    : item
            ));
        } else {
            if (product.cantidad_stock < 1) {
                alert("Producto sin stock");
                return;
            }
            setSelectedItems([...selectedItems, {
                producto_id: product.id,
                nombre_producto: product.nombre,
                categoria_producto: product.categoria?.nombre ?? 'Sin categoria',
                precio_unitario: Number(product.precio),
                cantidad: 1,
                subtotal: Number(product.precio),
                stock_disponible: product.cantidad_stock,
            }]);
            useEffect(() => {
    const defaultCustomer = customers.find(c => c.id === 3);
    if (defaultCustomer) {
        setSelectedCustomerId(defaultCustomer.id.toString());
        setData('cliente_id', defaultCustomer.id);
    }
}, [customers]);
        }
        setCurrentProductId("");
    };

    const handleRemoveItem = (productId: number) => {
        setSelectedItems(selectedItems.filter(item => item.producto_id !== productId));
    };

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        const item = selectedItems.find(i => i.producto_id === productId);
        if (!item) return;

        if (newQuantity > item.stock_disponible) {
            alert("Stock insuficiente");
            return;
        }

        if (newQuantity < 1) return;

        setSelectedItems(selectedItems.map(i =>
            i.producto_id === productId
                ? { ...i, cantidad: newQuantity, subtotal: newQuantity * i.precio_unitario }
                : i
        ));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedItems.length === 0) {
            alert("Debe agregar al menos un producto");
            return;
        }
        if (!selectedCustomerId) {
            alert("Debe seleccionar un cliente");
            return;
        }

        transform((curr) => ({
            ...curr,
            items: selectedItems,
            subtotal: totals.subtotal,
            monto_iva: totals.montoIva,
            total: totals.total,
            porcentaje_iva: porcentajeIva,
            descuento: descuento,
        }));
        post('/invoices');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices | Crear" />

            <div className="p-6">
                <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Customer & Payment */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-lg font-semibold mb-4">Datos del Cliente</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cliente">Seleccionar Cliente</Label>
                                    <Select
                                        value={selectedCustomerId}
                                        onValueChange={handleSelectCustomer}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Elegir cliente" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {customers.map(c => (
                                                <SelectItem key={c.id} value={c.id.toString()}>
                                                    {c.nombre} - {c.numero_documento}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.cliente_id && <p className="text-red-500 text-xs">{errors.cliente_id}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="metodo_pago">Metodo de Pago</Label>
                                    <Select
                                        value={data.metodo_pago}
                                        onValueChange={(val) => setData('metodo_pago', val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="efectivo">Efectivo</SelectItem>
                                            <SelectItem value="tarjeta">Tarjeta</SelectItem>
                                            <SelectItem value="transferencia">Transferencia</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            {selectedCustomer && (
                                <div className="mt-3 text-sm text-muted-foreground">
                                    Cliente: <span className="font-medium text-foreground">{selectedCustomer.nombre}</span> | Documento: <span className="font-medium text-foreground">{selectedCustomer.numero_documento}</span>
                                </div>
                            )}
                        </div>

                        {/* Products */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-lg font-semibold mb-4">Agregar Productos</h2>
                            <div className="flex gap-4 mb-6">
                                <div className="flex-1">
                                    <Select
                                        value={currentProductId}
                                        onValueChange={setCurrentProductId}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Buscar producto..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {products.map(p => (
                                                <SelectItem key={p.id} value={p.id.toString()}>
                                                    {p.nombre} ({p.categoria?.nombre}) - ${p.precio} [Stock: {p.cantidad_stock}]
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type="button" onClick={handleAddProduct} variant="outline">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Agregar
                                </Button>
                            </div>

                            {errors.items && <p className="text-red-500 text-xs mb-2">{errors.items}</p>}

                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Producto</TableHead>
                                            <TableHead>Categoria</TableHead>
                                            <TableHead className="text-right">Precio</TableHead>
                                            <TableHead className="text-center">Cantidad</TableHead>
                                            <TableHead className="text-right">Subtotal</TableHead>
                                            <TableHead className="text-center">Accion</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedItems.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                                    No se han agregado productos
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            selectedItems.map((item) => (
                                                <TableRow key={item.producto_id}>
                                                    <TableCell className="font-medium">{item.nombre_producto}</TableCell>
                                                    <TableCell>{item.categoria_producto}</TableCell>
                                                    <TableCell className="text-right">${item.precio_unitario.toFixed(2)}</TableCell>
                                                    <TableCell className="text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <Input
                                                                type="number"
                                                                className="w-20 text-center"
                                                                value={item.cantidad}
                                                                min={1}
                                                                max={item.stock_disponible}
                                                                onChange={(e) => handleQuantityChange(item.producto_id, parseInt(e.target.value))}
                                                            />
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">${item.subtotal.toFixed(2)}</TableCell>
                                                    <TableCell className="text-center">
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-red-500 hover:text-red-700"
                                                            onClick={() => handleRemoveItem(item.producto_id)}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-lg font-semibold mb-4">Notas</h2>
                            <Textarea
                                value={data.notas}
                                onChange={(e) => setData('notas', e.target.value)}
                                placeholder="Notas adicionales para la factura (opcional)"
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* Summary sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 sticky top-6">
                            <h2 className="text-lg font-semibold mb-4">Resumen de Factura</h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="porcentaje_iva">IVA (%)</Label>
                                    <Input
                                        id="porcentaje_iva"
                                        type="number"
                                        min={0}
                                        max={100}
                                        step={0.01}
                                        value={porcentajeIva}
                                        onChange={(e) => setPorcentajeIva(Number(e.target.value))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="descuento">Descuento ($)</Label>
                                    <Input
                                        id="descuento"
                                        type="number"
                                        min={0}
                                        step={0.01}
                                        value={descuento}
                                        onChange={(e) => setDescuento(Number(e.target.value))}
                                    />
                                </div>
                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Subtotal</span>
                                        <span>${totals.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">IVA ({porcentajeIva}%)</span>
                                        <span>${totals.montoIva.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Descuento</span>
                                        <span className="text-red-500">-${descuento.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t pt-4 flex justify-between font-bold text-xl">
                                        <span>Total</span>
                                        <span className="text-primary">${totals.total.toFixed(2)}</span>
                                    </div>
                                </div>
                                {errors.error && (
                                    <p className="text-red-500 text-xs">{errors.error}</p>
                                )}  
                                <Button
                                    type="submit"
                                    className="w-full mt-6"
                                    size="lg"
                                    disabled={processing || selectedItems.length === 0}
                                >
                                    {processing ? 'Procesando...' : 'Crear Factura'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
