import { AdvertisementPage } from "@/app/[locale]/advertisement-page";
import { isLocale } from "@/i18n/config";

export default async function AdvertisementRoute({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ offersQuery?: string; offersPage?: string }>;
}>) {
  const { id, locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "ar";
  const { offersQuery = "", offersPage = "1" } = await searchParams;
  const page = Math.max(1, Number.parseInt(offersPage, 10) || 1);
  return (
    <AdvertisementPage
      id={id}
      locale={locale}
      offersPage={page}
      offersQuery={offersQuery}
    />
  );
}
