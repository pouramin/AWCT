"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { PageContent } from "../content/en";
import { Dropdown } from "../Dropdown";
import { useIsAndroid } from "../hooks";
import { media } from "../media";
import { Picture } from "../Picture";
import { Reveal } from "../Reveal";
import { Rich } from "../Rich";
import styles from "./Upgrader.module.css";

/**
 * "Worth the upgrade? You bet." — pick your current iPhone and the six tiles update.
 * Android visitors get apple.com's "Worth switching" variant with switcher resources.
 */
export function Upgrader({ content }: { content: PageContent }) {
  const t = content.upgrader;
  const sw = content.switchAndroid;
  const android = useIsAndroid();
  const [model, setModel] = useState(t.defaultOption);
  const figures = t.tiles.find((tile) => tile.value === model) ?? t.tiles[0];

  return (
    <section id="upgrader" className={styles.section}>
      <div className={cn(styles.panel, "a-content")}>
        <Reveal className={styles.header}>
          <h2 className={cn("t-headline-56", styles.headline, android && styles.headlineWide)}>
            <Rich text={android ? sw.headline : t.headline} />
          </h2>
          {!android ? (
            <div className={styles.picker}>
              <label className={styles.label} htmlFor="upgrader-select">
                <Rich text={t.label} />
              </label>
              <Dropdown id="upgrader-select" value={model} options={t.options} onChange={setModel} />
            </div>
          ) : null}
        </Reveal>

        <p className={styles.subheadline}>
          <Rich text={t.subheadline} />
        </p>

        <ul className={styles.grid} aria-live="polite">
          <li className={cn(styles.tile, styles.tileMedia)}>
            <p className={styles.caption}>{t.camera}</p>
            <Picture pic={media.upgrader.camera} alt={t.cameraAlt} className={styles.tileImage} />
          </li>
          <li className={cn(styles.tile, styles.tileCenter)}>
            <Picture pic={media.upgrader.chip} alt={t.chipAlt} className={styles.chip} />
            {android ? (
              <p className={styles.caption}>{sw.chip}</p>
            ) : (
              <p className={styles.caption}>
                {t.upTo}
                <br />
                <span className={styles.captionStrong}>{figures.cpu}</span>
                <br />
                {t.cpuPost}
              </p>
            )}
          </li>
          <li className={cn(styles.tile, styles.tileCenter)}>
            <figure className={styles.stat}>
              <span className={styles.statLabel}>{t.upTo}</span>
              <span className={styles.statValue}>
                <Rich text={android ? sw.hours : figures.hours} />
              </span>
              <span className={styles.statLabel}>
                <Rich text={t.hoursPost} />
              </span>
            </figure>
          </li>
          <li className={cn(styles.tile, styles.tileCenter)}>
            <Picture pic={media.battery.charge} className={styles.bolt} />
            <figure className={styles.stat}>
              <span className={styles.statLabel}>{t.upTo}</span>
              <span className={styles.statValue}>{t.charge}</span>
              <span className={styles.statLabel}>{t.chargePost}</span>
            </figure>
          </li>
          <li className={cn(styles.tile, styles.tileMedia)}>
            <p className={styles.caption}>
              <Rich text={t.frontCamera} />
            </p>
            <Picture pic={media.upgrader.frontCamera} alt={t.frontCameraAlt} className={styles.tileImage} />
          </li>
          <li className={cn(styles.tile, styles.tileCenter)}>
            <Picture pic={media.upgrader.siri} className={styles.siri} />
            <p className={styles.caption}>
              <Rich text={t.siri} />
            </p>
          </li>
        </ul>

        {!android ? (
          <div className={styles.tradeIn}>
            <Picture pic={media.upgrader.tradeIn} alt={t.tradeInAlt} className={styles.tradeInLogo} />
            <p className={styles.tradeInBody}>{t.tradeIn}</p>
            <a className={cn(styles.link, "a-link-chevron")} href={t.tradeInHref}>
              {t.tradeInCta}
            </a>
          </div>
        ) : null}
      </div>

      {android ? (
        <>
          <ul className={cn(styles.values, "a-content")}>
            {sw.values.map((value) => (
              <li key={value.id} className={styles.value}>
                <Picture pic={media.androidValues[value.id]} className={styles.valueIcon} />
                <h3 className={cn("t-callout", styles.valueTitle)}>{value.title}</h3>
                <p className={styles.valueBody}>
                  <Rich text={value.body} />
                </p>
                <a className={cn(styles.link, "a-link-chevron")} href={value.href}>
                  {value.cta}
                </a>
              </li>
            ))}
          </ul>
          <a className={cn(styles.banner, "a-content")} href={sw.moveToIos.href}>
            <div className={styles.bannerCopy}>
              <h2 className={cn("t-card-headline", styles.bannerTitle)}>{sw.moveToIos.headline}</h2>
              <p className={styles.bannerBody}>{sw.moveToIos.body}</p>
              <span className={cn(styles.link, "a-link-chevron")}>{sw.moveToIos.cta}</span>
            </div>
            <Picture pic={media.moveToIos} alt={sw.moveToIos.imageAlt} className={styles.bannerImage} />
          </a>
        </>
      ) : null}
    </section>
  );
}
