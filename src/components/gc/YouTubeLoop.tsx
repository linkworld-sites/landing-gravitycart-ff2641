"use client";

import { useEffect, useRef } from "react";

type YTPlayer = {
  mute: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  playVideo: () => void;
  getCurrentTime: () => number;
  destroy: () => void;
};

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        el: HTMLElement,
        opts: {
          videoId: string;
          playerVars: Record<string, number | string>;
          events: {
            onReady: (e: { target: YTPlayer }) => void;
            onStateChange: (e: { data: number; target: YTPlayer }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: { PLAYING: number; ENDED: number };
    };
  }
}

type YouTubeLoopProps = {
  videoId: string;
  /** Loop segment start, in seconds. Defaults to the start of the video. */
  start?: number;
  /** Loop segment end, in seconds. Omit to loop the whole video. */
  end?: number;
  className?: string;
};

export function YouTubeLoop({ videoId, start = 0, end, className }: YouTubeLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    const createPlayer = () => {
      if (!containerRef.current || !window.YT) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          start,
        },
        events: {
          onReady: (e) => {
            e.target.mute();
            e.target.seekTo(start, true);
            e.target.playVideo();
          },
          onStateChange: (e) => {
            if (typeof end === "number" && e.data === window.YT?.PlayerState.PLAYING) {
              if (interval) clearInterval(interval);
              interval = setInterval(() => {
                const t = playerRef.current?.getCurrentTime();
                if (typeof t === "number" && t >= end) {
                  playerRef.current?.seekTo(start, true);
                }
              }, 250);
            } else if (e.data === window.YT?.PlayerState.ENDED) {
              playerRef.current?.seekTo(start, true);
              playerRef.current?.playVideo();
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      if (!document.getElementById("youtube-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prevCallback?.();
        createPlayer();
      };
    }

    return () => {
      if (interval) clearInterval(interval);
      playerRef.current?.destroy();
    };
  }, [videoId, start, end]);

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <div
        ref={containerRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
