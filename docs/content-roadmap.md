# Content Roadmap — Catalog Growth (Seeding)

Living roadmap for growing the directory beyond the v1 seed set. v1 shipped with
5 curated entries (craigslist, google, amazon, airbnb, dropbox); the goal is
15–20+ entries mixing **classic giants** (the anchor contrast) with **modern
indie / bootstrapper / build-in-public stories** the target audience identifies
with. The v1 build plan deliberately left catalog growth as content-ops — this
doc is where those batches live.

Each batch below is a self-contained seeding task. They're independent and can
run in any order (or in parallel as a fan-out workflow). Batch 0 is the baseline
approach already described in the spec; Batches 1–3 are structured single-source
mines (one show / leaderboard / site each); Batches 4–6 are theme/segment lenses
(indie hackers, bootstrappers, physical products) that pull from several sources
and overlap each other — keep one entry per company, pick its best home, and
de-dup against existing entries before adding.

---

## Shared conventions (apply to every batch)

Read once before running any batch.

- **Entry shape & gate.** Every new entry is one object appended to the `entries`
  array in `src/data/entries.ts`, and MUST pass `bun test` (the content-integrity
  gate): unique kebab slug; `story` 20–500 chars; `tactic` ∈ `ugly-v1` |
  `dont-scale` | `sold-first` | `duct-tape-demo`; `thenImage` present, matching
  `/screenshots/<slug>-then.(png|jpg|webp)`, the file existing on disk and under
  500KB; all links `https://`; famous entries carry a `sourceUrl`; community
  entries carry `founderName`/`founderLink`/`productUrl`.
- **`kind` for curated indie entries.** Entries sourced from the batches below are
  **curated** (with a `sourceUrl`), not founder-submitted — so use
  `kind: "famous"`. They MAY also include `founderName`/`founderLink`/`productUrl`
  to credit and tag the founder (the type allows these on any kind; only
  `community` *requires* them). They render in the main "They all started ugly"
  grid, not the community wall. *(Open question: once there are many curated-indie
  entries, we may want a distinct grouping/label rather than lumping indies with
  megabrands — revisit when the mix justifies it. No schema change needed now.)*
- **The "then" artifact for non-website sources.** Podcasts and interviews have no
  website screenshot. `thenImage` is still required (this is a visual directory),
  so the seeder must produce a representative visual: a Wayback capture of the
  product's early site if one exists (preferred — use `scripts/capture.sh`), a
  sourced early screenshot/photo/video frame from the article, or a designed
  quote-card artifact carrying the founder's own words. Use `thenCaption` to
  explain non-obvious artifacts.
- **Quotes & copyright.** Real guest/founder quotes are powerful — use them, but
  keep them short, in quotation marks, attributed to the person + episode/article,
  with `sourceUrl` pointing at the transcript/episode/profile. Never paste whole
  transcripts or article bodies; the micro-story is paraphrased, the quote is a
  brief excerpt.
- **Voice: name the founder.** Always name the founder(s) in the `lead` (and
  `story`) — listing cards render the `lead`, so a nameless "he did X" reads
  wrong. Where a strong verbatim quote exists, add it to the optional
  `quote: { text, cite }` field; it renders as a brick-red pull-quote on the
  detail page. Not every entry needs a quote — only where it's genuinely good.
  *(Established from review feedback, 2026-06-13.)*
- **Fact-check.** Every story is checked against the cited source before it ships
  — no embellished folklore. If a claim can't be backed, cut it.
- **Could run as a workflow.** Each batch is a fan-out: enumerate candidates
  (episodes / leaderboard rows / case studies) → extract embarrassing-start
  signal + tactic + quote → produce + verify the entry. Fine to run manually too.

---

## Batch 0 — Wayback candidate pool (baseline, already specced)

The classic/modern candidate list and the Wayback capture workflow already live
in the spec: `docs/superpowers/specs/2026-06-12-started-ugly-design.md` →
"Content sourcing workflow". That's the default path for well-known products with
an archived early website. Batches 1–3 extend it with structured, story-rich
sources that surface entries Wayback alone won't.

---

## Batch 1 — The PMF Show transcript mining (Pablo Srugo)

- [ ] **Source.** The Product Market Fit Show (pmf.show) — Pablo Srugo's founder
  interviews. Episodes have transcript/blog pages (e.g. the Amigo AI episode
  already used as a `sold-first` candidate: `https://www.pmf.show/blog/...`).
