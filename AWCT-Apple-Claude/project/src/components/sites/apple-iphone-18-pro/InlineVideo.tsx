"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useInView, useMediaQuery } from "./hooks";
import { PauseIcon, PlayIcon, ReplayIcon } from "./icons";
import type { Pic, Video } from "./media";
import { Picture } from "./Picture";
import styles from "./InlineVideo.module.css";

type InlineVideoProps = {
  video: Video;
  /** Shown before playback and after it ends (apple.com end frames). */
  frame: Pic;
  alt?: string;
  className?: string;
  /** Show apple.com's round play/pause/replay control. */
  control?: { play: string; pause: string; replay: string } | null;
  /** Externally driven playback (e.g. the highlights gallery). */
  active?: boolean;
  onEnded?: () => void;
  priority?: boolean;
};

/**
 * Muted, inline, play-once video that starts when scrolled into view — the pattern
 * apple.com uses for its "anim" clips. Picks the small rendition on phones.
 */
export function InlineVideo({ video, frame, alt = "", className, control = null, active, onEnded, priority }: InlineVideoProps) {
  const [ref, inView] = useInView<HTMLDivElement>("0px 0px -20% 0px");
  const videoRef = useRef<HTMLVideoElement>(null);
  const small = useMediaQuery("(max-width: 734px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [state, setState] = useState<"idle" | "playing" | "paused" | "ended">("idle");
  const shouldPlay = active ?? inView;

  useEffect(() => {
    const node = videoRef.current;
    if (!node || reduceMotion) return;
    if (shouldPlay) {
      if (active !== undefined) node.currentTime = 0;
      node.play().catch(() => setState("paused"));
    } else if (active !== undefined) {
      node.pause();
    }
  }, [shouldPlay, active, reduceMotion, small]);

  const toggle = () => {
    const node = videoRef.current;
    if (!node) return;
    if (state === "playing") node.pause();
    else {
      if (state === "ended") node.currentTime = 0;
      node.play().catch(() => undefined);
    }
  };

  return (
    <div ref={ref} className={cn(styles.root, className)}>
      <Picture pic={frame} alt={alt} className={styles.frame} priority={priority} />
      {!reduceMotion ? (
        <video
          key={small ? "small" : "large"}
          ref={videoRef}
          className={cn(styles.video, state !== "idle" && styles.videoShown)}
          src={small ? video.small : video.large}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          onPlay={() => setState("playing")}
          onPause={() => setState((value) => (value === "ended" ? value : "paused"))}
          onEnded={() => {
            setState("ended");
            onEnded?.();
          }}
        />
      ) : null}
      {control && !reduceMotion ? (
        <button
          type="button"
          className={styles.control}
          onClick={toggle}
          aria-label={state === "playing" ? control.pause : state === "ended" ? control.replay : control.play}
        >
          {state === "playing" ? <PauseIcon /> : state === "ended" ? <ReplayIcon /> : <PlayIcon />}
        </button>
      ) : null}
    </div>
  );
}
