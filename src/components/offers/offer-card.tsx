import Link from "next/link";
import Image from "next/image";
import { FiThumbsUp } from "react-icons/fi";

import type { OfferView } from "@/lib/view-models/advertisement";

type OfferCardProps = {
  offer: OfferView;
  supportLabel: string;
};

export function OfferCard({ offer, supportLabel }: OfferCardProps) {
  return (
    <article className="offerCard">
      <Link href="#" className="offerIdentity" style={{ textDecoration: 'none', color: 'inherit' }}>
        {offer.avatar ? (
          <Image
            alt={offer.name}
            className="offerAvatar"
            height={40}
            src={offer.avatar}
            width={40}
          />
        ) : (
          <span
            aria-hidden="true"
            className="offerAvatar offerAvatarFallback"
          />
        )}
        <div className="offerIdentityText">
          <h3>{offer.name}</h3>
          <div className="offerStats">
            <span className="offerRatingStar">★</span>
            <span>{offer.followers}</span>
          </div>
        </div>
      </Link>

      <button className="supportButton" type="button">
        <FiThumbsUp size={16} strokeWidth={2.5} />
        <span>{supportLabel}</span>
      </button>
    </article>
  );
}
