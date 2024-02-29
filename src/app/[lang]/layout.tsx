import { Toaster } from "@/components/ui/sonner";
import { Locale } from "@/config/i18n.config";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "./components/header";
import { ThemeProvider } from "./components/theme-provider";
import "./globals.css";
import prisma from "./lib/db";

import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export function generateDynamicParams() {
  return [{ lang: "pt-BR" }, { lang: "en-US" }];
}

export const metadata: Metadata = {
  title: "memo+",
  description: "Manager your notes with ease.",
};

async function getData(userId: string) {
  if (userId) {
    const data = await prisma?.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        colorScheme: true,
      },
    });
    return data;
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  const lang: Locale = params.lang as Locale;

  unstable_setRequestLocale(params.lang);

  return (
    <html lang={params.lang}>
      {}
      <body
        className={`${inter.className} ${data?.colorScheme ?? "theme-orange"}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={lang}>
            <Header lang={lang} />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
