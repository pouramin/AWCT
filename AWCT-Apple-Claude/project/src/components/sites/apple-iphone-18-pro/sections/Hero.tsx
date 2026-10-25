import type { PageContent } from "../content/en";
import { InlineVideo } from "../InlineVideo";
import { media } from "../media";
import { Rich } from "../Rich";
import styles from "./Hero.module.css";

export function Hero({ content }: { content: PageContent }) {
  const t = content.hero;
  return (
    <section className={styles.hero} aria-labelledby="hero-eyebrow">
      <InlineVideo video={media.hero.video} frame={media.hero.end} className={styles.media} priority />
      <div className={styles.copy}>
        <div className={styles.headline}>
          <h1 id="hero-eyebrow" className="t-eyebrow-super">
            {t.eyebrow}
          </h1>
          <p className="t-hero-headline">{t.headline}</p>
        </div>
        <div className={styles.pricing}>
          <ul className={styles.priceList}>
            <li>
              <Rich text={t.price} />
            </li>
            <li>
              <Rich text={t.lease} />
            </li>
          </ul>
          <a className="a-button" href={content.buyHref} aria-label={t.buyLabel}>
            {t.buy}
          </a>
        </div>
      </div>
    </section>
  );
}
