"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import {
  FaApple,
  FaArrowUp,
  FaChevronDown,
  FaFacebookF,
  FaGift,
  FaGooglePlay,
  FaInstagram,
  FaLinkedinIn,
  FaSackDollar,
  FaTiktok,
  FaTrophy,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { FiThumbsUp } from "react-icons/fi";
import { IoEyeSharp } from "react-icons/io5";

import { Icon } from "@/components/icons/icon";
import type { SiteConfig } from "@/lib/api/types";

type SiteFooterProps = {
  className: string;
  cta: SiteConfig["cta"];
  footer: SiteConfig["footer"];
  brandLogo?: string;
  darkColor?: string;
};

type Country = {
  code: string;
  name: string;
  flag: string;
};

const ARAB_COUNTRIES: Country[] = [
  { code: "EG", name: "جمهورية مصر العربية", flag: "🇪🇬" },
  { code: "SA", name: "المملكة العربية السعودية", flag: "🇸🇦" },
  { code: "AE", name: "الإمارات العربية المتحدة", flag: "🇦🇪" },
  { code: "KW", name: "الكويت", flag: "🇰🇼" },
  { code: "QA", name: "قطر", flag: "🇶🇦" },
  { code: "BH", name: "البحرين", flag: "🇧🇭" },
  { code: "OM", name: "عُمان", flag: "🇴🇲" },
  { code: "JO", name: "الأردن", flag: "🇯🇴" },
  { code: "MA", name: "المغرب", flag: "🇲🇦" },
  { code: "DZ", name: "الجزائر", flag: "🇩🇿" },
  { code: "TN", name: "تونس", flag: "🇹🇳" },
];

const SOCIAL_ICONS: Record<string, ReactNode> = {
  tiktok: <FaTiktok size={14} />,
  instagram: <FaInstagram size={14} />,
  facebook: <FaFacebookF size={14} />,
  youtube: <FaYoutube size={14} />,
  x: <FaXTwitter size={14} />,
  linkedin: <FaLinkedinIn size={14} />,
};

const FEATURE_ICONS: Record<string, ReactNode> = {
  "🏆": <FaTrophy size={14} />,
  "🎁": <FaGift size={14} />,
  "💰": <FaSackDollar size={14} />,
};

const DEFAULT_CTA_TITLE = "انضم الي مثمر و اجعل اعلانك مؤثر";
const DEFAULT_CTA_LABEL = "انضم الان +";
const DEFAULT_APP_TITLE = "حمل مثمر الان";
const DEFAULT_APP_SUBTITLE =
  "حمل التطبيق و استمتع بتجربة فرية للهواتف المحمولة";

function getFeatureIcon(icon: string): ReactNode {
  return FEATURE_ICONS[icon] ?? icon;
}

function getSocialIcon(key: string): ReactNode {
  const normalizedKey = key.toLowerCase();

  return (
    SOCIAL_ICONS[normalizedKey] ??
    key.slice(0, 1).toUpperCase()
  );
}

