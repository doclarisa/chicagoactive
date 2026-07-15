// Stage 1a — ENUMERATE. Fetches and parses authoritative public rosters,
// filters to our 7 counties, and loads them into the Candidate table as
// unverified leads. This script does NOT publish anything — Candidate rows
// never render on the site. Stage 1b enriches/verifies each one before it
// can become a real Listing.
//
// Source substitutions (see the Stage 1a report for why):
//   - ilparks.org/search/ requires a member login (redirects to /Login.aspx),
//     so Park Districts come from the IL Comptroller's public Local
//     Government Unit Data CSV instead — same underlying universe (every
//     park district is a registered unit of government), just not gated.
//   - railslibraries.org's static list has no county field per record (only
//     per-detail-page, which would mean hundreds of extra fetches), so
//     Library Districts also come from the Comptroller CSV.
//   - AgeOptions' provider referral tool is single-query/interactive, not a
//     bulk list. Its own coverage area (suburban Cook) is already present
//     as PSA 13 in the IL Dept on Aging PDF, which is used directly instead.
import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PDFParse } from "pdf-parse";
import { COUNTIES, type County } from "../lib/counties";

const adapter = new PrismaNeon({ connectionString: process.env.POSTGRES_URL_NON_POOLING! });
const db = new PrismaClient({ adapter });

const UA = "Mozilla/5.0 (compatible; ActiveChicagolandCandidateEnumeration/1.0)";

// The Comptroller CSV spells it "Mchenry" (lowercase h) — match county
// names case-insensitively and map back to our canonical spelling.
const COUNTY_BY_LOWER = new Map(COUNTIES.map((c) => [c.toLowerCase(), c]));

type NewCandidate = {
  orgName: string;
  city: string | null;
  county: County;
  officialUrl: string | null;
  rosterSource: string;
  category: string | null;
};

// ---------- Source 1+2: IL Comptroller Local Government Unit Data (CSV) ----------
// Covers Park Districts and Public Library Districts — both cleanly tagged
// with County already, unlike the two gated/JS-only sources they replace.

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      fields.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  fields.push(cur);
  return fields;
}

async function fetchComptrollerCandidates(): Promise<NewCandidate[]> {
  const res = await fetch("https://files.illinoiscomptroller.gov/LocGov/UnitData.csv", {
    headers: { "User-Agent": UA },
  });
  const text = await res.text();
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const header = parseCsvLine(lines[0]);
  const idx = {
    county: header.indexOf("County"),
    unitName: header.indexOf("UnitName"),
    description: header.indexOf("Description"),
    city: header.indexOf("City"),
    email: header.indexOf("Email_GOV"),
  };

  const TARGET_DESCRIPTIONS: Record<string, string> = {
    "Park District": "park-district-55-programs",
    "Public Library District": "library-classes",
  };

  const out: NewCandidate[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i]);
    const rawCounty = (cols[idx.county] || "").trim();
    const county = COUNTY_BY_LOWER.get(rawCounty.toLowerCase());
    const description = (cols[idx.description] || "").trim();
    if (!county) continue;
    if (!(description in TARGET_DESCRIPTIONS)) continue;

    // The Comptroller's UnitName is just the bare community name ("Alsip"),
    // never the full org name — the actual type lives in Description.
    // Verified against all 724 Park District/Public Library District rows:
    // none already contain that suffix, so this never double-appends.
    const unitName = (cols[idx.unitName] || "").trim();
    const orgName = `${unitName} ${description}`;
    const city = (cols[idx.city] || "").trim() || null;
    const email = (cols[idx.email] || "").trim();
    // Best-effort URL guess from the government contact email's domain —
    // 1b visits and confirms/corrects this, it is not trusted as-is. Some
    // small districts list a personal webmail as their government contact;
    // guessing "https://www.yahoo.com" as their official site is worse than
    // no guess at all, so exclude known personal-email providers.
    const domainMatch = email.match(/@([a-zA-Z0-9.-]+)$/);
    const domain = domainMatch?.[1]?.toLowerCase();
    const PERSONAL_EMAIL_DOMAINS = new Set([
      "yahoo.com", "gmail.com", "hotmail.com", "aol.com", "comcast.net",
      "outlook.com", "att.net", "sbcglobal.net", "msn.com", "icloud.com",
    ]);
    const officialUrl = domain && !PERSONAL_EMAIL_DOMAINS.has(domain) ? `https://www.${domain}` : null;

    out.push({
      orgName,
      city,
      county,
      officialUrl,
      rosterSource: "IL Comptroller Local Government Unit Data (files.illinoiscomptroller.gov/LocGov/UnitData.csv)",
      category: TARGET_DESCRIPTIONS[description],
    });
  }
  return out;
}

