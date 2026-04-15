import { Link, usePage } from '@inertiajs/react';
import { BookOpen, ChartNoAxesCombined, Folder, LayoutGrid, Package, Receipt, ShoppingCart, Tags, UserCog, Users } from 'lucide-react';
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
import type { NavItem, SharedData } from '@/types';
import AppLogo from './app-logo';

import { useTranslation } from '@/hooks/use-translation';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const { t } = useTranslation();
    const userRole = auth.user.rol as string;

    const mainNavItems: NavItem[] = [
        {
            title: t('Dashboard'),
            href: dashboard().url,
            icon: LayoutGrid,
        },
        {
            title: t('Products'),
            href: products.index().url,
            icon: Package,
            visible: ['admin', 'vendedor'].includes(userRole),
        },
        {
            title: t('Categories'),
            href: categories.index().url,
            icon: Tags,
            visible: ['admin'].includes(userRole),
        },
        {
            title: t('Customers'),
            href: customers.index().url,
            icon: Users,
            visible: ['admin', 'vendedor'].includes(userRole),
        },
        {
            title: t('Invoices'),
            href: invoices.index().url,
            icon: Receipt,
            visible: ['admin', 'cajero'].includes(userRole),
        },
        {
            title: t('Sales'),
            href: sales.index().url,
            icon: ShoppingCart,
            visible: ['admin', 'vendedor'].includes(userRole),
        },
        {
            title: t('Reports'),
            href: reports.index().url,
            icon: ChartNoAxesCombined,
            visible: ['admin'].includes(userRole),
        },
        {
            title: t('Users'),
            href: users.index().url,
            icon: UserCog,
            visible: ['admin'].includes(userRole),
        }
    ].filter(item => item.visible === undefined || item.visible);

    const footerNavItems: NavItem[] = [
        {
            title: t('Repository'),
            href: 'https://github.com/Farid-lucktagh/LuckFeer',
            icon: Folder,
        },
        {
            title: t('Documentation'),
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard().url} prefetch>
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
