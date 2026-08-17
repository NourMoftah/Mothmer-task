"use client";

import { useRef } from "react";
import { BsLightningChargeFill } from "react-icons/bs";

import { Icon } from "@/components/icons/icon";
import { SimilarAdCard } from "@/components/similar-ads/similar-ad-card";
import type { SimilarAdvertisementView } from "@/lib/view-models/advertisement";

type SimilarAdsSectionProps = {
  className: string;
  advertisements: SimilarAdvertisementView[];
  labels: {
    title: string;
    previous: string;
    next: string;
  };
};

export function SimilarAdsSection({ className, advertisements, labels }: SimilarAdsSectionProps) {
  const listRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "next" | "previous") {
    const list = listRef.current;

    if (!list) {
      return;
    }

    const amount = list.clientWidth * 0.82;
    const multiplier = direction === "next" ? 1 : -1;
    list.scrollBy({ behavior: "smooth", left: amount * multiplier });
  }

  return (
    <section className={className}>
      <div className="similarHeader">
        <div className="similarTitleGroup">
          <h2>{labels.title}</h2>
          <span className="similarHeaderLightning"><BsLightningChargeFill size={22} /></span>
        </div>
        <div className="similarControls">
          <button aria-label={labels.previous} className="previousControl" onClick={() => scroll("previous")} type="button">
            <Icon name="arrow" size={18} />
          </button>
          <button aria-label={labels.next} className="nextControl" onClick={() => scroll("next")} type="button">
            <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>
      <div className="similarTrack" ref={listRef}>
        {advertisements.map((advertisement) => <SimilarAdCard advertisement={advertisement} key={advertisement.id} />)}
      </div>
    </section>
  );
}
