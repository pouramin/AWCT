import catalog from "./catalog.json";
// Nike's lazy-loaded wall can repeat cards while refreshing. Keep one per URL.
export const products = catalog.products.filter(
  (product, index, list) =>
    list.findIndex((item) => item.href === product.href) === index,
);
export type Product = (typeof products)[number];
export const categories = [
  "Jordan",
  "Lifestyle",
  "Running",
  "Basketball",
  "Training & Gym",
  "Walking",
  "Soccer",
  "Skateboarding",
  "ACG",
  "Football",
  "Tennis",
  "Golf",
  "Baseball",
  "Boots",
  "Sandals & Slides",
  "Track & Field",
  "Nike By You",
  "Lacrosse",
  "Wrestling",
];
export function sourceLink(text: string) {
  return (
    (
      catalog.links.find((l) => l.label === `Category for ${text}`) ||
      catalog.links.find((l) => l.label?.trim() === text.trim()) ||
      catalog.links.find((l) => l.text.trim() === text)
    )?.href || "https://www.nike.com/help"
  );
}
export const stories = catalog.images
  .filter((i) =>
    catalog.links.some(
      (l) =>
        l.label?.trim() === i.alt.trim() &&
        l.href.startsWith("https://www.nike.com/a/"),
    ),
  )
  .filter((i, n, a) => a.findIndex((j) => j.alt === i.alt) === n);
export const campaign = catalog.images.find(
  (i) => i.alt === "TRAIN EVERYTHING",
);
export const groups: Record<string, string[]> = {
  "Gender (1)": ["Men", "Women", "Unisex"],
  "Sale & Offers": ["Sale"],
  Color: [
    "Black",
    "Blue",
    "Brown",
    "Green",
    "Grey",
    "Multi-Color",
    "Orange",
    "Pink",
    "Purple",
    "Red",
    "White",
    "Yellow",
  ],
  "Shop by Price": [
    "$0 - $25",
    "$25 - $50",
    "$50 - $100",
    "$100 - $150",
    "$150 - $200",
    "Over $200",
  ],
  Size: Array.from(
    { length: 25 },
    (_, i) => `M ${3 + i / 2} / W ${4.5 + i / 2}`,
  ),
  Brand: ["Nike Sportswear", "Jordan", "Kobe", "Nike By You"],
  Collections: [
    "Nike Court Vision",
    "Nike Ava",
    "Nike Total 90",
    "Nike Ultrafly",
  ],
  Sports: ["Lifestyle", "Performance", "Running", "Training & Gym"],
  "Shoe Height": ["Low Top", "Mid Top", "High Top"],
  "Closure Type": ["Slip On", "Strap", "Zipper", "Toggle"],
  Width: ["Regular", "Wide", "Extra Wide"],
};
const fa: Record<string, string> = {
  "Men's Shoes & Sneakers": "کفش‌های مردانه",
  Men: "مردانه",
  Women: "زنانه",
  Kids: "بچگانه",
  Jordan: "جردن",
  Sport: "ورزش",
  Sportswear: "پوشاک ورزشی",
  Search: "جستجو",
  "Pick Up Today": "تحویل حضوری امروز",
  "Hide Filters": "پنهان کردن فیلترها",
  "Show Filters": "نمایش فیلترها",
  "Sort By": "مرتب‌سازی",
  Featured: "پیشنهادی",
  Newest: "جدیدترین",
  "Price: High-Low": "قیمت: زیاد به کم",
  "Price: Low-High": "قیمت: کم به زیاد",
  Filter: "فیلتر",
  "Gender (1)": "جنسیت (۱)",
  "Sale & Offers": "تخفیف‌ها",
  Color: "رنگ",
  "Shop by Price": "محدوده قیمت",
  Size: "اندازه",
  Brand: "برند",
  Collections: "مجموعه‌ها",
  Sports: "ورزش‌ها",
  "Shoe Height": "ارتفاع کفش",
  "Closure Type": "نوع بسته شدن",
  Width: "عرض",
  Apply: "اعمال",
  Clear: "پاک کردن",
  "Coming Soon": "به‌زودی",
  "Just In": "تازه رسیده",
  "Men's Shoes": "کفش مردانه",
  "Related Stories": "مطالب مرتبط",
  Resources: "منابع",
  Help: "راهنما",
  Company: "شرکت",
  "Promotions & Discounts": "پیشنهادها و تخفیف‌ها",
  "United States": "ایالات متحده",
  "Select your Location": "موقعیت مکانی خود را انتخاب کنید",
  Language: "زبان",
  "Find a Store": "یافتن فروشگاه",
  "Join Us": "عضو شوید",
  "Sign In": "ورود",
  "Shop New Arrivals": "خرید تازه‌ها",
  Lifestyle: "روزمره",
  Running: "دویدن",
  Basketball: "بسکتبال",
  "Training & Gym": "تمرین و باشگاه",
  Walking: "پیاده‌روی",
  Soccer: "فوتبال",
  Unisex: "یونیسکس",
  Sale: "حراج",
  Black: "مشکی",
  White: "سفید",
  Brown: "قهوه‌ای",
  Blue: "آبی",
  Green: "سبز",
  Grey: "خاکستری",
  Orange: "نارنجی",
  Pink: "صورتی",
  Purple: "بنفش",
  Red: "قرمز",
  Yellow: "زرد",
  "Multi-Color": "چندرنگ",
  "Men's Training Shoes": "کفش تمرین مردانه",
  "Basketball Shoes": "کفش بسکتبال",
  "Men's Shoes With Reflective Accents": "کفش مردانه با جزئیات بازتابنده",
  "Shop Hybrid": "خرید هایبرید",
  "TRAIN EVERYTHING": "برای همه‌چیز تمرین کن",
};
export function translate(text: string, persian: boolean) {
  return persian ? fa[text] || text : text;
}
