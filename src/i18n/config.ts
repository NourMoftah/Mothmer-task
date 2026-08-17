export const locales = ["ar", "en"] as const;

export type Locale = (typeof locales)[number];
export type TextDirection = "rtl" | "ltr";

type LocaleConfig = {
  code: Locale;
  direction: TextDirection;
};

const localeConfig: Record<Locale, LocaleConfig> = {
  ar: { code: "ar", direction: "rtl" },
  en: { code: "en", direction: "ltr" },
};

export const defaultLocale: Locale = "ar";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocale(locale: Locale): LocaleConfig {
  return localeConfig[locale];
}
