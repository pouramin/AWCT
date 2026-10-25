"use client";
import { useEffect, useState } from "react";
import {
  Search,
  Menu,
  UserRound,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { sourceLink, translate } from "./data";
const main = [
  "Men",
  "Women",
  "Kids",
  "Jordan",
  "NikeSKIMS",
  "Sport",
  "Sportswear",
];
import menus from "./menus.json";
export function Header({ persian }: { persian: boolean }) {
  const t = (s: string) => translate(s, persian);
  const [menu, setMenu] = useState<string | null>(null),
    [mobile, setMobile] = useState(false),
    [mobileSport, setMobileSport] = useState(false),
    [search, setSearch] = useState(false),
    [query, setQuery] = useState("");
  useEffect(() => {
    if (!mobile && !search) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobile, search]);
  return (
    <header
      className="header"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setMenu(null);
          setSearch(false);
          setMobile(false);
        }
      }}
    >
      <a className="skip" href="#products">
        Skip to products
      </a>
      <div className="utility">
        <div className="brands">
          <a href="https://www.nike.com/jordan" aria-label="Jordan">
            <img src="/sites/nike/brand-0.svg" alt="" />
          </a>
          <a href="https://www.nike.com/w/converse-akmjx" aria-label="Converse">
            <img src="/sites/nike/brand-1.svg" alt="" />
          </a>
        </div>
        <div>
          {["Find a Store", "Help", "Join Us", "Sign In"].map((s) =>
            s === "Help" ? (
              <div className="help-drop" key={s}>
                <a href="https://www.nike.com/help">{t(s)}</a>
                <nav className="help-panel" aria-label="Help menu">
                  {[
                    "Order Status",
                    "Shipping and Delivery",
                    "Returns",
                    "Order Cancellation",
                    "Size Charts",
                    "Contact Us",
                    "Membership",
                    "Promotions & Discounts",
                    "Product Advice",
                  ].map((item) => (
                    <a key={item} href={sourceLink(item)}>
                      {t(item)}
                    </a>
                  ))}
                </nav>
              </div>
            ) : (
              <a key={s} href={sourceLink(s)}>
                {t(s)}
              </a>
            ),
          )}
        </div>
      </div>
      <div className="main-nav">
        <a
          href="https://www.nike.com"
          aria-label="Nike Home Page"
          className="logo"
        >
          <img src="/sites/nike/swoosh.svg" alt="Nike" />
        </a>
        <nav aria-label="Main Navigation" className="desktop-nav">
          {main.map((s) => (
            <button
              key={s}
              aria-expanded={menu === s}
              onMouseEnter={() => setMenu(s === "Sportswear" ? null : s)}
              onFocus={() => setMenu(s === "Sportswear" ? null : s)}
              onClick={() => {
                if (s === "Sportswear")
                  window.location.href = "https://www.nike.com/sportswear";
                else setMenu(s);
              }}
            >
              {t(s)}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="search-button"
            aria-label="Search"
            onClick={() => setSearch(true)}
          >
            <img className="nav-icon" src="/sites/nike/search.svg" alt="" />
            <span>{t("Search")}</span>
          </button>
          <a
            className="favorite"
            href="https://www.nike.com/favorites"
            aria-label="Favorites"
          >
            <img className="nav-icon" src="/sites/nike/heart.svg" alt="" />
          </a>
          <a
            className="mobile-only"
            href="https://www.nike.com/register"
            aria-label="Sign In"
          >
            <UserRound />
          </a>
          <a href="https://www.nike.com/cart" aria-label="Bag Items: 0">
            <img className="nav-icon" src="/sites/nike/bag.svg" alt="" />
          </a>
          <button
            className="mobile-only"
            aria-label="menu"
            onClick={() => {
              setMobileSport(false);
              setMobile(true);
            }}
          >
            <Menu />
          </button>
        </div>
        {menu && (
          <div className="mega-menu">
            {menus
              .find((item) => item.name === menu)
              ?.columns.map((col, i) => (
                <div key={i}>
                  {col.links.map((link, n) => (
                    <a
                      key={link.href + link.text}
                      href={
                        link.href ===
                        "https://www.nike.com/w/mens-shoes-nik1zy7ok"
                          ? "/w/mens-shoes-nik1zy7ok"
                          : link.href
                      }
                      className={n === 0 ? "menu-title" : ""}
                    >
                      {t(link.text)}
                    </a>
                  ))}
                </div>
              ))}
            <a className="visit-section" href={sourceLink(menu)}>
              Shop {t(menu)} <ChevronRight size={16} />
            </a>
          </div>
        )}
      </div>
      {menu && (
        <button
          className="menu-shade"
          aria-label="Close navigation"
          onClick={() => setMenu(null)}
        />
      )}
      {mobile && (
        <>
          <button
            className="drawer-shade"
            aria-label="Close Menu"
            onClick={() => setMobile(false)}
          />
          <nav
            className="mobile-drawer"
            aria-label="Mobile navigation"
            inert={mobileSport}
          >
            <button
              className="close"
              aria-label="Close Menu"
              onClick={() => setMobile(false)}
            >
              <X />
            </button>
            {main.map((s) =>
              s === "Sport" ? (
                <button
                  className="mobile-nav-link"
                  key={s}
                  onClick={() => setMobileSport(true)}
                >
                  {t(s)}
                  <ChevronRight />
                </button>
              ) : (
                <a className="mobile-nav-link" key={s} href={sourceLink(s)}>
                  {t(s)}
                  {s === "Sport" && <ChevronRight />}
                </a>
              ),
            )}
            <div className="drawer-brands">
              <img src="/sites/nike/brand-0.svg" alt="Jordan" /> Jordan
              <br />
              <img src="/sites/nike/brand-1.svg" alt="Converse" /> Converse
            </div>
            <p>
              Become a Nike Member for the best products, inspiration and
              stories in sport.{" "}
              <a href={sourceLink("Membership")}>Learn more</a>
            </p>
            <div className="member-actions">
              <a href={sourceLink("Join Us")}>{t("Join Us")}</a>
              <a href={sourceLink("Sign In")}>{t("Sign In")}</a>
            </div>
            {["Help", "Bag", "Orders", "Find a Store"].map((s) => (
              <a
                className="drawer-bottom"
                key={s}
                href={s === "Bag" ? "https://www.nike.com/cart" : sourceLink(s)}
              >
                {t(s)}
              </a>
            ))}
          </nav>
          {mobileSport && (
            <nav
              className="mobile-drawer sport-submenu"
              aria-label="Sport navigation"
            >
              <button
                className="sport-back"
                onClick={() => setMobileSport(false)}
              >
                <ChevronLeft size={20} />
                {persian ? "همه" : "All"}
              </button>
              <button
                className="close"
                aria-label="Close Menu"
                onClick={() => setMobile(false)}
              >
                <X />
              </button>
              <h2>{t("Sport")}</h2>
              {[
                ["All Conditions Gear", "acg"],
                ["Baseball", "baseball"],
                ["Basketball", "basketball"],
                ["Court", "court"],
                ["Football", "us-football"],
                ["Golf", "golf"],
                ["LockerRoom", "LockerRoom"],
                ["Running", "running"],
                ["Soccer", "soccer"],
                ["Sportswear", "sportswear"],
                ["Training", "training"],
              ].map(([name, path]) => (
                <a key={name} href={`https://www.nike.com/${path}`}>
                  {t(name)}
                </a>
              ))}
            </nav>
          )}
        </>
      )}
      {search && (
        <div
          className="search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div className="search-top">
            <img
              className="search-logo"
              src="/sites/nike/swoosh.svg"
              alt="Nike"
            />
            <form action="https://www.nike.com/w">
              <Search />
              <input
                autoFocus
                type="search"
                name="q"
                aria-label="Search Products"
                placeholder={t("Search")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
            <button onClick={() => setSearch(false)}>
              {persian ? "انصراف" : "Cancel"}
            </button>
          </div>
          <div className="search-content">
            <a href="https://www.nike.com" className="ask-ai">
              ✧　Ask NikeAI
            </a>
            <p>Popular Search Terms</p>
            <div>
              {[
                "moon shoe",
                "nike united",
                "basketball shoes",
                "jordan",
                "shoes",
                "socks",
                "air force 1",
                "soccer cleats",
              ].map((s) => (
                <a
                  key={s}
                  href={`https://www.nike.com/w?q=${encodeURIComponent(s)}`}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
export function Promotion({ persian }: { persian: boolean }) {
  const [slide, setSlide] = useState(0);
  const items = [
    "Shop New Arrivals",
    "Send a Gift Card",
    "Members: Free Shipping on Orders $50+",
  ];
  return (
    <div className="promotion">
      <button aria-label="Previous" onClick={() => setSlide((slide + 2) % 3)}>
        <ChevronLeft size={20} />
      </button>
      <a
        href={
          slide === 0
            ? "https://www.nike.com/w/new-3n82y"
            : slide === 1
              ? sourceLink("Send a Gift Card")
              : "https://www.nike.com/register"
        }
      >
        {translate(items[slide], persian)}
      </a>
      <button aria-label="Next" onClick={() => setSlide((slide + 1) % 3)}>
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
