from pathlib import Path
p=Path('apps/apple/src/components/sites/apple/IPhonePage.tsx');s=p.read_text(encoding='utf-8');a=s.index('function Highlights(');b=s.index('\nfunction Comparison(',a)
new='''function Highlights({ onFilm }: { onFilm: () => void }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const names = ["Camera", "Battery", "Colors", "A20 Pro chip", "Siri AI"];
  const keys = ["main-camera-endframe", "battery-endframe", "colors-endframe", "chip-endframe", "siri"];
  const videos = ["camera", "battery", "colors", "chip"];
  const go = (index: number) => {
    const parent = track.current;
    const child = parent?.children[index];
    if (!parent || !child) return;
    const frame = parent.getBoundingClientRect();
    const item = child.getBoundingClientRect();
    const rtl = document.documentElement.dir === "rtl";
    parent.scrollBy({ left: rtl ? item.right - frame.right + frame.width * .0625 : item.left - frame.left - frame.width * .0625, behavior: "smooth" });
    setActive(index);
  };
  useEffect(() => {
    const element = section.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setPlaying(true); observer.disconnect(); }
    }, { threshold: .4 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      const parent = track.current;
      if (!parent) return;
      const frame = parent.getBoundingClientRect();
      if (frame.bottom < 0 || frame.top > innerHeight) return;
      const next = (active + 1) % 5;
      const item = parent.children[next].getBoundingClientRect();
      const rtl = document.documentElement.dir === "rtl";
      parent.scrollBy({ left: rtl ? item.right - frame.right + frame.width * .0625 : item.left - frame.left - frame.width * .0625, behavior: "smooth" });
      setActive(next);
    }, 6500);
    return () => clearTimeout(timer);
  }, [active, playing]);
  return <section id="highlights" className="highlights alt" ref={section}>
    <div className="container section-heading"><h2><T>Get the highlights.</T></h2><button className="text-link" onClick={onFilm}><T>Watch the film</T> ⊙</button></div>
    <div className="highlight-track" ref={track} onScroll={() => {
      const parent = track.current;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const rtl = document.documentElement.dir === "rtl";
      let nearest = 0; let distance = Infinity;
      [...parent.children].forEach((el, i) => { const r = el.getBoundingClientRect(); const d = Math.abs((rtl ? rect.right - r.right : r.left - rect.left) - rect.width * .0625); if (d < distance) { distance = d; nearest = i; } });
      setActive(nearest);
    }}>
      {names.map((name, i) => <div className="highlight-card" role="tabpanel" aria-label={name} key={name}>
        {i < 4 ? <Video name={`highlights-${videos[i]}`} poster={pic(1, keys[i])} /> : <Picture data={pic(1,"siri")} />}
        <p className={`highlight-copy copy-${i}`}><T>{source[1].paragraphs[i]}</T></p>
      </div>)}
    </div>
    <div className="highlight-controls"><div className="dots" role="tablist" aria-label="Highlights">{names.map((n, i) => <button key={n} role="tab" aria-selected={active === i} aria-label={n} className={active === i ? "selected" : ""} onClick={() => { go(i); setPlaying(false); }} />)}</div><button className="play" aria-label={playing ? "Pause Highlights Gallery" : "Play Highlights Gallery"} onClick={() => setPlaying(!playing)}>{playing ? "Ⅱ" : "▶"}</button></div>
  </section>;
}'''
s=s[:a]+new+s[b:];p.write_text(s,encoding='utf-8')
