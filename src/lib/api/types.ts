export type LocalizedText = {
  ar: string;
  en: string;
};

export type ApiResponse<TData> = {
  success: boolean;
  message: string;
  data: TData;
  meta?: PaginationMeta;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  error: {
    code: string;
    status: number;
    details?: unknown;
  };
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type BrandSummary = {
  id: string;
  name: string;
  logo: string;
  color: string;
  verified: boolean;
  description: string;
  website: string;
};

export type Brand = BrandSummary & {
  cover: string;
  categoryId: string;
  adsCount: number;
  followers: number;
  rating: number;
  joinedAt: string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  icon: string;
  color: string;
  adsCount: number;
};

export type Advertisement = {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  brandId: string;
  categoryId: string;
  thumbnail: string;
  poster: string;
  videoUrl: string;
  durationSeconds: number;
  badge: string;
  sponsored: boolean;
  status: string;
  views: number;
  likes: number;
  shares: number;
  commentsCount: number;
  offersCount: number;
  rating: number;
  budget: {
    amount: number;
    currency: string;
  };
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  brand: BrandSummary;
  category: Omit<Category, "adsCount">;
};

export type AdvertisementDetails = Advertisement & {
  isLiked: boolean;
  isFavorite: boolean;
  stats: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
    offers: number;
  };
};

export type InfluencerOffer = {
  id: string;
  adId: string;
  influencerId: string;
  influencer: {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    verified: boolean;
    rating: number;
    followers: number;
    city: string;
  };
  price: {
    amount: number;
    currency: string;
  };
  deliveryDays: number;
  status: string;
  statusLabel: string;
  note: string;
  submittedAt: string;
};

export type SiteConfig = {
  brand: {
    name: string;
    latinName: string;
    logo: string;
    tagline: string;
    primaryColor: string;
    darkColor: string;
  };
  nav: Array<{
    key: string;
    label: string;
    href: string;
  }>;
  authAction: {
    key: string;
    label: string;
    href: string;
  };
  languages: Array<{
    code: string;
    label: string;
    flag: string;
    dir: "rtl" | "ltr";
    default: boolean;
  }>;
  cta: {
    badge: string;
    title: string;
    button: {
      label: string;
      href: string;
    };
    features: Array<{
      key: string;
      icon: string;
      label: string;
      color: string;
    }>;
  };
  footer: {
    description: string;
    columns: Array<{
      key: string;
      title: string;
      links: Array<{
        label: string;
        href: string;
      }>;
    }>;
    socials: Array<{
      key: string;
      url: string;
    }>;
    app: {
      title: string;
      subtitle: string;
      googlePlay: string;
      appStore: string;
    };
    copyright: string;
  };
};
