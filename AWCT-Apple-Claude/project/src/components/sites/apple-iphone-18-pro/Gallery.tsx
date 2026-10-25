"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ChevronIcon } from "./icons";
import styles from "./Gallery.module.css";

type GalleryProps = {
  label: string;
  previous: string;
  next: string;
  children: ReactNode;
  className?: string;
  /** Light sections use dark paddles. */
  theme?: "dark" | "light";
};

/**
 * apple.com horizontal gallery: cards start on the content column, bleed to the
 * viewport edge, snap per card, and page with the two round paddles underneath.
 */
export function Gallery({ label, previous, next, children, className, theme = "dark" }: GalleryProps) {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const node = track.current;
    if (!node) return;
    const scrolled = Math.abs(node.scrollLeft);
    setEdges({ start: scrolled < 4, end: scrolled + node.clientWidth >= node.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const page = (direction: 1 | -1) => {
    const node = track.current;
    if (!node) return;
    const first = node.querySelector<HTMLElement>(":scope > li");
    const step = first ? first.getBoundingClientRect().width + 20 : node.clientWidth * 0.8;
    const rtl = getComputedStyle(node).direction === "rtl";
    node.scrollBy({ left: direction * (rtl ? -1 : 1) * step, behavior: "smooth" });
  };

  return (
    <div className={cn(styles.gallery, theme === "light" && styles.light, className)} role="group" aria-label={label}>
      <ul ref={track} className={styles.track} onScroll={update}>
        {children}
      </ul>
      <ul className={styles.paddles}>
        <li>
          <button type="button" className={styles.paddle} onClick={() => page(-1)} disabled={edges.start} aria-label={`${previous}, ${label}`}>
            <ChevronIcon className="i-prev" />
          </button>
        </li>
        <li>
          <button type="button" className={styles.paddle} onClick={() => page(1)} disabled={edges.end} aria-label={`${next}, ${label}`}>
            <ChevronIcon className="i-next" />
          </button>
        </li>
      </ul>
    </div>
  );
}

export function GalleryItem({ children, className, wide = false }: { children: ReactNode; className?: string; wide?: boolean }) {
  return <li className={cn(styles.item, wide && styles.wide, className)}>{children}</li>;
}
