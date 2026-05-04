"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, UserCircle } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Hotels for sale", href: "/hotels-for-sale" },
  { label: "News", href: "/news" },
  { label: "Contacts", href: "/contacts" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="max-w-350 mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <span className="text-white text-2xl font-light tracking-tight">
            <span className="font-serif italic">trai</span>
            <span className="font-bold">Hotels</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.label}>
                  <Link
                    href={link.href}
                    className="px-4 py-2 text-[15px] font-medium text-white hover:text-white/80 transition-colors rounded-md hover:bg-white/10 inline-flex items-center"
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Sign In Button */}
        <div className="hidden lg:flex items-center">
          <Button
            variant="default"
            className="bg-black hover:bg-gray-900 text-white font-medium px-5 py-2 rounded-sm flex items-center gap-2 text-sm"
          >
            Sign In
            <UserCircle className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className="lg:hidden inline-flex items-center justify-center rounded-md size-9 text-white hover:bg-white/10 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-gray-900 text-white border-l-gray-800">
            <div className="flex flex-col gap-1 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-white hover:bg-white/10 rounded-md text-base font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 px-4">
                <Button className="w-full bg-black hover:bg-gray-800 text-white flex items-center gap-2">
                  Sign In
                  <UserCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