// ---------- Source 3 (+ substitute for 4): IL Dept on Aging PDF ----------
// PSA 02 = DuPage/Grundy/Kane/Kankakee/Kendall/Lake/McHenry/Will (filter out
// Grundy & Kankakee). PSA 12 = City of Chicago (county: Cook, city: Chicago).
// PSA 13 = Suburban Cook County (from AgeOptions' own coverage area).

// PSA 02's county sections appear in this exact order in the PDF (matches
// the TOC: "DuPage, Grundy, Kane, Kankakee, Kendall, Lake, McHenry and Will
// Counties"). Grundy/Kankakee aren't ours, but they MUST still be recognized
// as header transitions — otherwise their entries silently get attributed
// to whichever of our counties came immediately before them in the file.
// Longer names first so e.g. "Kane" doesn't accidentally match inside a
// different, longer county name.
const ALL_PSA02_COUNTIES = ["McHenry", "Kankakee", "Kendall", "DuPage", "Grundy", "Kane", "Lake", "Will"];
const PSA02_COUNTIES = new Set(["DuPage", "Kane", "Kendall", "Lake", "McHenry", "Will"]);
const PHONE_RE = /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/;
const CITY_ZIP_RE = /^(.+?),\s*(?:Illinois|IL)\.?\s+\d{5}/i;
const PAGE_ARTIFACT_RE = /^(--\s*\d+\s*of\s*\d+\s*--|Senior Centers and Focal Points in Illinois.*|Area Served.*|PSA \d+.*|AgeGuide|AgeOptions, Inc\.?|Senior Services Area Agency on Aging|Chicago Department of Family and Supportive Services|1-800-.*|\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4},.*www\..*)$/i;

// A header line is either standalone ("DuPage County") or the county name
// runs straight into the first entry's name with no line break ("Kane
// County Batavia Park District"). Match by explicit prefix, not a length
// heuristic — line length varies with the first org's name and isn't a
// reliable signal.
function matchCountyHeader(line: string): { county: string; remainder: string } | null {
  for (const county of ALL_PSA02_COUNTIES) {
    const prefix = `${county} County`;
    if (line.startsWith(prefix)) {
      return { county, remainder: line.slice(prefix.length).trim() };
    }
  }
  return null;
}

