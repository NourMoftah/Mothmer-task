"use client";

import { useEffect, useRef, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { IoEyeSharp } from "react-icons/io5";

type EngagementAction = "like" | "favorite";

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
  const [pendingAction, setPendingAction] =
    useState<EngagementAction | null>(null);
  const [message, setMessage] = useState("");

  const viewed = useRef(false);
  const messageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (viewed.current) return;

    viewed.current = true;

    void fetch(`/api/ads/${adId}/view`, {
      method: "POST",
    }).catch(() => {
      // View tracking should not affect the user experience.
    });
  }, [adId]);

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  const showMessage = (text: string) => {
    setMessage(text);

    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }

    messageTimeoutRef.current = setTimeout(() => {
      setMessage("");
      messageTimeoutRef.current = null;
    }, 2000);
  };

  const mutate = async (action: EngagementAction) => {
    if (pendingAction) return;

    const isLikeAction = action === "like";

    const previousValue = isLikeAction ? liked : favorite;

    if (isLikeAction) {
      setLiked((value) => !value);
    } else {
      setFavorite((value) => !value);
    }

    setPendingAction(action);

    try {
      const response = await fetch(`/api/ads/${adId}/${action}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} advertisement`);
      }
    } catch {
      if (isLikeAction) {
        setLiked(previousValue);
      } else {
        setFavorite(previousValue);
      }

      showMessage(labels.interactionError);
    } finally {
      setPendingAction(null);
    }
  };

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          url: window.location.href,
        });

        showMessage(labels.linkCopied);
        return;
      }

      await navigator.clipboard.writeText(window.location.href);

      showMessage(labels.linkCopied);
    } catch {
      showMessage(labels.shareUnavailable);
    }
  };

  return (
    <div className={className}>
      <button
        type="button"
        aria-label={liked ? labels.unlike : labels.liked}
        aria-pressed={liked}
        className="statBadgeButton statLikeButton"
        disabled={pendingAction !== null}
        onClick={() => void mutate("like")}
      >
        <span
          className={`statBadgeIcon ${liked ? "orangeBadge" : "grayBadge"}`}
        >
          <FaThumbsUp size={12} />
        </span>

        <span className="statBadgeValue">{likes || "942,516"}</span>
      </button>

      <button
        type="button"
        aria-label={favorite ? labels.unfavorite : labels.save}
        aria-pressed={favorite}
        className="statBadgeButton statFavoriteButton"
        disabled={pendingAction !== null}
        onClick={() => void mutate("favorite")}
      >
        <span className="statBadgeIcon grayBadge">
          <IoEyeSharp size={13} />
        </span>

        <span className="statBadgeValue">280,541,731</span>
      </button>

      <button
        type="button"
        aria-label={labels.share}
        className="shareActionButton"
        onClick={() => void share()}
      >
        <span className="shareActionIcon">
          <FiShare2 size={13} />
        </span>

        <span>{labels.share}</span>
      </button>

      {message && (
        <span
          role="status"
          aria-live="polite"
          className="interactionMessage"
        >
          {message}
        </span>
      )}
    </div>
  );
}