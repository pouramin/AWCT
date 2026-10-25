import type { PageContent } from "./content/en";
import { Rich } from "./Rich";
import styles from "./Ribbon.module.css";

export function Ribbon({ content }: { content: PageContent }) {
  const t = content.ribbon;
  return (
    <div className={styles.ribbon}>
      <p className={styles.content}>
        <Rich text={t.text} />{" "}
        <a className={`${styles.link} a-link-chevron`} href={t.href}>
          {t.link}
        </a>
      </p>
    </div>
  );
}
