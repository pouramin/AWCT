"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { PageContent } from "./content/en";
import footerData from "./data/footer.en.json";
import { AppleLogo } from "./icons";
import { OPEN_LOCALE_BANNER } from "./LocaleBanner";
import styles from "./Footer.module.css";

/**
 * apple.com global footer: legal footnotes, breadcrumbs, the directory (accordions on
 * phones), and the legal bar with the region link — which reopens the language picker.
 */
export function Footer({ content }: { content: PageContent }) {
  const t = content.footer;
  const label = (text: string) => t.labels[text] || text;
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <footer className={styles.footer} data-nav-theme="light">
      <div className={styles.content}>
        <section className={styles.footnotes} lang={t.footnoteLang} dir="ltr" aria-label="Footnotes">
          {footerData.footnotes.map((note, index) => (
            <p
              key={note.id ?? index}
              id={note.id ?? undefined}
              className={styles.footnote}
              // Footnote markup is our own extraction of apple.com's footer (links + sup only).
              dangerouslySetInnerHTML={{ __html: note.number ? `${note.number}. ${note.html}` : note.html }}
            />
          ))}
        </section>

        <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
          <ol>
            {t.breadcrumbs.map((crumb, index) => (
              <li key={crumb}>
                {index === 0 ? (
                  <a href={t.breadcrumbHrefs[index]} aria-label={crumb}>
                    <AppleLogo className={styles.crumbLogo} />
                  </a>
                ) : index < t.breadcrumbs.length - 1 ? (
                  <a href={t.breadcrumbHrefs[index]}>{crumb}</a>
                ) : (
                  <span aria-current="page">{crumb}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <nav className={styles.directory} aria-label="Apple Directory">
          {footerData.columns.map((column, columnIndex) => (
            <div key={columnIndex} className={styles.column}>
              {column.map((section) => {
                const open = openSection === section.title;
                return (
                  <div key={section.title} className={cn(styles.section, open && styles.sectionOpen)}>
                    <h3 className={styles.sectionTitle}>
                      <button
                        type="button"
                        className={styles.sectionToggle}
                        aria-expanded={open}
                        onClick={() => setOpenSection(open ? null : section.title)}
                      >
                        {label(section.title)}
                      </button>
                      <span className={styles.sectionLabel}>{label(section.title)}</span>
                    </h3>
                    <ul className={styles.sectionList}>
                      {section.links.map((link) => (
                        <li key={link.href + link.label}>
                          <a href={link.href}>{label(link.label)}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          ))}
        </nav>

        <section className={styles.legal}>
          <p
            className={styles.shop}
            dangerouslySetInnerHTML={{ __html: t.shop || footerData.legal.shop }}
          />
          <div className={styles.legalRow}>
            <p className={styles.copyright}>{t.copyright || footerData.legal.copyright}</p>
            <ul className={styles.legalLinks}>
              {(t.legalLinks.length ? t.legalLinks : footerData.legal.links).map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={styles.locale}
              onClick={() => window.dispatchEvent(new Event(OPEN_LOCALE_BANNER))}
              aria-label={t.regionLabel}
            >
              {content.locale.regionName}
            </button>
          </div>
        </section>
      </div>
    </footer>
  );
}
