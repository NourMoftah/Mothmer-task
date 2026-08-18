"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiThumbsUp } from "react-icons/fi";
import { FaThumbsUp } from "react-icons/fa";

import type { OfferView } from "@/lib/view-models/advertisement";

type OfferCardProps = {
  offer: OfferView;
  supportLabel: string;
};

export function OfferCard({ offer, supportLabel }: OfferCardProps) {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    try {
      const supportedOffers = JSON.parse(localStorage.getItem('supportedOffers') || '{}');
      if (supportedOffers[offer.id]) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsSupported(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, [offer.id]);

  const toggleSupport = () => {
    setIsSupported((prev) => {
      const nextState = !prev;
      try {
        const supportedOffers = JSON.parse(localStorage.getItem('supportedOffers') || '{}');
        if (nextState) {
          supportedOffers[offer.id] = true;
        } else {
          delete supportedOffers[offer.id];
        }
        localStorage.setItem('supportedOffers', JSON.stringify(supportedOffers));
      } catch (e) {
        console.error(e);
      }
      return nextState;
    });
  };

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

      <button 
        className={`supportButton ${isSupported ? 'isSupported' : ''}`} 
        type="button"
        onClick={toggleSupport}
        aria-label={supportLabel}
      >
        {isSupported ? (
          <FaThumbsUp size={16} />
        ) : (
          <>
            <FiThumbsUp size={16} strokeWidth={2.5} />
            <span>{supportLabel}</span>
          </>
        )}
      </button>
    </article>
  );
}
