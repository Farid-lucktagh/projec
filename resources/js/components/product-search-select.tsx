import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { ChevronsUpDown, Check } from 'lucide-react';

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

interface ProductSearchSelectProps {
    products: Product[];
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
}

export function ProductSearchSelect({
    products,
    value,
    onValueChange,
    placeholder = "Buscar producto...",
}: ProductSearchSelectProps) {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const selectedProduct = useMemo(() => 
        products.find(p => p.id.toString() === value),
        [products, value]
    );

    const filteredProducts = useMemo(() => {
        if (!searchValue) return products;
        const lowerSearch = searchValue.toLowerCase();
        return products.filter(product => 
            product.nombre.toLowerCase().includes(lowerSearch) ||
            (product.categoria?.nombre.toLowerCase().includes(lowerSearch))
        );
    }, [products, searchValue]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {selectedProduct ? 
                        `${selectedProduct.nombre} (${selectedProduct.categoria?.nombre}) - $${selectedProduct.precio} [Stock: ${selectedProduct.cantidad_stock}]`
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
                <Command shouldFilter={false}>
                    <CommandInput 
                        placeholder="Buscar producto por nombre o categoría..." 
                        value={searchValue}
                        onValueChange={setSearchValue}
                    />
                    <CommandList>
                        {filteredProducts.length === 0 ? (
                            <CommandEmpty>No se encontraron productos.</CommandEmpty>
                        ) : (
                            <CommandGroup>
                                {filteredProducts.map((product) => (
                                    <CommandItem
                                        key={product.id}
                                        value={product.nombre}
                                        onSelect={() => {
                                            onValueChange(product.id.toString());
                                            setOpen(false);
                                            setSearchValue("");
                                        }}
                                    >
                                        <Check
                                            className={`mr-2 h-4 w-4 ${
                                                value === product.id.toString() ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        />
                                        <div className="flex flex-col">
                                            <span>{product.nombre}</span>
                                            <span className="text-sm text-gray-500">
                                                ({product.categoria?.nombre}) - ${product.precio} [Stock: {product.cantidad_stock}]
                                            </span>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
