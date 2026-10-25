import { cn } from "@/lib/utils";
import type { PageContent } from "../content/en";
import { InlineVideo } from "../InlineVideo";
import { media } from "../media";
import { Picture } from "../Picture";
import { Reveal } from "../Reveal";
import { Rich } from "../Rich";
import story from "./Story.module.css";
import styles from "./Battery.module.css";

export function Battery({ content }: { content: PageContent }) {
  const t = content.battery;
  return (
    <section id="battery" className={cn(story.section, story.padTop, story.padBottom)} aria-labelledby="battery-headline">
      <Reveal className={cn(story.lockup, "a-content")}>
        <h2 className="t-lockup-eyebrow">{t.eyebrow}</h2>
        <p id="battery-headline" className={cn("t-lockup-headline", story.headline)}>
          <Rich text={t.headline} />
        </p>
      </Reveal>

      <InlineVideo video={media.battery.video} frame={media.battery.hero} alt={t.imageAlt} className={styles.phone} />

      <Reveal className={cn(story.narrow, story.statRow)}>
        <p className={story.psStat}>
          {t.stat.pre}
          <span className={cn("t-ps-stat-value", story.psStatValue)}>{t.stat.value}</span>
          <Rich text={t.stat.post} />
        </p>
        <p className={cn("t-intro", styles.body)}>
          <Rich text={t.body} />
        </p>
      </Reveal>

      <Reveal className={cn(styles.charge, "a-content")}>
        <Picture pic={media.battery.charge} className={styles.chargeIcon} />
        <h3 className={cn("t-headline-56", styles.chargeHeadline)}>
          <Rich text={t.charge.headline} />
        </h3>
        <div className={styles.chargeRow}>
          <p className={cn("t-intro", styles.body)}>
            <Rich text={t.charge.body} />
          </p>
          <p className={story.psStat}>
            {t.charge.stat.pre}
            <span className={cn("t-ps-stat-value", story.psStatValue)}>{t.charge.stat.value}</span>
            <Rich text={t.charge.stat.post} />
          </p>
        </div>
      </Reveal>
    </section>
  );
}
