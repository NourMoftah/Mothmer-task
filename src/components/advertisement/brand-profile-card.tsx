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
              alt={name}
              className="brandLogo"
              height={22}
              width={22}
              src={logo}
            />
          ) : (
            <span aria-hidden="true" className="brandLogoFallback" />
          )}
          <h2>{name}</h2>
          {verified && <Icon name="check" size={12} />}
        </div>

        <p className="brandDescription">{description}</p>
      </div>

      <div className="brandActionWrapper">
        <a
          className="brandActionButton"
          href={websiteUrl || "#"}
          rel="noreferrer"
          target="_blank"
        >
          {actionLabel} <Icon name="arrow" size={14} />
        </a>
        <p className="brandActionHelp">{actionHelp}</p>
      </div>
    </aside>
  );
}
