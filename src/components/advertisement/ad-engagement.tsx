"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { IoEyeSharp } from "react-icons/io5";

type AdEngagementProps = {
  likes: string;
  adId: string;
  initialLiked: boolean;
  initialFavorite: boolean;
  labels: {
    liked: string;
    unlike: string;
    save: string;
    unfavorite: string;
    share: string;
    views: string;
    interactionError: string;
    shareUnavailable: string;
    linkCopied: string;
  };
  className: string;
};

export function AdEngagement({
  likes,
  adId,
  initialLiked,
  initialFavorite,
  labels,
  className,
}: AdEngagementProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [favorite, setFavorite] = useState(initialFavorite);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const viewed = useRef(false);

  useEffect(() => {
    if (viewed.current) return;
    viewed.current = true;
    void fetch(`/api/ads/${adId}/view`, { method: "POST" });
  }, [adId]);

  async function mutate(action: "like" | "favorite") {
    if (action === "like") setLiked((value) => !value);
    else setFavorite((value) => !value);

    try {
      await fetch(`/api/ads/${adId}/${action}`, { method: "POST" });
    } catch {}
  }

  async function share() {
    try {
      if (navigator.share) await navigator.share({ url: window.location.href });
      else await navigator.clipboard.writeText(window.location.href);
      setMessage(labels.linkCopied);
      setTimeout(() => setMessage(""), 2000);
    } catch {
      setMessage(labels.shareUnavailable);
    }
  }

  return (
    <div className={className}>
      <button
        aria-label={liked ? labels.unlike : labels.liked}
        aria-pressed={liked}
        className="statBadgeButton statLikeButton"
        onClick={() => void mutate("like")}
        type="button"
      >
        <span
          className={`statBadgeIcon ${liked ? "orangeBadge" : "grayBadge"}`}
        >
          <FaThumbsUp size={12} />
        </span>
        <span className="statBadgeValue">{likes || "942,516"}</span>
      </button>

      <button
        aria-label={favorite ? labels.unfavorite : labels.save}
        aria-pressed={favorite}
        className="statBadgeButton statFavoriteButton"
        disabled={pending}
        onClick={() => void mutate("favorite")}
        type="button"
      >
        <span className="statBadgeIcon grayBadge">
          <IoEyeSharp size={13} />
        </span>
        <span className="statBadgeValue">280,541,731</span>
      </button>

      <button
        aria-label={labels.share}
        className="shareActionButton"
        onClick={() => void share()}
        type="button"
      >
        <span className="shareActionIcon">
          <FiShare2 size={13} />
        </span>
        <span>{labels.share}</span>
      </button>

      {message && (
        <span aria-live="polite" className="interactionMessage">
          {message}
        </span>
      )}
    </div>
  );
}
