from pathlib import Path
import json
r=Path('.')
p=r/'apps/apple/src/components/sites/apple/apple.css'
s=p.read_text(encoding='utf-8').replace('.hero-title>p{font-family:SF Display,sans-serif;font-weight:600;font-size:80px;line-height:1.15;', '.hero-title>p{font-family:SF Display,sans-serif;font-weight:600;font-size:80px;line-height:84px;padding-top:8px;')
s=s.replace('.buy{background:', '.buy{line-height:20px;background:').replace('font-weight:600;line-height:23px','font-weight:600;line-height:21px')
s=s.replace('padding:16px 27px;min-height:88px','padding:16px 16px;min-height:88px').replace('height:710px;min-height:0;max-height:none;margin-bottom:94px','height:calc(100svh - 140px);min-height:610px;max-height:none;margin-bottom:0').replace('inset:auto 0 -94px','inset:auto 0 0')
s=s.replace('line-height:44px;margin-top:8px','line-height:44px;padding-top:0;margin-top:8px')
p.write_text(s,encoding='utf-8')
p=r/'apps/apple/src/components/sites/apple/IPhonePage.tsx'
s=p.read_text(encoding='utf-8').replace('"A new dimension of iPhone."','source[20].paragraphs[21]')
p.write_text(s,encoding='utf-8')
p=r/'tsconfig.json';j=json.loads(p.read_text());j['exclude']=list(dict.fromkeys(j['exclude']+['apps/apple']));p.write_text(json.dumps(j,indent=2)+'\n')
p=r/'package.json';j=json.loads(p.read_text());j['scripts']['apple:dev']='npm --prefix apps/apple run dev';j['scripts']['apple:check']='npm --prefix apps/apple run check';p.write_text(json.dumps(j,indent=2)+'\n')
p=r/'eslint.config.mjs';s=p.read_text().replace('"apps/nike/.next/**",','"apps/nike/.next/**",\n    "apps/apple/.next/**",\n    "apps/apple/.next-dev/**",\n    "apps/apple/next-env.d.ts",');p.write_text(s)
# Correct aperture captions and duplicated accessibility labels without changing source copy.
p=r/'apps/apple/src/components/sites/apple/source.json';j=json.loads(p.read_text(encoding='utf-8'))
from bs4 import BeautifulSoup
soup=BeautifulSoup((r/'temp/apple/source.html').read_text(encoding='utf-8'),'html.parser')
for i,c in enumerate([x for x in j[5]['cards'] if x['title'].startswith('ƒ')]):
    item=soup.select_one('#pro-camera-aperture-gallery-caption-'+str(max(0,i-1)))
    if item: c['text']=item.select_one('p').get_text(' ',strip=True)
p.write_text(json.dumps(j,ensure_ascii=False,indent=2),encoding='utf-8')
