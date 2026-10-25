"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { PageContent } from "../content/en";
import { Gallery, GalleryItem } from "../Gallery";
import { PlusPlainIcon } from "../icons";
import { media } from "../media";
import { Modal } from "../Modal";
import { Picture } from "../Picture";
import { Reveal } from "../Reveal";
import { Rich } from "../Rich";
import light from "./Light.module.css";
import styles from "./Values.module.css";

/** "iPhone 18 Pro and the environment." icon cards (with modals) and "Our values lead the way." */
export function Values({ content }: { content: PageContent }) {
  const env = content.environment;
  const values = content.values;
  const [openId, setOpenId] = useState<string | null>(null);
  const card = env.cards.find((entry) => entry.id === openId);

  return (
    <div className={styles.zone} data-nav-theme="light">
      <section aria-labelledby="environment-headline">
        <Reveal className={cn(light.header, styles.header, "a-content")}>
          <div>
            <h2 id="environment-headline" className="t-section-headline">
              {env.headline}
            </h2>
            <a className={cn(light.link, styles.pdf, "a-link-chevron")} href={env.ctaHref} target="_blank" rel="noreferrer">
              {env.cta}
              <span className="a-sr">{env.newTab}</span>
            </a>
          </div>
        </Reveal>
        <Gallery label={env.label} previous={content.media.previous} next={content.media.next} theme="light">
          {env.cards.map((entry) => (
            <GalleryItem key={entry.id}>
              <div className={cn(styles.card, styles.envCard)} style={{ "--accent": entry.accent } as React.CSSProperties}>
                <Picture pic={media.environment[entry.id]} className={styles.icon} />
                <h3 className={cn("t-card-headline", styles.headline)}>
                  <Rich text={entry.headline} />
                </h3>
                <button type="button" className={styles.control} onClick={() => setOpenId(entry.id)} aria-label={entry.control}>
                  <PlusPlainIcon />
                </button>
              </div>
            </GalleryItem>
          ))}
        </Gallery>
      </section>

      <section className={styles.values} aria-labelledby="values-headline">
        <Reveal className={cn(light.header, "a-content")}>
          <h2 id="values-headline" className="t-section-headline">
            {values.headline}
          </h2>
        </Reveal>
        <Gallery label={values.label} previous={content.media.previous} next={content.media.next} theme="light">
          {values.cards.map((entry) => (
            <GalleryItem key={entry.id}>
              <a className={styles.card} href={entry.href}>
                <Picture pic={media.values[entry.id]} className={styles.icon} />
                <h3 className={cn("t-card-headline", styles.headline)}>{entry.headline}</h3>
                <p className={styles.body}>{entry.body}</p>
                <span className={cn(styles.cardLink, "a-link-chevron")}>{entry.cta}</span>
              </a>
            </GalleryItem>
          ))}
        </Gallery>
      </section>

      <Modal open={Boolean(card)} onClose={() => setOpenId(null)} closeLabel={env.close} labelledBy="environment-modal-title">
        {card ? (
          <div>
            <h2 id="environment-modal-title" className={styles.modalTitle}>
              {card.modalTitle}
            </h2>
            <div className={styles.modalBlock}>
              <p className={styles.modalLead}>{env.approach}</p>
              <p>{card.approach}</p>
              <a className={cn(light.link, "a-link-chevron")} href={env.ctaHref} target="_blank" rel="noreferrer">
                {env.cta}
              </a>
            </div>
            <div className={styles.modalBlock}>
              <p className={styles.modalLead}>{env.help}</p>
              <p>{card.help}</p>
              <a className={cn(light.link, "a-link-chevron")} href={card.helpHref}>
                {card.helpCta}
              </a>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
