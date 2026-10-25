"""Turn raw Apple evidence into the clone's JSON data files.

Usage: python -I scripts/extract-apple-iphone-18-pro-data.py
Reads docs/research/apple-iphone-18-pro/raw/{flyouts.json,searchlinks.json,page.html}
Writes src/components/sites/apple-iphone-18-pro/data/{global-nav,footer}.en.json
"""
import json, os, re
from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "docs", "research", "apple-iphone-18-pro", "raw")
OUT = os.path.join(ROOT, "src", "components", "sites", "apple-iphone-18-pro", "data")
APPLE = "https://www.apple.com"

def absolute(url):
    if not url: return url
    if url.startswith("/"): return APPLE + url
    return url

LABELS = {"store": "Store", "mac": "Mac", "ipad": "iPad", "iphone": "iPhone", "watch": "Watch", "vision": "Vision",
          "airpods": "AirPods", "tv-home": "Home", "entertainment": "Entertainment", "accessories": "Accessories",
          "support": "Support"}
HREFS = {"store": "/us/shop/goto/store", "mac": "/mac/", "ipad": "/ipad/", "iphone": "/iphone/", "watch": "/watch/",
         "vision": "/apple-vision-pro/", "airpods": "/airpods/", "tv-home": "/home/", "entertainment": "/entertainment/",
         "accessories": "/us/shop/goto/buy_accessories", "support": "https://support.apple.com/?cid=gn-ols-home-hp-tab"}

def links(items):
    return [{"label": l["text"], "href": absolute(l["url"])} for l in items or []]

nav = []
for item in json.load(open(os.path.join(RAW, "flyouts.json"), encoding="utf-8")):
    if item["name"] not in LABELS: continue
    groups = []
    for g in item.get("elevatedGroups", []):
        groups.append({"title": g["title"], "elevated": links(g.get("elevatedLinks")), "links": links(g.get("baseLinks"))})
    for g in item.get("baseGroups", []):
        groups.append({"title": g["title"], "elevated": [], "links": links(g.get("baseLinks"))})
    nav.append({"id": item["name"], "label": LABELS[item["name"]], "href": absolute(HREFS[item["name"]]), "groups": groups})
search = json.load(open(os.path.join(RAW, "searchlinks.json"), encoding="utf-8"))
quick = [{"label": r["label"], "href": r["url"]} for s in search["results"] if s["sectionName"] == "quickLinks" for r in s["sectionResults"]]
json.dump({"items": nav, "searchQuickLinks": quick}, open(os.path.join(OUT, "global-nav.en.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)

soup = BeautifulSoup(open(os.path.join(RAW, "page.html"), encoding="utf-8").read(), "html.parser")
footer = soup.find(id="ac-globalfooter")
T = lambda e: " ".join(e.get_text(" ").split())

def clean_html(node):
    for tag in node.find_all(True):
        if tag.name == "a":
            href = absolute(tag.get("href"))
            tag.attrs = {"href": href}
        elif tag.name in ("sup", "br", "b", "strong", "em", "i"):
            tag.attrs = {}
        else:
            tag.unwrap()
    return re.sub(r"\s+", " ", "".join(str(c) for c in node.contents)).strip()

footnotes = []
for li in footer.select(".ac-gf-sosumi li"):
    parent = li.find_parent(["ol", "ul"])
    number = None
    if parent is not None and parent.name == "ol":
        number = parent.find_all("li", recursive=False).index(li) + 1
    footnotes.append({"id": li.get("id"), "number": number, "html": clean_html(li)})
for p in footer.select(".ac-gf-sosumi > p, .ac-gf-sosumi .ac-gf-sosumi-text > p"):
    footnotes.append({"id": None, "number": None, "html": clean_html(p)})

columns = []
for col in footer.select(".ac-gf-directory-column"):
    sections = []
    for sec in col.select(".ac-gf-directory-column-section"):
        title = sec.select_one("h3, .ac-gf-directory-column-section-title-text")
        label = T(title) if title else ""
        half = label[: len(label) // 2].strip()
        if label == f"{half} {half}": label = half  # button + heading both carry the title
        sections.append({"title": label, "links": [{"label": T(a), "href": absolute(a.get("href"))} for a in sec.select("ul a")]})
    columns.append(sections)

legal = {
    "shop": clean_html(footer.select_one(".ac-gf-footer-shop")),
    "copyright": T(footer.select_one(".ac-gf-footer-legal-copyright")),
    "links": [{"label": T(a), "href": absolute(a.get("href"))} for a in footer.select(".ac-gf-footer-legal-link")],
    "locale": {"label": T(footer.select_one(".ac-gf-footer-locale-link")), "href": absolute(footer.select_one(".ac-gf-footer-locale-link").get("href"))},
}
json.dump({"footnotes": footnotes, "columns": columns, "legal": legal}, open(os.path.join(OUT, "footer.en.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(len(nav), "nav items;", len(footnotes), "footnotes;", [len(c) for c in columns], "columns")
