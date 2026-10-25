"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import source from "./source.json";
import navigation from "./navigation.json";
import menus from "./menus.json";
import footer from "./footer.json";
import { translate } from "./i18n";
import { FilmPlayer } from "./FilmPlayer";
import emphasisData from "./emphasis.json";

type PictureData = { key: string; src: string; small: string; alt: string };
type CardData = { title: string; text: string; picture: PictureData | null };
const Language = createContext(false);
const origin = "https://www.apple.com";
const buy = origin + "/us/shop/goto/buy_iphone/iphone_18_pro";
const sections = [
  "Highlights",
  "Design",
  "Cameras",
  "Performance",
  "Shared Features",
  "Accessories",
];
const anchors = [
  "highlights",
  "design",
  "cameras",
  "performance",
  "shared-features",
  "accessories",
];
function href(url: string) {
  return url.startsWith("/") ? origin + url : url;
}
function T({ children }: { children: string }) {
  const fa = useContext(Language);
  const result = translate(children, fa);
  const phrases = (emphasisData as Record<string, string[]>)[result] || [];
  const parts: React.ReactNode[] = [];
  let remainder = result;
  phrases.forEach((phrase, i) => {
    const position = remainder.indexOf(phrase);
    if (position < 0) return;
    parts.push(remainder.slice(0, position), <strong key={i}>{phrase}</strong>);
    remainder = remainder.slice(position + phrase.length);
  });
  parts.push(remainder);
  return (
    <span dir={fa && result === children ? "auto" : undefined}>{parts}</span>
  );
}
function Picture({
  data,
  className = "",
  eager = false,
}: {
  data?: PictureData;
  className?: string;
  eager?: boolean;
}) {
  if (!data) return null;
  return (
    <picture className={className}>
      <source media="(max-width:734px)" srcSet={data.small} />
      <img src={data.src} alt={data.alt} loading={eager ? "eager" : "lazy"} />
    </picture>
  );
}
function pic(index: number, key: string) {
  return source[index].pictures.find((p) => p.key.includes(key));
}
function uniqueCards(index: number) {
  return source[index].cards.filter(
    (c, i, a) => a.findIndex((x) => x.title === c.title) === i,
  );
}
function Video({
  name,
  poster,
  className = "",
  scrub = false,
}: {
  name: string;
  poster?: PictureData;
  className?: string;
  scrub?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const mobile = matchMedia("(max-width:734px)");
    const load = () => {
      video.src = `/sites/apple/video-${name}-${mobile.matches ? "small" : "large"}.mp4`;
    };
    load();
    mobile.addEventListener("change", load);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduced && !scrub)
          void video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "100px" },
    );
    observer.observe(video);
    const update = () => {
      if (!scrub || !Number.isFinite(video.duration) || reduced) return;
      const scene = video.closest(".scroll-scene");
      if (!scene) return;
      const rect = scene.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (innerHeight - rect.top) / rect.height),
      );
      video.currentTime = progress * Math.max(0, video.duration - 0.05);
    };
    if (scrub) window.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      mobile.removeEventListener("change", load);
      window.removeEventListener("scroll", update);
    };
  }, [name, scrub]);
  return (
    <div className={`video ${className}`}>
      <Picture data={poster} eager={name === "hero"} />
      <video
        ref={ref}
        muted
        playsInline
        preload={name === "hero" ? "auto" : "metadata"}
        poster={poster?.src}
        aria-label={poster?.alt || name.replaceAll("-", " ")}
      />
    </div>
  );
}
function FeatureVideo({
  name,
  poster,
  label,
}: {
  name: string;
  poster: PictureData | null;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (!video.src)
      video.src = `/sites/apple/video-${name}-${matchMedia("(max-width:734px)").matches ? "small" : "large"}.mp4`;
    if (playing) {
      video.pause();
      setPlaying(false);
    } else {
      void video
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };
  return (
    <div className="feature-video">
      <Picture data={poster || undefined} />
      <video ref={ref} muted playsInline loop />
      <button
        className="card-plus"
        aria-label={`${playing ? "Pause" : "Play"} ${label}`}
        onClick={toggle}
      >
        {playing ? "Ⅱ" : "▶"}
      </button>
    </div>
  );
}
function Buy({ small = false, url = buy }: { small?: boolean; url?: string }) {
  return (
    <a className={`buy ${small ? "small" : ""}`} href={url}>
      <T>Buy</T>
    </a>
  );
}
function Close({
  onClick,
  label = "Close",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button className="close" onClick={onClick} aria-label={label}>
      ×
    </button>
  );
}
function Modal({
  children,
  onClose,
  label,
}: {
  children: React.ReactNode;
  onClose: () => void;
  label: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      className="modal"
      ref={ref}
      aria-label={label}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <Close onClick={onClose} />
      {children}
    </dialog>
  );
}
function Header({ onLanguage }: { onLanguage: () => void }) {
  const [menu, setMenu] = useState<string | null>(null);
  const [explore, setExplore] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [lightNav, setLightNav] = useState(false);
  const [query, setQuery] = useState("");
  const navPictures = navigation.filter(
    (p, i, a) => a.findIndex((x) => x.key === p.key) === i,
  );
  useEffect(() => {
    const scroll = () => {
      setSticky(window.scrollY > 600);
      const shopping = document.querySelector(".shopping");
      setLightNav(
        Boolean(shopping && shopping.getBoundingClientRect().top < 60),
      );
    };
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    window.addEventListener("keydown", escape);
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("keydown", escape);
    };
  }, []);
  const activeMenu = menus.find((m) => m.name === menu);
  return (
    <>
      <header
        className="global-header"
        onMouseLeave={() => {
          if (activeMenu) setMenu(null);
        }}
      >
        <nav className="global-nav" aria-label="Global">
          <a href={origin} className="apple-logo" aria-label="Apple">
            <img src="/sites/apple/apple.svg" alt="Apple" />
          </a>
          <div className="desktop-links">
            {menus.map((m) => (
              <button
                key={m.name}
                aria-expanded={menu === m.name}
                aria-label={`${m.name} menu`}
                onMouseEnter={() => setMenu(m.name)}
                onFocus={() => setMenu(m.name)}
                onClick={() => setMenu(menu === m.name ? null : m.name)}
              >
                <T>{m.name}</T>
              </button>
            ))}
          </div>
          <button
            className="icon search-icon"
            aria-label="Search apple.com"
            onClick={() => setMenu(menu === "search" ? null : "search")}
          />
          <button
            className="icon bag-icon"
            aria-label="Shopping Bag"
            onClick={() => setMenu(menu === "bag" ? null : "bag")}
          />
          <button
            className="icon menu-icon"
            aria-label="Menu"
            aria-expanded={menu === "mobile"}
            onClick={() => setMenu(menu === "mobile" ? null : "mobile")}
          >
            <span />
            <span />
          </button>
        </nav>
        {menu && (
          <div
            className={`global-panel ${menu === "mobile" ? "mobile-panel" : ""}`}
          >
            <Close onClick={() => setMenu(null)} />
            {menu === "mobile" && (
              <div className="mobile-list">
                {menus.map((m) => (
                  <button key={m.name} onClick={() => setMenu(m.name)}>
                    <T>{m.name}</T>
                    <span>›</span>
                  </button>
                ))}
                <button onClick={onLanguage}>English / فارسی</button>
              </div>
            )}
            {activeMenu && (
              <div className="menu-groups">
                <button
                  className="mobile-back"
                  onClick={() => setMenu("mobile")}
                >
                  ‹ <T>Menu</T>
                </button>
                {activeMenu.groups.map((g, i) => (
                  <div key={i}>
                    <p>{g.title}</p>
                    {g.links.map((a, j) => (
                      <a
                        key={j}
                        href={
                          a.href === "/iphone-18-pro/"
                            ? "/iphone-18-pro/"
                            : href(a.href)
                        }
                      >
                        {a.text}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {menu === "search" && (
              <div className="search-panel">
                <form action="https://www.apple.com/us/search" method="get">
                  <input
                    autoFocus
                    name="search"
                    placeholder="Search apple.com"
                    aria-label="Search apple.com"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <button type="submit" aria-label="Search">
                    ↗
                  </button>
                </form>
                <p>
                  <T>Quick Links</T>
                </p>
                {[
                  "Find a Store",
                  "Apple Trade In",
                  "Apple Upgrade",
                  "iPhone 18 Pro",
                ]
                  .filter(
                    (t) =>
                      !query || t.toLowerCase().includes(query.toLowerCase()),
                  )
                  .map((t, i) => (
                    <a
                      key={t}
                      href={
                        i === 3
                          ? "/iphone-18-pro/"
                          : origin +
                            [
                              "/retail/",
                              "/us/shop/goto/trade_in",
                              "/us/shop/goto/apple_upgrade",
                            ][i]
                      }
                    >
                      → {t}
                    </a>
                  ))}
              </div>
            )}
            {menu === "bag" && (
              <div className="bag-panel">
                <h2>
                  <T>Your Bag is empty.</T>
                </h2>
                <p>
                  <a href={origin + "/us/shop/goto/account"}>Sign in</a> to see
                  if you have any saved items
                </p>
                <a href={origin + "/us/shop/goto/bag"}>Review Bag ›</a>
                <a href={origin + "/us/shop/goto/order/list"}>Orders ›</a>
                <a href={origin + "/us/shop/goto/account"}>Account ›</a>
              </div>
            )}
          </div>
        )}
      </header>
      {menu && (
        <button
          className="menu-scrim"
          aria-label="Close global menu"
          onClick={() => setMenu(null)}
        />
      )}
      <nav
        className={`local-nav ${sticky ? "visible" : ""} ${lightNav ? "light-nav" : ""}`}
        aria-label="local"
      >
        <a href="#top">
          <T>iPhone 18 Pro</T>
        </a>
        <div>
          <button
            aria-label="Explore iPhone 18 Pro"
            onClick={() => setExplore(true)}
          >
            <T>Explore</T>
          </button>
          <Buy small />
        </div>
      </nav>
      {explore && (
        <Modal label="Local Navigation" onClose={() => setExplore(false)}>
          <div className="explore-products">
            {navPictures.map((p, i) => (
              <a
                key={p.key}
                href={
                  i === 1
                    ? "/iphone-18-pro/"
                    : origin +
                      [
                        "/iphone-duo/",
                        "/iphone-18-pro/",
                        "/iphone-air/",
                        "/iphone-17/",
                        "/iphone-17e/",
                        "/us/shop/goto/buy_iphone/iphone_16",
                        "/iphone/compare/",
                        "/us/shop/goto/iphone/accessories",
                        "/us/shop/goto/buy_iphone",
                        "/os/ios/",
                      ][i]
                }
              >
                <Picture data={p} />
                <span>
                  {
                    [
                      "iPhone Duo",
                      "iPhone 18 Pro",
                      "iPhone Air",
                      "iPhone 17",
                      "iPhone 17e",
                      "iPhone 16",
                      "Compare",
                      "Accessories",
                      "Shop iPhone",
                      "iOS 27",
                    ][i]
                  }
                </span>
                {i === 1 && (
                  <small>
                    <T>Currently viewing</T>
                  </small>
                )}
              </a>
            ))}
          </div>
          <div className="explore-title">
            <h2>
              <T>iPhone 18 Pro</T>
            </h2>
            <p dir="ltr">
              From $1199
              <br />
              or $49.95/mo. for 24 mo.*
            </p>
            <Buy />
          </div>
          <p className="muted">
            <T>Overview</T>⌄
          </p>
          <div className="quick-links">
            {sections.map((s, i) => (
              <a
                key={s}
                href={`#${anchors[i]}`}
                onClick={() => setExplore(false)}
              >
                <T>{s}</T>
              </a>
            ))}
          </div>
          <div className="explore-bottom">
            <a href={origin + "/iphone-18-pro/specs/"}>
              <T>Tech Specs</T> ›
            </a>
            <a href={origin + "/iphone-18-pro/switch/"}>
              <T>Switch from Android</T> ›
            </a>
            <button onClick={onLanguage}>English / فارسی</button>
          </div>
        </Modal>
      )}
    </>
  );
}
function SectionTitle({
  eyebrow,
  title,
  center = false,
}: {
  eyebrow: string;
  title: string;
  center?: boolean;
}) {
  return (
    <div className={`section-title container ${center ? "center" : ""}`}>
      <h2>
        <T>{eyebrow}</T>
      </h2>
      <p>
        <T>{title}</T>
      </p>
    </div>
  );
}
function Highlights({ onFilm }: { onFilm: () => void }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const names = ["Camera", "Battery", "Colors", "A20 Pro chip", "Siri AI"];
  const keys = [
    "main-camera-endframe",
    "battery-endframe",
    "colors-endframe",
    "chip-endframe",
    "siri",
  ];
  const videos = ["camera", "battery", "colors", "chip"];
  const go = (index: number) => {
    const parent = track.current;
    const child = parent?.children[index];
    if (!parent || !child) return;
    const frame = parent.getBoundingClientRect();
    const item = child.getBoundingClientRect();
    const rtl = document.documentElement.dir === "rtl";
    parent.scrollBy({
      left: rtl
        ? item.right - frame.right + frame.width * 0.0625
        : item.left - frame.left - frame.width * 0.0625,
      behavior: "smooth",
    });
    setActive(index);
  };
  useEffect(() => {
    const element = section.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      const parent = track.current;
      if (!parent) return;
      const frame = parent.getBoundingClientRect();
      if (frame.bottom < 0 || frame.top > innerHeight) return;
      const next = (active + 1) % 5;
      const item = parent.children[next].getBoundingClientRect();
      const rtl = document.documentElement.dir === "rtl";
      parent.scrollBy({
        left: rtl
          ? item.right - frame.right + frame.width * 0.0625
          : item.left - frame.left - frame.width * 0.0625,
        behavior: "smooth",
      });
      setActive(next);
    }, 6500);
    return () => clearTimeout(timer);
  }, [active, playing]);
  return (
    <section id="highlights" className="highlights alt" ref={section}>
      <div className="container section-heading">
        <h2>
          <T>Get the highlights.</T>
        </h2>
        <button className="text-link" onClick={onFilm}>
          <T>Watch the film</T> ⊙
        </button>
      </div>
      <div
        className="highlight-track"
        ref={track}
        onScroll={() => {
          const parent = track.current;
          if (!parent) return;
          const rect = parent.getBoundingClientRect();
          const rtl = document.documentElement.dir === "rtl";
          let nearest = 0;
          let distance = Infinity;
          [...parent.children].forEach((el, i) => {
            const r = el.getBoundingClientRect();
            const d = Math.abs(
              (rtl ? rect.right - r.right : r.left - rect.left) -
                rect.width * 0.0625,
            );
            if (d < distance) {
              distance = d;
              nearest = i;
            }
          });
          setActive(nearest);
        }}
      >
        {names.map((name, i) => (
          <div
            className="highlight-card"
            role="tabpanel"
            aria-label={name}
            key={name}
          >
            {i < 4 ? (
              <Video
                name={`highlights-${videos[i]}`}
                poster={pic(1, keys[i])}
              />
            ) : (
              <Picture data={pic(1, "siri")} />
            )}
            <p className={`highlight-copy copy-${i}`}>
              <T>{source[1].paragraphs[i]}</T>
            </p>
          </div>
        ))}
      </div>
      <div className="highlight-controls">
        <div className="dots" role="tablist" aria-label="Highlights">
          {names.map((n, i) => (
            <button
              key={n}
              role="tab"
              aria-selected={active === i}
              aria-label={n}
              className={active === i ? "selected" : ""}
              onClick={() => {
                go(i);
                setPlaying(false);
              }}
            />
          ))}
        </div>
        <button
          className="play"
          aria-label={
            playing ? "Pause Highlights Gallery" : "Play Highlights Gallery"
          }
          onClick={() => setPlaying(!playing)}
        >
          {playing ? "Ⅱ" : "▶"}
        </button>
      </div>
    </section>
  );
}
function Comparison({
  compact = false,
  onSelect,
}: {
  compact?: boolean;
  onSelect?: (model: number) => void;
}) {
  const [model, setModel] = useState(4);
  const models = [
    "iPhone 14",
    "iPhone 14 Pro",
    "iPhone 14 Pro Max",
    "iPhone 15",
    "iPhone 15 Pro",
    "iPhone 15 Pro Max",
    "iPhone 16",
    "iPhone 16 Pro",
    "iPhone 16 Pro Max",
    "iPhone 17",
    "iPhone 17 Pro",
    "iPhone 17 Pro Max",
  ];
  const hours = [25, 22, 16, 25, 22, 16, 23, 18, 12, 15, 12, 6];
  const cpu = [80, 60, 60, 60, 50, 50, 30, 30, 30, 20, 20, 20];
  const gpu = [
    "4x",
    "2.8x",
    "2.8x",
    "2.8x",
    "2.1x",
    "2.1x",
    "2x",
    "80%",
    "80%",
    "60%",
    "40%",
    "40%",
  ];
  return (
    <div className={`comparison ${compact ? "compact" : ""}`}>
      <label>
        <T>
          {compact
            ? "Compare with"
            : "Select an iPhone to compare with iPhone 18 Pro:"}
        </T>{" "}
        <select
          aria-label="Compare with"
          value={model}
          onChange={(e) => {
            const next = Number(e.target.value);
            setModel(next);
            onSelect?.(next);
          }}
        >
          {models.map((m, i) => (
            <option key={m} value={i}>
              {m}
            </option>
          ))}
        </select>
      </label>
      <div className="stats" aria-live="polite">
        <div>
          <span>Up to</span>
          <strong>{hours[model]} more hours</strong>
          <span>
            video playback on
            <br />
            iPhone 18 Pro Max
          </span>
        </div>
        <div>
          <span>Up to</span>
          <strong>{cpu[model]}% faster</strong>
          <span>6-core CPU</span>
        </div>
        <div>
          <span>Up to</span>
          <strong>{gpu[model]} faster</strong>
          <span>7-core GPU</span>
        </div>
      </div>
    </div>
  );
}
function Upgrader() {
  const [model, setModel] = useState(4);
  const hours = [25, 22, 16, 25, 22, 16, 23, 18, 12, 15, 12, 6][model];
  const cpu = [80, 60, 60, 60, 50, 50, 30, 30, 30, 20, 20, 20][model];
  return (
    <section id="upgrader" className="upgrader container alt">
      <h2>
        <T>Worth the upgrade? You bet.</T>
      </h2>
      <Comparison onSelect={setModel} />
      <div className="upgrade-grid" aria-live="polite">
        <div>
          <p>48MP Fusion Main camera with variable aperture and Pro controls</p>
          <Picture data={pic(9, "main-camera")} />
        </div>
        <div>
          <p>
            Up to <strong>{cpu}% faster</strong>
            <br />
            6-core CPU
          </p>
          <Picture data={pic(9, "a20-pro-chip")} />
        </div>
        <div>
          <strong>{hours} more hours</strong>
          <p>video playback on iPhone 18 Pro Max</p>
        </div>
        <div>
          <strong>50% charge</strong>
          <p>in around 15 minutes with compatible adapter</p>
        </div>
        <div>
          <p>18MP Center Stage front camera</p>
          <Picture data={pic(9, "front-camera")} />
        </div>
        <div>
          <Picture data={pic(9, "siri-ai")} />
          <p>Siri AI with more expressive voices and systemwide dictation</p>
        </div>
      </div>
      <div className="trade-in">
        <h3>Trade In</h3>
        <p>
          Get credit toward a new iPhone when you trade in an eligible device.
        </p>
        <a href={origin + "/us/shop/goto/trade_in"}>
          <T>Find your trade‑in value</T> ›
        </a>
      </div>
    </section>
  );
}
function Design() {
  const [feature, setFeature] = useState(-1);
  const [color, setColor] = useState(0);
  const features = [
    "Colors",
    "Two sizes",
    "New Main camera",
    "Redesigned Dynamic Island",
    "Durability",
    "Camera Control",
    "Action button",
  ];
  const keys = [
    "color-" + ["burgundy", "glacier", "silver", "black"][color],
    "-size",
    "viewer-aperture-endframe",
    "dynamic-island-endframe",
    "-durability",
    "-camera-control",
    "-action-button",
  ];
  return (
    <section id="design" className="design alt">
      <SectionTitle eyebrow="Design" title="Our finest unibody of work." />
      <div className="product-viewer">
        <Picture
          data={pic(4, feature === -1 ? "3d-viewer" : keys[feature])}
          className="product-image"
        />
        {feature !== -1 && <Close onClick={() => setFeature(-1)} />}
        <div className="product-features">
          {features.map((f, i) => (
            <div key={f}>
              {feature === i ? (
                <div className="feature-detail">
                  <p>
                    <T>
                      {source[4].paragraphs[i + 1].replace(
                        "Burgundy",
                        ["Burgundy", "Glacier", "Silver", "Black"][color],
                      )}
                    </T>
                  </p>
                  {i === 0 && (
                    <div
                      className="swatches"
                      role="radiogroup"
                      aria-label="Product colors"
                    >
                      {["Burgundy", "Glacier", "Silver", "Black"].map(
                        (c, j) => (
                          <button
                            key={c}
                            className={`swatch swatch-${j}`}
                            role="radio"
                            aria-label={c}
                            aria-checked={color === j}
                            onClick={() => setColor(j)}
                          />
                        ),
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="feature-button"
                  aria-expanded={feature === i}
                  onClick={() => setFeature(i)}
                >
                  <span>⊕</span>
                  <T>{f}</T>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Gallery({
  index,
  title,
  filter,
}: {
  index: number;
  title?: string;
  filter?: (c: CardData) => boolean;
}) {
  const cards = uniqueCards(index).filter((c) => !filter || filter(c));
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [opened, setOpened] = useState<CardData | null>(null);
  const move = (direction: number) => {
    const next = Math.max(0, Math.min(cards.length - 1, active + direction));
    const child = track.current?.children[next] as HTMLElement | undefined;
    const parent = track.current;
    if (parent && child) {
      const frame = parent.getBoundingClientRect();
      const item = child.getBoundingClientRect();
      const rtl = document.documentElement.dir === "rtl";
      parent.scrollBy({
        left: rtl ? item.right - frame.right + frame.width * .0625 : item.left - frame.left - frame.width * .0625,
        behavior: "smooth",
      });
    }
    setActive(next);
  };
  return (
    <div className={`gallery gallery-${index}`}>
      {title && (
        <h2 className="container gallery-title">
          <T>{title}</T>
        </h2>
      )}
      <div
        className="gallery-track"
        ref={track}
        onScroll={() => {
          if (!track.current) return;
          const parent = track.current.getBoundingClientRect();
          const children = [...track.current.children];
          let nearest = 0;
          let distance = Infinity;
          children.forEach((el, i) => {
            const rtl = document.documentElement.dir === "rtl";
            const d = Math.abs(
              (rtl
                ? parent.right - el.getBoundingClientRect().right
                : el.getBoundingClientRect().left - parent.left) -
                parent.width * 0.0625,
            );
            if (d < distance) {
              distance = d;
              nearest = i;
            }
          });
          setActive(nearest);
        }}
      >
        {cards.map((c, i) => (
          <article className="gallery-card" key={c.title}>
            <div className="card-media">
              {c.title === "8x optical-quality zoom." ||
              c.title === "4K time-lapse." ? (
                <FeatureVideo
                  name={index === 5 ? "8x-zoom" : "4k-timelapse"}
                  label={c.title}
                  poster={c.picture}
                />
              ) : (
                <Picture data={c.picture || undefined} />
              )}
              {(index === 21 || (index === 18 && i > 1)) && (
                <button
                  className="card-plus"
                  aria-label={`Learn more: ${c.title}`}
                  onClick={() => setOpened(c)}
                >
                  +
                </button>
              )}
              {index === 18 && i < 2 && (
                <a
                  className="card-plus"
                  aria-label={`Learn more: ${c.title}`}
                  href={
                    origin +
                    (i === 0
                      ? "/us/shop/goto/apple_upgrade"
                      : "/us/shop/goto/buy_iphone/carrier_offers")
                  }
                >
                  ↗
                </a>
              )}
            </div>
            <div className="card-caption">
              <h3>
                <T>{c.title}</T>
              </h3>
              <p>
                <T>{c.text}</T>
              </p>
            </div>
            {i === 0 && <span className="sr-only">First item</span>}
          </article>
        ))}
      </div>
      <div className="gallery-arrows container">
        <button
          aria-label={`Previous item, ${title || source[index].headings[0]}`}
          disabled={active === 0}
          onClick={() => move(-1)}
        >
          ‹
        </button>
        <button
          aria-label={`Next item, ${title || source[index].headings[0]}`}
          disabled={active === cards.length - 1}
          onClick={() => move(1)}
        >
          ›
        </button>
      </div>
      {opened && (
        <Modal label={opened.title} onClose={() => setOpened(null)}>
          <div className="detail-modal">
            <h2>
              <T>{opened.title}</T>
            </h2>
            <p>
              <T>{opened.text}</T>
            </p>
            <Picture data={opened.picture || undefined} />
            {source[index].links
              .filter(
                (l) =>
                  l.text.toLowerCase().includes("learn") ||
                  l.text.toLowerCase().includes("read"),
              )
              .slice(0, 1)
              .map((l) => (
                <a href={href(l.href)} key={l.href}>
                  {l.text} ›
                </a>
              ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
function Cameras() {
  const [aperture, setAperture] = useState(0);
  const options = ["1.48", "1.8", "2.8", "4.0"];
  const keys = [
    "aperture-max-light",
    "aperture-balance",
    "aperture-depth",
    "aperture-max-depth",
  ];
  const cards = uniqueCards(5).filter((c) => c.title.startsWith("ƒ"));
  return (
    <section id="cameras" className="camera-section">
      <div className="scroll-scene">
        <div className="scene-pin">
          <Video name="camera-system" poster={pic(5, "system-hero")} scrub />
        </div>
      </div>
      <SectionTitle eyebrow="Pro camera system" title="Eye-opening control." />
      <p className="body-copy">
        <T>{source[5].paragraphs[1]}</T>
      </p>
      <div className="camera-specs container">
        <div>
          <span>All</span>
          <strong>48MP</strong>
          <span>rear cameras</span>
        </div>
        <div>
          <span>Up to</span>
          <strong>8x</strong>
          <span>optical-quality zoom</span>
        </div>
      </div>
      <div className="camera-details container">
        {[4, 6, 8].map((i) => (
          <div key={i}>
            <h3>{source[5].paragraphs[i]}</h3>
            <p>{source[5].paragraphs[i + 1].replace(/ F .*? aperture/, "")}</p>
          </div>
        ))}
      </div>
      <div className="aperture container">
        <h2>
          <T>Variable aperture. If you know, you pro.</T>
        </h2>
        <p className="body-copy">
          <T>{source[5].paragraphs[10]}</T>
        </p>
        <Picture data={pic(5, keys[aperture])} />
        <div
          className="aperture-tabs"
          role="tablist"
          aria-label="Variable aperture options"
        >
          {options.map((o, i) => (
            <button
              role="tab"
              aria-label={`F ${o}`}
              aria-selected={i === aperture}
              key={o}
              onClick={() => setAperture(i)}
            >
              ƒ/{o}
            </button>
          ))}
        </div>
        <div className="aperture-caption" role="tabpanel" aria-live="polite">
          <strong>
            ƒ/{options[aperture]}{" "}
            <T>
              {
                ["Maximum light.", "Default.", "More depth.", "Maximum depth."][
                  aperture
                ]
              }
            </T>{" "}
          </strong>
          <T>{cards[aperture]?.text || ""}</T>
        </div>
      </div>
      <Gallery
        index={5}
        title="Such a control freak."
        filter={(c) => !c.title.startsWith("ƒ")}
      />
    </section>
  );
}
function Footer({ onLanguage }: { onLanguage: () => void }) {
  const directory = useRef<HTMLElement>(null);
  useEffect(() => {
    const mobile = matchMedia("(max-width:734px)");
    const update = () =>
      directory.current?.querySelectorAll("details").forEach((detail) => {
        detail.open = !mobile.matches;
      });
    update();
    mobile.addEventListener("change", update);
    return () => mobile.removeEventListener("change", update);
  }, []);
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footnotes" dir="ltr">
          {footer.notes.map((n, i) => (
            <p key={i} id={n.id || undefined}>
              {n.id
                ? Number(n.id.replace("footnote-", "")) <= 3
                  ? ["*", "**", "◊"][Number(n.id.replace("footnote-", "")) - 1]
                  : `${Number(n.id.replace("footnote-", "")) - 3}.`
                : ""}{" "}
              {n.text}
            </p>
          ))}
        </div>
        <p className="breadcrumbs">　›　iPhone　›　iPhone 18 Pro</p>
        <nav
          className="footer-directory"
          aria-label="Apple Directory"
          ref={directory}
        >
          {footer.groups.map((g) => (
            <details key={g.title}>
              <summary>{g.title}</summary>
              {g.links.map((l, i) => (
                <a href={href(l.href)} key={i}>
                  {l.text}
                </a>
              ))}
            </details>
          ))}
        </nav>
        <p className="more-shop">
          More ways to shop:{" "}
          <a href={origin + "/retail/"}>Find an Apple Store</a> or{" "}
          <a href="https://locate.apple.com/">other retailer</a> near you. Or
          call <a href="tel:1-800-692-7753">1-800-MY-APPLE</a>.
        </p>
        <div className="legal">
          <p>Copyright © 2026 Apple Inc. All rights reserved.</p>
          <div>
            {[
              "Privacy Policy",
              "Terms of Use",
              "Sales and Refunds",
              "Legal",
              "Site Map",
            ].map((t, i) => (
              <a
                key={t}
                href={
                  origin +
                  [
                    "/legal/privacy/",
                    "/legal/internet-services/terms/site.html",
                    "/us/shop/goto/help/sales_refunds",
                    "/legal/",
                    "/sitemap/",
                  ][i]
                }
              >
                {t}
              </a>
            ))}
          </div>
          <button onClick={onLanguage}>
            <T>United States</T> / English / فارسی
          </button>
        </div>
      </div>
    </footer>
  );
}
export function IPhonePage() {
  const [fa, setFa] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [film, setFilm] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("apple-language");
    if (saved === "fa") {
      document.documentElement.lang = "fa";
      document.documentElement.dir = "rtl";
    }
    // State comes from a browser preference after hydration.
    const timer = setTimeout(() => setFa(saved === "fa"), 0);
    return () => clearTimeout(timer);
  }, []);
  const chooseLanguage = (persian: boolean) => {
    setFa(persian);
    document.documentElement.lang = persian ? "fa" : "en";
    document.documentElement.dir = persian ? "rtl" : "ltr";
    localStorage.setItem("apple-language", persian ? "fa" : "en");
    setLanguageOpen(false);
  };
  return (
    <Language.Provider value={fa}>
      <div id="top" className="apple-page">
        <Header onLanguage={() => setLanguageOpen(true)} />
        <main>
          <div className="ribbon">
            <T>
              {fa
                ? "آیفون جدید را با پرداخت ماهانهٔ کم برای ۱۲ یا ۲۴ ماه اجاره کنید و در پایان دوره با Apple Upgrade آن را ارتقا دهید."
                : "Lease a new iPhone with low monthly payments for 12 or 24 months and upgrade at the end of your term with Apple Upgrade.◊"}
            </T>{" "}
            <a href={origin + "/us/shop/goto/apple_upgrade"}>
              <T>Learn more</T> ›
            </a>
          </div>
          <section className="hero">
            <Video name="hero" poster={pic(0, "hero-endframe")} />
            <div className="hero-title">
              <h1>
                <T>iPhone 18 Pro</T>
              </h1>
              <p>
                <T>Pro further.</T>
              </p>
            </div>
            <div className="hero-purchase">
              <div dir="ltr">
                <span>From $1199 or $49.95/mo. for 24 mo.*</span>
                <span>
                  Lease from $34.99/mo. for 24 mo. with Apple Upgrade
                  <sup>◊</sup>
                </span>
              </div>
              <Buy />
            </div>
          </section>
          <Highlights onFilm={() => setFilm(true)} />
          <section className="upgrade-intro">
            <SectionTitle
              eyebrow="The ultimate upgrade"
              title="Most wanted."
              center
            />
            <p className="body-copy">
              <T>{source[2].paragraphs[1]}</T>
            </p>
            <div className="container">
              <Comparison compact />
            </div>
            <Picture data={pic(2, "aio-hero")} className="upgrade-image" />
          </section>
          <Design />
          <Cameras />
          <section id="pro-video">
            <SectionTitle
              eyebrow="Pro video"
              title="Make it cinematic. After the fact."
            />
            <Video
              name="pro-video"
              poster={pic(6, "pro-video-hero")}
              className="wide-media"
            />
            <p className="body-copy">
              <T>{source[6].paragraphs[1]}</T>
            </p>
            <Gallery index={6} title="Fully scene. Fully heard." />
          </section>
          <section id="battery">
            <SectionTitle
              eyebrow="Battery life"
              title={source[7].paragraphs[0].replace(" 4 ", " ")}
            />
            <div className="scroll-scene">
              <div className="scene-pin">
                <Video name="battery" poster={pic(7, "battery-hero")} scrub />
              </div>
            </div>
            <div className="battery-copy container">
              <div className="battery-stat">
                <span>Up to</span>
                <strong>30 hours of use</strong>
                <span>per charge on iPhone 18 Pro Max</span>
              </div>
              <p className="body-copy">
                <T>{source[7].paragraphs[2]}</T>
              </p>
            </div>
            <div className="charging container">
              <div>
                <h2>
                  <T>There’s a new Pro in charge.</T>
                </h2>
                <p>
                  <T>{source[7].paragraphs[3]}</T>
                </p>
              </div>
              <div className="battery-stat">
                <strong>50% charge</strong>
                <span>
                  in around 15 minutes
                  <br />
                  with compatible power adapter
                </span>
              </div>
              <Picture data={pic(7, "battery-charge")} />
            </div>
          </section>
          <section id="performance">
            <Video
              name="performance"
              poster={pic(8, "chip-endframe")}
              className="wide-media"
            />
            <SectionTitle
              eyebrow="Performance"
              title="Welcome to the mother chip."
              center
            />
            <p className="body-copy">
              <T>{source[8].paragraphs[1]}</T>
            </p>
            <div className="performance-points container">
              {[1, 2].map((n, i) => (
                <div key={n}>
                  <Picture data={pic(8, i === 0 ? "icon-ai" : "icon-a20")} />
                  <h3>
                    <T>{source[8].headings[n]}</T>
                  </h3>
                  <p>
                    <T>{source[8].paragraphs[i + 2]}</T>
                  </p>
                </div>
              ))}
            </div>
            <h2 className="container gallery-title">
              <T>Bigger vapor chamber. Let the heat drop.</T>
            </h2>
            <Picture className="wide-media" data={pic(8, "vapor-chamber")} />
            <p className="body-copy">
              <T>{source[8].paragraphs[4]}</T>
            </p>
          </section>
          <Upgrader />
          <section id="shared-features" className="family alt">
            <SectionTitle
              eyebrow="All in the family"
              title="All the must‑haves. All on iPhone."
            />
            <p className="body-copy">
              <T>{source[13].paragraphs[1]}</T>
            </p>
            <Picture
              className="family-hero container"
              data={pic(13, "siri-ai-hero")}
            />
            {[14, 15, 16].map((i) => (
              <div className="family-group" key={i}>
                <h2 className="container gallery-title">
                  <T>{source[i].headings[0]}</T>
                </h2>
                {i === 14 && (
                  <p className="container muted">
                    <T>Siri AI is rolling out in English.</T>
                    <br />
                    <T>Usage limits may apply.</T>
                  </p>
                )}
                <Gallery index={i} />
                {source[i].links
                  .filter((l) => l.text.startsWith("Learn more"))
                  .slice(0, 1)
                  .map((l) => (
                    <p className="container" key={l.href}>
                      <a href={href(l.href)}>{l.text} ›</a>
                    </p>
                  ))}
              </div>
            ))}
          </section>
          <section id="accessories">
            <SectionTitle
              eyebrow="Accessories"
              title="Addition by attraction."
            />
            <p className="body-copy">
              <T>{source[17].paragraphs[1]}</T>
            </p>
            <p className="center">
              <a href={origin + "/us/shop/goto/iphone/accessories"}>
                <T>Shop all iPhone accessories</T> ›
              </a>
            </p>
            <Picture
              className="accessories-image"
              data={pic(17, "accessories")}
            />
          </section>
          <div className="shopping light">
            <section>
              <div className="container section-heading">
                <h2>
                  <T>Why Apple is the best place to shop iPhone.</T>
                </h2>
                <a href={origin + "/us/shop/goto/buy_iphone"}>
                  <T>Shop iPhone</T> ›
                </a>
              </div>
              <Gallery index={18} />
            </section>
            <section className="explore-iphone">
              <div className="container section-heading">
                <h2>
                  <T>Keep exploring iPhone.</T>
                </h2>
                <a href={origin + "/iphone/"}>Explore all iPhone ›</a>
              </div>
              <div className="phone-comparison container">
                {["iphone-18-pro-alt", "iphone-duo"].map((k, i) => (
                  <article key={k}>
                    <Picture data={pic(20, k)} />
                    <p className="new">New</p>
                    <h3>{i === 0 ? "iPhone 18 Pro" : "iPhone Duo"}</h3>
                    <p>
                      {i === 0
                        ? source[20].paragraphs[0]
                        : source[20].paragraphs[21]}
                    </p>
                    <p>From ${i === 0 ? "1199" : "1999"}</p>
                    <a
                      href={
                        origin + (i === 0 ? "/iphone-18-pro/" : "/iphone-duo/")
                      }
                    >
                      Learn more ›
                    </a>
                    <Buy
                      url={
                        origin +
                        "/us/shop/goto/buy_iphone/" +
                        (i === 0 ? "iphone_18_pro" : "iphone_duo")
                      }
                    />
                    <hr />
                    <div className="specification-row">
                      <strong>{i === 0 ? "6.9” or 6.3”" : "7.6”"}</strong>
                      <p>
                        {i === 0
                          ? "Super Retina XDR display"
                          : "7.6-inch Super Retina XDR folding display with nano-texture"}
                      </p>
                      {i === 1 && (
                        <p>5.4-inch Super Retina XDR outer display</p>
                      )}
                    </div>
                    <div className="specification-row">
                      <Picture data={pic(20, "contrast-battery")} />
                      <p>
                        {i === 0
                          ? "Up to 45 hours video playback"
                          : "Up to 31 hours video playback when using inner display"}
                      </p>
                      {i === 1 && (
                        <p>
                          Up to 44 hours video playback when using outer display
                        </p>
                      )}
                    </div>
                    <div className="specification-row">
                      <Picture data={pic(20, "chip-a20pro")} />
                      <p>A20 Pro chip</p>
                      <p>7-core GPU with Neural Accelerators</p>
                    </div>
                    <div className="specification-row camera-rows">
                      <Picture
                        data={pic(
                          20,
                          i === 0
                            ? "iphone-18-pro-camera"
                            : "iphone-duo-camera",
                        )}
                      />
                      <p>
                        {i === 0
                          ? "48MP Pro Fusion camera system"
                          : "48MP Dual Fusion camera system"}
                      </p>
                      <p>
                        48MP Fusion Main
                        {i === 0 ? " with variable aperture" : ""}
                      </p>
                      <p>48MP Fusion Ultra Wide</p>
                      <p>{i === 0 ? "48MP Fusion Telephoto" : "—"}</p>
                      <p>
                        {i === 0
                          ? "ƒ/1.48, ƒ/1.8, ƒ/2.8, ƒ/4.0 variable aperture options (Fusion Main)"
                          : "—"}
                      </p>
                    </div>
                    <div className="specification-row">
                      <Picture data={pic(20, "center-stage")} />
                      <p>
                        {i === 0 ? "18MP" : "12MP"} Center Stage front camera
                      </p>
                      <p>Ultra-stabilized video</p>
                      <p>Dual Capture</p>
                      <p>Center Stage for photos and video calls</p>
                      {i === 1 && <p>Under-display FaceTime camera</p>}
                    </div>
                    <div className="specification-row">
                      <Picture data={pic(20, "apple-intelligence")} />
                      <p>Apple Intelligence</p>
                      <p>Siri AI</p>
                    </div>
                  </article>
                ))}
              </div>
              <p className="center">
                <a className="compare-all" href={origin + "/iphone/compare/"}>
                  <T>Compare all iPhone models</T> ›
                </a>
              </p>
            </section>
            <section>
              <h2 className="container gallery-title">
                <T>iPhone 18 Pro and the environment.</T>
              </h2>
              <p className="container">
                <a href={href(source[21].links[0]?.href || "/environment/")}>
                  Learn more in our Product Environmental Report (PDF) ↗
                </a>
              </p>
              <Gallery index={21} />
            </section>
            <section>
              <h2 className="container gallery-title">
                <T>Our values lead the way.</T>
              </h2>
              <Gallery index={22} />
            </section>
            <section className="iphone-index container">
              <h2>
                <T>iPhone</T>
              </h2>
              <div>
                {menus
                  .find((m) => m.name === "iPhone")
                  ?.groups.map((g, i) => (
                    <div key={i}>
                      <p>{g.title}</p>
                      {g.links.map((l, j) => (
                        <a key={j} href={href(l.href)}>
                          {l.text}
                        </a>
                      ))}
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </main>
        <Footer onLanguage={() => setLanguageOpen(true)} />
        {languageOpen && (
          <Modal
            label="Choose your language"
            onClose={() => setLanguageOpen(false)}
          >
            <div className="language-picker">
              <h2>
                <T>Choose your language</T>
              </h2>
              <button onClick={() => chooseLanguage(false)} lang="en" dir="ltr">
                English <span>{!fa ? "✓" : ""}</span>
              </button>
              <button onClick={() => chooseLanguage(true)} lang="fa" dir="rtl">
                فارسی <span>{fa ? "✓" : ""}</span>
              </button>
              <a href={origin + "/choose-country-region/"}>
                Choose another country or region ↗
              </a>
            </div>
          </Modal>
        )}
        {film && (
          <Modal label="Watch the film" onClose={() => setFilm(false)}>
            <FilmPlayer />
          </Modal>
        )}
      </div>
    </Language.Provider>
  );
}

