import { Head, Link, usePage } from '@inertiajs/react';
import SalesChart from '@/components/sales-chart';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import productsRoutes from '@/routes/products';
import reportsRoutes from '@/routes/reports';
import type { BreadcrumbItem, SharedData } from '@/types';
import { AlertTriangle, Clock, Edit, FileDown, History, PackageSearch, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Product {
    id: number;
    nombre: string;
    cantidad_stock: number;
    stock_minimo: number;
    categoria?: {
        nombre: string;
    };
}

interface TopProduct {
    id: number;
    nombre: string;
    total_sold: number;
    cantidad_stock?: number;
    categoria?: {
        nombre: string;
    };
}

interface LogEntry {
    id: number;
    accion: string;
    descripcion: string;
    creado_en: string;
    usuario: {
        id: number;
        name: string;
        rol: string;
    };
}

interface RegistrosTotals extends SharedData {
    totals: {
        sales_count: number;
        invoices_count: number;
        customers_today_count: number;
        products_sold_count: number;
        money_today_total: number;
        low_stock_count: number;
        out_of_stock_count: number;
    };
    low_stock_products: Product[];
    out_of_stock_products: Product[];
    top_products: TopProduct[];
    recent_logs: LogEntry[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reports',
        href: reportsRoutes.index().url,
    },
];

export default function Dashboard() {
    const props = usePage<RegistrosTotals>().props;
    const totals = props.totals || {
        sales_count: 0,
        invoices_count: 0,
        customers_today_count: 0,
        products_sold_count: 0,
        money_today_total: 0,
        low_stock_count: 0,
        out_of_stock_count: 0,
    };
    const low_stock_products = props.low_stock_products || [];
    const out_of_stock_products = props.out_of_stock_products || [];
    const top_products = props.top_products || [];
    const recent_logs = props.recent_logs || [];

    const [allLogs, setAllLogs] = useState<LogEntry[]>([]);
    const [isLoadingLogs, setIsLoadingLogs] = useState(false);
    const [allProductSales, setAllProductSales] = useState<TopProduct[]>([]);
    const [isLoadingProductSales, setIsLoadingProductSales] = useState(false);
    const [dateFilter, setDateFilter] = useState({ from: '', to: '' });

    // PDF Export State
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [exportDates, setExportDates] = useState({ 
        from: new Date().toISOString().split('T')[0], 
        to: new Date().toISOString().split('T')[0] 
    });
    const [exportSections, setExportSections] = useState({
        sales: true,
        customers: true,
        products: true,
        inventory: true,
        top_products: true,
        movements: true,
        money: true,
    });

    const handleExportPdf = () => {
        const selectedSections = Object.entries(exportSections)
            .filter(([_, checked]) => checked)
            .map(([key]) => key);
        
        if (selectedSections.length === 0) {
            alert('Por favor selecciona al menos una sección para el reporte.');
            return;
        }

        const query = new URLSearchParams({
            from: exportDates.from,
            to: exportDates.to,
        });
        
        selectedSections.forEach(section => query.append('sections[]', section));
        
        window.open(`/reports/export-pdf?${query.toString()}`, '_blank');
        setIsExportModalOpen(false);
    };

    const handleExportExcel = () => {
        const selectedSections = Object.entries(exportSections)
            .filter(([_, checked]) => checked)
            .map(([key]) => key);
        
        if (selectedSections.length === 0) {
            alert('Por favor selecciona al menos una sección para el reporte.');
            return;
        }

        const query = new URLSearchParams({
            from: exportDates.from,
            to: exportDates.to,
        });
        
        selectedSections.forEach(section => query.append('sections[]', section));
        
        window.open(`/reports/export-excel?${query.toString()}`, '_blank');
        setIsExportModalOpen(false);
    };

    const toggleSection = (section: keyof typeof exportSections) => {
        setExportSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const fetchAllLogs = async () => {
        setIsLoadingLogs(true);
        try {
            const query = new URLSearchParams(dateFilter).toString();
            const response = await fetch(`/reports/logs?${query}`);
            const data = await response.json();
            setAllLogs(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching logs:', error);
            setAllLogs([]);
        } finally {
            setIsLoadingLogs(false);
        }
    };

    const fetchAllProductSales = async () => {
        setIsLoadingProductSales(true);
        try {
            const response = await fetch('/reports/product-sales');
            const data = await response.json();
            setAllProductSales(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching product sales:', error);
            setAllProductSales([]);
        } finally {
            setIsLoadingProductSales(false);
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateFilter(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const applyFilter = () => {
        fetchAllLogs();
    };

    const allProblematicProducts = [...(out_of_stock_products || []), ...(low_stock_products || [])];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Resumen Administrativo</h2>
                    
                    <Dialog open={isExportModalOpen} onOpenChange={setIsExportModalOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <FileDown className="size-4" />
                                Exportar Reporte
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Configurar Reporte</DialogTitle>
                                <DialogDescription>
                                    Elige el rango de fechas, las secciones y el formato que deseas para el reporte.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="export-from">Desde</Label>
                                        <Input 
                                            id="export-from" 
                                            type="date" 
                                            value={exportDates.from} 
                                            onChange={(e) => setExportDates(prev => ({ ...prev, from: e.target.value }))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="export-to">Hasta</Label>
                                        <Input 
                                            id="export-to" 
                                            type="date" 
                                            value={exportDates.to} 
                                            onChange={(e) => setExportDates(prev => ({ ...prev, to: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    <Label className="text-xs font-bold uppercase text-muted-foreground">Secciones a incluir</Label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {[
                                            { id: 'sales', label: 'Detalle de Ventas' },
                                            { id: 'money', label: 'Dinero Acumulado' },
                                            { id: 'customers', label: 'Clientes Atendidos' },
                                            { id: 'products', label: 'Productos Vendidos' },
                                            { id: 'inventory', label: 'Estado del Inventario' },
                                            { id: 'top_products', label: 'Productos Más Vendidos' },
                                            { id: 'movements', label: 'Últimos Movimientos' },
                                        ].map((section) => (
                                            <div key={section.id} className="flex items-center space-x-2">
                                                <Checkbox 
                                                    id={`section-${section.id}`} 
                                                    checked={exportSections[section.id as keyof typeof exportSections]}
                                                    onCheckedChange={() => toggleSection(section.id as keyof typeof exportSections)}
                                                />
                                                <Label 
                                                    htmlFor={`section-${section.id}`}
                                                    className="text-sm font-medium leading-none cursor-pointer"
                                                >
                                                    {section.label}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <DialogFooter className="gap-2">
                                <Button type="button" variant="outline" onClick={() => setIsExportModalOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button type="button" variant="secondary" onClick={handleExportExcel} className="gap-2">
                                    <FileDown className="size-4" />
                                    Generar Excel
                                </Button>
                                <Button type="button" onClick={handleExportPdf}>
                                    Generar PDF
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    {/* Tarjeta 1: Ventas Totales */}
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col justify-center items-center text-center">
                        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                            Ventas Totales
                        </h3>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold">
                                {(totals?.sales_count || 0) + (totals?.invoices_count || 0)}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                                registros realizados
                            </span>
                        </div>
                        <div className="mt-2 w-full grid grid-cols-2 gap-2 pt-2 border-t border-sidebar-border/50">
                            <div>
                                <p className="text-[9px] text-muted-foreground">Ventas</p>
                                <p className="text-sm font-semibold">{totals?.sales_count || 0}</p>
                            </div>
                            <div>
                                <p className="text-[9px] text-muted-foreground">Facturas</p>
                                <p className="text-sm font-semibold">{totals?.invoices_count || 0}</p>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta 2: Dinero Hoy */}
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col justify-center items-center text-center">
                        <h3 className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                            Dinero Hoy
                        </h3>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                                ${(totals?.money_today_total || 0).toLocaleString('es-CO', { minimumFractionDigits: 2 })}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                                acumulado en caja hoy
                            </span>
                        </div>
                        <div className="mt-2 w-full pt-2 border-t border-sidebar-border/50">
                            <p className="text-[9px] text-muted-foreground italic">
                                Ventas + Facturas del día
                            </p>
                        </div>
                    </div>

                    {/* Tarjeta 3: Clientes Hoy */}
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col justify-center items-center text-center">
                        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                            Clientes Hoy
                        </h3>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold">
                                {totals?.customers_today_count || 0}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                                atendidos el día de hoy
                            </span>
                        </div>
                        <div className="mt-2 w-full pt-2 border-t border-sidebar-border/50">
                            <p className="text-[9px] text-muted-foreground italic">
                                {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    {/* Tarjeta 4: Productos Vendidos */}
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col justify-center items-center text-center">
                        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                            Productos Vendidos
                        </h3>
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-bold">
                                {totals?.products_sold_count || 0}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                                unidades totales entregadas
                            </span>
                        </div>
                        <div className="mt-2 w-full pt-2 border-t border-sidebar-border/50">
                            <p className="text-[9px] text-muted-foreground">
                                Incluye Ventas y Facturas
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 h-screen">
                    {/* Gráfico de Ventas */}
                    <div className="relative h-full overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4">
                        <SalesChart />
                    </div>

                    {/* Columna de Widgets */}
                    <div className="relative h-full overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border grid grid-rows-3 gap-4">
                        {/* Widget: Estado del Inventario */}
                        <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col justify-center items-center text-center bg-orange-50/50 dark:bg-orange-950/10">
                            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                                <AlertTriangle className="size-3 text-orange-500" />
                                Estado del Inventario
                            </h3>
                            <div className="grid grid-cols-2 gap-4 w-full max-w-[200px]">
                                <div className="flex flex-col items-center">
                                    <span className={`text-2xl font-bold ${(totals?.out_of_stock_count || 0) > 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
                                        {totals?.out_of_stock_count || 0}
                                    </span>
                                    <span className="text-[9px] text-muted-foreground uppercase font-medium">Sin Stock</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className={`text-2xl font-bold ${(totals?.low_stock_count || 0) > 0 ? 'text-orange-500' : 'text-muted-foreground'}`}>
                                        {totals?.low_stock_count || 0}
                                    </span>
                                    <span className="text-[9px] text-muted-foreground uppercase font-medium">Bajo Stock</span>
                                </div>
                            </div>

                            <div className="absolute bottom-4 right-4">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button size="sm" variant="outline" className="h-8 gap-1 text-[10px] uppercase font-bold tracking-tight px-2">
                                            <PackageSearch className="size-3" />
                                            Revisar
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
                                        <SheetHeader className="mb-4">
                                            <SheetTitle className="flex items-center gap-2">
                                                <AlertTriangle className="size-5 text-orange-500" />
                                                Productos con Problemas de Stock
                                            </SheetTitle>
                                        </SheetHeader>
                                        
                                        <div className="space-y-6">
                                            {allProblematicProducts.length === 0 ? (
                                                <div className="text-center py-12 text-muted-foreground italic">
                                                    No hay productos con bajo stock actualmente.
                                                </div>
                                            ) : (
                                                <div className="rounded-md border border-sidebar-border">
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow className="bg-muted/50">
                                                                <TableHead className="text-[10px] font-bold uppercase">Producto</TableHead>
                                                                <TableHead className="text-center text-[10px] font-bold uppercase">Stock</TableHead>
                                                                <TableHead className="text-right text-[10px] font-bold uppercase">Acción</TableHead>
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {allProblematicProducts.map((product) => (
                                                                <TableRow key={product.id} className="hover:bg-muted/30">
                                                                    <TableCell>
                                                                        <p className="text-xs font-semibold">{product.nombre}</p>
                                                                        <p className="text-[9px] text-muted-foreground italic">{product.categoria?.nombre || 'Sin categoría'}</p>
                                                                    </TableCell>
                                                                    <TableCell className="text-center">
                                                                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${product.cantidad_stock <= 0 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                                                                            {product.cantidad_stock}
                                                                        </span>
                                                                    </TableCell>
                                                                    <TableCell className="text-right">
                                                                        <Button size="icon" variant="ghost" asChild className="size-7">
                                                                            <Link href={productsRoutes.edit(product.id).url}>
                                                                                <Edit className="size-3.5" />
                                                                                <span className="sr-only">Ajustar</span>
                                                                            </Link>
                                                                        </Button>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            )}
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                        
                        {/* Widget: Productos Más Vendidos */}
                        <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col justify-start items-center text-center">
                            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                                Productos Mas Vendidos
                            </h3>
                            <div className="w-full space-y-2 overflow-y-auto">
                                {top_products && top_products.length > 0 ? (
                                    top_products.map((product, index) => (
                                        <div key={product.id} className="flex items-center justify-between w-full px-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-muted-foreground w-4">{index + 1}.</span>
                                                <span className="text-xs font-medium truncate max-w-[120px]">{product.nombre}</span>
                                            </div>
                                            <span className="text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded-full">
                                                {Number(product.total_sold).toLocaleString()} und
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-4">
                                        <p className="text-[10px] text-muted-foreground italic">No hay datos de ventas aún</p>
                                    </div>
                                )}
                            </div>

                            <div className="absolute bottom-4 right-4">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button 
                                            size="sm" 
                                            variant="ghost" 
                                            className="h-7 text-[9px] uppercase font-bold tracking-tight hover:bg-gray-100 dark:hover:bg-gray-800"
                                            onClick={fetchAllProductSales}
                                        >
                                            Ver Todo
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
                                        <SheetHeader className="mb-6">
                                            <SheetTitle className="flex items-center gap-2">
                                                <PackageSearch className="size-5 text-blue-500" />
                                                Ventas por Producto
                                            </SheetTitle>
                                        </SheetHeader>
                                        
                                        <div className="space-y-6">
                                            <div className="rounded-md border border-sidebar-border">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow className="bg-muted/50">
                                                            <TableHead className="text-[10px] font-bold uppercase">Producto</TableHead>
                                                            <TableHead className="text-center text-[10px] font-bold uppercase">Stock Actual</TableHead>
                                                            <TableHead className="text-right text-[10px] font-bold uppercase">Total Vendido</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {isLoadingProductSales ? (
                                                            <TableRow>
                                                                <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">Cargando...</TableCell>
                                                            </TableRow>
                                                        ) : allProductSales.length === 0 ? (
                                                            <TableRow>
                                                                <TableCell colSpan={3} className="text-center py-10 text-muted-foreground italic">No hay datos disponibles.</TableCell>
                                                            </TableRow>
                                                        ) : (
                                                            allProductSales.map((product) => (
                                                                <TableRow key={product.id} className="hover:bg-muted/30">
                                                                    <TableCell>
                                                                        <div className="flex flex-col">
                                                                            <span className="text-xs font-bold">{product.nombre}</span>
                                                                            <span className="text-[9px] text-muted-foreground uppercase">{product.categoria?.nombre || 'Sin categoría'}</span>
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell className="text-center">
                                                                        <span className={`text-xs font-medium ${(product.cantidad_stock || 0) <= 0 ? 'text-red-500 font-bold' : ''}`}>
                                                                            {product.cantidad_stock}
                                                                        </span>
                                                                    </TableCell>
                                                                    <TableCell className="text-right">
                                                                        <span className="text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-0.5 rounded-full">
                                                                            {Number(product.total_sold).toLocaleString()} und
                                                                        </span>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>

                        {/* Widget: Últimos Movimientos */}
                        <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-4 flex flex-col justify-start items-center text-center bg-blue-50/10 dark:bg-blue-950/5">
                            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1">
                                <History className="size-3 text-blue-500" />
                                Últimos Movimientos
                            </h3>
                            <div className="w-full space-y-2 overflow-y-auto pr-1">
                                {recent_logs && recent_logs.length > 0 ? (
                                    recent_logs.map((log) => (
                                        <div key={log.id} className="flex flex-col items-start w-full px-2 py-1 border-b border-sidebar-border/30 last:border-0">
                                            <div className="flex items-center justify-between w-full">
                                                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 truncate max-w-[150px]">{log.accion}</span>
                                                <span className="text-[9px] text-muted-foreground flex items-center gap-0.5">
                                                    <Clock className="size-2.5" />
                                                    {new Date(log.creado_en).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <span className="text-[9px] font-medium text-foreground">{log.usuario?.name || 'Sistema'}</span>
                                                <span className="text-[8px] px-1 bg-gray-100 dark:bg-gray-800 text-muted-foreground rounded uppercase">{log.usuario?.rol || 'Auto'}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-4">
                                        <p className="text-[10px] text-muted-foreground italic">Sin movimientos recientes</p>
                                    </div>
                                )}
                            </div>

                            <div className="absolute bottom-4 right-4">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button 
                                            size="sm" 
                                            variant="ghost" 
                                            className="h-7 text-[9px] uppercase font-bold tracking-tight hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                            onClick={fetchAllLogs}
                                        >
                                            Ver Todo
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto">
                                        <SheetHeader className="mb-6">
                                            <SheetTitle className="flex items-center gap-2">
                                                <History className="size-5 text-blue-500" />
                                                Historial de Movimientos
                                            </SheetTitle>
                                        </SheetHeader>
                                        
                                        <div className="space-y-6">
                                            {/* Filtros */}
                                            <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                                                <p className="text-xs font-bold uppercase text-muted-foreground">Filtrar por fecha</p>
                                                <div className="flex flex-wrap gap-3 items-end">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-medium ml-1">Desde</label>
                                                        <Input 
                                                            type="date" 
                                                            name="from" 
                                                            value={dateFilter.from} 
                                                            onChange={handleFilterChange}
                                                            className="h-8 text-xs w-[140px]" 
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-medium ml-1">Hasta</label>
                                                        <Input 
                                                            type="date" 
                                                            name="to" 
                                                            value={dateFilter.to} 
                                                            onChange={handleFilterChange}
                                                            className="h-8 text-xs w-[140px]" 
                                                        />
                                                    </div>
                                                    <Button size="sm" onClick={applyFilter} className="h-8 gap-1.5 text-xs">
                                                        <Search className="size-3.5" />
                                                        Filtrar
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Tabla de Movimientos */}
                                            <div className="rounded-md border border-sidebar-border">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow className="bg-muted/50">
                                                            <TableHead className="text-[10px] font-bold uppercase">Acción / Fecha</TableHead>
                                                            <TableHead className="text-[10px] font-bold uppercase">Usuario</TableHead>
                                                            <TableHead className="text-[10px] font-bold uppercase">Descripción</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {isLoadingLogs ? (
                                                            <TableRow>
                                                                <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">Cargando...</TableCell>
                                                            </TableRow>
                                                        ) : allLogs.length === 0 ? (
                                                            <TableRow>
                                                                <TableCell colSpan={3} className="text-center py-10 text-muted-foreground italic">No se encontraron movimientos.</TableCell>
                                                            </TableRow>
                                                        ) : (
                                                            allLogs.map((log) => (
                                                                <TableRow key={log.id} className="hover:bg-muted/30">
                                                                    <TableCell>
                                                                        <p className="text-xs font-bold text-blue-600 dark:text-blue-400">{log.accion}</p>
                                                                        <p className="text-[9px] text-muted-foreground mt-0.5">
                                                                            {new Date(log.creado_en).toLocaleDateString()} {new Date(log.creado_en).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                        </p>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <div className="flex flex-col">
                                                                            <span className="text-xs font-medium">{log.usuario?.name || 'Sistema'}</span>
                                                                            <span className="text-[9px] text-muted-foreground uppercase">{log.usuario?.rol || 'Auto'}</span>
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell className="max-w-[150px]">
                                                                        <p className="text-[10px] leading-relaxed break-words">{log.descripcion || 'Sin descripción'}</p>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>
                </div>            
            </div>
        </AppLayout>
    );
}
