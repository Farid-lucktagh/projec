import { Link } from '@inertiajs/react';
import { BookOpen, ChartNoAxesCombined, FileText, Folder, LayoutGrid, Package, Receipt, ShoppingCart, Tags, UserCog, Users } from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import categories from '@/routes/categories';
import customers from '@/routes/customers';
import invoices from '@/routes/invoices';
import products from '@/routes/products';
import reports from '@/routes/reports';
import sales from '@/routes/sales';
import users from '@/routes/users';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,   
    },
    {
        title: 'Products',
        href: products.index(),
        icon: Package,
    },
    {
        title: 'Categories',
        href: categories.index(),
        icon: Tags,
    },
    {
        title: 'Customers',
        href: customers.index(),
        icon: Users,
    },
    {
        title: 'Invoices',
        href: invoices.index(),
        icon: Receipt,
    },
    {
        title: 'Sales',
        href: sales.index(),
        icon: ShoppingCart,
    },
    {
        title: 'Reports',
        href: reports.index(),
        icon: ChartNoAxesCombined,
    },
    {
        title: 'Users',
        href: users.index(),
        icon: UserCog,
    }
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/Farid-lucktagh/LuckFeer',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
