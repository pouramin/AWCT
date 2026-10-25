from pathlib import Path
p=Path('apps/apple/src/components/sites/apple/IPhonePage.tsx');s=p.read_text(encoding='utf-8')
s=s.replace('const progress = Math.max(\n        0,\n        Math.min(1, -rect.top / (rect.height - innerHeight)),\n      );','const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / rect.height));')
a=s.index('      <SectionTitle\n        eyebrow="Pro camera system"');b=s.index('      <p className="body-copy">',a)
chunk=s[a:b]; title_end=chunk.index('      <div className="scroll-scene">')
chunk=chunk[title_end:]+chunk[:title_end]
s=s[:a]+chunk+s[b:]
s=s.replace('<div className="footnotes">','<div className="footnotes" dir="ltr">')
p.write_text(s,encoding='utf-8')
