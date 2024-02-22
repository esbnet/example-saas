import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { ThemeToggle } from "./theme-toogle";

import { Locale, i18n } from "@/config/i18n.config";
import { getDictionaryServerOnly } from "@/dictionaries/default-dictionare-server-only";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ToogleLanguage from "./toogle-language";
import { UserNav } from "./user-nav";

export async function Navbar() {
  const dict = getDictionaryServerOnly(i18n.defaultLocale as Locale);

  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  const texto = dict.site.logo;
  const firstPart = texto.substring(0, texto.indexOf(" "));
  const lastPart = texto.substring(9, texto.indexOf(" ")).trim();

  return (
    <nav className="border-b bg-background h-[10vh] flex items-center">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            {firstPart}
            <span className="text-primary">{lastPart}</span>
          </h1>
        </Link>
        <div className="flex items-center gap-x-5">
          <ThemeToggle />
          {(await isAuthenticated()) ? (
            <>
              <UserNav
                email={user?.email as string}
                image={user?.picture as string}
                name={user?.given_name as string}
              />
              <ToogleLanguage />
            </>
          ) : (
            <div className="flex items-center gap-x-5">
              <LoginLink>
                <Button>{dict.site.signin}</Button>
              </LoginLink>
              <RegisterLink>
                <Button variant="secondary">{dict.site.signup}</Button>
              </RegisterLink>
              <ToogleLanguage />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
