import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import reportsRoutes from '@/routes/reports';

interface SaleData {
    date: string;
    total: number;
}

const CustomTooltip = ({
    active,
    payload,
    label,
}: {
    active?: boolean;
    payload?: { value: number }[];
    label?: string;
}) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                <p className="label">{`${label}`}</p>
                <p className="intro">{`Total: $${payload[0].value.toLocaleString('es-CO', { minimumFractionDigits: 2 })}`}</p>
            </div>
        );
    }

    return null;
};

export default function SalesChart() {
    const [data, setData] = useState<SaleData[]>([]);
    const fmt = (d: Date) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    };
    const today = new Date();
    const start = new Date();
    start.setDate(today.getDate() - 6);
    const [from, setFrom] = useState<string>(fmt(start));
    const [to, setTo] = useState<string>(fmt(today));

    const fetchData = (f: string, t: string) => {
        fetch(reportsRoutes.salesOverTime({ query: { from: f, to: t } }).url)
            .then((response) => response.json())
            .then((data) => setData(data));
    };

    useEffect(() => {
        fetchData(from, to);
    }, [from, to]);

    return (
        <div className="h-full flex flex-col gap-3">
            <div className="flex items-center gap-2 p-2 border-b border-sidebar-border/50">
                <input
                    type="date"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="h-9 rounded-md border px-3 text-sm bg-transparent"
                />
                <span className="text-xs text-muted-foreground">a</span>
                <input
                    type="date"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="h-9 rounded-md border px-3 text-sm bg-transparent"
                />
                <button
                    type="button"
                    onClick={() => fetchData(from, to)}
                    className="h-9 px-3 rounded-md bg-neutral-900 text-white text-sm dark:bg-neutral-100 dark:text-neutral-900"
                >
                    Aplicar
                </button>
            </div>
            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
