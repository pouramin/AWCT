"use client";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  Fragment,
  type ReactNode,
} from "react";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { Header, Promotion } from "./Header";
import { FilterOptions, sortOptions, type Selection } from "./Filters";
import { ProductCard } from "./ProductCard";
import { Footer, Stories } from "./Footer";
import { products, categories, campaign, sourceLink, translate } from "./data";
function Modal({
  title,
  children,
  onClose,
  className = "",
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="modal-content">
        <div className="modal-heading">
          <h2>{title}</h2>
          <button className="round" aria-label="Close" onClick={onClose}>
            <X />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
const subscribeLanguage = (notify: () => void) => {
  window.addEventListener("storage", notify);
  window.addEventListener("nike-language", notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener("nike-language", notify);
  };
};
export function Catalog() {
  const persian = useSyncExternalStore(
    subscribeLanguage,
    () => localStorage.getItem("nike-clone-language") === "fa",
    () => false,
  );
  const [filters, setFilters] = useState(true),
    [sheet, setSheet] = useState(false),
    [sort, setSort] = useState("Featured"),
    [sortOpen, setSortOpen] = useState(false),
    [selection, setSelection] = useState<Selection>({ "Gender (1)": ["Men"] }),
    [draft, setDraft] = useState<Selection>({}),
    [draftSort, setDraftSort] = useState("Featured"),
    [location, setLocation] = useState(false),
    [pickup, setPickup] = useState(false),
    [zip, setZip] = useState("");
  const t = (s: string) => translate(s, persian);
  useEffect(() => {
    document.documentElement.lang = persian ? "fa" : "en";
    document.documentElement.dir = persian ? "rtl" : "ltr";
  }, [persian]);
  const changeLanguage = (fa: boolean) => {
    localStorage.setItem("nike-clone-language", fa ? "fa" : "en");
    window.dispatchEvent(new Event("nike-language"));
    setLocation(false);
  };
  const update = (
    value: Selection,
    group: string,
    item: string,
  ): Selection => ({
    ...value,
    [group]: value[group]?.includes(item)
      ? value[group].filter((v) => v !== item)
      : [...(value[group] || []), item],
  });
  const active = Object.values(selection).reduce((sum, v) => sum + v.length, 0);
  const openSheet = () => {
    setDraft(structuredClone(selection));
    setDraftSort(sort);
    setSheet(true);
  };
  const meaningful = Object.entries(selection).some(
    ([k, v]) => v.length && (k !== "Gender (1)" || v.join() !== "Men"),
  );
  let shown = products.filter((p) => {
    const price = Number(p.price?.match(/[\d.]+/)?.[0] || 0),
      colors = selection.Color || [],
      brands = selection.Brand || [],
      prices = selection["Shop by Price"] || [];
    if (
      colors.length &&
      !colors.some((c) =>
        p.images.some((i) => i.alt.toLowerCase().includes(c.toLowerCase())),
      )
    )
      return false;
    if (
      brands.length &&
      !brands.some((b) =>
        b === "Jordan"
          ? p.name?.includes("Jordan")
          : b === "Nike Sportswear"
            ? p.name?.startsWith("Nike")
            : p.name?.includes(b),
      )
    )
      return false;
    if (
      selection["Sale & Offers"]?.length &&
      (p.price?.match(/\$/g)?.length || 0) < 2
    )
      return false;
    if (
      selection.Collections?.length &&
      !selection.Collections.some((v) => p.name?.includes(v))
    )
      return false;
    if (
      selection.Sports?.length &&
      !selection.Sports.some(
        (v) =>
          (p.subtitle || "")
            .toLowerCase()
            .includes(v === "Training & Gym" ? "training" : v.toLowerCase()) ||
          (v === "Lifestyle" && p.subtitle === "Men's Shoes") ||
          (v === "Performance" && p.subtitle !== "Men's Shoes"),
      )
    )
      return false;
    if (
      prices.length &&
      !prices.some((v) => {
        const nums = v.match(/\d+/g)?.map(Number) || [];
        return v === "Over $200"
          ? price > 200
          : price >= nums[0] && price <= nums[1];
      })
    )
      return false;
    const gender = selection["Gender (1)"] || [];
    if (
      gender.length === 1 &&
      gender[0] === "Women" &&
      !p.subtitle?.includes("Women")
    )
      return false;
    return true;
  });
  if (sort === "Price: Low-High" || sort === "Price: High-Low")
    shown = [...shown].sort(
      (a, b) =>
        (Number(a.price?.match(/[\d.]+/)?.[0]) -
          Number(b.price?.match(/[\d.]+/)?.[0])) *
        (sort === "Price: High-Low" ? -1 : 1),
    );
  if (sort === "Newest")
    shown = [...shown].sort(
      (a, b) => Number(b.status === "Just In") - Number(a.status === "Just In"),
    );
  return (
    <div className="nike" dir={persian ? "rtl" : "ltr"}>
      <Header persian={persian} />
      <Promotion persian={persian} />
      <div className="catalog-heading">
        <h1>
          {t("Men's Shoes & Sneakers")}{" "}
          <span>({meaningful ? shown.length : 790})</span>
        </h1>
        <div className="catalog-tools">
          <button onClick={() => setFilters(!filters)} aria-expanded={filters}>
            {t(filters ? "Hide Filters" : "Show Filters")}
            <SlidersHorizontal size={20} />
          </button>
          <div className="sort">
            <button
              aria-expanded={sortOpen}
              onClick={() => setSortOpen(!sortOpen)}
            >
              {t("Sort By")}
              {sort !== "Featured" && `: ${t(sort)}`}
              <ChevronDown size={19} />
            </button>
            {sortOpen && (
              <div className="sort-menu" role="menu">
                {sortOptions.map((s) => (
                  <button
                    role="menuitem"
                    key={s}
                    onClick={() => {
                      setSort(s);
                      setSortOpen(false);
                    }}
                  >
                    {t(s)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <nav className="mobile-categories" aria-label="Categories">
        {categories.map((s) => (
          <a key={s} href={sourceLink(s)}>
            {t(s)}
          </a>
        ))}
      </nav>
      <div className="mobile-pickup">
        <span>{t("Pick Up Today")}</span>
        <button
          className="toggle"
          role="switch"
          aria-checked={false}
          aria-label="Pick Up Today"
          onClick={() => setPickup(true)}
        />
      </div>
      <div className="mobile-filter-bar">
        <button aria-label="Show Filters" onClick={openSheet}>
          <SlidersHorizontal size={18} />({active})
        </button>
        {["Gender (1)", "Sale & Offers", "Color", "Shop by Price", "Size"].map(
          (g) => (
            <button key={g} onClick={openSheet}>
              {t(g)}
              <ChevronDown size={17} />
            </button>
          ),
        )}
      </div>
      <div className={`catalog-body ${filters ? "" : "filters-hidden"}`}>
        <aside className="sidebar">
          <div className="pickup">
            <span>{t("Pick Up Today")}</span>
            <button
              className="toggle"
              role="switch"
              aria-checked={false}
              aria-label="Pick Up Today"
              onClick={() => setPickup(true)}
            />
          </div>
          <nav aria-label="Categories">
            {categories.map((s) => (
              <a href={sourceLink(s)} key={s}>
                {t(s)}
              </a>
            ))}
          </nav>
          <FilterOptions
            selection={selection}
            persian={persian}
            onChange={(g, v) => setSelection(update(selection, g, v))}
          />
        </aside>
        <main className="results" id="products">
          {meaningful && (
            <div className="active-filters">
              <button onClick={() => setSelection({ "Gender (1)": ["Men"] })}>
                {t("Clear")} <X size={14} />
              </button>
              {Object.entries(selection).flatMap(([g, vs]) =>
                g === "Gender (1)"
                  ? []
                  : vs.map((v) => (
                      <button
                        key={g + v}
                        onClick={() => setSelection(update(selection, g, v))}
                      >
                        {t(v)}
                        <X size={14} />
                      </button>
                    )),
              )}
            </div>
          )}
          <div className="product-grid">
            {shown.map((p, i) => (
              <Fragment key={p.href}>
                {!meaningful && sort === "Featured" && i === 4 && campaign && (
                  <a
                    className="campaign"
                    href="https://www.nike.com/w/mens-hybrid-training-8wvhhznik1"
                  >
                    <picture>
                      <source
                        media="(min-width: 961px)"
                        srcSet="/sites/nike/campaign-desktop.jpg"
                      />
                      <img src={campaign.local} alt="TRAIN EVERYTHING" />
                    </picture>
                    <div>
                      <h2>{t("TRAIN EVERYTHING")}</h2>
                      <span>{t("Shop Hybrid")}</span>
                    </div>
                  </a>
                )}
                <ProductCard product={p} persian={persian} />
              </Fragment>
            ))}
          </div>
          {shown.length === 0 && (
            <div className="empty">
              <h2>{persian ? "محصولی یافت نشد" : "No matching products"}</h2>
              <button onClick={() => setSelection({ "Gender (1)": ["Men"] })}>
                {t("Clear")}
              </button>
            </div>
          )}
          <a
            className="more-products"
            href="https://www.nike.com/w/mens-shoes-nik1zy7ok"
          >
            {persian
              ? "مشاهده همه محصولات در نایکی"
              : "View all products on Nike"}
          </a>
          <Stories persian={persian} />
        </main>
      </div>
      <Footer persian={persian} onLocation={() => setLocation(true)} />
      {sheet && (
        <Modal
          title={t("Filter")}
          onClose={() => setSheet(false)}
          className="filter-sheet"
        >
          <h3>{t("Sort By")}</h3>
          <div className="sort-radios">
            {sortOptions.map((s) => (
              <label key={s}>
                <input
                  type="radio"
                  name="sort"
                  checked={draftSort === s}
                  onChange={() => setDraftSort(s)}
                />
                {t(s)}
              </label>
            ))}
          </div>
          <FilterOptions
            sheet
            selection={draft}
            persian={persian}
            onChange={(g, v) => setDraft(update(draft, g, v))}
          />
          <div className="sheet-actions">
            <button onClick={() => setDraft({})}>
              {t("Clear")} ({Object.values(draft).flat().length})
            </button>
            <button
              onClick={() => {
                setSelection(draft);
                setSort(draftSort);
                setSheet(false);
              }}
            >
              {t("Apply")}
            </button>
          </div>
        </Modal>
      )}
      {location && (
        <Modal
          title={t("Select your Location")}
          onClose={() => setLocation(false)}
          className="location-modal"
        >
          {["Africa", "Americas", "Asia Pacific", "Europe", "Middle East"].map(
            (region) => (
              <details key={region}>
                <summary>
                  {region}
                  <ChevronDown />
                </summary>
                <div>
                  {(region === "Americas"
                    ? ["United States", "Canada", "México", "Brasil"]
                    : region === "Europe"
                      ? ["Italia", "United Kingdom", "France", "Deutschland"]
                      : region === "Middle East"
                        ? [
                            "Saudi Arabia",
                            "United Arab Emirates",
                            "Qatar",
                            "Kuwait",
                          ]
                        : region === "Africa"
                          ? ["South Africa", "Egypt"]
                          : ["Australia", "日本", "대한민국", "中国"]
                  ).map((country) => (
                    <a
                      key={country}
                      href={
                        country === "United States"
                          ? "/w/mens-shoes-nik1zy7ok"
                          : "https://www.nike.com/language_tunnel"
                      }
                    >
                      {country}　English
                    </a>
                  ))}
                </div>
              </details>
            ),
          )}
          <h3>{t("Language")}</h3>
          <div className="language-choices">
            <button
              onClick={() => changeLanguage(false)}
              aria-pressed={!persian}
            >
              English
            </button>
            <button
              lang="fa"
              dir="rtl"
              onClick={() => changeLanguage(true)}
              aria-pressed={persian}
            >
              فارسی
            </button>
          </div>
        </Modal>
      )}
      {pickup && (
        <Modal title={t("Pick Up Today")} onClose={() => setPickup(false)}>
          <p>
            {persian
              ? "برای مشاهده موجودی فروشگاه‌ها به نایکی مراجعه کنید."
              : "Find products available near you on Nike."}
          </p>
          <label className="zip-label">
            {persian ? "کد پستی" : "Enter ZIP code"}
            <input
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              autoComplete="postal-code"
              inputMode="numeric"
            />
          </label>
          <a className="black-button" href="https://www.nike.com/retail">
            {t("Find a Store")}
          </a>
        </Modal>
      )}
    </div>
  );
}
