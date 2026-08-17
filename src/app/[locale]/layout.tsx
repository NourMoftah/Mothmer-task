import type { Metadata } from "next";
import { notFound } from "next/navigation";

import "@/app/globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { getLocale, isLocale, locales } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Mothmer",
  description: "Mothmer platform",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const localeConfig = getLocale(locale);

  return (
    <html lang={localeConfig.code} dir={localeConfig.direction} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
