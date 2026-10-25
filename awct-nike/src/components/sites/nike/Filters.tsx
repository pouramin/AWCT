"use client";
import { ChevronDown } from "lucide-react";
import { groups, translate } from "./data";
export const sortOptions = [
  "Featured",
  "Newest",
  "Price: High-Low",
  "Price: Low-High",
];
export type Selection = Record<string, string[]>;
export function FilterOptions({
  selection,
  onChange,
  persian,
  sheet = false,
}: {
  selection: Selection;
  onChange: (group: string, value: string) => void;
  persian: boolean;
  sheet?: boolean;
}) {
  const t = (s: string) => translate(s, persian);
  return (
    <div className="filter-options">
      {Object.entries(groups).map(([group, values]) => (
        <details key={group} open={sheet || undefined}>
          <summary>
            {t(group)}
            <ChevronDown size={18} />
          </summary>
          {["Size", "Shoe Height", "Closure Type", "Width"].includes(group) && (
            <a
              className="availability-link"
              href="https://www.nike.com/w/mens-shoes-nik1zy7ok"
            >
              {persian
                ? "مشاهده موجودی و گزینه‌ها در نایکی"
                : "Check availability and options on Nike"}
            </a>
          )}
          <div
            className={
              group === "Size"
                ? "size-options"
                : group === "Color"
                  ? "color-options"
                  : "check-options"
            }
          >
            {values.map((value) => (
              <label key={value}>
                <input
                  type="checkbox"
                  disabled={[
                    "Size",
                    "Shoe Height",
                    "Closure Type",
                    "Width",
                  ].includes(group)}
                  checked={selection[group]?.includes(value) || false}
                  onChange={() => onChange(group, value)}
                />
                {group === "Color" && (
                  <span
                    className="color-dot"
                    style={{
                      background:
                        value === "Multi-Color"
                          ? "conic-gradient(red,yellow,green,blue,red)"
                          : value.toLowerCase(),
                    }}
                  />
                )}
                <span>{t(value)}</span>
              </label>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
