<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Factura {{ $invoice->codigo }}</title>
    <style>
        body { font-family: 'Helvetica', sans-serif; font-size: 12px; color: #333; line-height: 1.5; }
        .invoice-box { max-width: 800px; margin: auto; padding: 30px; border: 1px solid #eee; }
        .header { margin-bottom: 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; }
        .header table { width: 100%; }
        .company-info h1 { color: #3b82f6; margin: 0; font-size: 24px; }
        .invoice-info { text-align: right; }
        .invoice-info h2 { margin: 0; color: #666; font-size: 18px; }
        .details-section { margin-bottom: 30px; width: 100%; }
        .details-section td { vertical-align: top; width: 50%; }
        .section-title { font-weight: bold; border-bottom: 1px solid #ddd; margin-bottom: 10px; text-transform: uppercase; color: #4b5563; }
        .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .items-table th { background: #f9fafb; border: 1px solid #e5e7eb; padding: 10px; text-align: left; font-weight: bold; }
        .items-table td { border: 1px solid #e5e7eb; padding: 10px; }
        .text-right { text-align: right; }
        .totals-table { width: 40%; float: right; border-collapse: collapse; }
        .totals-table td { padding: 5px 10px; border-bottom: 1px solid #eee; }
        .totals-table .grand-total { font-weight: bold; font-size: 14px; color: #3b82f6; border-bottom: 2px solid #3b82f6; }
        .footer { margin-top: 50px; text-align: center; font-size: 10px; color: #999; clear: both; }
        .notes { margin-top: 30px; padding: 10px; background: #fefce8; border-left: 4px solid #facc15; font-size: 11px; }
    </style>
</head>
<body>
    <div class="invoice-box">
        <div class="header">
            <table>
                <tr>
                    <td class="company-info">
                        <h1>LUCKFEER</h1>
                        <p>Ferretería y Suministros<br>
                        NIT: 900.123.456-7<br>
                        Dirección: Calle Principal #123<br>
                        Tel: (601) 123-4567</p>
                    </td>
                    <td class="invoice-info">
                        <h2>FACTURA DE VENTA</h2>
                        <p><strong>Nro:</strong> {{ $invoice->codigo }}<br>
                        <strong>Fecha:</strong> {{ \Carbon\Carbon::parse($invoice->fecha_emision)->format('d/m/Y') }}<br>
                        <strong>Estado:</strong> {{ ucfirst($invoice->estado) }}</p>
                    </td>
                </tr>
            </table>
        </div>

        <table class="details-section">
            <tr>
                <td>
                    <div class="section-title">Cliente</div>
                    <p><strong>Nombre:</strong> {{ $invoice->cliente->nombre ?? 'Consumidor Final' }}<br>
                    <strong>Documento:</strong> {{ $invoice->cliente->numero_documento ?? 'N/A' }}<br>
                    <strong>Dirección:</strong> {{ $invoice->cliente->direccion ?? 'N/A' }}<br>
                    <strong>Teléfono:</strong> {{ $invoice->cliente->telefono ?? 'N/A' }}</p>
                </td>
                <td>
                    <div class="section-title">Información de Pago</div>
                    <p><strong>Método:</strong> {{ ucfirst($invoice->metodo_pago) }}<br>
                    <strong>Atendido por:</strong> {{ $invoice->usuario->name ?? 'Sistema' }}</p>
                </td>
            </tr>
        </table>

        <table class="items-table">
            <thead>
                <tr>
                    <th>Descripción</th>
                    <th class="text-right">Cantidad</th>
                    <th class="text-right">Precio Unit.</th>
                    <th class="text-right">Total</th>
                </tr>
            </thead>
            <tbody>
                @foreach($invoice->items as $item)
                    <tr>
                        <td>{{ $item->producto->nombre }}</td>
                        <td class="text-right">{{ $item->cantidad }}</td>
                        <td class="text-right">${{ number_format($item->precio_unitario, 2) }}</td>
                        <td class="text-right">${{ number_format($item->subtotal, 2) }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <table class="totals-table">
            <tr>
                <td>Subtotal</td>
                <td class="text-right">${{ number_format($invoice->subtotal, 2) }}</td>
            </tr>
            <tr>
                <td>IVA ({{ $invoice->porcentaje_iva }}%)</td>
                <td class="text-right">${{ number_format($invoice->monto_iva, 2) }}</td>
            </tr>
            @if($invoice->descuento > 0)
            <tr>
                <td>Descuento</td>
                <td class="text-right">-${{ number_format($invoice->descuento, 2) }}</td>
            </tr>
            @endif
            <tr class="grand-total">
                <td><strong>TOTAL</strong></td>
                <td class="text-right"><strong>${{ number_format($invoice->total, 2) }}</strong></td>
            </tr>
        </table>

        @if($invoice->notas)
            <div class="notes">
                <strong>Notas:</strong><br>
                {{ $invoice->notas }}
            </div>
        @endif

        <div class="footer">
            Esta factura fue generada electrónicamente por el sistema LuckFeer.<br>
            ¡Gracias por su compra!
        </div>
    </div>
</body>
</html>
