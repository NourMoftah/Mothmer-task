import Image from "next/image";
import Link from "next/link";
import { FiThumbsUp } from "react-icons/fi";
import { IoEyeSharp } from "react-icons/io5";

import { Icon } from "@/components/icons/icon";
import type { SimilarAdvertisementView } from "@/lib/view-models/advertisement";

type SimilarAdCardProps = {
  advertisement: SimilarAdvertisementView;
};

export function SimilarAdCard({
  advertisement,
}: SimilarAdCardProps) {
  return (
    <article className="similarAdCard">
      <Link
        href={advertisement.id}
        className="similarAdMedia"
        aria-label={advertisement.title}
      >
        {advertisement.thumbnail ? (
          <Image
            src={advertisement.thumbnail}
            alt={advertisement.title}
            fill
            sizes="(max-width: 620px) 84vw, (max-width: 960px) 42vw, 240px"
          />
        ) : (
          <span
            aria-hidden="true"
            className="similarAdImageFallback"
          />
        )}

        <span
          aria-hidden="true"
          className="similarAdPlay"
        >
          <Icon name="play" size={24} />
        </span>

        <span className="similarAdBadge">
          {advertisement.badge}
        </span>
      </Link>

      <div className="similarAdContent">
        <h3>{advertisement.title}</h3>

        <div className="similarAdStats">
          <span>
            <span
              aria-hidden="true"
              className="statIconBg"
            >
              <FiThumbsUp size={14} />
            </span>

            {advertisement.likes}
          </span>

          <span>
            <span
              aria-hidden="true"
              className="statIconBg"
            >
              <IoEyeSharp size={14} />
            </span>

            {advertisement.views}
          </span>
        </div>

        <div className="similarAdBrandPill">
          {advertisement.brandLogo ? (
            <Image
              src={advertisement.brandLogo}
              alt={advertisement.brandName}
              width={18}
              height={18}
              className="similarAdBrandLogo"
            />
          ) : (
            <span
              aria-hidden="true"
              className="similarAdBrandLogoFallback"
            />
          )}

          <span>{advertisement.brandName}</span>
        </div>

        <p className="similarAdExcerpt">
          {advertisement.excerpt}
        </p>
      </div>
    </article>
  );
}