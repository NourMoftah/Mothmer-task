export default function Loading() {
  return (
    <div className="pageLoading" aria-busy="true" aria-live="polite">

      {/* Header skeleton */}
      <div className="skeletonHeader">
        <span className="skeletonHeaderInner" />
      </div>

      {/* Main page content */}
      <div className="skeletonPage">
        <div className="skeletonPageContainer">

          {/* Detail grid */}
          <div className="skeletonDetailGrid">

            {/* Left - main content */}
            <div className="skeletonMain">
              {/* Video */}
              <span className="skeletonVideo" />

              {/* Title + engagement */}
              <div className="skeletonTitleRow">
                <span className="skeletonTitle" />
                <div className="skeletonEngagement">
                  <span className="skeletonBadge" />
                  <span className="skeletonBadge" />
                  <span className="skeletonBadge" />
                </div>
              </div>

              {/* Description lines */}
              <span className="skeletonLine" />
              <span className="skeletonLine skeletonLineMedium" />
              <span className="skeletonLine skeletonLineShort" />

              {/* Metadata */}
              <div className="skeletonMetaRow">
                <span className="skeletonMeta" />
                <span className="skeletonMeta" />
              </div>
            </div>

            {/* Right - brand card */}
            <div className="skeletonBrandCard">
              <span className="skeletonBrandLogo" />
              <span className="skeletonLine" />
              <span className="skeletonLine skeletonLineMedium" />
              <span className="skeletonLine skeletonLineShort" />
              <span className="skeletonButton" />
            </div>

          </div>
        </div>
      </div>

      {/* Offers section skeleton */}
      <div className="skeletonOffers">
        <div className="skeletonOffersHeader">
          <span className="skeletonSectionTitle" />
          <span className="skeletonSearch" />
        </div>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeletonOfferRow">
            <div className="skeletonOfferLeft">
              <span className="skeletonAvatar" />
              <div className="skeletonOfferText">
                <span className="skeletonLine skeletonLineShort" />
                <span className="skeletonLine" style={{ width: '80px', marginTop: '6px' }} />
              </div>
            </div>
            <span className="skeletonSupportBtn" />
          </div>
        ))}
      </div>

    </div>
  );
}
