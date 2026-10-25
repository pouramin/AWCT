"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export function Header({
  onCommand,
  onTheme,
  dark,
}: {
  onCommand: () => void;
  onTheme: () => void;
  dark: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);
  useEffect(() => {
    const resize = () => {
      if (innerWidth > 1050) setMenuOpen(false);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  return (
    <header className="site-header" data-header="">
      <div className="site-shell header-inner">
        <Link className="brand" href="/" aria-label="Amin Pour — home">
          <span className="brand-mark" aria-hidden="true">
            AP
          </span>
          <span className="brand-copy">
            <strong>Amin Pour</strong>
            <small>builder / developer</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="https://pouramin.dev/projects/">Projects</a>
          <a href="https://pouramin.dev/lab/">Lab</a>
          <a href="https://pouramin.dev/builds/">Builds</a>
          <a href="https://pouramin.dev/now/">Now</a>
          <a href="https://pouramin.dev/videos/">Videos</a>
          <a href="https://pouramin.dev/prompts/">Prompts</a>
          <a href="https://pouramin.dev/build-log/">Build log</a>
        </nav>

        <div className="header-actions">
          <button
            className="command-trigger"
            type="button"
            onClick={onCommand}
            aria-label="Open command palette (/)"
          >
            <span>/</span>
          </button>
          <a
            className="header-icon"
            href="https://github.com/pouramin"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.16c-3.23.7-3.91-1.37-3.91-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.39.96.1-.75.4-1.26.74-1.55-2.58-.29-5.3-1.29-5.3-5.75 0-1.27.46-2.31 1.2-3.13-.12-.3-.52-1.48.12-3.09 0 0 .98-.31 3.16 1.2a10.9 10.9 0 0 1 5.75 0c2.18-1.51 3.16-1.2 3.16-1.2.64 1.61.24 2.8.12 3.09.75.82 1.2 1.86 1.2 3.13 0 4.47-2.72 5.45-5.31 5.74.42.36.79 1.07.79 2.16v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
            </svg>
          </a>
          <a
            className="header-icon youtube-header"
            href="https://www.youtube.com/@tunnellab"
            target="_blank"
            rel="noreferrer"
            aria-label="TunnelLab on YouTube"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
            </svg>
          </a>
          <button
            className="theme-toggle header-icon"
            type="button"
            onClick={onTheme}
            aria-label="Toggle theme"
            aria-pressed={dark}
          >
            <span className="theme-glyph">◐</span>
          </button>
          <button
            className="menu-toggle header-icon"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`} id="mobile-menu">
        <nav className="site-shell" aria-label="Mobile navigation">
          <a href="https://pouramin.dev/projects/">
            Projects <span>↗</span>
          </a>
          <a href="https://pouramin.dev/lab/">
            Lab <span>↗</span>
          </a>
          <a href="https://pouramin.dev/builds/">
            Builds <span>↗</span>
          </a>
          <a href="https://pouramin.dev/now/">
            Now <span>↗</span>
          </a>
          <a href="https://pouramin.dev/videos/">
            Videos <span>↗</span>
          </a>
          <a href="https://pouramin.dev/build-log/">
            Build log <span>↗</span>
          </a>
          <a href="https://pouramin.dev/uses/">
            Uses <span>↗</span>
          </a>
          <a href="https://pouramin.dev/about/">
            About <span>↗</span>
          </a>
          <a href="https://pouramin.dev/work-with-me/">
            Work with me <span>↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