- [ ] **Method.** Pull episode transcripts and run a structured search for
  embarrassing-start signals: "before I wrote any line of code", "didn't scale",
  "first version", "embarrassed", "manual", "concierge", "Wizard of Oz",
  "pre-sold / pre-orders", "demo video", "I faked", "dollars exchanging hands",
  "$X before building". Each hit is an entry candidate.
- [ ] **Extract per candidate.** Founder name, company, the specific early tactic
  → map to one of the four `tactic` values; one short verbatim guest quote
  (attributed to guest + episode) woven into or appended to the `story`;
  `sourceUrl` = the episode/transcript page.
- [ ] **"Then" artifact.** Wayback capture of the product's early site if it
  existed; otherwise a quote-card artifact or a sourced screenshot — see shared
  conventions.
- [ ] **Tactic fit.** Strong on `sold-first`, `dont-scale`, `duct-tape-demo`.
- [ ] **Known starter.** Amigo AI (Ollie) — $12K collected pre-code, voice-cloned
  demo stitched in Sony Vegas, now Series A. Two candidate angles (`sold-first`
  and `duct-tape-demo`); pick the strongest, one entry.
- [ ] **Networking note.** Featured founders are also outreach targets — tag them
  on launch.

---

## Batch 2 — TrustMRR leaderboard (Marc Lou)

- [ ] **Source.** TrustMRR (`trustmrr.com`) — Marc Lou's leaderboard of indie
  products with verified MRR. Uniquely lets us pair an ugly/scrappy start with a
  concrete revenue payoff — the most motivating contrast for the bootstrapper
  audience.
- [ ] **Method.** Scan the leaderboard for indie/bootstrapped products that had a
  genuinely scrappy or ugly start. For each promising one, find an early artifact
  (Wayback capture of the early site; many of these products are recent enough to
  have a usable archived v1) and confirm the founder's story.
- [ ] **Extract per candidate.** Founder, product, early tactic → `tactic`;
  micro-story; `sourceUrl` = the product's TrustMRR profile (so the verified MRR
  figure is cited, not asserted); optional `founderName`/`founderLink`/`productUrl`
  to credit + tag.
- [ ] **Data dimension — MRR.** This is the one source that adds a "now doing $X
  MRR" stat. **Open decision (resolve when this batch runs, not before):** add an
  optional generic field to `Entry`, e.g. `nowStat?: string` (values like
  `"$45k MRR"`, `"2M users"`) rendered as a small line on the card/detail page,
  backed by `sourceUrl`. Keep it generic rather than MRR-specific so it serves
  other batches too. YAGNI until Batch 2 actually runs; if added, extend the
  content gate to validate it and update `EntryCard`/detail page.
- [ ] **Tactic fit.** Mostly `ugly-v1`, some `sold-first`.
- [ ] **Care.** Only use the publicly-displayed verified numbers; link the profile.

---

## Batch 3 — Starter Story (Pat Walls)

- [ ] **Source.** Starter Story (`starterstory.com`) — Pat Walls' founder case
  studies and podcast: a large library of "how I started X" stories, many with
  early screenshots and revenue figures.
- [ ] **Method.** Search case studies / podcast episodes for scrappy-MVP origins.
  Many articles already include an early screenshot and the founder's revenue —
  high signal per candidate.
- [ ] **Extract per candidate.** Founder, product, early tactic → `tactic`;
  paraphrased micro-story + one short attributed quote; `sourceUrl` = the specific
  Starter Story page; reuse the article's early screenshot only if licensing
  allows, otherwise capture the early site from Wayback; optional founder fields.
- [ ] **Tactic fit.** All four; strong on `dont-scale` and `ugly-v1`.
- [ ] **Care.** Attribute and link the specific story; don't reproduce article
  text — paraphrase. If MRR/revenue is shown and the `nowStat` field exists by
  then (see Batch 2), populate it with the cited figure.

---

## Batch 4 — Indie Hacker projects (Indie Hackers + build-in-public)

