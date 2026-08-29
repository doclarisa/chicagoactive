import type { ReactNode } from "react";

// Matches a bare domain + optional path (e.g. "carypark.com/rccms/aqua-fitness-2/")
// or a full https:// URL. qualityNote text across the DB consistently cites
// sources as a bare domain in parentheses, with no protocol.
const URL_PATTERN =
  /\b((?:https?:\/\/)?[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:org|com|net|gov|info|edu|us)(?:\/[^\s)]*)?)/gi;

export default function Linkify({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  const regex = new RegExp(URL_PATTERN);
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const raw = match[1].replace(/[.,;]+$/, "");
    const href = raw.startsWith("http") ? raw : `https://${raw}`;
    parts.push(
      <a
        key={key++}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        {raw}
      </a>,
    );
    lastIndex = match.index + raw.length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}
