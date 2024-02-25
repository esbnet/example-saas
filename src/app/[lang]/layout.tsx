import { Toaster } from "@/components/ui/sonner";
import { Locale, i18n } from "@/config/i18n.config";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "./components/header";
import { ThemeProvider } from "./components/theme-provider";
import "./globals.css";
import prisma from "./lib/db";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  const languages = i18n.locales.map((lang) => ({
    lang,
  }));

  return languages;
}

export const metadata: Metadata = {
  title: "MySaas",
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
  params: { lang: string };
}>) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);

  const lang: Locale = params.lang as Locale;

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
          <Header lang={lang} />
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
