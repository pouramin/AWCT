import { Fragment, type ReactNode } from "react";

const SYMBOL_FOOTNOTES: Record<string, number> = { "*": 1, "**": 2, "◊": 3 };
const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** Maps a footnote label from copy ("4", "۴", "*", "◊") to the footer anchor id. */
export function footnoteId(label: string) {
  if (label in SYMBOL_FOOTNOTES) return `footnote-${SYMBOL_FOOTNOTES[label]}`;
  const latin = label.replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)));
  // Numbered footnotes follow the three symbol footnotes in the footer list.
  return `footnote-${Number(latin) + 3}`;
}

function Footnote({ label }: { label: string }) {
  return (
    <sup className="a-sup">
      <a href={`#${footnoteId(label)}`} aria-label={`Footnote ${label}`}>
        {label}
      </a>
    </sup>
  );
}

/** Splits on `**bold**` and `[^label]` tokens, keeping line breaks. */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[\^([^\]]+)\]|\n/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const key = `${keyPrefix}-${i++}`;
    if (match[1] !== undefined) nodes.push(<strong key={key}>{renderInline(match[1], key)}</strong>);
    else if (match[2] !== undefined) nodes.push(<Footnote key={key} label={match[2]} />);
    else nodes.push(<br key={key} />);
    last = pattern.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/** Renders copy strings from the content files (bold, footnotes, line breaks). */
export function Rich({ text }: { text: string }) {
  return <Fragment>{renderInline(text, "r")}</Fragment>;
}

/** Copy with `{name}` placeholders replaced. */
export function fill(text: string, values: Record<string, string>) {
  return text.replace(/\{(\w+)\}/g, (_, name: string) => values[name] ?? "");
}
