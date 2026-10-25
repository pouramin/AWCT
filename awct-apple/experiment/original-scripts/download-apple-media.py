from pathlib import Path
from bs4 import BeautifulSoup
import json, urllib.request, concurrent.futures
root=Path(__file__).resolve().parents[1]
out=root/'apps/apple/public/sites/apple'
inventory=json.loads((root/'temp/apple/inventory.json').read_text())
jobs=[(x['url'],x['name']) for x in inventory['assets'] if x['kind']=='font']
soup=BeautifulSoup((root/'temp/apple/source.html').read_text(encoding='utf-8'),'html.parser')
media={}
for video in soup.select('video'):
    base=video.get('data-inline-media-basepath') or video.get('data-video-basepath')
    if not base: continue
    name=base.strip('/').rsplit('/',1)[-1]
    media[name]={}
    for size in ['large','small']:
        file=f'video-{name}-{size}.mp4'
        media[name][size]='/sites/apple/'+file
        jobs.append(('https://www.apple.com'+base+size+'_2x.mp4',file))
def get(job):
    url,name=job
    try:
        dest=out/name
        if not dest.exists():
            with urllib.request.urlopen(url,timeout=35) as r: dest.write_bytes(r.read())
        return None
    except Exception as e: return {'url':url,'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool: failures=[x for x in pool.map(get,jobs) if x]
(root/'apps/apple/src/components/sites/apple/media.json').write_text(json.dumps(media,indent=2))
(root/'docs/research/apple/media-map.json').write_text(json.dumps({'jobs':jobs,'failures':failures},indent=2))
print({'downloads':len(jobs),'failures':failures})
