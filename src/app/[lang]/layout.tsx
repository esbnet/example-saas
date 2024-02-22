import { Toaster } from "@/components/ui/sonner";
import { Locale, i18n } from "@/config/i18n.config";
import { getDictionaryServerOnly } from "@/dictionaries/default-dictionare-server-only";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "./components/navbar";
import { ThemeProvider } from "./components/theme-provider";
import "./globals.css";
import prisma from "./lib/db";

const inter = Inter({ subsets: ["latin"] });

const dict = getDictionaryServerOnly(i18n.defaultLocale as Locale);

export const metadata: Metadata = {
  title: dict.site.appName,
  description: dict.site.appDescription,
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

export async function generateStaticParams() {
  const languages = i18n.locales.map((lang) => ({ lang }));
  return languages;
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

  return (
    <html lang={params.lang}>
      <body
        className={`${inter.className} ${data?.colorScheme ?? "theme-orange"}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
