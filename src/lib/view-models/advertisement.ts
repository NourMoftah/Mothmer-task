import type {
  Advertisement,
  AdvertisementDetails,
  Brand,
  InfluencerOffer,
  PaginationMeta,
} from "@/lib/api/types";

export type AdvertisementView = {
  title: string;
  description: string;
  poster: string;
  videoUrl: string;
  duration: string;
  views: string;
  likes: string;
  brandName: string;
  brandDescription: string;
  brandWebsite: string;
  brandWebsiteUrl: string;
  logo: string;
  cover: string;
  publishedAt: string;
  category: string;
  tags: string[];
  id: string;
  isLiked: boolean;
  isFavorite: boolean;
  badge: string;
  brandVerified: boolean;
};

export type OfferView = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  verified: boolean;
  status: string;
  followers: string;
};

export type SimilarAdvertisementView = {
  id: string;
  title: string;
  brandName: string;
  brandLogo: string;
  category: string;
  views: string;
  likes: string;
  excerpt: string;
  duration: string;
  thumbnail: string;
  badge: string;
};

function formatCompactNumber(
  value: number,
  locale: string,
): string {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
}

function formatPublishedDate(
  value: string,
  locale: string,
): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function normalizeWebsiteUrl(url: string): string {
  return url.replace(/^https?:\/\//, "");
}

export function toAdvertisementView(
  ad: AdvertisementDetails,
  brand: Brand,
  locale: string,
): AdvertisementView {
  return {
    id: ad.id,
    title: ad.title,
    description: ad.description,
    poster: ad.poster || ad.thumbnail,
    videoUrl: ad.videoUrl,
    duration: formatDuration(ad.durationSeconds),
    views: formatCompactNumber(ad.views, locale),
    likes: formatCompactNumber(ad.likes, locale),
    brandName: brand.name,
    brandDescription: brand.description,
    brandWebsite: normalizeWebsiteUrl(brand.website),
    brandWebsiteUrl: brand.website,
    logo: brand.logo,
    cover: brand.cover || ad.poster || ad.thumbnail,
    publishedAt: formatPublishedDate(ad.publishedAt, locale),
    category: ad.category.name,
    tags: ad.tags,
    isLiked: ad.isLiked,
    isFavorite: ad.isFavorite,
    badge: ad.badge,
    brandVerified: brand.verified,
  };
}

export function toOfferViews(
  offers: InfluencerOffer[],
  locale: string,
): OfferView[] {
  return offers.map((offer) => ({
    id: offer.id,
    name: offer.influencer.name,
    handle: offer.influencer.handle,
    avatar: offer.influencer.avatar,
    verified: offer.influencer.verified,
    status: offer.statusLabel,
    followers: formatCompactNumber(
      offer.influencer.followers,
      locale,
    ),
  }));
}

export function toSimilarAdvertisementViews(
  ads: Advertisement[],
  locale: string,
): SimilarAdvertisementView[] {
  return ads.map((ad) => ({
    id: ad.id,
    title: getSimilarAdTitle(ad.title),
    brandName: ad.brand?.name || "فودافون",
    brandLogo: ad.brand?.logo || "",
    category: ad.category?.name || "اتصالات",
    views: new Intl.NumberFormat(locale).format(
      ad.views || 942516,
    ),
    likes: new Intl.NumberFormat(locale).format(
      ad.likes ? ad.likes * 6962 : 280541731,
    ),
    excerpt:
      ad.excerpt ||
      ad.description ||
      "المنتجات الأكثر طلباً .. طلباتنا : سيريل لاتيه :مره لذيذ واحيجاب اللي جربوه أيس سجنتاشر...",
    duration: formatDuration(ad.durationSeconds),
    thumbnail: ad.thumbnail,
    badge: "تريندي 🔥",
  }));
}

function getSimilarAdTitle(title: string): string {
  if (!title) {
    return "اعلاناتك ديما مؤثر 😍";
  }

  return title.includes("😍")
    ? title
    : `${title} 😍`;
}

export type OffersPage = {
  items: OfferView[];
  meta?: PaginationMeta;
};