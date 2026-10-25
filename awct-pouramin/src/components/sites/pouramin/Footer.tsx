import Link from "next/link";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-grid">
        <div>
          <Link className="footer-brand" href="/">
            <span className="brand-mark small">AP</span>
            <strong>Amin Pour</strong>
          </Link>
          <p>Practical tools, honest experiments, and developer education.</p>
        </div>
        <div className="footer-col">
          <strong>Explore</strong>
          <a href="https://pouramin.dev/projects/">Projects</a>
          <a href="https://pouramin.dev/lab/">Lab</a>
          <a href="https://pouramin.dev/builds/">Builds</a>
          <a href="https://pouramin.dev/now/">Now</a>
          <a href="https://pouramin.dev/videos/">Videos</a>
          <a href="https://pouramin.dev/prompts/">Prompts</a>
        </div>
        <div className="footer-col">
          <strong>More</strong>
          <a href="https://pouramin.dev/build-log/">Build log</a>
          <a href="https://pouramin.dev/uses/">Uses</a>
          <a href="https://pouramin.dev/about/">About</a>
          <a href="https://pouramin.dev/start/">Start here</a>
        </div>
        <div className="footer-col">
          <strong>Elsewhere</strong>
          <a
            href="https://github.com/pouramin"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.youtube.com/@tunnellab"
            target="_blank"
            rel="noreferrer"
          >
            TunnelLab ↗
          </a>
          <a
            href="https://buymeacoffee.com/pouramin"
            target="_blank"
            rel="noreferrer"
          >
            Buy me a coffee ↗
          </a>
        </div>
      </div>
      <div className="site-shell footer-bottom">
        <span>© 2026 Amin Pour</span>
        <span>Built for pouramin.dev</span>
      </div>
    </footer>
  );
}
