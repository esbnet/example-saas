import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { ThemeToggle } from "./theme-toogle";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserNav } from "./user-nav";

import { Locale } from "@/config/i18n.config";
import { getDictionaryServerOnly } from "@/dictionaries/default-dictionary-server-only";

import LanguageToggle from "./language-toggle";

export async function Header({ lang }: { lang: Locale }) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  const dic = getDictionaryServerOnly(lang);

  return (
    <nav className="border-b bg-background h-[12vh] flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-between">
        <Link href="/" className="flex items-center p-2">
          <h1 className="text-3xl font-bold">
            {dic.app.logo.split(" ")[0]}
            <span className="text-primary">
              {dic.app.logo.split(" ").pop()}
            </span>
          </h1>
        </Link>
        <div className="flex items-center gap-x-5">
          {(await isAuthenticated()) ? (
            <>
              <div>
                <ThemeToggle lang={lang} />
                <LanguageToggle lang={lang} />
              </div>
              <UserNav
                email={user?.email as string}
                image={user?.picture as string}
                name={user?.given_name as string}
                lang={lang}
              />
            </>
          ) : (
            <div className="flex items-center gap-x-5">
              <LoginLink>
                <Button>{dic.app.signin}</Button>
              </LoginLink>
              <RegisterLink>
                <Button variant="secondary" size="sm">
                  {dic.app.register}
                </Button>
              </RegisterLink>
              <div>
                <ThemeToggle lang={lang} />
                <LanguageToggle lang={lang} />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
