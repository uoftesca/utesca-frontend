"use client";

import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const toggleSection = (href: string) =>
    setOpenSections((s) => ({ ...s, [href]: !s[href] }));

  const navItems: NavItem[] = [
    { href: "/", label: "Home" },
    {
      href: "/about",
      label: "About Us",
      children: [
        { href: "/about/vision-mission", label: "Our Vision & Missions" },
        { href: "/about/team", label: "Our Team" },
        // { href: "/about/alumni", label: "Alumni" },
        { href: "/about/partner", label: "Partner With Us" },
      ],
    },
    {
      href: "/projects",
      label: "Services",
      children: [
        { href: "/projects/cep", label: "What is CEP" },
        { href: "/projects/examples", label: "Projects" },
      ],
    },
    { href: "/events", label: "Events" },
  ];

  const closeMenu = () => setIsOpen(false);

  const NavItems = ({ onClick = () => {} }: { onClick?: () => void }) => (
    <>
      {navItems.map((item) =>
        item.children ? (
          <NavigationMenuItem key={item.href} className="relative">
            <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-56 gap-1 p-2">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={child.href}
                        className="block select-none rounded-md px-3 py-2 text-sm font-normal leading-none no-underline outline-none 
                        transition-colors hover:bg-accent hover:text-primary focus:bg-accent focus:text-primary"
                        onClick={() => {
                          onClick();
                          closeMenu();
                        }}
                      >
                        {child.label}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ) : (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                className={navigationMenuTriggerStyle()}
                onClick={() => {
                  onClick();
                  closeMenu();
                }}
              >
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ),
      )}
    </>
  );

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-background shadow-md">
      <div className="flex items-center">
        <Link href="/">
          <div className="relative w-[100px] h-[40px]">
            <Image
              src="/utesca-logo.png"
              alt="UTESCA Logo"
              fill
              sizes="100px"
              className="object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            <NavItems />
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              className="bg-transparent"
              variant="ghost"
              size="icon"
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="bg-background">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-4">
              {navItems.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className="text-lg font-normal hover:text-primary"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="mt-2 flex flex-col space-y-2 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="text-base text-muted-foreground hover:text-primary"
                          onClick={closeMenu}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default NavBar;
