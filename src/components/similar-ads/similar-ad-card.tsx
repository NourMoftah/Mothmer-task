import Link from "next/link";
import Image from "next/image";
import { FiThumbsUp } from "react-icons/fi";
import { IoEyeSharp } from "react-icons/io5";

import { Icon } from "@/components/icons/icon";
import type { SimilarAdvertisementView } from "@/lib/view-models/advertisement";

type SimilarAdCardProps = {
  advertisement: SimilarAdvertisementView;
};

export function SimilarAdCard({ advertisement }: SimilarAdCardProps) {
  return (
    <article className="similarAdCard">
      <Link href={advertisement.id} className="similarAdMedia" style={{ display: 'block' }}>
        {advertisement.thumbnail ? (
          <Image alt={advertisement.title} fill sizes="(max-width: 620px) 84vw, (max-width: 960px) 42vw, 240px" src={advertisement.thumbnail} />
        ) : (
          <span aria-hidden="true" className="similarAdImageFallback" />
        )}
        <span className="similarAdPlay">
          <Icon name="play" size={24} />
        </span>
        <span className="similarAdBadge">{advertisement.badge}</span>
      </Link>
      <div className="similarAdContent">
        <h3>{advertisement.title}</h3>
        <div className="similarAdStats">
          <span>
            <span className="statIconBg"><FiThumbsUp size={14} /></span>
            {advertisement.likes}
          </span>
          <span>
            <span className="statIconBg"><IoEyeSharp size={14} /></span>
            {advertisement.views}
          </span>
        </div>
        <div className="similarAdBrandPill">
          {advertisement.brandLogo ? (
            <Image alt={advertisement.brandName} className="similarAdBrandLogo" height={18} width={18} src={advertisement.brandLogo} />
          ) : (
            <span className="similarAdBrandLogoFallback" />
          )}
          <span>{advertisement.brandName}</span>
        </div>
        <p className="similarAdExcerpt">{advertisement.excerpt}</p>
      </div>
    </article>
  );
}

