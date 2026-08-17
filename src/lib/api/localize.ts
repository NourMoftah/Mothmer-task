import type { LocalizedText } from "@/lib/api/types";

type ApiLocale = "ar" | "en";

function isLocalizedText(value: unknown): value is LocalizedText {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.ar === "string" && typeof candidate.en === "string";
}

/** Selects API localized fields once, before data reaches view models or components. */
export function localizeApiData<T>(value: T, locale?: ApiLocale): T {
  if (!locale || value === null || value === undefined) return value;
  if (isLocalizedText(value)) return value[locale] as T;
  if (Array.isArray(value))
    return value.map((item) => localizeApiData(item, locale)) as T;
  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        localizeApiData(item, locale),
      ]),
    ) as T;
  }
  return value;
}
