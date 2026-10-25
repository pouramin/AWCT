export function Workspace() {
  return (
    <section className="section compact">
      <div className="site-shell">
        <div className="section-head reveal">
          <div>
            <span className="kicker">THE WORKSPACE</span>
            <h2>One place for everything I’m building.</h2>
          </div>
          <p>
            Projects are the center. Experiments, videos, notes, and the messy
            development trail live around them instead of being hidden away.
          </p>
        </div>
        <div className="workspace-grid">
          <article className="panel now-panel span-7 reveal">
            <div className="panel-title">
              <div>
                <span className="micro">NOW</span>
                <h3>What has my attention</h3>
              </div>
              <a className="button" href="https://pouramin.dev/now/">
                Open now ↗
              </a>
            </div>
            <div className="now-list">
              <div className="now-row">
                <small>BUILDING</small>
                <strong>TL Studio</strong>
                <span>v0.6 stable · v0.7 alpha</span>
              </div>
              <div className="now-row">
                <small>EXPLORING</small>
                <strong>JEV tooling</strong>
                <span>simulator + Windows router</span>
              </div>
              <div className="now-row">
                <small>PUBLISHING</small>
                <strong>TunnelLab</strong>
                <span>AI + developer tools</span>
              </div>
            </div>
          </article>

          <a
            className="panel hover video-feature span-5 reveal"
            href="https://www.youtube.com/watch?v=2gGRb_zGmno"
            target="_blank"
            rel="noreferrer"
            data-latest-video-feature=""
          >
            <div>
              <span className="micro">LATEST ON TUNNELLAB</span>
              <h3 data-latest-video-title="" dir="auto">
                مدل OpenAI محدودیت اینترنت رو دور زد! #هوش_مصنوعی
              </h3>
              <p data-latest-video-meta="">Latest upload · OCT 24, 2026</p>
            </div>
            <span className="video-play">▶</span>
          </a>

          <article className="panel span-4 reveal">
            <div className="panel-title">
              <div>
                <span className="micro">LAB</span>
                <h3>Experiments</h3>
              </div>
              <a href="https://pouramin.dev/lab/">↗</a>
            </div>
            <p>
              Benchmarks, prototypes, comparisons, tiny tools and useful dead
              ends.
            </p>
            <div className="quick-links">
              <a href="https://pouramin.dev/lab/#graph-context">
                Graph-aware coding tests <span>→</span>
              </a>
              <a href="https://pouramin.dev/lab/#agent-harness">
                Agent benchmarks <span>→</span>
              </a>
              <a href="https://pouramin.dev/lab/#jev-routing">
                JEV routing simulator <span>→</span>
              </a>
            </div>
          </article>
          <article className="panel span-4 reveal">
            <div className="panel-title">
              <div>
                <span className="micro">BUILD LOG</span>
                <h3>Short notes</h3>
              </div>
              <a href="https://pouramin.dev/build-log/">↗</a>
            </div>
            <p>Small, dated snapshots from development. No essay required.</p>
            <div className="quick-links">
              <a href="https://pouramin.dev/build-log/#tl-studio-v060">
                TL Studio v0.6.0 <span>→</span>
              </a>
              <a href="https://pouramin.dev/build-log/#jevarena-public">
                JEVArena public <span>→</span>
              </a>
              <a href="https://pouramin.dev/build-log/#jev-router-windows">
                Jev Router Windows <span>→</span>
              </a>
            </div>
          </article>
          <article className="panel span-4 reveal">
            <div className="panel-title">
              <div>
                <span className="micro">LIVE ACTIVITY</span>
                <h3>GitHub pulse</h3>
              </div>
              <a
                href="https://github.com/pouramin"
                target="_blank"
                rel="noreferrer"
              >
                ↗
              </a>
            </div>
            <div className="activity-list" data-github-activity="">
              {["pouramin.github.io", "REA-Codex"].map((repo) => (
                <a
                  className="activity-item activity-link"
                  key={repo}
                  href={`https://github.com/pouramin/${repo}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="activity-dot" />
                  <span>
                    <strong>{repo}</strong>
                    <small>Push on GitHub</small>
                  </span>
                  <time>1d ago</time>
                </a>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
