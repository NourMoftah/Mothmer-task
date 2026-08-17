import Image from "next/image";

import { Icon } from "@/components/icons/icon";

type BrandProfileCardProps = {
  title: string;
  name: string;
  description: string;
  website: string;
  websiteUrl: string;
  logo: string;
  cover?: string;
  verifiedLabel: string;
  verified: boolean;
  visitWebsiteLabel: string;
  actionLabel: string;
  actionHelp: string;
  className: string;
};

export function BrandProfileCard({
  name,
  description,
  websiteUrl,
  logo,
  verified,
  verifiedLabel,
  actionLabel,
  actionHelp,
  className,
}: BrandProfileCardProps) {
  return (
    <aside className={className}>
      <div className="brandCardInner">
        <div className="brandProfilePillHeader">
          {logo ? (
            <Image
              src={logo}
              alt={name}
              width={22}
              height={22}
              className="brandLogo"
            />
          ) : (
            <span
              aria-hidden="true"
              className="brandLogoFallback"
            />
          )}

          <h2>{name}</h2>

          {verified && (
            <span
              aria-label={verifiedLabel}
              title={verifiedLabel}
            >
              <Icon name="check" size={12} />
            </span>
          )}
        </div>

        <p className="brandDescription">
          {description}
        </p>
      </div>

      <div className="brandActionWrapper">
        <a
          className="brandActionButton"
          href={websiteUrl || "#"}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>{actionLabel}</span>
          <Icon name="arrow" size={14} />
        </a>

        <p className="brandActionHelp">
          {actionHelp}
        </p>
      </div>
    </aside>
  );
}