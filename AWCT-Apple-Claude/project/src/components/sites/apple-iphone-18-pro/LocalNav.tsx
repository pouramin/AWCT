"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { PageContent } from "./content/en";
import { useEscape } from "./hooks";
import { ChevronIcon, CloseIcon } from "./icons";
import { media } from "./media";
import { Picture } from "./Picture";
import { Rich } from "./Rich";
import styles from "./LocalNav.module.css";

/** Probe line (px from the viewport top) used to decide which section sits under the nav. */
const PROBE = 40;

/**
 * The floating "iPhone 18 Pro / Explore / Buy" pill. It appears once the hero scrolls
 * away, turns light over light sections, and expands into the Explore panel.
 */
export function LocalNav({ content }: { content: PageContent }) {
  const t = content.localNav;
  const [visible, setVisible] = useState(false);
  const [light, setLight] = useState(false);
  const [open, setOpen] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(true);
  const [current, setCurrent] = useState<string>("highlights");
  const strip = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > 260);
      const lightSections = document.querySelectorAll<HTMLElement>("[data-nav-theme='light']");
      setLight(
        Array.from(lightSections).some((node) => {
          const rect = node.getBoundingClientRect();
          return rect.top <= PROBE && rect.bottom >= PROBE;
        }),
      );
      let active = t.tabs[0].id;
      for (const tab of t.tabs) {
        const section = document.getElementById(tab.id);
        if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.4) active = tab.id;
      }
      setCurrent(active);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [t.tabs]);

  const close = useCallback(() => setOpen(false), []);
  useEscape(open, close);

  const updateEdges = () => {
    const node = strip.current;
    if (!node) return;
    const scrolled = Math.abs(node.scrollLeft);
    setEdges({ start: scrolled < 4, end: scrolled + node.clientWidth >= node.scrollWidth - 4 });
  };

  const page = (direction: 1 | -1) => {
    const node = strip.current;
    if (!node) return;
    const rtl = getComputedStyle(node).direction === "rtl";
    node.scrollBy({ left: direction * (rtl ? -1 : 1) * node.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <>
      <div className={cn(styles.backdrop, open && styles.backdropOpen)} onClick={close} aria-hidden="true" />
      <div className={cn(styles.container, visible && styles.visible, light && !open && styles.light)}>
        <div className={cn(styles.wrap, open && styles.wrapOpen)}>
          {open ? (
            <div className={styles.panel}>
              <div className={styles.stripWrap}>
                <button
                  type="button"
                  className={cn(styles.paddle, styles.paddleStart, edges.start && styles.paddleHidden)}
                  onClick={() => page(-1)}
                  aria-label={t.previous}
                >
                  <ChevronIcon className="i-prev" />
                </button>
                <ul className={styles.strip} ref={strip} onScroll={updateEdges}>
                  {t.products.map((product) => (
                    <li key={product.id}>
                      <a className={styles.product} href={product.href}>
                        <Picture pic={media.localNav[product.id]} className={styles.productImage} />
                        <span className={styles.productName}>{product.label}</span>
                        {product.badge ? (
                          <span className={cn(styles.badge, product.id === "iphone-18-pro" ? styles.badgeCurrent : styles.badgeNew)}>
                            {product.badge}
                          </span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={cn(styles.paddle, styles.paddleEnd, edges.end && styles.paddleHidden)}
                  onClick={() => page(1)}
                  aria-label={t.next}
                >
                  <ChevronIcon className="i-next" />
                </button>
              </div>

              <div className={styles.panelHeader}>
                <p className={styles.panelTitle}>{t.title}</p>
                <p className={styles.panelPrice}>
                  <Rich text={t.price} />
                </p>
                <a className={styles.panelBuy} href={content.buyHref}>
                  {t.buy}
                </a>
              </div>

              <div className={styles.sections}>
                <button
                  type="button"
                  className={styles.overview}
                  aria-expanded={overviewOpen}
                  onClick={() => setOverviewOpen((value) => !value)}
                >
                  {t.overview}
                  <ChevronIcon className={cn(styles.overviewChevron, overviewOpen ? "i-up" : "i-down")} />
                </button>
                {overviewOpen ? (
                  <ul className={styles.tabs}>
                    {t.tabs.map((tab) => (
                      <li key={tab.id}>
                        <a
                          className={cn(styles.tab, current === tab.id && styles.tabCurrent)}
                          href={`#${tab.id}`}
                          aria-current={current === tab.id ? "true" : undefined}
                          onClick={close}
                        >
                          {tab.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <ul className={styles.links}>
                  {t.links.map((link) => (
                    <li key={link.href}>
                      <a className={cn(styles.optionLink, "a-link-chevron")} href={link.href}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}

          <div className={styles.bar}>
            <a className={cn(styles.title, open && styles.titleHidden)} href={content.locale.path}>
              {t.title}
            </a>
            <div className={styles.actions}>
              {!open ? (
                <>
                  <button type="button" className={styles.explore} onClick={() => setOpen(true)} aria-expanded={open}>
                    {t.explore}
                  </button>
                  <a className={styles.buy} href={content.buyHref}>
                    {t.buy}
                  </a>
                </>
              ) : (
                <button type="button" className={styles.close} onClick={close} aria-label={t.close}>
                  <CloseIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
