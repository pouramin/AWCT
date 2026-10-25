"""Extract public reference content and assets; never copy production JavaScript."""
from pathlib import Path
from bs4 import BeautifulSoup
import json, re, urllib.request, concurrent.futures

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'apps/apple/public/sites/apple'
OUT.mkdir(parents=True, exist_ok=True)
html = (ROOT / 'temp/apple/source.html').read_text(encoding='utf-8')
soup = BeautifulSoup(html, 'html.parser')
assets = {}
def asset(url):
    url = url.split(',')[0].split(' ')[0]
    if not url or url.startswith('data:'): return ''
    url = 'https://www.apple.com' + url if url.startswith('/') else url
    name = url.split('/images/', 1)[-1].replace('/', '--') if '/images/' in url else url.rsplit('/', 1)[-1]
    assets[url] = '/sites/apple/' + name
    return assets[url]
def picture(pic):
    image = pic.find('img')
    if not image: return None
    src = image.get('src', '')
    if src.startswith('data:'): return None
    small = pic.find('source', media='(max-width:734px)')
    return {'key': pic.get('class', [''])[0], 'src':asset(src), 'small':asset(small['srcset']) if small else asset(src), 'alt': image.get('alt','')}
def text(el):
    return re.sub(r'\s+', ' ', el.get_text(' ', strip=True)).strip() if el else ''
sections = []
for section in soup.select('main section'):
    pics = {}
    for pic in section.select('picture'):
        p = picture(pic)
        if p: pics[p['key']] = p
    cards = []
    for li in section.select('.gallery-item, .item-container'):
        h = li.find(['h3','h4'])
        if not h: continue
        p = li.find('p')
        pp = [picture(x) for x in li.select('picture')]
        cards.append({'title':text(h), 'text':text(p), 'picture':next((x for x in pp if x),None)})
    sections.append({'id':section.get('id',''), 'key':section.get('class',['',''])[1], 'headings':[text(x) for x in section.find_all(['h2','h3'])], 'paragraphs':[text(x) for x in section.find_all('p')], 'pictures':list(pics.values()), 'cards':cards, 'links':[{'text':text(a),'href':a.get('href','')} for a in section.select('a[href]') if not a.get('href','').startswith('#')]})
data = ROOT / 'apps/apple/src/components/sites/apple'
data.mkdir(parents=True,exist_ok=True)
(data/'source.json').write_text(json.dumps(sections,ensure_ascii=False,indent=2),encoding='utf-8')
# Navigation images and original font files.
nav = []
for pic in soup.select('#localnav picture'):
    p = picture(pic)
    if p: nav.append(p)
(data/'navigation.json').write_text(json.dumps(nav,indent=2),encoding='utf-8')
def download(pair):
    url, local = pair
    path = OUT / local.rsplit('/',1)[-1]
    try:
        if not path.exists():
            with urllib.request.urlopen(url,timeout=30) as response:
                content_type=response.headers.get('Content-Type','')
                body=response.read()
                if 'image' not in content_type and 'font' not in content_type: raise ValueError(content_type)
                path.write_bytes(body)
        return None
    except Exception as exc: return {'url':url,'error':str(exc)}
with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
    failures=[x for x in pool.map(download,assets.items()) if x]
(ROOT/'docs/research/apple/asset-map.json').write_text(json.dumps({'assets':assets,'failures':failures},indent=2),encoding='utf-8')
print(json.dumps({'assets':len(assets),'failed':len(failures),'sections':len(sections)}))
