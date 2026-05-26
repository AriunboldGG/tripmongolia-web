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
  { label: "Нүүр", href: "/" },
  { label: "Зочид буудал", href: "/hotels" },
  { label: "Амралтын газар", href: "/resorts" },
  { label: "Орон сууц", href: "/guesthouses" },
  { label: "Ресторанууд", href: "/restaurants" },
//   { label: "Мэдээ", href: "/news" },
  { label: "Холбоо барих", href: "/contacts" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 sm:pt-5">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.85)] backdrop-blur-md sm:px-5">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <span className="text-white text-lg sm:text-2xl font-light tracking-tight">
              <span className="font-serif italic">go</span>
              <span className="font-bold">Darkhan.mn</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1 rounded-full border border-white/8 bg-white/5 p-1">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center rounded-full px-4 py-2 text-[15px] font-medium text-white transition-colors hover:bg-white/10 hover:text-white/80"
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
              className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-900 flex items-center gap-2"
            >
              Нэвтрэх
              <UserCircle className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="lg:hidden inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 size-10 shrink-0 text-white hover:bg-white/10 transition-colors"
            >
              <Menu className="w-5 h-5" />
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
                  <Button className="w-full rounded-full bg-black hover:bg-gray-800 text-white flex items-center gap-2">
                    Нэвтрэх
                    <UserCircle className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
