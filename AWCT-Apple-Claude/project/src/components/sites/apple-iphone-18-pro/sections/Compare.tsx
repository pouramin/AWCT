import { cn } from "@/lib/utils";
import type { PageContent } from "../content/en";
import { ChevronIcon } from "../icons";
import { media } from "../media";
import { Picture } from "../Picture";
import { Reveal } from "../Reveal";
import { Rich } from "../Rich";
import light from "./Light.module.css";
import styles from "./Compare.module.css";

/** "Keep exploring iPhone." — side-by-side product tiles with aligned spec rows. */
export function Compare({ content }: { content: PageContent }) {
  const t = content.contrast;
  return (
    <section className={styles.section} data-nav-theme="light" aria-labelledby="contrast-headline">
      <Reveal className={cn(light.header, "a-content")}>
        <h2 id="contrast-headline" className="t-section-headline">
          {t.headline}
        </h2>
        <a className={cn(light.cta, "a-link-chevron")} href={t.ctaHref}>
          {t.cta}
        </a>
      </Reveal>

      <div className={cn(styles.panel, "a-content")}>
        <ul className={styles.tiles}>
          {t.products.map((product) => (
            <li key={product.id} className={styles.tile}>
              {product.current ? (
                <Picture pic={media.contrast[product.id]} alt={product.name} className={styles.image} />
              ) : (
                <a href={product.href} className={styles.imageLink}>
                  <Picture pic={media.contrast[product.id]} alt={product.name} className={styles.image} />
                </a>
              )}
              <ul className={styles.swatches}>
                {product.colors.map((swatch) => (
                  <li key={swatch.label} className={styles.swatch} style={{ background: swatch.color }}>
                    <span className="a-sr">{swatch.label}</span>
                  </li>
                ))}
                <li className="a-sr">{t.more}</li>
              </ul>
              <p className={styles.badge}>{t.newBadge}</p>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.positioning}>{product.positioning}</p>
              <p className={styles.price}>
                <Rich text={product.price} />
                <br />
                <Rich text={product.lease} />
              </p>
              <div className={styles.actions}>
                {product.current ? (
                  <p className={styles.viewing}>{t.currentlyViewing}</p>
                ) : (
                  <a className="a-button" href={product.href}>
                    {t.learnMore}
                  </a>
                )}
                <a className={cn(light.link, "a-link-chevron")} href={product.buyHref}>
                  {t.buy}
                </a>
              </div>
            </li>
          ))}
        </ul>

        {/* Spec rows are laid out row by row so both products stay aligned. */}
        <div className={styles.rows}>
          <div className={styles.row}>
            {t.products.map((product) => (
              <p key={product.id} className={styles.display}>
                {product.display}
              </p>
            ))}
          </div>
          {t.products[0].specs.map((_, index) => (
            <div key={index} className={styles.row}>
              {t.products.map((product) => {
                const spec = product.specs[index];
                return (
                  <div key={product.id} className={styles.spec}>
                    {spec.icon ? <Picture pic={media.contrast[spec.icon]} className={styles.icon} /> : <span className={styles.iconSpacer} />}
                    <ul className={styles.lines}>
                      {spec.lines.map((line, lineIndex) => (
                        <li key={lineIndex} className={line === "—" ? styles.dash : undefined}>
                          <Rich text={line} />
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className={styles.compareWrap}>
          <a className={styles.compare} href={t.compareHref}>
            {t.compare}
            <span className={styles.compareIcon}>
              <ChevronIcon className="i-next" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
