import { cn } from "@/lib/utils";
import { CaptionTiles } from "../CaptionTiles";
import type { PageContent } from "../content/en";
import { media } from "../media";
import { Picture } from "../Picture";
import { Reveal } from "../Reveal";
import { Rich } from "../Rich";
import story from "./Story.module.css";
import styles from "./Family.module.css";

/** "All in the family" intro plus the Siri AI, Apple Intelligence and Connectivity galleries. */
export function Family({ content }: { content: PageContent }) {
  const { family, siri, intelligence, connectivity } = content;
  return (
    <div className={styles.family}>
      <section id="shared-features" className={styles.intro} aria-labelledby="family-headline">
        <Reveal className={cn(story.lockup, "a-content")}>
          <h2 className="t-lockup-eyebrow">{family.eyebrow}</h2>
          <p id="family-headline" className={cn("t-lockup-headline", story.headline)}>
            <Rich text={family.headline} />
          </p>
        </Reveal>
        <Picture pic={media.family.hero} alt={family.imageAlt} className={styles.hero} />
        <Reveal className={cn(story.narrow, story.intro)}>
          <p className={cn("t-intro", styles.body)}>
            <Rich text={family.body} />
          </p>
        </Reveal>
      </section>

      <section className={styles.block} aria-labelledby="siri-headline">
        <Reveal className={cn(styles.header, "a-content")}>
          <h2 id="siri-headline" className="t-section-headline">
            <Rich text={siri.headline} />
          </h2>
          <div className={styles.headerAside}>
            {siri.notes.map((note) => (
              <p key={note} className={styles.note}>
                {note}
              </p>
            ))}
            <a className={cn(styles.cta, "a-link-chevron")} href={siri.ctaHref}>
              {siri.cta}
            </a>
          </div>
        </Reveal>
        <CaptionTiles content={content} label={siri.label} items={siri.items} pics={media.family.siri} />
      </section>

      <section className={styles.block} aria-labelledby="intelligence-headline">
        <Reveal className={cn(styles.header, styles.headerRow, "a-content")}>
          <h2 id="intelligence-headline" className="t-section-headline">
            <Rich text={intelligence.headline} />
          </h2>
          <a className={cn(styles.cta, "a-link-chevron")} href={intelligence.ctaHref}>
            {intelligence.cta}
          </a>
        </Reveal>
        <CaptionTiles content={content} label={intelligence.label} items={intelligence.items} pics={media.family.intelligence} />
      </section>

      <section className={cn(styles.block, styles.last)} aria-labelledby="connectivity-headline">
        <Reveal className={cn(styles.header, "a-content")}>
          <h2 id="connectivity-headline" className="t-section-headline">
            <Rich text={connectivity.headline} />
          </h2>
        </Reveal>
        <CaptionTiles content={content} label={connectivity.label} items={connectivity.items} pics={media.family.connectivity} />
      </section>
    </div>
  );
}
