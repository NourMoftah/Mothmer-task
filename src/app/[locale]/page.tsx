import { isLocale } from "@/i18n/config";

import { AdvertisementPage } from "./advertisement-page";

const DEFAULT_ADVERTISEMENT_ID = "ad_001";

export default async function HomePage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ offersQuery?: string; offersPage?: string }>;
}>) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "ar";
  const { offersQuery = "", offersPage = "1" } = await searchParams;
  const page = Math.max(1, Number.parseInt(offersPage, 10) || 1);

  return (
    <AdvertisementPage
      id={DEFAULT_ADVERTISEMENT_ID}
      locale={locale}
      offersPage={page}
      offersQuery={offersQuery}
    />
  );
}
