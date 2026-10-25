"use client";
import { Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useSyncExternalStore } from "react";
import { sourceLink, stories, translate } from "./data";
const subscribeViewport = (notify: () => void) => {
  const media = window.matchMedia("(min-width: 961px)");
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const sections: Record<string, string[]> = {
  Resources: [
    "Gift Cards",
    "Corporate Sales",
    "Find a Store",
    "Membership",
    "Product News",
    "Magazine",
    "Site Feedback",
  ],
  Help: [
    "Get Help",
    "Order Status",
    "Shipping and Delivery",
    "Returns",
    "Order Cancellation",
    "Payment Options",
    "Gift Card Balance",
    "Contact Us",
  ],
  Company: [
    "About Nike",
    "News",
    "Careers",
    "Investors",
    "Purpose",
    "Sustainability",
    "Accessibility",
  ],
  "Promotions & Discounts": [
    "Student",
    "Military",
    "Teacher",
    "First Responders & Medical Professionals",
    "Birthday",
  ],
};
export function Stories({ persian }: { persian: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section className="stories">
      <div className="stories-heading">
        <h2>{translate("Related Stories", persian)}</h2>
        <div>
          <button
            aria-label="Previous stories"
            onClick={() =>
              ref.current?.scrollBy({
                left: persian ? 650 : -650,
                behavior: "smooth",
              })
            }
          >
            <ChevronLeft />
          </button>
          <button
            aria-label="Next stories"
            onClick={() =>
              ref.current?.scrollBy({
                left: persian ? -650 : 650,
                behavior: "smooth",
              })
            }
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="story-track" ref={ref}>
        {stories.map((s, i) => (
          <a href={sourceLink(s.alt)} key={s.alt}>
            <img src={s.local} alt={s.alt} loading="lazy" />
            <span>{i === 0 ? "Styling Tips" : "Buying Guide"}</span>
            <h3>{s.alt}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}
export function Footer({
  persian,
  onLocation,
}: {
  persian: boolean;
  onLocation: () => void;
}) {
  const desktop = useSyncExternalStore(
    subscribeViewport,
    () => window.matchMedia("(min-width: 961px)").matches,
    () => true,
  );
  return (
    <footer className="footer">
      <div className="footer-main">
        {Object.entries(sections).map(([title, links], i) => (
          <details key={title} open={desktop || i === 0 || undefined}>
            <summary>{translate(title, persian)}</summary>
            <div>
              {links.map((s) => (
                <a href={sourceLink(s)} key={s}>
                  {translate(s, persian)}
                </a>
              ))}
            </div>
          </details>
        ))}
        <button
          className="location-button"
          onClick={onLocation}
          aria-label="Selected Location: United States"
        >
          <Globe size={16} />
          {translate("United States", persian)}
        </button>
      </div>
      <div className="legal">
        <span>© 2026 Nike, Inc. All Rights Reserved.</span>
        <details>
          <summary>Guides</summary>
          <a href="https://www.nike.com/help/a/size-charts">Size Charts</a>
          <a href="https://www.nike.com/a">Buying Guides</a>
        </details>
        {[
          "Terms of Sale",
          "Terms of Use",
          "Nike Privacy Policy",
          "Your Privacy Choices",
          "CA Supply Chains Act",
        ].map((s) => (
          <a key={s} href={sourceLink(s)}>
            {s}
          </a>
        ))}
        <button onClick={onLocation}>
          {translate("Language", persian)}: {persian ? "فارسی" : "English"}
        </button>
      </div>
    </footer>
  );
}
