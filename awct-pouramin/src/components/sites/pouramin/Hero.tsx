export function Hero() {
  return (
    <section className="hero">
      <div className="site-shell hero-grid">
        <div className="reveal">
          <div className="eyebrow">
            <span className="status-dot"></span> Building in public
          </div>
          <h1>
            I build useful things at the edge of{" "}
            <span className="accent">AI + software.</span>
          </h1>
          <p className="hero-lead">
            Local-first developer tools, coding agents, model routing,
            experiments, and practical videos that show what actually works.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="https://pouramin.dev/projects/">
              Explore projects <span>↘</span>
            </a>
            <a
              className="button youtube"
              href="https://www.youtube.com/@tunnellab"
              target="_blank"
              rel="noreferrer"
            >
              Watch TunnelLab <span>↗</span>
            </a>
            <a
              className="button coffee"
              href="https://buymeacoffee.com/pouramin"
              target="_blank"
              rel="noreferrer"
            >
              ☕ Buy me a coffee <span>↗</span>
            </a>
          </div>
          <div className="focus-row">
            <span>Open source</span>
            <span>Local-first</span>
            <span>AI tooling</span>
            <span>Real-world testing</span>
          </div>
        </div>
        <aside className="workbench reveal" aria-label="Current workbench">
          <div className="workbench-top">
            <div>
              <span className="micro">Currently building</span>
              <strong>Workbench</strong>
            </div>
            <span className="live">LIVE</span>
          </div>
          <a
            className="work-row"
            href="https://pouramin.dev/projects/tl-studio.html"
          >
            <span className="work-symbol">TL</span>
            <div>
              <strong>TL Studio</strong>
              <small>Local development workspace with AI built in.</small>
            </div>
            <span className="pill">OPEN</span>
          </a>
          <a
            className="work-row"
            href="https://pouramin.dev/projects/jevarena.html"
          >
            <span className="work-symbol router">JEV</span>
            <div>
              <strong>JEVArena</strong>
              <small>
                Visual decision-routing simulator with live web and Windows
                builds.
              </small>
            </div>
            <span className="pill">LIVE</span>
          </a>
          <div className="work-console">
            <div className="console-bar">
              <i></i>
              <i></i>
              <i></i>
              <span>build.log</span>
            </div>
            <div className="console-body">
              <div>
                <b>→</b> build
                <br />
                <em>✓</em> test
                <br />
                <em>✓</em> break
              </div>
              <div>
                <em>✓</em> fix
                <br />
                <span className="amber">●</span> document
                <br />
                <b>↻</b> repeat
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
