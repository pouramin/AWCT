"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { PageContent } from "../content/en";
import { Dropdown } from "../Dropdown";
import { useIsAndroid } from "../hooks";
import { media } from "../media";
import { Picture } from "../Picture";
import { Reveal } from "../Reveal";
import { Rich } from "../Rich";
import { Stat } from "../Stat";
import styles from "./MostWanted.module.css";

/** "Most wanted." — the inline compare: pick an older model, three stats update. */
export function MostWanted({ content }: { content: PageContent }) {
  const t = content.aio;
  const android = useIsAndroid();
  const [model, setModel] = useState(t.defaultOption);
  const alt = content.aioAndroid;

  const eyebrow = android ? alt.eyebrow : t.eyebrow;
  const body = android ? alt.body : t.body;
  const options = android ? [alt.option] : t.options;
  const stats = android ? alt.items : (t.stats.find((entry) => entry.value === model) ?? t.stats[0]).items;

  return (
    <section className={styles.section} aria-labelledby="aio-headline">
      <Reveal className={cn(styles.lockup, "a-content")}>
        <h2 className="t-lockup-eyebrow">{eyebrow}</h2>
        <p id="aio-headline" className={cn("t-lockup-headline", styles.headline)}>
          {t.headline}
        </p>
        <p className={cn("t-intro", styles.body)}>
          <Rich text={body} />
        </p>
      </Reveal>

      <Reveal className={cn(styles.compare, "a-content")}>
        <label className={styles.label} htmlFor="aio-compare-select">
          {t.compareLabel}
        </label>
        <Dropdown
          id="aio-compare-select"
          value={android ? alt.option.value : model}
          options={options}
          onChange={setModel}
          className={styles.dropdown}
        />
        <div className={styles.stats} aria-live="polite">
          {stats.map((stat) => (
            <Stat key={stat.post + stat.value} stat={stat} className={styles.stat} />
          ))}
        </div>
      </Reveal>

      <Picture pic={media.aioHero} alt={t.imageAlt} className={styles.image} />
    </section>
  );
}
