"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CaptionTiles } from "../CaptionTiles";
import type { PageContent } from "../content/en";
import { ChevronIcon } from "../icons";
import { InlineVideo } from "../InlineVideo";
import { media } from "../media";
import { Picture } from "../Picture";
import { Reveal } from "../Reveal";
import { Rich } from "../Rich";
import story from "./Story.module.css";
import styles from "./Camera.module.css";

export function Camera({ content }: { content: PageContent }) {
  const t = content.camera;
  const [tab, setTab] = useState(t.aperture.tabs[0].id);
  const tabIndex = t.aperture.tabs.findIndex((entry) => entry.id === tab);
  const current = t.aperture.tabs[tabIndex];
  const move = (delta: number) => {
    const next = Math.min(Math.max(tabIndex + delta, 0), t.aperture.tabs.length - 1);
    setTab(t.aperture.tabs[next].id);
  };

  return (
    <section id="cameras" className={cn(story.section, styles.section)} aria-labelledby="cameras-headline">
      {/* apple.com pins the camera-system clip while the headline scrolls over it. */}
      <div className={styles.pin}>
        <div className={styles.pinMedia}>
          <InlineVideo video={media.camera.systemVideo} frame={media.camera.systemStart} alt={t.heroAlt} className={styles.hero} />
        </div>
        <Reveal className={cn(story.lockup, styles.lockup, "a-content")}>
          <h2 className="t-lockup-eyebrow">{t.eyebrow}</h2>
          <p id="cameras-headline" className={cn("t-lockup-headline", story.headline)}>
            {t.headline}
          </p>
        </Reveal>
      </div>

      <Reveal className={cn(story.narrow, story.intro, styles.intro)}>
        <p className={cn("t-intro", styles.introText)}>
          <Rich text={t.intro} />
        </p>
      </Reveal>

      <Reveal className={cn(story.narrow, story.statRow)}>
        <div>
          {t.stats.map((stat) => (
            <p key={stat.value} className={story.psStat}>
              {stat.pre}
              <span className={cn("t-ps-stat-value", story.psStatValue)}>{stat.value}</span>
              {stat.post}
            </p>
          ))}
        </div>
        <div>
          {t.specs.map((spec) => (
            <div key={spec.title} className={story.spec}>
              <p className={story.specTitle}>{spec.title}</p>
              <ul className={story.specLines}>
                {spec.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      <div className={styles.aperture}>
        <Reveal className={cn(story.narrow, styles.apertureCopy)}>
          <h2 className={cn("t-headline-56", story.subHeadline)}>
            <Rich text={t.aperture.headline} />
          </h2>
          <p className={cn("t-intro", styles.apertureBody)}>
            <Rich text={t.aperture.body} />
          </p>
        </Reveal>

        <div className={styles.apertureMedia}>
          {t.aperture.tabs.map((entry) => (
            <Picture
              key={entry.id}
              pic={media.camera.aperture[entry.id]}
              className={cn(styles.aperturePic, entry.id === tab && styles.aperturePicActive)}
            />
          ))}
        </div>

        <div className={styles.tabnavWrap}>
          <button type="button" className={styles.tabPaddle} onClick={() => move(-1)} disabled={tabIndex === 0} aria-label={t.aperture.previous}>
            <ChevronIcon className="i-prev" />
          </button>
          <ul className={styles.tabnav} role="tablist">
            {t.aperture.tabs.map((entry) => (
              <li key={entry.id}>
                <button
                  type="button"
                  role="tab"
                  id={`pro-camera-aperture-tab-${entry.id}`}
                  aria-selected={entry.id === tab}
                  aria-label={entry.aria}
                  className={cn(styles.tab, entry.id === tab && styles.tabActive)}
                  onClick={() => setTab(entry.id)}
                >
                  <span className="a-ltr">{entry.label}</span>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={styles.tabPaddle}
            onClick={() => move(1)}
            disabled={tabIndex === t.aperture.tabs.length - 1}
            aria-label={t.aperture.next}
          >
            <ChevronIcon className="i-next" />
          </button>
        </div>

        <p className={styles.apertureCaption} aria-live="polite">
          <strong className={styles.apertureCaptionLabel}>
            <span className="a-ltr">{current.label}</span> {current.title}
          </strong>{" "}
          <Rich text={current.body} />
        </p>
      </div>

      <div className={styles.gallery}>
        <h2 className={cn("t-section-headline", story.galleryHeader, "a-content")}>{t.gallery.headline}</h2>
        <CaptionTiles
          content={content}
          label={t.gallery.label}
          items={t.gallery.items}
          pics={media.camera.gallery}
          videos={media.camera.galleryVideos}
          videoLabels={{ zoom: content.media.zoomVideo }}
        />
      </div>
    </section>
  );
}
