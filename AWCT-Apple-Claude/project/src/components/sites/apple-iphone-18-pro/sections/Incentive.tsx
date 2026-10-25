"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { PageContent } from "../content/en";
import { Gallery, GalleryItem } from "../Gallery";
import { useIsAndroid } from "../hooks";
import { ChevronIcon, PlusPlainIcon } from "../icons";
import { media } from "../media";
import { Modal } from "../Modal";
import { Picture } from "../Picture";
import { Reveal } from "../Reveal";
import { Rich } from "../Rich";
import light from "./Light.module.css";
import styles from "./Incentive.module.css";

/** "Why Apple is the best place to shop iPhone." feature cards; some open a modal. */
export function Incentive({ content }: { content: PageContent }) {
  const t = content.incentive;
  const android = useIsAndroid();
  const [openId, setOpenId] = useState<string | null>(null);
  const openCard = t.cards.find((card) => card.id === openId);

  return (
    <section className={cn(light.section, light.padTop)} data-nav-theme="light" aria-labelledby="incentive-headline">
      <Reveal className={cn(light.header, "a-content")}>
        <h2 id="incentive-headline" className="t-section-headline">
          <Rich text={t.headline} />
        </h2>
        <a className={cn(light.cta, "a-link-chevron")} href={t.ctaHref}>
          {t.cta}
        </a>
      </Reveal>

      <Gallery label={t.label} previous={content.media.previous} next={content.media.next} theme="light">
        {t.cards.map((card) => {
          const override = android ? t.android[card.id] : undefined;
          const pic = android && card.id === "trade-in" ? media.incentive["trade-in-android"] : media.incentive[card.id];
          const inner = (
            <>
              <h3 className={styles.label}>{card.label}</h3>
              <p className={cn("t-card-headline", styles.headline)}>
                <Rich text={override?.headline ?? card.headline} />
              </p>
              <p className={styles.body}>
                <Rich text={override?.body ?? card.body} />
              </p>
              <Picture pic={pic} alt={card.alt} className={styles.image} />
            </>
          );
          return (
            <GalleryItem key={card.id} className={styles.item}>
              <div className={styles.card}>
                {inner}
                {card.modal ? (
                  <button type="button" className={styles.control} onClick={() => setOpenId(card.id)} aria-label={card.control}>
                    <PlusPlainIcon />
                  </button>
                ) : (
                  <a className={styles.control} href={card.href} aria-label={card.control}>
                    <ChevronIcon className={cn(styles.chevron, "i-next")} />
                  </a>
                )}
              </div>
            </GalleryItem>
          );
        })}
      </Gallery>

      <Modal open={Boolean(openCard?.modal)} onClose={() => setOpenId(null)} closeLabel={t.close} labelledBy="incentive-modal-title">
        {openCard?.modal ? (
          <div className={styles.modal}>
            <h2 className={styles.modalTopic}>{openCard.label}</h2>
            <h3 id="incentive-modal-title" className={styles.modalHeadline}>
              {openCard.modal.headline}
            </h3>
            <p className={styles.modalBody}>
              <Rich text={openCard.modal.body} />
            </p>
            <a className={cn(light.link, "a-link-chevron")} href={openCard.modal.href}>
              {openCard.modal.cta}
            </a>
            {openCard.id === "store-app" ? <Picture pic={media.incentive.qr} className={styles.qr} /> : null}
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
