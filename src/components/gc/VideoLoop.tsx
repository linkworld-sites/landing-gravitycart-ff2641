"use client";

import { useEffect, useRef, useState } from "react";

type VideoLoopProps = {
  src: string;
  poster?: string;
  className?: string;
};

/**
 * Two stacked copies of the same clip crossfade near the end of playback so the
 * loop point is never perceived — a bare `loop` attribute hard-cuts back to frame 1.
 */
export function VideoLoop({ src, poster, className }: VideoLoopProps) {
  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);
  const [activeIsA, setActiveIsA] = useState(true);
  const switching = useRef(false);

  useEffect(() => {
    const active = () => (activeIsA ? videoA.current : videoB.current);
    const idle = () => (activeIsA ? videoB.current : videoA.current);

    const onTimeUpdate = () => {
      const a = active();
      const b = idle();
      if (!a || !b || switching.current) return;
      if (a.duration && a.currentTime >= a.duration - 1) {
        switching.current = true;
        b.currentTime = 0;
        b.style.opacity = "0";
        b.play().catch(() => {});
        const start = performance.now();
        const duration = 900;
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 2);
          b.style.opacity = String(eased);
          a.style.opacity = String(1 - eased);
          if (t < 1) {
            requestAnimationFrame(step);
          } else {
            a.pause();
            a.currentTime = 0;
            setActiveIsA((prev) => !prev);
            switching.current = false;
          }
        };
        requestAnimationFrame(step);
      }
    };

    const a = videoA.current;
    a?.addEventListener("timeupdate", onTimeUpdate);
    return () => a?.removeEventListener("timeupdate", onTimeUpdate);
  }, [activeIsA]);

  return (
    <div className={`relative ${className ?? ""}`}>
      <video
        ref={videoA}
        src={src}
        poster={poster}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: activeIsA ? 1 : 0 }}
      />
      <video
        ref={videoB}
        src={src}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: activeIsA ? 0 : 1 }}
      />
    </div>
  );
}
