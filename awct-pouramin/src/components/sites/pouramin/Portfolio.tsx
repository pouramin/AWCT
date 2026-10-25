"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Workspace } from "./Workspace";
import { FeaturedProjects } from "./FeaturedProjects";
import { Principles } from "./Principles";
import { Support } from "./Support";
import { Footer } from "./Footer";

const origin = "https://pouramin.dev";
const commands = [
  {
    title: "Projects",
    description: "Browse everything I build",
    path: "/projects/",
    key: "p",
  },
  {
    title: "Builds",
    description: "Small tools, utilities and prototypes",
    path: "/builds/",
    key: "d",
  },
  {
    title: "Now",
    description: "What I am working on right now",
    path: "/now/",
    key: "n",
  },
  {
    title: "Lab",
    description: "Experiments, benchmarks and prototypes",
    path: "/lab/",
    key: "l",
  },
  {
    title: "TunnelLab",
    description: "Watch practical tests and tutorials",
    path: "/videos/",
    key: "v",
  },
  {
    title: "Prompts",
    description: "Video prompts and companion pages",
    path: "/prompts/",
    key: "",
  },
  {
    title: "Build log",
    description: "Short notes from active development",
    path: "/build-log/",
    key: "b",
  },
  {
    title: "GitHub",
    description: "Open my public repositories",
    path: "https://github.com/pouramin",
    key: "g",
  },
  {
    title: "Support",
    description: "Buy me a coffee",
    path: "https://buymeacoffee.com/pouramin",
    key: "s",
  },
  {
    title: "Open terminal",
    description: "Try the tiny easter egg",
    path: "",
    key: "t",
  },
];
const responses: Record<string, string> = {
  help: "Commands: about, projects, builds, now, lab, videos, uses, github, youtube, coffee, clear",
  about:
    "Amin builds practical AI and developer tools, tests them on real projects, and documents what survives.",
  projects:
    "Open /projects/ to see shipped work, active builds, experiments and archived projects.",
  builds: "Small tools, prototypes and one-purpose utilities live in /builds/.",
  now: "Currently focused on TL Studio, TlabRouter, and TunnelLab.",
  lab: "Benchmarks, experiments, prototypes and useful dead ends live in /lab/.",
  videos: "TunnelLab → https://www.youtube.com/@tunnellab",
  uses: "The current hardware, software and services are listed in /uses/.",
  github: "GitHub → https://github.com/pouramin",
  youtube: "YouTube → https://www.youtube.com/@tunnellab",
  coffee: "Support → https://buymeacoffee.com/pouramin",
};
const terminalRoutes: Record<string, string> = {
  projects: "/projects/",
  builds: "/builds/",
  now: "/now/",
  lab: "/lab/",
  videos: "/videos/",
  uses: "/uses/",
  github: "https://github.com/pouramin",
  youtube: "https://www.youtube.com/@tunnellab",
  coffee: "https://buymeacoffee.com/pouramin",
};
const destination = (path: string) =>
  path.startsWith("/") ? origin + path : path;

