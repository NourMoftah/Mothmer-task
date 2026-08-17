"use client";

import { useState } from "react";
import Image from "next/image";
import { FaApple, FaArrowUp, FaChevronDown, FaFacebookF, FaGift, FaGooglePlay, FaInstagram, FaLinkedinIn, FaTiktok, FaTrophy, FaXTwitter, FaYoutube, FaSackDollar } from "react-icons/fa6";
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

export function SiteFooter({ className, cta, footer, brandLogo, darkColor }: SiteFooterProps) {
  const [selectedCountry, setSelectedCountry] = useState("EG");

  const arabCountries = [
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

  const currentCountry = arabCountries.find((c) => c.code === selectedCountry) || arabCountries[0];

  function scrollToTop() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const socialIcons: Record<string, React.ReactNode> = {
    tiktok: <FaTiktok size={14} />,
    instagram: <FaInstagram size={14} />,
    facebook: <FaFacebookF size={14} />,
    youtube: <FaYoutube size={14} />,
    x: <FaXTwitter size={14} />,
    linkedin: <FaLinkedinIn size={14} />,
  };

  const getFeatureIcon = (icon: string) => {
    if (icon === '🏆') return <FaTrophy size={14} />;
    if (icon === '🎁') return <FaGift size={14} />;
    if (icon === '💰') return <FaSackDollar size={14} />;
    return icon;
  };

  return (
    <footer className={className} style={{ backgroundColor: darkColor || undefined }}>
      <div className="footerInner">
        {/* Top CTA Banner */}
        <section className="footerCta">
          <div className="footerCtaContent">
            <span className="footerBadge">للأعمال</span>
            <h2>{cta.title || "انضم الي مثمر و اجعل اعلانك مؤثر"}</h2>

            <div className="footerFeatures">
              {cta.features.map((feature) => (
                <span
                  className="featurePill"
                  key={feature.key}
                  style={{
                    backgroundColor: `color-mix(in srgb, ${feature.color} 25%, transparent)`,
                    borderColor: `color-mix(in srgb, ${feature.color} 40%, transparent)`,
                  }}
                >
                  <span className="featureIcon" style={{ color: feature.color }}>{getFeatureIcon(feature.icon)}</span> {feature.label}
                </span>
              ))}
            </div>

            <a className="footerCtaButton" href={cta.button.href}>
              {cta.button.label || "انضم الان +"}
            </a>
          </div>

          <div className="footerVisual" aria-hidden="true">
            
            <div className="footerCardGraphic footerCardGraphic2">
              <div className="cardVideoArea">
                <div className="cardPlayIcon"><Icon name="play" size={14} /></div>
              </div>
              <div className="cardFakeStats">
                 <div className="cardFakeTitle">اعلاناتك ديما مؤثر 🔥</div>
                 <div className="cardFakeRow">
                    <span>942,516 <FiThumbsUp size={10} /></span>
                    <span>280,541,731 <IoEyeSharp size={10} /></span>
                 </div>
              </div>
            </div>
            
            <div className="footerCardGraphic footerCardGraphic1">
              <div className="cardVideoArea">
                <div className="cardPlayIcon"><Icon name="play" size={14} /></div>
              </div>
              <div className="cardFakeStats">
                 <div className="cardFakeTitle">اعلاناتك ديما مؤثر 🔥</div>
                 <div className="cardFakeRow">
                    <span>942,516 <FiThumbsUp size={10} /></span>
                    <span>280,541,731 <IoEyeSharp size={10} /></span>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="footerDivider" />

        {/* Middle Section: Brand & Country Selector */}
        <section className="footerMiddle">
          <div className="footerBrandBlock">
            <div className="footerLogo">
              {brandLogo ? <Image alt="Mothmer" className="logoSpiral" height={26} src={brandLogo} width={26} /> : <span className="logoSpiral">🟠</span>}
              <span className="logoText">mothmer</span>
            </div>
            <p className="footerDescription">{footer.description}</p>
            <div className="footerSocials">
              {footer.socials.map((social) => (
                <a aria-label={social.key} href={social.url} key={social.key} rel="noreferrer" target="_blank">
                  {socialIcons[social.key.toLowerCase()] || social.key.slice(0, 1).toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          <div className="footerActionsBlock">
            <button aria-label="العودة للأعلى" className="scrollTopButton" onClick={scrollToTop} type="button">
              <FaArrowUp size={16} />
            </button>
            <div className="countrySelectorWrapper">
              <select
                className="nativeCountrySelect"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                aria-label="اختر الدولة"
              >
                {arabCountries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
              <div className="countrySelector" aria-hidden="true">
                <span className="countryFlag">{currentCountry.flag}</span>
                <span className="countryName">{currentCountry.name}</span>
                <FaChevronDown size={11} className="selectorChevron" />
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Columns & Apps */}
        <section className="footerBottomGrid">
          {footer.columns.map((column) => (
            <div className="footerColumn" key={column.key}>
              <h3>{column.title}</h3>
              <div className="footerLinks">
                {column.links.map((link) => (
                  <a href={link.href} key={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div className="footerAppColumn">
            <h3>{footer.app.title || "حمل مثمر الان"}</h3>
            <p>{footer.app.subtitle || "حمل التطبيق و استمتع بتجربة فرية للهواتف المحمولة"}</p>
            <div className="appBadges">
              <a className="appBadge" href={footer.app.googlePlay} rel="noreferrer" target="_blank">
                <FaGooglePlay size={18} className="appBadgeIcon" />
                <div className="appBadgeText">
                  <small>GET IT ON</small>
                  <strong>Google Play</strong>
                </div>
              </a>
              <a className="appBadge" href={footer.app.appStore} rel="noreferrer" target="_blank">
                <FaApple size={20} className="appBadgeIcon" />
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