export function SiteFooter({
  className,
  cta,
  footer,
  brandLogo,
  darkColor,
}: SiteFooterProps) {
  const [selectedCountry, setSelectedCountry] = useState("EG");

  const currentCountry =
    ARAB_COUNTRIES.find(
      (country) => country.code === selectedCountry,
    ) ?? ARAB_COUNTRIES[0];

  function scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <footer
      className={className}
      style={{ backgroundColor: darkColor || undefined }}
    >
      <div className="footerInner">
        <section className="footerCta">
          <div className="footerCtaContent">
            <span className="footerBadge">للأعمال</span>

            <h2>
              {cta.title || DEFAULT_CTA_TITLE}
            </h2>

            <div className="footerFeatures">
              {cta.features.map((feature) => (
                <span
                  key={feature.key}
                  className="featurePill"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${feature.color} 25%, transparent)`,
                    borderColor: `color-mix(in srgb, ${feature.color} 40%, transparent)`,
                  }}
                >
                  <span
                    className="featureIcon"
                    style={{ color: feature.color }}
                    aria-hidden="true"
                  >
                    {getFeatureIcon(feature.icon)}
                  </span>

                  <span>{feature.label}</span>
                </span>
              ))}
            </div>

            <a
              className="footerCtaButton"
              href={cta.button.href}
            >
              {cta.button.label || DEFAULT_CTA_LABEL}
            </a>
          </div>

          <div
            className="footerVisual"
            aria-hidden="true"
          >
            <div className="footerCardGraphic footerCardGraphic2">
              <div className="cardVideoArea">
                <div className="cardPlayIcon">
                  <Icon name="play" size={14} />
                </div>
              </div>

              <div className="cardFakeStats">
                <div className="cardFakeTitle">
                  اعلاناتك ديما مؤثر 🔥
                </div>

                <div className="cardFakeRow">
                  <span>
                    942,516 <FiThumbsUp size={10} />
                  </span>

                  <span>
                    280,541,731 <IoEyeSharp size={10} />
                  </span>
                </div>
              </div>
            </div>

            <div className="footerCardGraphic footerCardGraphic1">
              <div className="cardVideoArea">
                <div className="cardPlayIcon">
                  <Icon name="play" size={14} />
                </div>
              </div>

              <div className="cardFakeStats">
                <div className="cardFakeTitle">
                  اعلاناتك ديما مؤثر 🔥
                </div>

                <div className="cardFakeRow">
                  <span>
                    942,516 <FiThumbsUp size={10} />
                  </span>

                  <span>
                    280,541,731 <IoEyeSharp size={10} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="footerDivider" />

        <section className="footerMiddle">
          <div className="footerBrandBlock">
            <div className="footerLogo">
              {brandLogo ? (
                <Image
                  src={brandLogo}
                  alt="Mothmer"
                  width={26}
                  height={26}
                  className="logoSpiral"
                />
              ) : (
                <span
                  className="logoSpiral"
                  aria-hidden="true"
                >
                  🟠
                </span>
              )}

              <span className="logoText">
                mothmer
              </span>
            </div>

            <p className="footerDescription">
              {footer.description}
            </p>

            <div className="footerSocials">
              {footer.socials.map((social) => (
                <a
                  key={social.key}
                  href={social.url}
                  aria-label={social.key}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {getSocialIcon(social.key)}
                </a>
              ))}
            </div>
          </div>

          <div className="footerActionsBlock">
            <button
              type="button"
              className="scrollTopButton"
              aria-label="العودة للأعلى"
              onClick={scrollToTop}
            >
              <FaArrowUp
                size={16}
                aria-hidden="true"
              />
            </button>

            <div className="countrySelectorWrapper">
              <select
                value={selectedCountry}
                className="nativeCountrySelect"
                aria-label="اختر الدولة"
                onChange={(event) =>
                  setSelectedCountry(event.target.value)
                }
              >
                {ARAB_COUNTRIES.map((country) => (
                  <option
                    key={country.code}
                    value={country.code}
                  >
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>

              <div
                className="countrySelector"
                aria-hidden="true"
              >
                <span className="countryFlag">
                  {currentCountry.flag}
                </span>

                <span className="countryName">
                  {currentCountry.name}
                </span>

                <FaChevronDown
                  size={11}
                  className="selectorChevron"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="footerBottomGrid">
          {footer.columns.map((column) => (
            <div
              key={column.key}
              className="footerColumn"
            >
              <h3>{column.title}</h3>

              <div className="footerLinks">
                {column.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div className="footerAppColumn">
            <h3>
              {footer.app.title || DEFAULT_APP_TITLE}
            </h3>

            <p>
              {footer.app.subtitle ||
                DEFAULT_APP_SUBTITLE}
            </p>

            <div className="appBadges">
              <a
                href={footer.app.googlePlay}
                className="appBadge"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaGooglePlay
                  size={18}
                  className="appBadgeIcon"
                />

                <div className="appBadgeText">
                  <small>GET IT ON</small>
                  <strong>Google Play</strong>
                </div>
              </a>

              <a
                href={footer.app.appStore}
                className="appBadge"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaApple
                  size={20}
                  className="appBadgeIcon"
                />

                <div className="appBadgeText">
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}