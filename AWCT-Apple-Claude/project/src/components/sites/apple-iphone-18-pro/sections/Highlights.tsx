"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { PageContent } from "../content/en";
import { useInView, useMediaQuery } from "../hooks";
import { PauseIcon, PlayCircleIcon, PlayIcon, ReplayIcon } from "../icons";
import { media } from "../media";
import { Picture } from "../Picture";
import { Reveal } from "../Reveal";
import { Rich } from "../Rich";
import styles from "./Highlights.module.css";

/** Slides without a video (Siri AI) hold for this long before advancing. */
const STILL_DURATION = 6000;

/**
 * "Get the highlights." — apple.com's media-card gallery: one card per topic,
 * each plays its clip once, a dot tray shows progress, then the next card slides in.
 */
export function Highlights({ content }: { content: PageContent }) {
  const t = content.highlights;
  const [sectionRef, inView] = useInView<HTMLElement>("0px 0px -30% 0px");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const small = useMediaQuery("(max-width: 734px)");
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState(0);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const count = t.items.length;
  const running = inView && playing && !finished && !reduceMotion;

  const advance = useCallback(() => {
    setProgress(0);
    setIndex((current) => {
      if (current >= count - 1) {
        setFinished(true);
        return current;
      }
      return current + 1;
    });
  }, [count]);

  // Drive the active clip (or the timer for still slides).
  useEffect(() => {
    videos.current.forEach((node, i) => {
      if (node && i !== index) node.pause();
    });
    const node = videos.current[index];
    if (!running) {
      node?.pause();
      return;
    }
    if (node) {
      node.play().catch(() => setPlaying(false));
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const value = (now - start) / STILL_DURATION;
      setProgress(Math.min(value, 1));
      if (value >= 1) advance();
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [index, running, advance]);

  const goTo = (i: number) => {
    const node = videos.current[i];
    if (node) node.currentTime = 0;
    setProgress(0);
    setFinished(false);
    setPlaying(true);
    setIndex(i);
  };

  const toggle = () => {
    if (finished) {
      goTo(0);
      return;
    }
    setPlaying((value) => !value);
  };

  // Swipe between cards on touch screens.
  const touchStart = useRef<number | null>(null);
  const rtl = content.locale.dir === "rtl";

  return (
    <section ref={sectionRef} id="highlights" className={styles.section}>
      <Reveal className={cn(styles.header, "a-content")}>
        <h2 className="t-section-headline">{t.headline}</h2>
        <a
          className={styles.film}
          href="https://www.apple.com/105/media/us/iphone-18-pro/2026/591df885-5ee2-4173-86e6-401021249f7c/films/product/iphone-18-pro-product-tpl-us-2026_16x9.m3u8"
          target="_blank"
          rel="noreferrer"
        >
          {t.film}
          <PlayCircleIcon className={styles.filmIcon} />
        </a>
      </Reveal>

      <div
        className={styles.viewport}
        onTouchStart={(event) => (touchStart.current = event.touches[0].clientX)}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const delta = (event.changedTouches[0].clientX - touchStart.current) * (rtl ? -1 : 1);
          touchStart.current = null;
          if (delta < -40 && index < count - 1) goTo(index + 1);
          if (delta > 40 && index > 0) goTo(index - 1);
        }}
      >
        <ul className={styles.track} style={{ "--index": index } as React.CSSProperties}>
          {t.items.map((item, i) => {
            const asset = media.highlights[item.id];
            return (
              <li
                key={item.id}
                id={`highlights-gallery-item-${i + 1}`}
                className={cn(styles.item, i === index && styles.itemCurrent)}
                aria-hidden={i !== index}
              >
                <div className={styles.card}>
                  <Picture pic={asset.end} className={styles.media} />
                  {asset.video && !reduceMotion ? (
                    <video
                      key={small ? "s" : "l"}
                      ref={(node) => {
                        videos.current[i] = node;
                      }}
                      className={styles.media}
                      src={small ? asset.video.small : asset.video.large}
                      muted
                      playsInline
                      preload={i === 0 ? "auto" : "metadata"}
                      aria-hidden="true"
                      onTimeUpdate={(event) => {
                        if (i !== index) return;
                        const node = event.currentTarget;
                        if (node.duration) setProgress(node.currentTime / node.duration);
                      }}
                      onEnded={() => {
                        if (i === index) window.setTimeout(advance, 1200);
                      }}
                    />
                  ) : null}
                  <div className={styles.caption}>
                    <p className={styles.captionText}>
                      <Rich text={item.caption} />
                    </p>
                    {item.note ? (
                      <p className={styles.note}>
                        <Rich text={item.note} />
                      </p>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.controls}>
        <ul className={styles.dots}>
          {t.items.map((item, i) => (
            <li key={item.id}>
              <button
                type="button"
                className={cn(styles.dot, i === index && styles.dotCurrent)}
                onClick={() => goTo(i)}
                aria-label={item.label}
                aria-current={i === index ? "true" : undefined}
              >
                <span
                  className={styles.dotFill}
                  style={{ transform: `scaleX(${i < index || finished ? 1 : i === index ? progress : 0})` }}
                />
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={styles.play}
          onClick={toggle}
          aria-label={finished ? t.replay : playing ? t.pause : t.play}
        >
          {finished ? <ReplayIcon /> : playing && !reduceMotion ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>
    </section>
  );
}
