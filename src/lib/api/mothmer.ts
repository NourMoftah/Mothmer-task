import { request } from "@/lib/api/client";
import type {
  Advertisement,
  AdvertisementDetails,
  ApiResponse,
  Brand,
  Category,
  InfluencerOffer,
  SiteConfig,
} from "@/lib/api/types";

type ListOptions = {
  lang?: "ar" | "en";
  page?: number;
  limit?: number;
  sort?: string;
  _delay?: number;
  _error?: number;
  _empty?: boolean;
};

type OfferListOptions = ListOptions & {
  q?: string;
};

export const mothmerApi = {
  auth: {
    login: (credentials: { email?: string; password?: string }) =>
      request<{ token: string }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" },
      }),
  },

  config: (lang?: "ar" | "en") => request<SiteConfig>("/api/config", {}, { lang }),

  categories: (options?: ListOptions) =>
    request<Category[]>("/api/categories", {}, options),

  advertisement: (id: string, lang?: "ar" | "en") =>
    request<AdvertisementDetails>(`/api/ads/${id}`, {}, { lang }),

  brand: (id: string, lang?: "ar" | "en") =>
    request<Brand>(`/api/brands/${id}`, {}, { lang }),

  similarAdvertisements: (id: string, options?: ListOptions) =>
    request<Advertisement[]>(`/api/ads/${id}/similar`, {}, options),

  offers: (id: string, options?: OfferListOptions) =>
    request<InfluencerOffer[]>(`/api/ads/${id}/offers`, {}, options),

  likeAdvertisement: (id: string) => postEngagement(`/api/ads/${id}/like`),
  favoriteAdvertisement: (id: string) => postEngagement(`/api/ads/${id}/favorite`),
  recordAdvertisementView: (id: string) => postEngagement(`/api/ads/${id}/view`),
};

function postEngagement(path: string): Promise<ApiResponse<unknown>> {
  return request<unknown>(path, { method: "POST" });
}
