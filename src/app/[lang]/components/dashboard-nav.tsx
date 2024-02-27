"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CreditCard, Home, Settings } from "lucide-react";

import { Locale } from "@/config/i18n.config";
import { getDictionaryUseClient } from "@/dictionaries/default-dictionary-use-client";

export default function DashboardNav({ lang }: { lang: Locale }) {
  const pathName = usePathname();

  const dic = getDictionaryUseClient(lang);

  const navItems = [
    { name: dic.menu.menu1, href: "/dashboard", icon: Home },
    { name: dic.menu.menu2, href: "/dashboard/settings", icon: Settings },
    { name: dic.menu.menu3, href: "/dashboard/billing", icon: CreditCard },
  ];

  return (
    <nav className="grid items-start gap-2 ">
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
