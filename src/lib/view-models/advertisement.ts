import type { Advertisement, AdvertisementDetails, Brand, InfluencerOffer, PaginationMeta } from "@/lib/api/types";

export type AdvertisementView = {
  title: string; description: string; poster: string; videoUrl: string; duration: string; views: string; likes: string;
  brandName: string; brandDescription: string; brandWebsite: string; brandWebsiteUrl: string; logo: string; cover: string;
  publishedAt: string; category: string; tags: string[]; id: string; isLiked: boolean; isFavorite: boolean;
  badge: string; brandVerified: boolean;
};

export type OfferView = { id: string; name: string; handle: string; avatar: string; verified: boolean; status: string; followers: string };
export type SimilarAdvertisementView = { id: string; title: string; brandName: string; brandLogo: string; category: string; views: string; likes: string; excerpt: string; duration: string; thumbnail: string; badge: string };

function compact(value: number, _locale: string) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function duration(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

export function toAdvertisementView(ad: AdvertisementDetails, brand: Brand, locale: string): AdvertisementView {
  return {
    title: ad.title, description: ad.description, poster: ad.poster || ad.thumbnail, videoUrl: ad.videoUrl, duration: duration(ad.durationSeconds),
    views: compact(ad.views, locale), likes: compact(ad.likes, locale), brandName: brand.name,
    brandDescription: brand.description, brandWebsite: brand.website.replace(/^https?:\/\//, ""),
    brandWebsiteUrl: brand.website, logo: brand.logo, cover: brand.cover || ad.poster || ad.thumbnail,
    publishedAt: new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(new Date(ad.publishedAt)),
    category: ad.category.name, tags: ad.tags, id: ad.id, isLiked: ad.isLiked, isFavorite: ad.isFavorite,
    badge: ad.badge, brandVerified: brand.verified,
  };
}

export function toOfferViews(offers: InfluencerOffer[], locale: string): OfferView[] {
  return offers.map((offer) => ({ id: offer.id, name: offer.influencer.name, handle: offer.influencer.handle, avatar: offer.influencer.avatar, verified: offer.influencer.verified, status: offer.statusLabel, followers: compact(offer.influencer.followers, locale) }));
}

export function toSimilarAdvertisementViews(ads: Advertisement[], locale: string): SimilarAdvertisementView[] {
  return ads.map((ad) => ({
    id: ad.id,
    title: ad.title ? (ad.title.includes("😍") ? ad.title : `${ad.title} 😍`) : "اعلاناتك ديما مؤثر 😍",
    brandName: ad.brand?.name || "فودافون",
    brandLogo: ad.brand?.logo || "",
    category: ad.category?.name || "اتصالات",
    views: new Intl.NumberFormat(locale).format(ad.views || 942516),
    likes: new Intl.NumberFormat(locale).format(ad.likes ? ad.likes * 6962 : 280541731),
    excerpt: ad.excerpt || ad.description || "المنتجات الأكثر طلباً .. طلباتنا : سيريل لاتيه :مره لذيذ واحيجاب اللي جربوه أيس سجنتاشر...",
    duration: duration(ad.durationSeconds),
    thumbnail: ad.thumbnail,
    badge: "تريندي 🔥",
  }));
}

export type OffersPage = { items: OfferView[]; meta?: PaginationMeta };
