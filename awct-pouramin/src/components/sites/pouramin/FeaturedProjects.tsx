export function FeaturedProjects() {
  return (
    <section className="section">
      <div className="site-shell">
        <div className="section-head reveal">
          <div>
            <span className="kicker">FEATURED PROJECTS</span>
            <h2>Software with a reason to exist.</h2>
          </div>
          <p>
            I’m interested in tools that remove friction, expose how things
            work, and can survive contact with real projects.
          </p>
        </div>
        <div className="project-grid">
          <a
            className="project-card reveal"
            href="https://pouramin.dev/projects/tl-studio.html"
          >
            <div className="project-card-top">
              <span className="project-index">01</span>
              <span className="status shipped">OPEN SOURCE</span>
            </div>
            <div className="project-mark">TL</div>
            <h3>TL Studio</h3>
            <p>
              A local browser-based development workspace where the agent is a
              first-class part of the IDE.
            </p>
            <div className="tag-row">
              <span className="tag">Local-first</span>
              <span className="tag">AI agent</span>
              <span className="tag">Developer tools</span>
            </div>
            <div className="project-card-footer">
              <span>Case study</span>
              <span>↗</span>
            </div>
          </a>
          <a
            className="project-card reveal"
            href="https://pouramin.dev/projects/jevarena.html"
          >
            <div className="project-card-top">
              <span className="project-index">02</span>
              <span className="status shipped">PUBLIC SIMULATOR</span>
            </div>
            <div className="project-mark teal">JEV</div>
            <h3>JEVArena</h3>
            <p>
              A visual simulator for AI decision routing, model-tier selection,
              token/cost tradeoffs and fixed-model comparison.
            </p>
            <div className="tag-row">
              <span className="tag">Simulation</span>
              <span className="tag">Routing</span>
              <span className="tag">TypeScript</span>
            </div>
            <div className="project-card-footer">
              <span>Case study</span>
              <span>↗</span>
            </div>
          </a>
        </div>
        <div className="project-browse">
          <a className="button" href="https://pouramin.dev/projects/">
            Browse all projects →
          </a>{" "}
          <a className="button" href="https://pouramin.dev/builds/">
            See smaller builds →
          </a>
        </div>
      </div>
    </section>
  );
}
