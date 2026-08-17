"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import {
  FiMaximize,
  FiPause,
  FiSettings,
  FiSkipBack,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";

type AdVideoProps = {
  poster: string;
  videoUrl: string;
  sponsoredLabel: string;
  videoLabel: string;
  playLabel: string;
  duration: string;
  brandTitle?: string;
  className: string;
};

const FALLBACK_VIDEO_URL =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

const FALLBACK_DURATION = 416;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function AdVideo({
  poster,
  videoUrl,
  sponsoredLabel,
  videoLabel,
  playLabel,
  duration,
  brandTitle,
  className,
}: AdVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [mediaDuration, setMediaDuration] = useState(0);
  const [hasError, setHasError] = useState(false);

  const activeVideoUrl = videoUrl || FALLBACK_VIDEO_URL;

  const totalDuration = mediaDuration || FALLBACK_DURATION;

  const progress =
    totalDuration > 0
      ? Math.min(100, Math.max(0, (currentTime / totalDuration) * 100))
      : 0;

  async function togglePlayback(): Promise<void> {
    const video = videoRef.current;

    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
      } else {
        video.pause();
      }
    } catch {
      try {
        video.muted = true;
        setMuted(true);

        await video.play();
      } catch (error) {
        console.error("Unable to play video:", error);
      }
    }
  }

  function seek(value: number): void {
    const video = videoRef.current;

    if (!video || !Number.isFinite(video.duration)) {
      return;
    }

    video.currentTime = Math.min(
      video.duration,
      Math.max(0, value),
    );
  }

  async function enterFullscreen(): Promise<void> {
    const video = videoRef.current;

    if (!video?.requestFullscreen) {
      return;
    }

    try {
      await video.requestFullscreen();
    } catch (error) {
      console.error("Unable to enter fullscreen:", error);
    }
  }

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = muted;
  }, [muted]);

  return (
    <section aria-label={videoLabel} className={className}>
      <div className="videoCardContainer">
        <div className="videoMedia">
          {!hasError && activeVideoUrl ? (
            <video
              ref={videoRef}
              className={`videoElement ${playing ? "isPlaying" : ""}`}
              muted={muted}
              playsInline
              poster={poster || undefined}
              preload="auto"
              onClick={() => void togglePlayback()}
              onDurationChange={(event) => {
                const { duration: videoDuration } = event.currentTarget;

                if (Number.isFinite(videoDuration)) {
                  setMediaDuration(videoDuration);
                }
              }}
              onEnded={() => setPlaying(false)}
              onError={() => {
                setHasError(true);
                setPlaying(false);
              }}
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
              onTimeUpdate={(event) => {
                setCurrentTime(event.currentTarget.currentTime);
              }}
            >
              <source src={activeVideoUrl} type="video/mp4" />
            </video>
          ) : poster ? (
            <Image
              src={poster}
              alt=""
              fill
              priority
              sizes="(max-width: 760px) 100vw, 820px"
              className="videoPoster"
            />
          ) : (
            <span
              aria-hidden="true"
              className="videoPosterFallback"
            />
          )}

          {brandTitle && (
            <div className="videoBrandTitleBadge">
              <span>{brandTitle}</span>
            </div>
          )}

          {sponsoredLabel && (
            <span className="sponsoredBadge">
              {sponsoredLabel}
            </span>
          )}

          {!playing && (
            <button
              type="button"
              aria-label={playLabel}
              className="playButton"
              onClick={() => void togglePlayback()}
            >
              <FaPlay size={22} />
            </button>
          )}

          <div className="videoProgressBar">
            <div
              className="videoProgressFill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="videoControlsBar">
          <div className="videoControlsRight">
            <span className="timeDisplay">
              <span className="currentTimeText">
                {formatTime(currentTime)}
              </span>

              <span className="timeSeparator"> / </span>

              <span className="durationText">
                {formatTime(totalDuration)}
              </span>
            </span>

            <button
              type="button"
              aria-label={muted ? "Unmute" : "Mute"}
              className="videoControlBtn"
              onClick={() => setMuted((value) => !value)}
            >
              {muted ? (
                <FiVolumeX size={17} />
              ) : (
                <FiVolume2 size={17} />
              )}
            </button>

            <button
              type="button"
              aria-label="Rewind 10 seconds"
              className="videoControlBtn"
              onClick={() => seek(currentTime - 10)}
            >
              <FiSkipBack size={16} />
            </button>

            <button
              type="button"
              aria-label={playing ? "Pause" : playLabel}
              className="videoControlBtn videoPlayBtn"
              onClick={() => void togglePlayback()}
            >
              {playing ? (
                <FiPause size={16} />
              ) : (
                <FaPlay size={14} />
              )}
            </button>
          </div>

          <div className="videoControlsLeft">
            <button
              type="button"
              aria-label="Fullscreen"
              className="videoControlBtn"
              onClick={() => void enterFullscreen()}
            >
              <FiMaximize size={16} />
            </button>

            <button
              type="button"
              aria-label="Settings"
              className="videoControlBtn"
            >
              <FiSettings size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}