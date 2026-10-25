import type { PageContent } from "./content/en";
import { Gallery, GalleryItem } from "./Gallery";
import { InlineVideo } from "./InlineVideo";
import type { Pic, Video } from "./media";
import { Picture } from "./Picture";
import { Rich } from "./Rich";
import styles from "./CaptionTiles.module.css";

export type CaptionTile = { id: string; title: string; body: string; note?: string; cta?: string; href?: string };

type CaptionTilesProps = {
  content: PageContent;
  label: string;
  items: CaptionTile[];
  pics: Record<string, Pic>;
  videos?: Record<string, Video>;
  videoLabels?: Record<string, string>;
};

/** Gallery of image tiles with "**Title.** body" captions underneath (apple.com caption-tile). */
export function CaptionTiles({ content, label, items, pics, videos = {}, videoLabels = {} }: CaptionTilesProps) {
  const m = content.media;
  return (
    <Gallery label={label} previous={m.previous} next={m.next}>
      {items.map((item) => {
        const pic = pics[item.id];
        const video = videos[item.id];
        return (
          <GalleryItem key={item.id} wide={pic.width > 1000}>
            <div className={styles.media}>
              {video ? (
                <InlineVideo
                  video={video}
                  frame={pic}
                  className={styles.fill}
                  control={{
                    play: `${m.play} ${videoLabels[item.id] ?? ""}`.trim(),
                    pause: `${m.pause} ${videoLabels[item.id] ?? ""}`.trim(),
                    replay: `${m.replay} ${videoLabels[item.id] ?? ""}`.trim(),
                  }}
                />
              ) : (
                <Picture pic={pic} className={styles.fill} />
              )}
            </div>
            <p className={styles.caption}>
              <strong>{item.title}</strong> <Rich text={item.body} />
            </p>
            {item.cta && item.href ? (
              <a className={`${styles.cta} a-link-chevron`} href={item.href}>
                {item.cta}
              </a>
            ) : null}
            {item.note ? <p className={styles.note}>{item.note}</p> : null}
          </GalleryItem>
        );
      })}
    </Gallery>
  );
}
