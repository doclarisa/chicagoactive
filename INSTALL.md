# Installing these skills for Claude Code

These are your own skills, exported from your claude.ai account. Claude Code
cannot see `/mnt/skills/user/` — that path only exists inside claude.ai's
container — so the skills have to live on your filesystem.

## Option A — project skills (recommended for this repo)

Skills travel with the repo and get committed to git, so any machine you clone
to picks them up automatically.

    cd /path/to/your/chicagoactiveseniors-repo
    unzip ~/Downloads/active-chicagoland-skills.zip -d .
    ls .claude/skills          # should list the three skill folders
    git add .claude/skills && git commit -m "Add project skills"

## Option B — personal skills (available in every repo on this machine)

    unzip ~/Downloads/active-chicagoland-skills.zip -d /tmp/skillpack
    mkdir -p ~/.claude/skills
    cp -r /tmp/skillpack/.claude/skills/* ~/.claude/skills/
    ls ~/.claude/skills

## Verify

Start Claude Code in the repo and ask:

    What skills are available?

You should see `directory-site-builder`, `seo-site-builder`, and
`local-citations-auditor`.

Claude Code watches skill directories and picks up edits within the session.
But creating a top-level skills directory that did not exist when the session
started requires restarting Claude Code so the new directory can be watched —
so if you just created `.claude/skills/`, restart.

## What's in the pack

| Skill | Used in |
|---|---|
| `directory-site-builder` | Stages 0–2 — Neon pooled vs. direct URLs, Prisma/`.env` traps, Vercel deploy |
| `seo-site-builder` | Stages 0–3 — technical SEO, on-page, schema templates, link building |
| `local-citations-auditor` | Stage 4 — building the outreach/citation target list |

The other three skills in your account (`funny-podcast`, `lovie-studio`,
`solubelle-design`) aren't relevant to this project and were left out.
