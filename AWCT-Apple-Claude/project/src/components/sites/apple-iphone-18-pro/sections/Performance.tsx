import { cn } from "@/lib/utils";
import type { PageContent } from "../content/en";
import { InlineVideo } from "../InlineVideo";
import { media } from "../media";
import { Picture } from "../Picture";
import { Reveal } from "../Reveal";
import { Rich } from "../Rich";
import story from "./Story.module.css";
import styles from "./Performance.module.css";

export function Performance({ content }: { content: PageContent }) {
  const t = content.performance;
  const icons = { ai: media.performance.iconAi, a20: media.performance.iconA20 } as const;
  return (
    <section id="performance" className={cn(story.section, story.padBottom)} aria-labelledby="performance-headline">
      <InlineVideo video={media.performance.video} frame={media.performance.chip} className={styles.chip} />

      <Reveal className={cn(story.lockup, styles.lockup, "a-content")}>
        <h2 className="t-lockup-eyebrow">{t.eyebrow}</h2>
        <p id="performance-headline" className={cn("t-lockup-headline", story.headline)}>
          {t.headline}
        </p>
      </Reveal>

      <Reveal className={cn(story.narrow, story.intro)}>
        <p className={cn("t-intro", styles.body)}>
          <Rich text={t.body} />
        </p>
      </Reveal>

      <Reveal className={cn(story.narrow, styles.callouts)}>
        {t.callouts.map((callout) => (
          <div key={callout.id} className={styles.callout}>
            <Picture pic={icons[callout.id as keyof typeof icons]} className={styles.icon} />
            <h3 className={cn("t-callout", styles.calloutTitle)}>
              <Rich text={callout.title} />
            </h3>
            <p className={styles.calloutBody}>{callout.body}</p>
          </div>
        ))}
      </Reveal>

      <Reveal className={cn(story.lockup, styles.vaporHeadline, "a-content")}>
        <h2 className="t-headline-56">
          <Rich text={t.vapor.headline} />
        </h2>
      </Reveal>
      <Picture pic={media.performance.vapor} alt={t.vapor.imageAlt} className={styles.vapor} />
      <Reveal className={cn(story.narrow, story.intro)}>
        <p className={cn("t-intro", styles.body)}>
          <Rich text={t.vapor.body} />
        </p>
      </Reveal>
    </section>
  );
}
