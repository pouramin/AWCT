import json,re
from pathlib import Path
from bs4 import BeautifulSoup
r=Path('.')
s=BeautifulSoup((r/'temp/apple/source.html').read_text(encoding='utf-8'),'html.parser')
text=lambda e:re.sub(r'\s+',' ',e.get_text(' ',strip=True)).strip()
j={text(p):[text(e) for e in p.select('strong')] for p in s.select('main p') if p.select('strong')}
(r/'apps/apple/src/components/sites/apple/emphasis.json').write_text(json.dumps(j,ensure_ascii=False,indent=2),encoding='utf-8')
