"use client";

import { useState, useSyncExternalStore } from "react";
import type { PageContent } from "./content/en";
import { CheckIcon, CloseIcon, SelectChevron } from "./icons";
import styles from "./LocaleBanner.module.css";

const DISMISSED_KEY = "aapl-clone-locale-banner";
const CHANGE_EVENT = "aapl:locale-banner-change";
export const OPEN_LOCALE_BANNER = "aapl:open-locale-banner";

function readDismissed() {
  try {
    return window.localStorage.getItem(DISMISSED_KEY) === "1";
  } catch {
    return false; // Storage unavailable (private mode): keep the banner visible.
  }
}

function writeDismissed(value: boolean) {
  try {
    window.localStorage.setItem(DISMISSED_KEY, value ? "1" : "0");
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  const reopen = () => {
    writeDismissed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener(OPEN_LOCALE_BANNER, reopen);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener(OPEN_LOCALE_BANNER, reopen);
  };
}

/**
 * apple.com's "choose your country or region" bar (ac-localeswitcher).
 * In the clone it switches between the English (LTR) and Persian (RTL) routes.
 */
export function LocaleBanner({ content }: { content: PageContent }) {
  const t = content.localeBanner;
  const current = content.locale.code;
  const dismissed = useSyncExternalStore(subscribe, readDismissed, () => false);
  const [choice, setChoice] = useState(() => t.options.find((option) => option.code !== current)?.code ?? current);
  const open = !dismissed;
  const dismiss = () => writeDismissed(true);

  if (!open) return null;
  const selected = t.options.find((option) => option.code === choice) ?? t.options[0];

  return (
    <div className={styles.banner} role="region" aria-label={t.label}>
      <div className={styles.content}>
        <p className={styles.copy}>{t.copy}</p>
        <div className={styles.controls}>
          <label className={styles.select}>
            <CheckIcon className={styles.check} />
            <span className={styles.selectLabel} lang={selected.code}>
              {selected.label}
            </span>
            <SelectChevron className={styles.chevron} />
            <select value={choice} onChange={(event) => setChoice(event.target.value)} aria-label={t.label}>
              {t.options.map((option) => (
                <option key={option.code} value={option.code} lang={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <a
            className={styles.continue}
            href={selected.path}
            onClick={(event) => {
              if (selected.code === current) {
                event.preventDefault();
                dismiss();
              }
            }}
          >
            {t.continue}
          </a>
        </div>
        <button type="button" className={styles.close} onClick={dismiss} aria-label={t.close}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
