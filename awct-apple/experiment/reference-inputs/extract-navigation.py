from bs4 import BeautifulSoup
from pathlib import Path
import json
r=Path('.')
s=BeautifulSoup((r/'temp/apple/dom.html').read_text(encoding='utf-8'),'html.parser')
out=r/'apps/apple/src/components/sites/apple'
menus=[]
for item in s.select('.globalnav-item-menu'):
    name=item.select_one('.globalnav-link-text')
    if not name: continue
    groups=[]
    for group in item.select('.globalnav-submenu-group'):
        h=group.find(['h2','h3'])
        links=[{'text':a.get_text(' ',strip=True),'href':a.get('href','')} for a in group.select('a[href]')]
        if links: groups.append({'title':h.get_text(' ',strip=True) if h else '', 'links':links})
    menus.append({'name':name.get_text(' ',strip=True),'groups':groups})
(out/'menus.json').write_text(json.dumps(menus,ensure_ascii=False,indent=2),encoding='utf-8')
s=BeautifulSoup((r/'temp/apple/source.html').read_text(encoding='utf-8'),'html.parser')
footer=[]
for section in s.select('.ac-gf-directory-column-section'):
    h=section.find(['h3','h4'])
    if not h: continue
    footer.append({'title':h.get_text(' ',strip=True),'links':[{'text':a.get_text(' ',strip=True),'href':a.get('href','')} for a in section.select('a[href]')]})
notes=[{'id':li.get('id',''),'text':li.get_text(' ',strip=True)} for li in s.select('.ac-gf-sosumi li')]
(out/'footer.json').write_text(json.dumps({'groups':footer,'notes':notes},ensure_ascii=False,indent=2),encoding='utf-8')
svg=s.select_one('.globalnav-link-apple svg')
if svg:
    svg['xmlns']='http://www.w3.org/2000/svg'
    (r/'apps/apple/public/sites/apple/apple.svg').write_text(str(svg),encoding='utf-8')
print('menus',len(menus),'footer groups',len(footer))


