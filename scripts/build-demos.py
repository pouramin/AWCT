#!/usr/bin/env python3
"""Build the four preserved Next.js experiments for static GitHub Pages.
Changes only the ephemeral GitHub Actions checkout, not the archival originals.
"""
from pathlib import Path
import subprocess, shutil, re, sys, os, json

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/"_site"
APPS=[
("pouramin", ROOT/"awct-pouramin"),
("nike", ROOT/"awct-nike"),
("apple-codex", ROOT/"awct-apple"),
("apple-claude", ROOT/"AWCT-Apple-Claude"/"project"),
]
def sh(args,cwd):
    print("EXEC", " ".join(args), "CWD",cwd, flush=True)
    subprocess.run(args,cwd=cwd,check=True)

def convert(slug,app):
    prefix=f"/AWCT/demo/{slug}"
    config=app/"next.config.ts"
    config.write_text("""import type { NextConfig } from "next";
const config: NextConfig = { output: "export", basePath: %s, trailingSlash: true, images: { unoptimized: true }, devIndicators: false };
export default config;
""" % json.dumps(prefix),encoding="utf-8")
    # Asset paths in author-generated code are literal site-root URLs, so
    # move them into the mounted basePath before building.
    for scope in ("src",):
        for fp in (app/scope).rglob("*"):
            if fp.is_file() and fp.suffix.lower() in (".tsx",".ts",".js",".jsx",".css",".json"):
                text=fp.read_text(encoding="utf-8")
                # Only assets, not outbound Apple/Nike URLs or source citations.
                updated=text.replace("/sites/",prefix+"/sites/")
                # Public static non-site assets.
                updated=updated.replace('"/images/', '"'+prefix+'/images/').replace("'/images/","'"+prefix+"/images/")
                if updated!=text:fp.write_text(updated,encoding="utf-8")
    if slug=="apple-claude":
        # Next.js redirect() is not compatible with static HTML export.
        home=app/"src/app/(en)/page.tsx"
        home.write_text('export { default } from "./iphone-18-pro/page";\n',encoding="utf-8")

def main():
    OUT.mkdir(exist_ok=True)
    shutil.copy2(ROOT/"index.html",OUT/"index.html")
    (OUT/".nojekyll").touch()
    for slug,app in APPS:
        print("\n### EXPORT",slug,flush=True)
        convert(slug,app)
        sh(["npm","ci","--no-audit","--no-fund"],app)
        sh(["npm","run","build"],app)
        generated=app/"out"
        if not generated.is_dir():raise RuntimeError("Static out missing for "+slug)
        dest=OUT/"demo"/slug
        shutil.copytree(generated,dest,dirs_exist_ok=True)
        # Identify all demo pages explicitly as independent research replicas.
        for html in dest.rglob("*.html"):
            doc=html.read_text(encoding="utf-8")
            notice='<aside aria-label="Research replica notice" style="position:fixed;bottom:8px;left:8px;z-index:2147483640;padding:8px 12px;font:600 11px Arial,sans-serif;letter-spacing:.02em;color:#fff;background:#173055e8;border-radius:9px;box-shadow:0 3px 13px #0004">TunnelLab AWCT · Independent research replica · <a href="/AWCT/" style="color:#fff;text-decoration:underline">Back to experiment</a></aside>'
            if "</body>" in doc:html.write_text(doc.replace("</body>",notice+"</body>"),encoding="utf-8")
        count=len(list(dest.rglob("*.html")))
        print("EXPORTED",slug,"HTML",count,"path",dest,flush=True)
        if count<1:raise RuntimeError("No HTML pages for "+slug)
    print("ALL DEMOS EXPORTED",flush=True)

if __name__=="__main__":main()
