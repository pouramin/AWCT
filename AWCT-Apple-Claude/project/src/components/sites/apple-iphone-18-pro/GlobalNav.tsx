"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { PageContent } from "./content/en";
import navData from "./data/global-nav.en.json";
import { useEscape, useMediaQuery } from "./hooks";
import { AppleLogo, BackIcon, BagIcon, ChevronIcon, MenuIcon, SearchIcon } from "./icons";
import styles from "./GlobalNav.module.css";

type NavItem = (typeof navData.items)[number];
type Panel = { kind: "item"; id: string } | { kind: "search" } | null;

const OPEN_DELAY = 150;

/**
 * apple.com global header: hover flyouts on desktop (≥834px), full-screen menu with
 * sliding submenus on compact widths. Menu data comes from Apple's flyout API.
 */
export function GlobalNav({ content }: { content: PageContent }) {
  const t = content.globalNav;
  const label = (text: string) => t.labels[text] || text;
  const compact = useMediaQuery("(max-width: 833px)");
  const [panel, setPanel] = useState<Panel>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenu, setSubmenu] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const close = useCallback(() => {
    window.clearTimeout(timer.current);
    setPanel(null);
    setMenuOpen(false);
    setSubmenu(null);
  }, []);
  useEscape(panel !== null || menuOpen, close);

  // The full-screen menu only exists in compact mode; widening the window hides it.
  const menuVisible = compact && menuOpen;

  useEffect(() => {
    document.documentElement.classList.toggle("a-scroll-lock", menuVisible);
  }, [menuVisible]);

  const hoverOpen = (id: string) => {
    if (compact) return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPanel({ kind: "item", id }), panel ? 0 : OPEN_DELAY);
  };
  const hoverClose = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPanel(null), OPEN_DELAY);
  };

  const activeItem = panel?.kind === "item" ? navData.items.find((item) => item.id === panel.id) : undefined;
  const flyoutOpen = panel !== null && (!compact || panel.kind === "search");

  return (
    <>
      <nav
        className={cn(styles.nav, (flyoutOpen || menuVisible) && styles.navOpen, menuVisible && styles.navPinned)}
        aria-label="Global"
        onMouseLeave={hoverClose}
      >
        <div className={styles.content}>
          <ul className={styles.list}>
            <li className={styles.apple}>
              <a className={styles.link} href="https://www.apple.com/" aria-label={t.apple} onMouseEnter={hoverClose}>
                <AppleLogo />
              </a>
            </li>
            {navData.items.map((item) => (
              <li key={item.id} className={styles.item} onMouseEnter={() => hoverOpen(item.id)}>
                <a
                  className={cn(styles.link, panel?.kind === "item" && panel.id === item.id && styles.linkActive)}
                  href={item.href}
                  aria-haspopup="true"
                  aria-expanded={panel?.kind === "item" && panel.id === item.id}
                  onFocus={() => !compact && setPanel({ kind: "item", id: item.id })}
                >
                  {label(item.label)}
                </a>
              </li>
            ))}
            <li className={styles.tool}>
              <button
                type="button"
                className={styles.link}
                aria-label={t.search}
                aria-expanded={panel?.kind === "search"}
                onMouseEnter={hoverClose}
                onClick={() => {
                  setMenuOpen(false);
                  setPanel(panel?.kind === "search" ? null : { kind: "search" });
                }}
              >
                <SearchIcon />
              </button>
            </li>
            <li className={styles.tool}>
              <a className={styles.link} href="https://www.apple.com/us/shop/goto/bag" aria-label={t.bag} onMouseEnter={hoverClose}>
                <BagIcon />
              </a>
            </li>
            <li className={styles.menuTrigger}>
              <button
                type="button"
                className={styles.link}
                aria-label={menuOpen ? t.close : t.menu}
                aria-expanded={menuOpen}
                onClick={() => {
                  setPanel(null);
                  setSubmenu(null);
                  setMenuOpen((open) => !open);
                }}
              >
                <MenuIcon open={menuOpen} />
              </button>
            </li>
          </ul>
        </div>

        {/* Desktop flyout */}
        <div
          className={cn(styles.flyout, flyoutOpen && styles.flyoutOpen)}
          onMouseEnter={() => window.clearTimeout(timer.current)}
          aria-hidden={!flyoutOpen}
        >
          {activeItem ? <Groups key={activeItem.id} item={activeItem} label={label} /> : null}
          {panel?.kind === "search" ? <SearchPanel content={content} /> : null}
        </div>
      </nav>

      {/* Compact full-screen menu (outside <nav>: its backdrop-filter would contain position:fixed) */}
      <div className={cn(styles.menu, menuVisible && styles.menuOpen)} aria-hidden={!menuVisible}>
        <div className={cn(styles.menuTrack, submenu && styles.menuTrackShifted)}>
          <ul className={styles.menuList}>
            {navData.items.map((item) => (
              <li key={item.id}>
                <button type="button" className={styles.menuItem} onClick={() => setSubmenu(item.id)} tabIndex={menuVisible ? 0 : -1}>
                  <span>{label(item.label)}</span>
                  <ChevronIcon className={cn(styles.menuChevron, "i-next")} />
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.submenu}>
            <button type="button" className={styles.back} onClick={() => setSubmenu(null)} aria-label={t.back} tabIndex={submenu ? 0 : -1}>
              <BackIcon className="i-flip" />
            </button>
            {submenu ? (
              <Groups item={navData.items.find((item) => item.id === submenu) as NavItem} label={label} compact />
            ) : null}
          </div>
        </div>
      </div>
      <div className={cn(styles.curtain, flyoutOpen && styles.curtainOpen)} onMouseEnter={hoverClose} onClick={close} aria-hidden="true" />
    </>
  );
}

function Groups({ item, label, compact = false }: { item: NavItem; label: (text: string) => string; compact?: boolean }) {
  return (
    <div className={cn(styles.groups, compact && styles.groupsCompact)}>
      {item.groups.map((group) => (
        <div key={group.title} className={cn(styles.group, group.elevated.length > 0 && styles.groupElevated)}>
          <h2 className={styles.groupTitle}>{label(group.title)}</h2>
          {group.elevated.length > 0 ? (
            <ul className={styles.elevatedList}>
              {group.elevated.map((link) => (
                <li key={link.href}>
                  <a className={styles.elevatedLink} href={link.href}>
                    {label(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <ul className={cn(styles.groupList, group.elevated.length > 0 && styles.groupListAfterElevated)}>
            {group.links.map((link) => (
              <li key={link.href + link.label}>
                <a className={styles.groupLink} href={link.href}>
                  {label(link.label)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function SearchPanel({ content }: { content: PageContent }) {
  const t = content.globalNav;
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => inputRef.current?.focus(), []);
  return (
    <div className={styles.search}>
      {/* Searches run on apple.com — the clone has no search backend. */}
      <form action="https://www.apple.com/us/search" method="get" role="search">
        <label className={styles.searchField}>
          <SearchIcon className={styles.searchIcon} />
          <input ref={inputRef} name="q" type="search" placeholder={t.searchPlaceholder} aria-label={t.search} autoComplete="off" />
        </label>
      </form>
      <h2 className={styles.groupTitle}>{t.quickLinks}</h2>
      <ul className={styles.groupList}>
        {navData.searchQuickLinks.map((link) => (
          <li key={link.href}>
            <a className={styles.quickLink} href={link.href}>
              <span className="i-next" aria-hidden="true">→</span> {t.labels[link.label] || link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