- [ ] **Source.** Indie Hackers (`indiehackers.com`) — founder interviews,
  product pages, and milestone posts — plus the broader build-in-public crowd on
  X (Pieter Levels / levels.io, the "12 startups in 12 months" lineage,
  #buildinpublic). The spec already flags Indie Hackers interviews and IH's own
  ugly v1 as sources.
- [ ] **Method.** Scan interviews and milestone threads for the moment the
  product was a weekend hack, a spreadsheet, a Notion doc, or one ugly page.
  These founders narrate their scrappy start publicly — the signal is dense.
- [ ] **Extract per candidate.** Founder, product, the specific early tactic →
  `tactic`; micro-story + a short attributed quote where one lands; `sourceUrl` =
  the IH interview/product page or the original post.
- [ ] **"Then" artifact.** Wayback capture of the early site (many are recent
  enough to have a clean v1), an early screenshot the founder posted, or a
  quote-card — see Shared conventions.
- [ ] **Tactic fit.** Strong on `ugly-v1` and `dont-scale`; some `sold-first`.
- [ ] **Networking note.** IH founders are reachable and like being featured —
  tag them on launch (part of the distribution plan).
- [ ] **Overlap.** Many IH founders are also bootstrappers (Batch 5) and may
  appear on TrustMRR (Batch 2) or Starter Story (Batch 3); one entry per company,
  pick its best home, de-dup before adding.

---

## Batch 5 — Bootstrappers (no-VC, profit-first)

- [ ] **Source.** Founders who grew without venture capital: MicroConf / TinySeed
  talks, `r/SaaS` and `r/Entrepreneur` retros, Pieter Levels, the TrustMRR
  leaderboard (Batch 2), and "bootstrapped to $Xk MRR" write-ups. Profit-from-day-
  one tends to force a scrappy start.
- [ ] **Method.** Find bootstrappers whose origin was genuinely ugly or manual,
  then confirm the story and an early artifact. Prioritise ones with a concrete,
  cited revenue figure — the "ugly start → real money, no funding" contrast is the
  most motivating one for this audience.
- [ ] **Extract per candidate.** Founder, product, early tactic → `tactic`;
  micro-story + short quote; `sourceUrl` backing both the story and (if used) the
  revenue figure.
- [ ] **Data dimension — revenue.** Best served by the `nowStat?` field (see the
  Batch 2 open decision): "$45k MRR", "bootstrapped to $2M ARR". Resolve that
  field when the first revenue-bearing batch ships, then reuse it here.
- [ ] **"Then" artifact.** Wayback of the early site / an early posted screenshot
  / a quote-card — see Shared conventions.
- [ ] **Tactic fit.** Mostly `sold-first` and `ugly-v1`.
- [ ] **Overlap.** Heavy overlap with Batches 1–4. Treat "bootstrapper" as the
  lens, not an exclusive source; de-dup against existing entries.

---

## Batch 6 — Physical products (DTC / hardware / CPG)

- [ ] **Source.** Physical-product founders who started scrappy: Kickstarter /
  Indiegogo campaigns (ButcherBox came from here), Shark Tank origins, DTC brand
  founding stories, Shopify success stories, and "made it on my kitchen table /
  in my garage" accounts.
- [ ] **Method.** Find products that were hand-made, pre-sold, or hawked in
  person before any real manufacturing existed, then confirm the story and a
  visual artifact.
- [ ] **"Then" artifact — the crux.** Physical products rarely have a meaningful
  early *website*. The artifact is usually a **prototype/product photo**, an
  **archived crowdfunding page** (Wayback the Kickstarter/Indiegogo URL, as done
  for ButcherBox), early **packaging**, or a **market-stall / kitchen photo** —
  sourced and credited. Lean on the photo / quote-card options in Shared
  conventions harder than in the website-native batches.
- [ ] **Extract per candidate.** Founder, product, early tactic → `tactic`;
  micro-story + short quote; `sourceUrl` = the campaign page / interview / profile.
- [ ] **Tactic fit.** Strong on `sold-first` (pre-orders, crowdfunding) and
  `dont-scale` (hand-made, hand-delivered, sold in person).
- [ ] **Care.** Confirm photo licensing before reusing an article's image; prefer
  the founder's own posted photo, a crowdfunding-page capture, or a designed
  quote-card. Don't assert revenue/unit numbers without a cited source.

---

## Open decisions

- **`nowStat?` field** (MRR / user counts). See Batch 2. Decide when the first
  revenue-bearing batch runs — Batches 5–6 (bootstrappers, physical) want it too.
- **Curated-indie grouping.** Whether to visually separate curated indie stories
  from megabrands once there's a critical mass. See shared conventions — Batches
  4–6 will push the catalog past that mass, so plan to resolve it as they land.
- **Physical vs digital tag.** Batch 6 adds non-software products. If the mix
  grows, consider a `medium`/category tag for filtering — YAGNI for now; the
  tactic grouping covers browsing.
