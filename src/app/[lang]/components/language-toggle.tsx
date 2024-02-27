"use client";

import { Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, usePathname } from "@/navigation";

import Image from "next/image";
import imgEn from "../../../assets/en-US.png";
import imgPt from "../../../assets/pt-BR.png";

import { Locale } from "@/config/i18n.config";
import { getDictionaryUseClient } from "@/dictionaries/default-dictionary-use-client";

export default function LanguageToggle({ lang }: { lang: Locale }) {
  const pathname = usePathname();

  const dic = getDictionaryUseClient(lang);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Languages className="h-4 w-4" />
          <span className="sr-only">{dic.toggleLanguage.titulo}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-fit">
        <DropdownMenuItem>
          <Link
            href={pathname}
            locale="pt-BR"
            className="flex items-center gap-2"
          >
            <Image src={imgPt} alt="pt-BR" width={20} height={20} />
            {dic.toggleLanguage.ptBR}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={pathname}
            locale="en-US"
            className="flex items-center gap-2"
          >
            <Image src={imgEn} alt="pt-BR" width={20} height={20} />
            {dic.toggleLanguage.enUS}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
