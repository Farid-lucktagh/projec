<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reporte LuckFeer</title>
    <style>
        body { font-family: 'Helvetica', sans-serif; font-size: 12px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; }
        .header h1 { color: #3b82f6; margin: 0; }
        .header p { margin: 5px 0; color: #666; }
        .section { margin-bottom: 25px; }
        .section-title { background: #f3f4f6; padding: 8px; font-weight: bold; border-left: 4px solid #3b82f6; margin-bottom: 10px; text-transform: uppercase; font-size: 13px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #e5e7eb; padding: 8px; text-align: left; }
        th { background: #f9fafb; color: #4b5563; font-weight: bold; font-size: 11px; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .footer { position: fixed; bottom: 0; width: 100%; text-align: center; font-size: 10px; color: #999; padding-top: 10px; border-top: 1px solid #eee; }
        .summary-box { display: inline-block; width: 30%; border: 1px solid #e5e7eb; padding: 10px; border-radius: 5px; margin-right: 2%; vertical-align: top; }
        .summary-label { font-size: 10px; color: #6b7280; display: block; }
        .summary-value { font-size: 16px; font-weight: bold; color: #111827; }
        .badge { padding: 2px 6px; border-radius: 10px; font-size: 9px; font-weight: bold; }
        .badge-red { background: #fee2e2; color: #991b1b; }
        .badge-orange { background: #ffedd5; color: #9a3412; }
        .badge-green { background: #dcfce7; color: #166534; }
    </style>
</head>
<body>
    <div class="header">
        <h1>LUCKFEER</h1>
        <p>Reporte de Gestión Administrativa</p>
        <p>Período: {{ $date_range['from'] }} al {{ $date_range['to'] }}</p>
        <p>Generado el: {{ now()->format('d/m/Y H:i:s') }}</p>
    </div>

    @if(in_array('money', $sections) || in_array('sales', $sections))
        <div class="section">
            <div class="section-title">Resumen de Operaciones</div>
            <div class="summary-box">
                <span class="summary-label">Ventas Totales</span>
                <span class="summary-value">{{ $sales_summary['total_sales_count'] + $sales_summary['total_invoices_count'] }}</span>
            </div>
            @if(in_array('money', $sections))
            <div class="summary-box">
                <span class="summary-label">Dinero Acumulado</span>
                <span class="summary-value">${{ number_format($sales_summary['total_money'], 2) }}</span>
            </div>
            @endif
        </div>
    @endif

    @if(in_array('sales', $sections))
        <div class="section">
            <div class="section-title">Detalle de Ventas</div>
            <table>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Cliente</th>
                        <th>Documento</th>
                        <th>Fecha</th>
                        <th class="text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($sales_summary['sales_list'] as $sale)
                        <tr>
                            <td>Venta</td>
                            <td>{{ $sale->cliente->nombre ?? 'N/A' }}</td>
                            <td>{{ $sale->cliente->numero_documento ?? 'N/A' }}</td>
                            <td>{{ $sale->created_at ? $sale->created_at->format('d/m/Y') : 'N/A' }}</td>
                            <td class="text-right">${{ number_format($sale->total, 2) }}</td>
                        </tr>
                    @endforeach
                    @foreach($sales_summary['invoices_list'] as $invoice)
                        <tr>
                            <td>Factura</td>
                            <td>{{ $invoice->cliente->nombre ?? 'N/A' }}</td>
                            <td>{{ $invoice->cliente->numero_documento ?? 'N/A' }}</td>
                            <td>{{ $invoice->fecha_emision ? $invoice->fecha_emision->format('d/m/Y') : 'N/A' }}</td>
                            <td class="text-right">${{ number_format($invoice->total, 2) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    @endif

    @if(in_array('customers', $sections))
        <div class="section">
            <div class="section-title">Clientes Atendidos</div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Documento</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($customers as $customer)
                        <tr>
                            <td>{{ $customer->nombre }}</td>
                            <td>{{ $customer->tipo_documento }}: {{ $customer->numero_documento }}</td>
                            <td>{{ $customer->telefono }}</td>
                            <td>{{ $customer->correo }}</td>
                        </tr>
                    @empty
                        <tr><td colspan="4" class="text-center">No se atendieron clientes en este período.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    @endif

    @if(in_array('products', $sections))
        <div class="section">
            <div class="section-title">Productos Vendidos</div>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th class="text-right">Stock Actual</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($products_sold as $product)
                        <tr>
                            <td>{{ $product->nombre }}</td>
                            <td>{{ $product->categoria->nombre ?? 'N/A' }}</td>
                            <td class="text-right">{{ $product->cantidad_stock }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    @endif

    @if(in_array('inventory', $sections))
        <div class="section">
            <div class="section-title">Estado del Inventario</div>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($inventory['out_of_stock'] as $p)
                        <tr>
                            <td>{{ $p->nombre }}</td>
                            <td>{{ $p->categoria->nombre ?? 'N/A' }}</td>
                            <td class="text-center">{{ $p->cantidad_stock }}</td>
                            <td><span class="badge badge-red">SIN STOCK</span></td>
                        </tr>
                    @endforeach
                    @foreach($inventory['low_stock'] as $p)
                        <tr>
                            <td>{{ $p->nombre }}</td>
                            <td>{{ $p->categoria->nombre ?? 'N/A' }}</td>
                            <td class="text-center">{{ $p->cantidad_stock }}</td>
                            <td><span class="badge badge-orange">BAJO STOCK</span></td>
                        </tr>
                    @endforeach
                    @foreach($inventory['in_stock'] as $p)
                        <tr>
                            <td>{{ $p->nombre }}</td>
                            <td>{{ $p->categoria->nombre ?? 'N/A' }}</td>
                            <td class="text-center">{{ $p->cantidad_stock }}</td>
                            <td><span class="badge badge-green">OK</span></td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    @endif

    @if(in_array('top_products', $sections))
        <div class="section">
            <div class="section-title">Productos Más Vendidos</div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th class="text-right">Unidades Vendidas</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($top_products as $index => $p)
                        <tr>
                            <td class="text-center">{{ $index + 1 }}</td>
                            <td>{{ $p->nombre }}</td>
                            <td class="text-right">{{ number_format($p->total_sold) }} und</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    @endif

    @if(in_array('movements', $sections))
        <div class="section">
            <div class="section-title">Últimos Movimientos</div>
            <table>
                <thead>
                    <tr>
                        <th>Acción</th>
                        <th>Usuario</th>
                        <th>Rol</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($movements as $log)
                        <tr>
                            <td>{{ $log->accion }}</td>
                            <td>{{ $log->usuario->name ?? 'Sistema' }}</td>
                            <td>{{ $log->usuario->rol ?? 'Auto' }}</td>
                            <td>{{ $log->creado_en ? $log->creado_en->format('d/m/Y H:i:s') : 'N/A' }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    @endif

    <div class="footer">
        LuckFeer &copy; {{ date('Y') }} - Software de Gestión Administrativa
    </div>
</body>
</html>
