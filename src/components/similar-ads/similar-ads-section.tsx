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

export function SimilarAdsSection({
  className,
  advertisements,
  labels,
}: SimilarAdsSectionProps) {
  const listRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "next" | "previous"): void {
    const list = listRef.current;

    if (!list) {
      return;
    }

    const scrollAmount = list.clientWidth * 0.82;
    const directionMultiplier = direction === "next" ? 1 : -1;

    list.scrollBy({
      behavior: "smooth",
      left: scrollAmount * directionMultiplier,
    });
  }

  return (
    <section className={className}>
      <div className="similarHeader">
        <div className="similarTitleGroup">
          <h2>{labels.title}</h2>

          <span
            aria-hidden="true"
            className="similarHeaderLightning"
          >
            <BsLightningChargeFill size={22} />
          </span>
        </div>

        <div className="similarControls">
          <button
            type="button"
            aria-label={labels.previous}
            className="previousControl"
            onClick={() => scroll("previous")}
          >
            <Icon
              name="arrow"
              size={18}
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            aria-label={labels.next}
            className="nextControl"
            onClick={() => scroll("next")}
          >
            <Icon
              name="arrow"
              size={18}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <div
        ref={listRef}
        className="similarTrack"
      >
        {advertisements.map((advertisement) => (
          <SimilarAdCard
            key={advertisement.id}
            advertisement={advertisement}
          />
        ))}
      </div>
    </section>
  );
}