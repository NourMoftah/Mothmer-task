"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RiBarChart2Fill } from "react-icons/ri";

import { Icon } from "@/components/icons/icon";
import { OfferCard } from "@/components/offers/offer-card";
import type { PaginationMeta } from "@/lib/api/types";
import type { OfferView } from "@/lib/view-models/advertisement";

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

type OffersQueryParams = {
  query: string;
  page: number;
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

  function updateParams({
    query: nextQuery,
    page,
  }: OffersQueryParams): void {
    const params = new URLSearchParams(searchParams);

    if (nextQuery) {
      params.set("offersQuery", nextQuery);
    } else {
      params.delete("offersQuery");
    }

    params.set("offersPage", String(page));

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    });
  }

  function updateQuery(nextQuery: string): void {
    setValue(nextQuery);

    updateParams({
      query: nextQuery,
      page: 1,
    });
  }

  function goToPage(page: number): void {
    updateParams({
      query: value,
      page,
    });
  }

  const hasOffers = offers.length > 0;
  const hasPagination = Boolean(meta && meta.totalPages > 1);

  return (
    <section className={className}>
      <div className="offersCardContainer">
        <div className="offersHeader">
          <div className="offersTitleGroup">
            <h2>{labels.title}</h2>

            <span
              aria-hidden="true"
              className="offersHeaderBadge"
            >
              <RiBarChart2Fill size={16} />
            </span>
          </div>

          <label className="offersSearch">
            <input
              type="search"
              value={value}
              placeholder={labels.searchPlaceholder}
              onChange={(event) => updateQuery(event.target.value)}
            />

            <Icon
              name="search"
              size={16}
              aria-hidden="true"
            />

            {value && (
              <button
                type="button"
                aria-label={labels.clearSearch}
                onClick={() => updateQuery("")}
              >
                <Icon
                  name="close"
                  size={14}
                  aria-hidden="true"
                />
              </button>
            )}
          </label>
        </div>

        {isPending ? (
          <p
            className="emptyOffers"
            role="status"
            aria-live="polite"
          >
            {labels.loading}
          </p>
        ) : hasOffers ? (
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

        {hasPagination && meta && (
          <nav
            aria-label={labels.title}
            className="offersPagination"
          >
            <button
              type="button"
              aria-label={labels.previousPage}
              disabled={!meta.hasPrevPage || isPending}
              onClick={() => goToPage(meta.page - 1)}
            >
              <Icon
                name="arrow"
                size={17}
                aria-hidden="true"
              />
            </button>

            {Array.from(
              { length: meta.totalPages },
              (_, index) => index + 1,
            ).map((page) => (
              <button
                key={page}
                type="button"
                className={page === meta.page ? "isActive" : ""}
                aria-current={
                  page === meta.page ? "page" : undefined
                }
                disabled={isPending}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              aria-label={labels.nextPage}
              disabled={!meta.hasNextPage || isPending}
              onClick={() => goToPage(meta.page + 1)}
            >
              <Icon
                name="arrow"
                size={17}
                aria-hidden="true"
              />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
}