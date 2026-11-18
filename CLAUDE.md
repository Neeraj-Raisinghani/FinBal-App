# FinBal App — Project Instructions

This is the `app.finbal.neerajraisinghani.com` product repo (separate from the `finbal.neerajraisinghani.com` marketing-site repo, which has its own, longer instructions — don't assume anything from that repo applies here unless it's restated below).

## No eyebrow labels

Do not add eyebrow labels (small text or pill badges sitting above a heading, e.g. "About", "Features") to any page, section, or component. If a heading alone doesn't make a section's purpose clear, fix the heading — don't patch it with an eyebrow.

**Exception:** a small label is fine when it's the *only* identifier for a piece of content with no nearby heading (a functional caption, not a decorative eyebrow).

## Use tokens from globals.css — never hardcode values

Every color, spacing value, radius, font size, line height, letter spacing, shadow, and max-width must come from a `var(--*)` token defined in `src/app/globals.css`. Before adding any style value:

1. Check `globals.css` for an existing token that matches or is close enough.
2. If a close token exists, use it — don't introduce a near-duplicate raw value.
3. If no token fits and the value is genuinely needed in more than one place, add a new token to `globals.css` (with a comment explaining its purpose) and reference it — don't hardcode it locally.

## Copy style

- No em-dashes anywhere in site copy.
- Never use "I", "we", "our", "us", "you", or "me" in site copy — use the brand name or third person instead (e.g. "FinBal tracks every holding", not "We track every holding").

## Commit message format

Always confirm the full message with the user before running `git commit` — never commit silently. Use this structure, with box-drawing dividers (`─` repeated, not `-` or `=`) between sections:

```
<type>(<scope>): <short summary>

─────────────────────────────────────────────────────────────

WHEN

Date(s) of the work, and a short narrative of what changed and why this
batch of work happened together.

─────────────────────────────────────────────────────────────

WHAT

Grouped by feature/area, not by file. For each new or changed file, name
it and describe what it does/changed with enough specificity (function
names, line ranges, exact old → new values) that someone could understand
the change without opening the diff.

─────────────────────────────────────────────────────────────

WHY

The reasoning — what problem this solves, what was broken or missing
before, and why this approach was chosen if that's non-obvious. Skip
restating WHAT.

─────────────────────────────────────────────────────────────

HOW

Only for genuinely tricky or non-obvious implementation details worth
future-you knowing. Skip this section entirely if nothing qualifies.

─────────────────────────────────────────────────────────────

FILES

A flat summary list: New / Modified / Deleted, grouped the same way.
```

Verify claims against the actual diff (`git diff`, `git log`) before drafting — don't assume.

## Dev servers

Don't stop a background dev server without asking first. If one was started to check something, leave it running afterward unless told otherwise.

## Images from Cloudflare R2 (read-only in this repo)

Real photographs are served from the `finbal-assets` R2 bucket via `https://assets.finbal.neerajraisinghani.com/images/<filename>`, exported as `ASSETS_BASE_URL` from `src/lib/assets.ts`. This repo only *references* existing files in that bucket — there is no local upload script or R2 credentials here. To add a new photo, it must be uploaded to the bucket from the marketing-site repo (or via the R2 console) first; this repo just links to the resulting URL.
