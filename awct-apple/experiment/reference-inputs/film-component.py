from pathlib import Path
p=Path('apps/apple/src/components/sites/apple/IPhonePage.tsx')
s=p.read_text(encoding='utf-8')
a=s.index('  {film && <Modal')
b=s.index('\n  </div></Language.Provider>',a)
s=s[:a]+'  {film && <Modal label="Watch the film" onClose={() => setFilm(false)}><FilmPlayer /></Modal>}'+s[b:]
p.write_text(s,encoding='utf-8')
