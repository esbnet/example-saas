"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CreditCard, Home, Settings } from "lucide-react";

export const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Settins", href: "/dashboard/settings", icon: Settings },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
];

export default function DashboardNav() {
  const pathName = usePathname();

  return (
    <nav className="grid items-start gap-2 border border-r-primary">
      {navItems.map((item) => (
        <Link key={item.name} href={item.href}>
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathName === item.href ? "bg-accent" : "bg-transparent"
            )}
          >
            <item.icon className="mr-2 h-4 w-4 text-primary" />
            {item.name}
          </span>
        </Link>
      ))}
    </nav>
  );
}
