"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/** True once the element has scrolled into view (sticks after the first time). */
export function useInView<T extends Element>(rootMargin = "0px 0px -15% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, rootMargin]);
  return [ref, inView] as const;
}

const subscribeNever = () => () => {};

/**
 * apple.com swaps several sections (comparison, upgrader, incentives) for an
 * Android-switcher variant when the visitor's user agent is Android.
 */
export function useIsAndroid() {
  return useSyncExternalStore(
    subscribeNever,
    () => /Android/i.test(navigator.userAgent),
    () => false,
  );
}

/** Matches a CSS media query; false during server render. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Closes something on Escape while `active`. */
export function useEscape(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onEscape();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, onEscape]);
}
