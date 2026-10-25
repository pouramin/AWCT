"""Download the iPhone 18 Pro overview assets used by the local clone.

Usage: python -I scripts/download-apple-iphone-18-pro.py <large_list.txt>
Each line of the list is a source path ending in `_large.jpg|png`. For each one the
script saves the `large_2x` and `small_2x` renditions under
public/sites/apple-iphone-18-pro/images/, plus the overview videos, and writes
docs/research/apple-iphone-18-pro/asset-map.json (source URL -> local path).
"""
import json, os, sys, struct, urllib.request
from concurrent.futures import ThreadPoolExecutor

ORIGIN = "https://www.apple.com"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "sites", "apple-iphone-18-pro")
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140 Safari/537.36"
PREFIX = "/v/iphone-18-pro/d/images/"
VIDEO_BASE = "/105/media/us/iphone-18-pro/2026/{uid}/anim/{name}/{size}.mp4"
VIDEOS = {
    "591df885-5ee2-4173-86e6-401021249f7c": ["hero", "highlights-camera", "highlights-colors", "highlights-chip",
        "viewer-aperture", "viewer-dynamic-island", "camera-system", "8x-zoom", "pro-video", "4k-timelapse",
        "battery", "performance"],
    "e92adf1e-6ecf-423b-ad9b-15223f67b546": ["highlights-battery"],
}

def dims(data):
    if data[:8] == b"\x89PNG\r\n\x1a\n":
        return struct.unpack(">II", data[16:24])
    if data[:2] == b"\xff\xd8":
        i = 2
        while i < len(data):
            if data[i] != 0xFF: i += 1; continue
            m = data[i + 1]
            if m in (0xC0, 0xC1, 0xC2):
                h, w = struct.unpack(">HH", data[i + 5:i + 9]); return (w, h)
            i += 2 + struct.unpack(">H", data[i + 2:i + 4])[0]
    return None

def fetch(src, dest):
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        data = open(dest, "rb").read(); ctype = "cached"
    else:
        req = urllib.request.Request(ORIGIN + src, headers={"User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                data = r.read(); ctype = r.headers.get("Content-Type", "")
        except Exception as e:  # keep going; report missing renditions
            return {"src": ORIGIN + src, "error": str(e)}
        if "text/html" in ctype:
            return {"src": ORIGIN + src, "error": "html response"}
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        open(dest, "wb").write(data)
    d = dims(data)
    return {"src": ORIGIN + src, "local": "/" + os.path.relpath(dest, os.path.join(ROOT, "public")).replace(os.sep, "/"),
            "bytes": len(data), "type": ctype, "size": list(d) if d else None}

def jobs(list_file):
    for line in open(list_file, encoding="utf-8"):
        p = line.strip()
        if not p: continue
        rel = p[len(PREFIX):]
        for variant in ("large_2x", "small_2x"):
            src = p.replace("_large.", f"_{variant}.")
            yield src, os.path.join(OUT, "images", rel.replace("_large.", f"_{variant}."))
    for uid, names in VIDEOS.items():
        for name in names:
            for size in ("large", "small"):
                src = VIDEO_BASE.format(uid=uid, name=name, size=size)
                yield src, os.path.join(OUT, "videos", f"{name}-{size}.mp4")

with ThreadPoolExecutor(8) as ex:
    results = list(ex.map(lambda j: fetch(*j), jobs(sys.argv[1])))
os.makedirs(os.path.join(ROOT, "docs", "research", "apple-iphone-18-pro"), exist_ok=True)
json.dump(results, open(os.path.join(ROOT, "docs", "research", "apple-iphone-18-pro", "asset-map.json"), "w"), indent=1)
errs = [r for r in results if "error" in r]
print(len(results), "assets;", len(errs), "errors;", sum(r.get("bytes", 0) for r in results) // 1024 // 1024, "MB")
for e in errs: print("ERR", e["src"], e["error"])
