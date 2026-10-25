import { cn } from "@/lib/utils";
import { CaptionTiles } from "../CaptionTiles";
import type { PageContent } from "../content/en";
import { InlineVideo } from "../InlineVideo";
import { media } from "../media";
import { Reveal } from "../Reveal";
import { Rich } from "../Rich";
import story from "./Story.module.css";
import styles from "./ProVideo.module.css";

export function ProVideo({ content }: { content: PageContent }) {
  const t = content.video;
  return (
    <section id="pro-video" className={cn(story.section, story.padTop, styles.section)} aria-labelledby="pro-video-headline">
      <Reveal className={cn(story.lockup, "a-content")}>
        <h2 className="t-lockup-eyebrow">{t.eyebrow}</h2>
        <p id="pro-video-headline" className={cn("t-lockup-headline", story.headline)}>
          <Rich text={t.headline} />
        </p>
      </Reveal>

      <InlineVideo video={media.video.video} frame={media.video.end} className={styles.phone} />

      <Reveal className={cn(story.narrow, story.intro)}>
        <p className={cn("t-intro", styles.body)}>
          <Rich text={t.body} />
        </p>
      </Reveal>

      <div className={styles.gallery}>
        <h2 className={cn("t-section-headline", story.galleryHeader, "a-content")}>{t.gallery.headline}</h2>
        <CaptionTiles
          content={content}
          label={t.gallery.label}
          items={t.gallery.items}
          pics={media.video.gallery}
          videos={media.video.galleryVideos}
          videoLabels={{ timelapse: content.media.timelapseVideo }}
        />
      </div>
    </section>
  );
}
