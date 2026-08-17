"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { FiSun, FiMoon } from "react-icons/fi";
import { Icon } from "@/components/icons/icon";
import type { Locale } from "@/i18n/config";
import { useTheme } from "@/components/providers/theme-provider";

type SiteHeaderProps = {
  locale: Locale;
  navigation: Array<{ label: string; href: string }>;
  brandName: string;
  brandLogo?: string;
  joinLabel: string;
  joinHref: string;
  loginLabel: string;
  labels: {
    brandName: string;
    brandMark: string;
    brandAriaLabel: string;
    primaryNavigation: string;
    openNavigation: string;
    closeNavigation: string;
    languageShort: string;
    languageLabel: string;
    switchLanguage: string;
    switchToDark: string;
    switchToLight: string;
  };
  className: string;
};

function localizeHref(href: string, locale: Locale) {
  if (!href.startsWith("/")) return href;
  return `/${locale}${href === "/" ? "" : href}`;
}

export function SiteHeader({ brandLogo, brandName, locale, navigation, joinHref, joinLabel, loginLabel, labels, className }: SiteHeaderProps) {
  const alternateLocale = locale === "ar" ? "en" : "ar";
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = navigation.slice(0, 3).map((item) => ({ ...item, href: localizeHref(item.href, locale) }));
  const query = searchParams.toString();
  const languageHref = `${pathname.replace(/^\/(ar|en)(?=\/|$)/, `/${alternateLocale}`)}${query ? `?${query}` : ""}`;
  const isDark = theme === "dark";

  return (
    <header className={className}>
      <div className="headerInner">
        <Link aria-label={labels.brandAriaLabel} className="brand" href={`/${locale}`}>
          {brandLogo ? <Image alt="" className="brandMark" height={34} src={brandLogo} width={34} /> : <span className="brandMark">{labels.brandMark}</span>}
          <span className="brandName">{brandName}</span>
        </Link>

        <nav aria-label={labels.primaryNavigation} className="navLinks">
          {navigationItems.map((item) => (
            <Link href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="headerActions">
          <button aria-label={isDark ? labels.switchToLight : labels.switchToDark} className="themeButton" onClick={() => setTheme(isDark ? "light" : "dark")} type="button">
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <Link aria-label={labels.switchLanguage} className="languageLink" href={languageHref}>
            <span>{labels.languageShort}</span>
            <span className="languageLabel">{labels.languageLabel}</span>
          </Link>
          <Link className="loginLink" href={`/${locale}/login`}>{loginLabel}</Link>
          <Link className="joinButton" href={localizeHref(joinHref, locale)}>
            <Icon name="user" size={17} />
            {joinLabel}
          </Link>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? labels.closeNavigation : labels.openNavigation}
            className="menuButton"
            onClick={() => setIsMenuOpen((open) => !open)}
            type="button"
          >
            <Icon name="menu" />
          </button>
        </div>
      </div>
      <nav
        aria-label={labels.primaryNavigation}
        className={`mobileNav${isMenuOpen ? " mobileNavOpen" : ""}`}
        id="mobile-navigation"
      >
        {navigationItems.map((item) => (
          <Link href={item.href} key={item.label} onClick={() => setIsMenuOpen(false)}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
