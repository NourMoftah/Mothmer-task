"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { FiMoon, FiSun } from "react-icons/fi";

import { Icon } from "@/components/icons/icon";
import { useTheme } from "@/components/providers/theme-provider";
import type { Locale } from "@/i18n/config";

type SiteHeaderProps = {
  locale: Locale;
  navigation: Array<{
    label: string;
    href: string;
  }>;
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

function localizeHref(
  href: string,
  locale: Locale,
): string {
  if (!href.startsWith("/")) {
    return href;
  }

  return `/${locale}${href === "/" ? "" : href}`;
}

export function SiteHeader({
  brandLogo,
  brandName,
  locale,
  navigation,
  joinHref,
  joinLabel,
  loginLabel,
  labels,
  className,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { theme, setTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const alternateLocale =
    locale === "ar" ? "en" : "ar";

  const navigationItems = navigation
    .slice(0, 3)
    .map((item) => ({
      ...item,
      href: localizeHref(item.href, locale),
    }));

  const queryString = searchParams.toString();

  const alternatePathname = pathname.replace(
    /^\/(ar|en)(?=\/|$)/,
    `/${alternateLocale}`,
  );

  const languageHref = `${alternatePathname}${
    queryString ? `?${queryString}` : ""
  }`;

  const isDark = theme === "dark";

  function toggleTheme(): void {
    setTheme(isDark ? "light" : "dark");
  }

  function toggleMenu(): void {
    setIsMenuOpen((isOpen) => !isOpen);
  }

  function closeMenu(): void {
    setIsMenuOpen(false);
  }

  return (
    <header className={className}>
      <div className="headerInner">
        <Link
          href={`/${locale}`}
          aria-label={labels.brandAriaLabel}
          className="brand"
        >
          {brandLogo ? (
            <Image
              src={brandLogo}
              alt=""
              width={34}
              height={34}
              className="brandMark"
            />
          ) : (
            <span
              className="brandMark"
              aria-hidden="true"
            >
              {labels.brandMark}
            </span>
          )}

          <span className="brandName">
            {brandName}
          </span>
        </Link>

        <nav
          aria-label={labels.primaryNavigation}
          className="navLinks"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="headerActions">
          <button
            type="button"
            className="themeButton"
            aria-label={
              isDark
                ? labels.switchToLight
                : labels.switchToDark
            }
            onClick={toggleTheme}
          >
            {isDark ? (
              <FiSun
                size={18}
                aria-hidden="true"
              />
            ) : (
              <FiMoon
                size={18}
                aria-hidden="true"
              />
            )}
          </button>

          <Link
            href={languageHref}
            className="languageLink"
            aria-label={labels.switchLanguage}
          >
            <span>{labels.languageShort}</span>
            <span className="languageLabel">
              {labels.languageLabel}
            </span>
          </Link>

          <Link
            href={`/${locale}/login`}
            className="loginLink"
          >
            {loginLabel}
          </Link>

          <Link
            href={localizeHref(joinHref, locale)}
            className="joinButton"
          >
            <Icon
              name="user"
              size={17}
              aria-hidden="true"
            />
            {joinLabel}
          </Link>

          <button
            type="button"
            className="menuButton"
            id="mobile-menu-button"
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={
              isMenuOpen
                ? labels.closeNavigation
                : labels.openNavigation
            }
            onClick={toggleMenu}
          >
            <Icon
              name="menu"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobileNav${
          isMenuOpen ? " mobileNavOpen" : ""
        }`}
        aria-label={labels.primaryNavigation}
      >
        {navigationItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={closeMenu}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}