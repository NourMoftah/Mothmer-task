import { AdEngagement } from "@/components/advertisement/ad-engagement";
import { AdVideo } from "@/components/advertisement/ad-video";
import { BrandProfileCard } from "@/components/advertisement/brand-profile-card";
import type { PageCopy } from "@/content/page-copy";
import type { AdvertisementView } from "@/lib/view-models/advertisement";

type AdvertisementDetailsProps = {
  content: { copy: PageCopy; advertisement: AdvertisementView };
  className: string;
};

export function AdvertisementDetails({ content, className }: AdvertisementDetailsProps) {
  const { copy, advertisement } = content;

  return (
    <main className={className}>
      <div className="pageContainer">
        <div className="breadcrumb"><span>{copy.brandName}</span><span>/</span><span>{copy.details}</span></div>
        <div className="detailGrid">
          <div className="mainContent">
            <AdVideo
              className="videoSection"
              duration={advertisement.duration}
              playLabel={copy.playVideo}
              poster={advertisement.poster}
              sponsoredLabel={advertisement.badge}
              videoUrl={advertisement.videoUrl}
              videoLabel={copy.videoLabel}
              brandTitle={advertisement.title}
            />
            <section className="adContent">
              <div className="adContentHeader">
                <div>
                  <span className="adBadge">{advertisement.badge}</span>
                  <h1>{advertisement.title}</h1>
                </div>
                <AdEngagement
                  className="engagement"
                  adId={advertisement.id}
                  initialFavorite={advertisement.isFavorite}
                  initialLiked={advertisement.isLiked}
                  labels={{ ...copy, linkCopied: copy.linkCopied }}
                  likes={advertisement.likes}
                />
              </div>
              <p className="adDescription">{advertisement.description}</p>
              <dl className="adMetadata">
                <div><dt>{copy.published}</dt><dd>{advertisement.publishedAt}</dd></div>
                <div><dt>{copy.category}</dt><dd><span className="categoryChip">{advertisement.category}</span></dd></div>
              </dl>
              <div className="tagList">
                {advertisement.tags.map((tag) => <span key={tag}>#{tag}</span>)}
              </div>
            </section>
          </div>
          <BrandProfileCard
            className="brandCard"
            cover={advertisement.cover}
            description={advertisement.brandDescription}
            logo={advertisement.logo}
            name={advertisement.brandName}
            title={copy.brand}
            verifiedLabel={copy.verified}
            verified={advertisement.brandVerified}
            visitWebsiteLabel={copy.visitWebsite}
            website={advertisement.brandWebsite}
            websiteUrl={advertisement.brandWebsiteUrl}
            actionLabel={copy.selectAdInfo}
            actionHelp={copy.watchFirst}
          />
        </div>
      </div>
    </main>
  );
}