function parseSeniorCentersSection(
  lines: string[],
  taggedCounty: County | null, // non-null for PSA 12/13 where the whole section is one county
  taggedCity: string | null,
  source: string,
): NewCandidate[] {
  const out: NewCandidate[] = [];
  // null (not "no header seen yet") means "currently inside a non-target
  // county's section (e.g. Grundy/Kankakee) — drop entries until the next
  // recognized header switches us back into scope."
  let currentCounty: County | null = taggedCounty;
  let buffer: string[] = [];

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (PAGE_ARTIFACT_RE.test(line)) continue;
    if (/\(cont'?d\)/i.test(line)) continue;

    if (!taggedCounty) {
      const headerMatch = matchCountyHeader(line);
      if (headerMatch) {
        currentCounty = PSA02_COUNTIES.has(headerMatch.county) ? (headerMatch.county as County) : null;
        buffer = headerMatch.remainder ? [headerMatch.remainder] : [];
        continue;
      }
    }

    if (CITY_ZIP_RE.test(line)) {
      const cityMatch = line.match(CITY_ZIP_RE);
      const city = taggedCity ?? cityMatch?.[1]?.trim() ?? null;
      // buffer's last line is always the street address (it directly
      // precedes this city/zip line) — the org name is the line before
      // that. Works whether the name block is 1 line ("Mary E. Kies
      // Recreation Center") or 2 (Chicago's parent-org-then-site-name
      // pairs), since either way the address is always exactly last.
      const orgName = buffer[buffer.length - 2];
      if (orgName && currentCounty) {
        out.push({
          orgName,
          city,
          county: currentCounty,
          officialUrl: null,
          rosterSource: source,
          category: "senior-center-events",
        });
      }
      buffer = [];
      continue;
    }

    if (PHONE_RE.test(line) && line.length < 40) {
      // Phone line — end of record, already emitted at the city/zip line.
      buffer = [];
      continue;
    }

    buffer.push(line);
  }
  return out;
}

async function fetchAgingPdfCandidates(): Promise<NewCandidate[]> {
  const res = await fetch(
    "https://ilaging.illinois.gov/content/dam/soi/en/web/aging/resources/documents/seniorcenters.pdf",
    { headers: { "User-Agent": UA } },
  );
  const buf = Buffer.from(await res.arrayBuffer());
  const parser = new PDFParse({ data: buf });
  const { text } = await parser.getText();
  const lines = text.split(/\r?\n/);

  const source = "IL Dept on Aging — Senior Centers and Focal Points in Illinois (PDF)";

  // "PSA 02" etc. also appear in the table of contents ("PSA 02 ..... 3"),
  // which findIndex would match first. Only the real section headers have
  // the em-dash + county-list right after the number.
  const psaHeader = (n: string) => lines.findIndex((l) => new RegExp(`^PSA ${n}\\s*—`).test(l.trim()));
  const psa02Start = psaHeader("02");
  const psa03Start = psaHeader("03");
  const psa12Start = psaHeader("12");
  const psa13Start = psaHeader("13");

  const psa02Lines = lines.slice(psa02Start + 1, psa03Start);
  const psa12Lines = lines.slice(psa12Start + 1, psa13Start);
  const psa13Lines = lines.slice(psa13Start + 1);

  return [
    ...parseSeniorCentersSection(psa02Lines, null, null, source),
    ...parseSeniorCentersSection(psa12Lines, "Cook", "Chicago", source),
    ...parseSeniorCentersSection(psa13Lines, "Cook", null, source),
  ];
}

// ---------- Main ----------

async function main() {
  // Safe to re-run: clears only rows 1b hasn't touched yet, so a parser fix
  // or a roster update never leaves stale/wrong-county leads behind, but
  // never destroys review/promotion work already done on a candidate.
  const cleared = await db.candidate.deleteMany({ where: { status: "UNVERIFIED" } });
  console.log(`Cleared ${cleared.count} previously-unverified candidates before re-ingesting.`);

  const [comptroller, aging] = await Promise.all([
    fetchComptrollerCandidates(),
    fetchAgingPdfCandidates(),
  ]);

  const all = [...comptroller, ...aging];

  const existingListings = await db.listing.findMany({ select: { name: true } });
  const existingNames = new Set(existingListings.map((l) => l.name.toLowerCase().trim()));

  let inserted = 0;
  let skippedExisting = 0;
  for (const c of all) {
    if (!c.orgName || c.orgName.length < 3) continue;
    if (existingNames.has(c.orgName.toLowerCase().trim())) {
      skippedExisting++;
      continue;
    }
    await db.candidate.upsert({
      where: { orgName_county: { orgName: c.orgName, county: c.county } },
      update: {
        city: c.city,
        officialUrl: c.officialUrl,
        rosterSource: c.rosterSource,
        category: c.category,
      },
      create: {
        orgName: c.orgName,
        city: c.city,
        county: c.county,
        officialUrl: c.officialUrl,
        rosterSource: c.rosterSource,
        category: c.category,
      },
    });
    inserted++;
  }

  console.log(`\nProcessed ${all.length} raw rows -> ${inserted} candidates upserted, ${skippedExisting} skipped (already a Listing).\n`);

  const byCounty = await db.candidate.groupBy({ by: ["county"], _count: true });
  const bySource = await db.candidate.groupBy({ by: ["rosterSource"], _count: true });

  console.log("Candidates by county:");
  for (const county of COUNTIES) {
    const row = byCounty.find((r) => r.county === county);
    console.log(`  ${county}: ${row?._count ?? 0}`);
  }
  console.log("\nCandidates by source:");
  for (const row of bySource) {
    console.log(`  ${row.rosterSource}: ${row._count}`);
  }

  const total = await db.candidate.count();
  console.log(`\nTotal candidates in table: ${total}`);

  await db.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