export function Portfolio() {
  const [dark, setDark] = useState(true);
  const [palette, setPalette] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [terminal, setTerminal] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const filtered = commands.filter((command) =>
    `${command.title} ${command.description}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  const openPalette = useCallback(() => {
    triggerRef.current = document.activeElement as HTMLElement;
    setQuery("");
    setSelected(0);
    setPalette(true);
  }, []);
  const closePalette = useCallback(() => {
    setPalette(false);
    triggerRef.current?.focus();
  }, []);
  const activate = useCallback((command: (typeof commands)[number]) => {
    setPalette(false);
    if (!command.path) {
      setTerminal(true);
      return;
    }
    if (command.path.startsWith("https:"))
      window.open(command.path, "_blank", "noopener,noreferrer");
    else window.location.assign(destination(command.path));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved
      ? saved === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    requestAnimationFrame(() => setDark(isDark));
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("pending");
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((element) => {
      element.classList.add("pending");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (palette) searchRef.current?.focus();
    document.body.style.overflow = palette ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [palette]);
  useEffect(() => {
    if (terminal) terminalRef.current?.focus();
  }, [terminal]);
  useEffect(() => {
    if (outputRef.current)
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [history]);
  useEffect(() => {
    document
      .querySelector('[data-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [selected, query]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePalette();
        setTerminal(false);
      }
      const typing = /INPUT|TEXTAREA|SELECT/.test(
        (event.target as HTMLElement).tagName,
      );
      if (
        !typing &&
        (event.key === "/" ||
          ((event.metaKey || event.ctrlKey) && event.key === "k"))
      ) {
        event.preventDefault();
        openPalette();
      }
      if (event.altKey) {
        const command = commands.find(
          (item) => item.key === event.code.replace("Key", "").toLowerCase(),
        );
        if (command) {
          event.preventDefault();
          activate(command);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activate, closePalette, openPalette]);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header onCommand={openPalette} onTheme={toggleTheme} dark={dark} />
      <main id="main">
        <Hero />
        <Workspace />
        <FeaturedProjects />
        <Principles />
        <Support />
      </main>
      <Footer />
      {palette && (
        <div
          className="command-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePalette();
          }}
        >
          <div
            className="command-palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onKeyDown={(event) => {
              if (event.key === "Tab") {
                const focusable = Array.from(
                  event.currentTarget.querySelectorAll<HTMLElement>(
                    "input, a, button",
                  ),
                );
                if (event.shiftKey && document.activeElement === focusable[0]) {
                  event.preventDefault();
                  focusable.at(-1)?.focus();
                } else if (
                  !event.shiftKey &&
                  document.activeElement === focusable.at(-1)
                ) {
                  event.preventDefault();
                  focusable[0]?.focus();
                }
              }
            }}
          >
            <div className="command-search">
              <span>⌕</span>
              <input
                ref={searchRef}
                type="search"
                aria-label="Search commands…"
                placeholder="Search commands…"
                autoComplete="off"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSelected(0);
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                    event.preventDefault();
                    setSelected((index) =>
                      filtered.length
                        ? (index +
                            (event.key === "ArrowDown" ? 1 : -1) +
                            filtered.length) %
                          filtered.length
                        : 0,
                    );
                  } else if (event.key === "Enter" && filtered[selected]) {
                    event.preventDefault();
                    activate(filtered[selected]);
                  }
                }}
              />
              <kbd>Esc</kbd>
            </div>
            <div className="command-list">
              {filtered.map((command, index) => {
                const content = (
                  <>
                    <span>
                      <b>{command.title}</b>
                      <small>{command.description}</small>
                    </span>
                    <kbd>
                      {command.key ? `Alt+${command.key.toUpperCase()}` : "✦"}
                    </kbd>
                  </>
                );
                const props = {
                  "data-command-item": "",
                  "data-selected": selected === index,
                  onMouseEnter: () => setSelected(index),
                  onFocus: () => setSelected(index),
                };
                return command.path ? (
                  <a
                    {...props}
                    key={command.title}
                    href={destination(command.path)}
                    onClick={(event) => {
                      event.preventDefault();
                      activate(command);
                    }}
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    {...props}
                    key={command.title}
                    type="button"
                    onClick={() => activate(command)}
                  >
                    {content}
                  </button>
                );
              })}
              {!filtered.length && (
                <div className="command-empty">No matching commands.</div>
              )}
            </div>
            <div className="command-footer">
              <span>↑↓ Navigate</span>
              <span>Enter Open</span>
              <span>Esc Close</span>
            </div>
          </div>
        </div>
      )}
      {terminal && (
        <div className="terminal-window" aria-label="Terminal">
          <div className="terminal-titlebar">
            <div>
              <i />
              <i />
              <i />
            </div>
            <span>amin@pouramin.dev</span>
            <button
              type="button"
              aria-label="Close terminal"
              onClick={() => setTerminal(false)}
            >
              ×
            </button>
          </div>
          <div className="terminal-output" ref={outputRef} aria-live="polite">
            {!history.includes("__cleared") && (
              <p>
                pouramin.dev terminal — type <strong>help</strong>
              </p>
            )}
            {history
              .filter((command) => command !== "__cleared")
              .map((command, index) => (
                <div key={index}>
                  <p>$ {command}</p>
                  <p>{responses[command] || `command not found: ${command}`}</p>
                  {terminalRoutes[command] && (
                    <p>
                      <a href={destination(terminalRoutes[command])}>open →</a>
                    </p>
                  )}
                </div>
              ))}
          </div>
          <form
            className="terminal-form"
            onSubmit={(event) => {
              event.preventDefault();
              const command = input.trim().toLowerCase();
              if (command)
                setHistory((previous) =>
                  command === "clear" ? ["__cleared"] : [...previous, command],
                );
              setInput("");
            }}
          >
            <label>
              <span>amin@pouramin.dev:~$</span>
              <input
                ref={terminalRef}
                aria-label="Terminal command"
                autoComplete="off"
                spellCheck={false}
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
            </label>
          </form>
        </div>
      )}
    </>
  );
}
