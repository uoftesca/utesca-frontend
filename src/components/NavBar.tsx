'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
    SheetTitle,
} from '@/components/ui/sheet';

interface NavItemsProps {
    onClick?: () => void;
    navItems: Array<{ href: string; label: string }>;
    closeMenu: () => void;
}

const NavItems = ({
    onClick = () => {},
    navItems,
    closeMenu,
}: NavItemsProps) => (
    <>
        {navItems.map((item) => (
            <NavigationMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        onClick={() => {
                            onClick();
                            closeMenu();
                        }}
                    >
                        {item.label}
                    </NavigationMenuLink>
                </Link>
            </NavigationMenuItem>
        ))}
    </>
);

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/projects', label: 'Projects' },
        { href: '/events', label: 'Events' },
    ];

    const closeMenu = () => setIsOpen(false);

    return (
        <nav className='flex items-center justify-between px-4 py-2 bg-white shadow-md'>
            <div className='flex items-center'>
                <Link href='/'>
                    <div className='relative w-[100px] h-[40px]'>
                        <Image
                            src='/UTESCA-red-black.png'
                            alt='UTESCA Logo'
                            fill
                            sizes='100px'
                            className='object-contain'
                        />
                    </div>
                </Link>
            </div>

            {/* Desktop menu */}
            <div className='hidden md:block'>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavItems navItems={navItems} closeMenu={closeMenu} />
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* Mobile menu */}
            <div className='md:hidden'>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button
                            className='bg-transparent'
                            variant='ghost'
                            size='icon'
                            aria-label='Menu'
                        >
                            <Menu className='h-6 w-6' />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side='top' className='bg-background'>
                        <SheetHeader>
                            <SheetTitle className='sr-only'>
                                Navigation Menu
                            </SheetTitle>
                        </SheetHeader>
                        <nav className='flex flex-col space-y-4 mt-4'>
                            <NavItems
                                navItems={navItems}
                                closeMenu={closeMenu}
                            />
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
};

export default NavBar;
