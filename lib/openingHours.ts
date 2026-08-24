// Conservative parser for the free-text `hours` field into schema.org's
// openingHours microformat ("Mo,Tu,We 09:00-17:00"). Only accepts a strict
// whitelist shape — comma-separated "Day[-Day] time-time" segments with no
// other text. Any hedge word, parenthetical, or unusual format bails out
// entirely and returns null rather than guess — omitting the field is
// always safer than emitting a wrong one for a page that claims to be
// verified.
const DAY_MAP: Record<string, string> = {
  mon: "Mo",
  monday: "Mo",
  tue: "Tu",
  tuesday: "Tu",
  wed: "We",
  wednesday: "We",
  thu: "Th",
  thursday: "Th",
  fri: "Fr",
  friday: "Fr",
  sat: "Sa",
  saturday: "Sa",
  sun: "Su",
  sunday: "Su",
};

const DAY_ORDER = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function expandDayRange(token: string): string[] | null {
  const parts = token.split("-").map((p) => p.trim().toLowerCase());
  if (parts.length === 1) {
    const d = DAY_MAP[parts[0]];
    return d ? [d] : null;
  }
  if (parts.length === 2) {
    const start = DAY_MAP[parts[0]];
    const end = DAY_MAP[parts[1]];
    if (!start || !end) return null;
    const startIdx = DAY_ORDER.indexOf(start);
    const endIdx = DAY_ORDER.indexOf(end);
    if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) return null;
    return DAY_ORDER.slice(startIdx, endIdx + 1);
  }
  return null;
}

function parseTime(token: string): string | null {
  const m = /^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i.exec(token.trim());
  if (!m) return null;
  let hour = parseInt(m[1], 10);
  const minute = m[2] ?? "00";
  const meridiem = m[3].toLowerCase();
  if (hour < 1 || hour > 12) return null;
  if (meridiem === "pm" && hour !== 12) hour += 12;
  if (meridiem === "am" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${minute}`;
}

export function parseOpeningHours(hours: string): string[] | null {
  const text = hours.trim();
  if (/verify|closed|appointment|call|email|holiday|see official|\(|\)|\?|&|\//i.test(text)) {
    return null;
  }

  const segments = text.split(",").map((s) => s.trim());
  const results: string[] = [];
  for (const seg of segments) {
    const m = /^([A-Za-z-]+)\s+(.+)$/.exec(seg);
    if (!m) return null;
    const [, dayToken, timeToken] = m;
    const days = expandDayRange(dayToken);
    if (!days) return null;

    const timeParts = timeToken.split("-").map((t) => t.trim());
    if (timeParts.length !== 2) return null;
    const [, endRaw] = timeParts;
    let [startRaw] = timeParts;
    if (!/am|pm/i.test(startRaw) && /am|pm/i.test(endRaw)) {
      const meridiem = /am/i.test(endRaw) ? "am" : "pm";
      startRaw = `${startRaw}${meridiem}`;
    }
    const start = parseTime(startRaw);
    const end = parseTime(endRaw);
    if (!start || !end) return null;

    results.push(`${days.join(",")} ${start}-${end}`);
  }
  return results.length > 0 ? results : null;
}
