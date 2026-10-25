import { cn } from "@/lib/utils";
import type { PageContent } from "../content/en";
import styles from "./IphoneIndex.module.css";

/** The "iPhone" directory block that closes the page above the footer. */
export function IphoneIndex({ content }: { content: PageContent }) {
  const t = content.index;
  return (
    <section className={styles.section} data-nav-theme="light" aria-labelledby="iphone-index-title">
      <div className="a-content">
        <h2 id="iphone-index-title" className={cn("t-section-headline", styles.title)}>
          {t.headline}
        </h2>
        <div className={styles.columns}>
          {t.columns.map((column) => (
            <div key={column.title} className={styles.column}>
              <h3 className={styles.columnTitle}>{column.title}</h3>
              <ul className={cn(styles.list, column.elevated && styles.elevated)}>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
              {column.extra.length > 0 ? (
                <ul className={cn(styles.list, styles.extra)}>
                  {column.extra.map((link) => (
                    <li key={link.href}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
