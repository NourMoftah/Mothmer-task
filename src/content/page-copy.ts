import type { Locale } from "@/i18n/config";

export type PageCopy = {
  brandName: string;
  brandMark: string;
  brandAriaLabel: string;
  primaryNavigation: string;
  openNavigation: string;
  closeNavigation: string;
  languageShort: string;
  languageLabel: string;
  switchLanguage: string;
  navigation: string[];
  join: string;
  login: string;
  sponsored: string;
  share: string;
  save: string;
  liked: string;
  views: string;
  published: string;
  category: string;
  brand: string;
  verified: string;
  visitWebsite: string;
  details: string;
  videoLabel: string;
  playVideo: string;
  offersTitle: string;
  offersCount: string;
  offersSearchPlaceholder: string;
  clearSearch: string;
  noOffers: string;
  followers: string;
  rating: string;
  delivery: string;
  similarAdsTitle: string;
  previousAds: string;
  nextAds: string;
  previousPage: string;
  nextPage: string;
  loading: string;
  loadError: string;
  emptySimilar: string;
  switchToDark: string;
  switchToLight: string;
  like: string;
  unlike: string;
  favorite: string;
  unfavorite: string;
  interactionError: string;
  shareUnavailable: string;
  supportOffer: string;
  linkCopied: string;
  selectAdInfo: string;
  watchFirst: string;
};

const copy: Record<Locale, PageCopy> = {
  ar: {
    brandName: "مثمر",
    brandMark: "م",
    brandAriaLabel: "مثمر",
    primaryNavigation: "التنقل الرئيسي",
    openNavigation: "فتح قائمة التنقل",
    closeNavigation: "إغلاق قائمة التنقل",
    languageShort: "EN",
    languageLabel: "English",
    switchLanguage: "التبديل إلى اللغة الإنجليزية",
    navigation: ["الرئيسية", "الإعلانات", "المؤثرين", "الباقات", "من نحن"],
    join: "انضم إلينا",
    login: "دخول",
    sponsored: "إعلان ممول",
    share: "مشاركة",
    save: "حفظ الإعلان",
    liked: "إعجاب",
    views: "مشاهدة",
    published: "نُشر في",
    category: "التصنيف",
    brand: "العلامة التجارية",
    verified: "حساب موثّق",
    visitWebsite: "زيارة الموقع",
    details: "تفاصيل الإعلان",
    videoLabel: "فيديو الإعلان",
    playVideo: "تشغيل الفيديو",
    offersTitle: "اجابات مؤثرة",
    offersCount: "11 عرض متاح",
    offersSearchPlaceholder: "بحث عن مؤثر...",
    clearSearch: "مسح البحث",
    noOffers: "لا توجد عروض مطابقة للبحث",
    followers: "متابع",
    rating: "التقييم",
    delivery: "مدة التنفيذ",
    similarAdsTitle: "اعلانات مشابهه",
    previousAds: "الإعلانات السابقة",
    nextAds: "الإعلانات التالية",
    previousPage: "الصفحة السابقة",
    nextPage: "الصفحة التالية",
    loading: "جارٍ التحميل...",
    loadError: "تعذر تحميل المحتوى. حاول مرة أخرى.",
    emptySimilar: "لا توجد إعلانات مشابهة حالياً.",
    switchToDark: "تفعيل الوضع الداكن",
    switchToLight: "تفعيل الوضع الفاتح",
    like: "إعجاب",
    unlike: "إلغاء الإعجاب",
    favorite: "حفظ الإعلان",
    unfavorite: "إزالة الإعلان من المحفوظات",
    interactionError: "تعذر تنفيذ الإجراء. حاول مرة أخرى.",
    shareUnavailable: "تعذر مشاركة الإعلان حالياً.",
    supportOffer: "ادعم الاجابة",
    linkCopied: "تم نسخ رابط الإعلان",
    selectAdInfo: "اختر معلوماتك عن الاعلان",
    watchFirst: "يفضل مشاهدة الاعلان اولا لتمكن من اختيار معلوماتك",
  },
  en: {
    brandName: "Mothmer",
    brandMark: "م",
    brandAriaLabel: "Mothmer",
    primaryNavigation: "Primary navigation",
    openNavigation: "Open navigation",
    closeNavigation: "Close navigation",
    languageShort: "ع",
    languageLabel: "العربية",
    switchLanguage: "Switch to Arabic",
    navigation: ["Home", "Ads", "Influencers", "Pricing", "About"],
    join: "Join us",
    login: "Log in",
    sponsored: "Sponsored ad",
    share: "Share",
    save: "Save ad",
    liked: "Like",
    views: "views",
    published: "Published",
    category: "Category",
    brand: "Brand",
    verified: "Verified account",
    visitWebsite: "Visit website",
    details: "Ad details",
    videoLabel: "Advertisement video",
    playVideo: "Play video",
    offersTitle: "Influencer offers",
    offersCount: "11 offers available",
    offersSearchPlaceholder: "Search influencer...",
    clearSearch: "Clear search",
    noOffers: "No offers match your search",
    followers: "followers",
    rating: "Rating",
    delivery: "Delivery",
    similarAdsTitle: "Similar ads",
    previousAds: "Previous ads",
    nextAds: "Next ads",
    previousPage: "Previous page",
    nextPage: "Next page",
    loading: "Loading...",
    loadError: "Unable to load content. Please try again.",
    emptySimilar: "No similar ads are available.",
    switchToDark: "Switch to dark mode",
    switchToLight: "Switch to light mode",
    like: "Like",
    unlike: "Unlike",
    favorite: "Save ad",
    unfavorite: "Remove saved ad",
    interactionError: "Unable to complete the action. Please try again.",
    shareUnavailable: "Unable to share this ad right now.",
    supportOffer: "Support offer",
    linkCopied: "Ad link copied!",
    selectAdInfo: "Select your ad info",
    watchFirst: "We recommend watching the ad first before selecting your info",
  },
};

export function getPageCopy(locale: Locale) {
  return copy[locale];
}
