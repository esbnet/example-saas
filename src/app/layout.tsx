import { Toaster } from "@/components/ui/sonner";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "./components/navbar";
import { ThemeProvider } from "./components/theme-provider";
import "./globals.css";
import prisma from "./lib/db";

const inter = Inter({ subsets: ["latin"] });

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await getData(user?.id as string);

  return (
    <html lang="en">
      <body
        className={`${inter.className} ${data?.colorScheme ?? "theme-orange"}`}
      >
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
