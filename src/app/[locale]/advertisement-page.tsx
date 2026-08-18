import { AdvertisementDetails } from "@/components/advertisement/advertisement-details";
import { OffersSection } from "@/components/offers/offers-section";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SimilarAdsSection } from "@/components/similar-ads/similar-ads-section";
import { SectionState } from "@/components/ui/section-state";
import { getPageCopy } from "@/content/page-copy";
import type { Locale } from "@/i18n/config";
import { mothmerApi } from "@/lib/api/mothmer";
import {
  toAdvertisementView,
  toOfferViews,
  toSimilarAdvertisementViews,
} from "@/lib/view-models/advertisement";

import styles from "./page.module.css";

type AdvertisementPageProps = {
  id: string;
  locale: Locale;
  offersPage: number;
  offersQuery: string;
};

async function safely<T>(promise: Promise<T>) {
  try {
    return { data: await promise };
  } catch {
    return { data: undefined };
  }
}

export async function AdvertisementPage({
  id,
  locale,
  offersPage,
  offersQuery,
}: AdvertisementPageProps) {
  const copy = getPageCopy(locale);
  const language = locale as "ar" | "en";
  const [configResult, adResult, offersResult, similarResult] =
    await Promise.all([
      safely(mothmerApi.config(language)),
      safely(mothmerApi.advertisement(id, language)),
      safely(
        mothmerApi.offers(id, {
          lang: language,
          q: offersQuery || undefined,
          page: offersPage,
          limit: 10,
        }),
      ),
      safely(mothmerApi.similarAdvertisements(id, { lang: language })),
    ]);
  const config = configResult.data?.data;
  const ad = adResult.data?.data;
  const brandResult = ad
    ? await safely(mothmerApi.brand(ad.brandId, language))
    : { data: undefined };
  // Fall back to the brand summary embedded in the ad if the brand API fails
  const brand = brandResult.data?.data ?? (ad?.brand ? {
    ...ad.brand,
    cover: ad.poster || ad.thumbnail,
    categoryId: ad.categoryId,
    adsCount: 0,
    followers: 0,
    rating: 0,
    joinedAt: ad.publishedAt,
  } : undefined);
  const navigation =
    config?.nav.map((item) => ({ href: item.href, label: item.label })) ??
    copy.navigation.map((label, index) => ({
      href: ["/", "/ads", "/influencers", "/pricing", "/about"][index],
      label,
    }));

  return (
    <>
      <SiteHeader
        brandLogo={config?.brand.logo}
        brandName={config?.brand.name ?? copy.brandName}
        className={styles.header}
        joinHref={config?.authAction.href ?? "/register"}
        joinLabel={config?.authAction.label ?? copy.join}
        loginLabel={copy.login}
        labels={copy}
        locale={locale}
        navigation={navigation}
      />
      {ad && brand ? (
        <AdvertisementDetails
          className={styles.page}
          content={{
            copy,
            advertisement: toAdvertisementView(ad, brand, locale),
          }}
        />
      ) : (
        <SectionState className={styles.page} message={copy.loadError} />
      )}
      {offersResult.data ? (
        <OffersSection
          className={styles.offersSection}
          offers={toOfferViews(offersResult.data.data, locale)}
          meta={offersResult.data.meta}
          query={offersQuery}
          labels={{
            title: copy.offersTitle,
            count: copy.offersCount,
            searchPlaceholder: copy.offersSearchPlaceholder,
            clearSearch: copy.clearSearch,
            noOffers: copy.noOffers,
            followers: copy.followers,
            rating: copy.rating,
            delivery: copy.delivery,
            previousPage: copy.previousPage,
            nextPage: copy.nextPage,
            loading: copy.loading,
            supportOffer: copy.supportOffer,
          }}
        />
      ) : (
        <SectionState
          className={styles.offersSection}
          message={copy.loadError}
        />
      )}
      {similarResult.data ? (
        similarResult.data.data.length ? (
          <SimilarAdsSection
            advertisements={toSimilarAdvertisementViews(
              similarResult.data.data,
              locale,
            )}
            className={styles.similarSection}
            labels={{
              next: copy.nextAds,
              previous: copy.previousAds,
              title: copy.similarAdsTitle,
            }}
          />
        ) : (
          <SectionState
            className={styles.similarSection}
            message={copy.emptySimilar}
          />
        )
      ) : (
        <SectionState
          className={styles.similarSection}
          message={copy.loadError}
        />
      )}
      {config ? (
        <SiteFooter
          className={styles.footer}
          cta={config.cta}
          darkColor={config.brand.darkColor}
          footer={config.footer}
          brandLogo={config.brand.logo}
        />
      ) : (
        <SectionState className={styles.footer} message={copy.loadError} />
      )}
    </>
  );
}
