import { cn } from "@/lib/utils";
import type { PageContent } from "../content/en";
import { media } from "../media";
import { Picture } from "../Picture";
import { Reveal } from "../Reveal";
import story from "./Story.module.css";
import styles from "./Accessories.module.css";

export function Accessories({ content }: { content: PageContent }) {
  const t = content.accessories;
  return (
    <section id="accessories" className={cn(story.section, story.padTop)} aria-labelledby="accessories-headline">
      <Reveal className={cn(story.lockup, "a-content")}>
        <h2 className="t-lockup-eyebrow">{t.eyebrow}</h2>
        <p id="accessories-headline" className={cn("t-lockup-headline", story.headline)}>
          {t.headline}
        </p>
      </Reveal>
      <Reveal className={cn(story.narrow, story.intro, styles.copy)}>
        <p className={cn("t-intro", styles.body)}>{t.body}</p>
        <a className={cn(styles.cta, "a-link-chevron")} href={t.href}>
          {t.cta}
        </a>
      </Reveal>
      <Picture pic={media.accessories} alt={t.imageAlt} className={styles.image} />
    </section>
  );
}
