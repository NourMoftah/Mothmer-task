"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { FiMaximize, FiPause, FiSettings, FiSkipBack, FiVolume2, FiVolumeX } from "react-icons/fi";

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

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export function AdVideo({ poster, videoUrl, sponsoredLabel, videoLabel, playLabel, brandTitle, className }: AdVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(653); // Default display 10:53
  const [mediaDuration, setMediaDuration] = useState(416); // Default display 6:56
  const [hasError, setHasError] = useState(false);

  const activeVideoUrl = videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

  async function togglePlayback() {
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
      } catch (err) {
        console.error("Playback error:", err);
      }
    }
  }

  function seek(value: number) {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    video.currentTime = Math.max(0, Math.min(video.duration, value));
  }

  async function enterFullscreen() {
    await videoRef.current?.requestFullscreen?.();
  }

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = muted;
    }
  }, [muted]);

  const totalDuration = mediaDuration || 416;
  const progress = totalDuration ? (currentTime / totalDuration) * 100 : 65;

  return (
    <section aria-label={videoLabel} className={className}>
      <div className="videoCardContainer">
        <div className="videoMedia">
          {!hasError && activeVideoUrl ? (
            <video
              className={`videoElement ${playing ? "isPlaying" : ""}`}
              muted={muted}
              onClick={() => void togglePlayback()}
              onDurationChange={(event) => setMediaDuration(event.currentTarget.duration)}
              onEnded={() => setPlaying(false)}
              onError={() => setHasError(true)}
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
              onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
              playsInline
              poster={poster || undefined}
              preload="auto"
              ref={videoRef}
            >
              <source src={activeVideoUrl} type="video/mp4" />
            </video>
          ) : poster ? (
            <Image alt="" className="videoPoster" fill priority sizes="(max-width: 760px) 100vw, 820px" src={poster} />
          ) : (
            <span aria-hidden="true" className="videoPosterFallback" />
          )}

          {brandTitle && (
            <div className="videoBrandTitleBadge">
              <span>{brandTitle}</span>
            </div>
          )}

          {sponsoredLabel && <span className="sponsoredBadge">{sponsoredLabel}</span>}

          {!playing && (
            <button aria-label={playLabel} className="playButton" onClick={() => void togglePlayback()} type="button">
              <FaPlay size={22} />
            </button>
          )}

          <div className="videoProgressBar">
            <div className="videoProgressFill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="videoControlsBar">
          <div className="videoControlsRight">
            <span className="timeDisplay">
              <span className="currentTimeText">{formatTime(currentTime)}</span>
              <span className="timeSeparator"> / </span>
              <span className="durationText">{formatTime(totalDuration)}</span>
            </span>
            <button aria-label={muted ? "Unmute" : "Mute"} className="videoControlBtn" onClick={() => setMuted((value) => !value)} type="button">
              {muted ? <FiVolumeX size={17} /> : <FiVolume2 size={17} />}
            </button>
            <button aria-label="Rewind 10 seconds" className="videoControlBtn" onClick={() => seek(currentTime - 10)} type="button">
              <FiSkipBack size={16} />
            </button>
            <button aria-label={playing ? "Pause" : playLabel} className="videoControlBtn videoPlayBtn" onClick={() => void togglePlayback()} type="button">
              {playing ? <FiPause size={16} /> : <FaPlay size={14} />}
            </button>
          </div>

          <div className="videoControlsLeft">
            <button aria-label="Fullscreen" className="videoControlBtn" onClick={() => void enterFullscreen()} type="button">
              <FiMaximize size={16} />
            </button>
            <button aria-label="Settings" className="videoControlBtn" type="button">
              <FiSettings size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
