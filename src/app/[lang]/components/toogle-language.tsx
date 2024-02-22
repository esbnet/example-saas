"use client";

import { useParams } from "next/navigation";

import Image from "next/image";

import Link from "next/link";
import flagPt from "../assets/flag-br.png";
import flagEn from "../assets/flag-us.png";

export default function ToogleLanguage() {
  const { lang }: { lang: string } = useParams();

  const pathname = (path: string, lng: string) => {
    return path.replace(`/${lang}`, `/${lng}`);
  };

  return (
    <div>
      <ul>
        <li>
          <Link href={pathname(lang, "pt-BR")}>
            <Image src={flagPt} alt="Brazil" width={20} height={20} />
          </Link>
        </li>
        <li>
          <Link href="en-US">
            <Image src={flagEn} alt="United States" width={20} height={20} />
          </Link>
        </li>
      </ul>
    </div>
  );
}
