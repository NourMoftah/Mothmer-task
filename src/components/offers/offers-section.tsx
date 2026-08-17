"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RiBarChart2Fill } from "react-icons/ri";

import { Icon } from "@/components/icons/icon";
import { OfferCard } from "@/components/offers/offer-card";
import type { OfferView } from "@/lib/view-models/advertisement";
import type { PaginationMeta } from "@/lib/api/types";

type OffersSectionProps = {
  className: string;
  offers: OfferView[];
  meta?: PaginationMeta;
  query: string;
  labels: {
    title: string;
    count: string;
    searchPlaceholder: string;
    clearSearch: string;
    noOffers: string;
    followers: string;
    rating: string;
    delivery: string;
    previousPage: string;
    nextPage: string;
    loading: string;
    supportOffer: string;
  };
};

export function OffersSection({
  className,
  offers,
  meta,
  query,
  labels,
}: OffersSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(query);
  const [isPending, startTransition] = useTransition();

  function updateParams(nextQuery: string, nextPage = 1) {
    const params = new URLSearchParams(searchParams);
    if (nextQuery) params.set("offersQuery", nextQuery);
    else params.delete("offersQuery");
    params.set("offersPage", String(nextPage));
    startTransition(() =>
      router.replace(`${pathname}?${params.toString()}`, { scroll: false }),
    );
  }

  function updateQuery(value: string) {
    setValue(value);
    updateParams(value);
  }

  return (
    <section className={className}>
      <div className="offersCardContainer">
        <div className="offersHeader">
          <div className="offersTitleGroup">
            <h2>{labels.title}</h2>
            <span className="offersHeaderBadge">
              <RiBarChart2Fill size={16} />
            </span>
          </div>

          <label className="offersSearch">
            <input
              onChange={(event) => updateQuery(event.target.value)}
              placeholder={labels.searchPlaceholder}
              type="search"
              value={value}
            />
            <Icon name="search" size={16} />
            {value && (
              <button
                aria-label={labels.clearSearch}
                onClick={() => updateQuery("")}
                type="button"
              >
                <Icon name="close" size={14} />
              </button>
            )}
          </label>
        </div>

        {isPending ? (
          <p className="emptyOffers">{labels.loading}</p>
        ) : offers.length ? (
          <div className="offersGrid">
            {offers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                supportLabel={labels.supportOffer}
              />
            ))}
          </div>
        ) : (
          <p className="emptyOffers">{labels.noOffers}</p>
        )}

        {meta && meta.totalPages > 1 && (
          <nav aria-label={labels.title} className="offersPagination">
            <button
              aria-label={labels.previousPage}
              disabled={!meta.hasPrevPage}
              onClick={() => updateParams(value, meta.page - 1)}
              type="button"
            >
              <Icon name="arrow" size={17} />
            </button>
            {Array.from(
              { length: meta.totalPages },
              (_, index) => index + 1,
            ).map((page) => (
              <button
                aria-current={page === meta.page ? "page" : undefined}
                className={page === meta.page ? "isActive" : ""}
                key={page}
                onClick={() => updateParams(value, page)}
                type="button"
              >
                {page}
              </button>
            ))}
            <button
              aria-label={labels.nextPage}
              disabled={!meta.hasNextPage}
              onClick={() => updateParams(value, meta.page + 1)}
              type="button"
            >
              <Icon name="arrow" size={17} />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}
