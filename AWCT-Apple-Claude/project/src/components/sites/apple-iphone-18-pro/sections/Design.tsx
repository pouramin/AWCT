"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { PageContent } from "../content/en";
import { ChevronIcon, CloseIcon, PlusIcon } from "../icons";
import { InlineVideo } from "../InlineVideo";
import { media } from "../media";
import { Picture } from "../Picture";
import { Reveal } from "../Reveal";
import { fill, Rich } from "../Rich";
import styles from "./Design.module.css";

const SWATCHES: Record<string, string> = {
  burgundy: "#2e0f14",
  glacier: "#a3b1c4",
  silver: "#c4c4c4",
  black: "#242424",
};

/**
 * "Take a closer look" product viewer: feature pills on the start side; opening one
 * expands it into a caption card and swaps the product image (colors swap finishes).
 */
export function Design({ content }: { content: PageContent }) {
  const t = content.design;
  const [active, setActive] = useState<string | null>(null);
  const [color, setColor] = useState(t.colors[0].id);
  const activeIndex = t.items.findIndex((item) => item.id === active);
  const colorLabel = t.colors.find((entry) => entry.id === color)?.label ?? "";

  const step = (delta: number) => {
    const next = (activeIndex + delta + t.items.length) % t.items.length;
    setActive(t.items[next].id);
  };

  const imageKey = active === null ? "overview" : active === "colors" ? color : active;
  const video = active ? media.designVideos[active] : undefined;

  return (
    <section id="design" className={styles.section} aria-labelledby="design-headline">
      <Reveal className={cn(styles.header, "a-content")}>
        <h2 className="t-lockup-eyebrow">{t.eyebrow}</h2>
        <p id="design-headline" className={cn("t-lockup-headline", styles.headline)}>
          <Rich text={t.headline} />
        </p>
      </Reveal>

      <div className={styles.viewer}>
        <div className={styles.stage} aria-live="polite">
          {video ? (
            <InlineVideo key={imageKey} video={video} frame={media.design[imageKey]} className={styles.stageMedia} active />
          ) : (
            <Picture key={imageKey} pic={media.design[imageKey]} className={cn(styles.stageMedia, styles.fade)} />
          )}
        </div>

        {active !== null ? (
          <>
            <button type="button" className={styles.close} onClick={() => setActive(null)} aria-label={t.close}>
              <CloseIcon />
            </button>
            <div className={styles.paddles}>
              <button type="button" className={styles.paddle} onClick={() => step(-1)} aria-label={t.previous}>
                <ChevronIcon className="i-up" />
              </button>
              <button type="button" className={styles.paddle} onClick={() => step(1)} aria-label={t.next}>
                <ChevronIcon className="i-down" />
              </button>
            </div>
          </>
        ) : null}

        <ul className={styles.controls}>
          {t.items.map((item) => {
            const open = item.id === active;
            return (
              <li key={item.id} className={cn(styles.control, open && styles.controlOpen)}>
                {!open ? (
                  <button
                    type="button"
                    id={`product-viewer-item-${item.id}--button`}
                    className={styles.pill}
                    onClick={() => setActive(item.id)}
                    aria-expanded={false}
                  >
                    {item.id === "colors" ? (
                      <span className={styles.colorDot} style={{ background: SWATCHES[color] }} aria-hidden="true" />
                    ) : (
                      <PlusIcon className={styles.plus} />
                    )}
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <div className={styles.card}>
                    <p className={styles.cardBody}>
                      <Rich text={fill(item.body, { color: colorLabel })} />
                    </p>
                    {item.id === "colors" ? (
                      <fieldset className={styles.swatches}>
                        <legend className="a-sr">{t.colorsLabel}</legend>
                        {t.colors.map((entry) => (
                          <label key={entry.id} className={styles.swatch}>
                            <input
                              type="radio"
                              name="design-color"
                              value={entry.id}
                              checked={color === entry.id}
                              onChange={() => setColor(entry.id)}
                            />
                            <span className={styles.swatchFill} style={{ background: SWATCHES[entry.id] }} />
                            <span className="a-sr">{entry.label}</span>
                          </label>
                        ))}
                      </fieldset>
                    ) : null}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
