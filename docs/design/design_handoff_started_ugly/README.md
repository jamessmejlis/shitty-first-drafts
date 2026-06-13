# Handoff: Started Ugly — directory of embarrassing first versions

## Overview
**Started Ugly** is a content/directory site with a thesis: *function over form.* It collects the embarrassing first versions of now-famous products (Airbnb's craigslist clone, etc.) to make one argument — you're unfairly comparing your day one to someone else's year fifteen, so ship the ugly version now. The signature interaction is a **draggable before/after reveal** (e.g. Airbnb 2008 → 2026).

The product deliberately practices what it preaches: the chosen ("shippable now") direction is intentionally plain — system-default styling, no logo, visible `// TODO` notes — so the site itself looks like a competent weekend MVP rather than an art-directed showpiece. **This restraint is a feature, not an unfinished state.** Do not "polish it up" beyond what's documented here.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing the intended look and behavior. They are **not** production code to copy directly. The task is to **recreate these designs in the target codebase's environment** (React, Vue, Svelte, etc.) using its established patterns. If no codebase exists yet, pick an appropriate stack — a simple React + Vite or Next.js app is plenty; this is a content site with one interactive component.

> Note on the HTML: the prototypes are authored in a small custom component format (files end in `.dc.html`, and the before/after is mounted via a `<dc-import>` tag). **Ignore that machinery.** Treat each file as a single page of HTML/CSS. The only real component to build is the before/after slider, fully specified below.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, copy, and interaction are all specified. Recreate pixel-faithfully. The only thing to substitute is real content (real screenshots in the before/after, real featured companies) where the prototype uses placeholders.

There are **two visual directions** in this bundle:
1. **Plain / Honest (LEAD — build this one).** `prototype/` folder. System serif, white, hairline rules, one accent. This is the version to ship.
2. **Editorial (saved for the future / v2).** `Started Ugly - Editorial.dc.html` + `Started Ugly - Surfaces.dc.html`. A richer treatment (Newsreader + IBM Plex Mono, newsprint, offset shadows). Included for reference only — **do not build unless explicitly asked.**

---

## Design Tokens (Plain / lead direction)

### Colors
| Token | Hex | Use |
|---|---|---|
| Ink / text | `#111111` | Body text, borders, rules |
| Paper / bg | `#ffffff` | Page background, inputs |
| Accent (brick red) | `#9a3328` | Links, kicker lines, accent labels, primary button |
| Accent hover | `#7e271e` | Button hover |
| Accent border tint | `#d8c2bd` | Border of the `v0.1` tag |
| Body secondary | `#222222` | Paragraph body |
| Muted text | `#666666` | Field labels, captions |
| Faint text | `#777777` / `#888888` | Meta, footer, italic asides |
| TODO grey | `#aaaaaa` / `#bbbbbb` | Monospace `// TODO` seams |
| Hairline rule | `#dddddd` | Light internal dividers |
| Selection bg | `#f0d9d3` | `::selection` |

### Typography
- **Primary family:** `Georgia, 'Times New Roman', Times, serif` — used for ALL UI text (headings, body, buttons, inputs). This is deliberate: a system serif, not a webfont.
- **Monospace family:** `ui-monospace, Menlo, Consolas, monospace` — used ONLY for the `v0.1` tag and the `// TODO` seam notes.
- **No webfonts.** Do not add Inter, Newsreader, etc. to this direction.

| Role | Size | Weight | Tracking | Line-height | Notes |
|---|---|---|---|---|---|
| H1 (home hero) | 40px | 700 | -0.8px | 1.06 | |
| H2 (entry title "Airbnb") | 44px | 700 | -1px | 1.0 | |
| H2 (about / submit title) | 32–36px | 700 | -0.6 to -0.8px | 1.05–1.08 | |
| 404 numeral | 96px | 700 | -3px | 0.9 | |
| Section heading | 16px | 700 | — | — | e.g. "Shipping ugly right now" |
| Body | 16–18px | 400 | — | 1.5–1.6 | `#222` |
| Lead/quote | 17–20px | 400 italic | — | 1.4–1.55 | |
| Kicker line | 13px | 400 | 0.3px | — | accent `#9a3328` |
| Field label | 14px | 400 | — | — | `#666` |
| Caption / meta | 13–14px | 400 | — | — | `#555`–`#777` |
| `v0.1` tag | 12px | 400 | — | — | mono, accent, bordered |
| TODO seam | 12px | 400 | — | 1.7 | mono, `#aaa` |

### Spacing & layout
- **Page max-width:** 900px, centered, `padding: 0 30px`.
- **Section rhythm:** ~30px vertical between major blocks; 22px above content after a top rule.
- **Borders:** `1px solid #111` for all framed elements (cards, inputs, the before/after frame, two-column dividers). Light internal dividers are `1px solid #ddd`.
- **Border radius:** none anywhere (0). Square corners throughout.
- **Shadows:** none in the plain direction.
- **Links:** `text-decoration: underline; text-underline-offset: 3px;` — accent color `#9a3328` for actionable links; inherit `#111` for nav links.

---

## Screens / Views (Plain direction — in `prototype/`)

All pages share a **header**: left = wordmark "Started Ugly" (20px/700) + a bordered mono `v0.1` tag (accent); right = nav links (`Famous`, `Community`, `Submit`, `About`), 14px, underlined. Header sits on a `1px solid #111` bottom rule, `padding: 20px 0 16px`. The wordmark links to Home on every page.

All pages share a **footer** line where present: italic `#888`, 13px, on a top rule — `"Started Ugly · function over form · est. 2026 · built in a weekend, and it shows."`

### 1. Home — `prototype/Home.dc.html`
- **Purpose:** Land the thesis, demo the before/after, route to entries/submit/about.
- **Layout (top→bottom):** header → hero text block (max 720px) → full-width before/after frame → caption line → featured-entry card → "Browse by tactic" link list → two-column footer block (directory list + newsletter signup) → TODO seam → footer rule.
- **Hero:** kicker `Function over form — a directory of embarrassing first versions` (accent); H1 `You're comparing your day one to their year fifteen.`; quote `"If you aren't embarrassed by the first version of your product, you've shipped too late."` (17px `#222`); attribution `— Reid Hoffman, founder of LinkedIn` (14px italic `#666`).
- **Before/after:** see Components. Caption below: `Drag the handle — Airbnb, 2008 → 2026.` + accent link `See the whole story →` (→ Entry).
- **Featured card:** whole card is a link to Entry. `1px solid #111`, padding 18px 20px. Kicker `Featured ugly start — no. 14` (accent 13px); title `Airbnb` (24px/700) + `2008` (13px italic `#888`); paragraph with bold `Before:` / `Now:` runs and an accent `Read the file →`.
- **Browse by tactic:** label "Browse by tactic" (`#666`), then a wrapping flex row (`gap: 8px 26px`) of 4 accent underlined links: `Ugly v1 (4,210)`, `Did things that don't scale (3,118)`, `Sold it before building it (2,002)`, `Duct-taped the demo (1,640)`. All → Home (filtered) for now.
- **Two-column footer block** (`grid 1.25fr / 1fr`, gap 34px, top rule):
  - Left "Shipping ugly right now": 3 rows, each `@handle — Product.` (bold handle) + italic `Now: TBD — they just shipped.` (`#777`).
  - Right "One ugly start, every Friday": email input + `Subscribe` button fused inside a single `1px solid #111` frame (input borderless, button accent bg `#9a3328`, white text, `1px` left border, hover `#7e271e`); helper line `No spam. Unsubscribe anytime. Powered by beehiiv.` (13px `#777`).
- **TODO seam** (mono `#aaa`): `// TODO: real screenshots, write better jokes, design an actual logo` / `// shipped anyway · 2026-06-13`.

### 2. Entry detail — `prototype/Entry.dc.html`
- **Purpose:** The full story of one ugly start (Airbnb).
- **Layout:** header (right side just `‹ Back to directory`, accent) → title block → before/after frame + caption → two-column body (`grid 1.5fr / 1fr`, gap 38px, top rule) → prev/next row.
- **Title block:** kicker `Hall of fame — no. 14`; H2 `Airbnb` (44px) + `Est. 2008`; italic lead sentence (18px `#333`, max 50ch).
- **Left column:** 3 paragraphs, each opening with an accent bold lead-in — `The ugly part.` / `What they shipped anyway.` / `Now.` — then body text (16px/1.6 `#222`).
- **Right column** (`border-left: 1px solid #ddd`, padding-left 22px): "The file" key/value rows (`Founded / 2008`, `Time to first $ / ~2 weeks`, `Day-one stack / HTML + email`); "Tactics used" list of 3 accent links; a top-ruled italic "The lesson:" note.
- **Prev/next:** top rule, space-between, two underlined links — `‹ Prev · Stripe (no. 13)` and `Next · DoorDash (no. 15) ›`.

### 3. Submit — `prototype/Submit.dc.html`
- **Purpose:** Form to add an ugly start. The form is the joke — "we want the draft you'd rather we didn't see."
- **Layout:** header → bordered two-column block (`grid 1.5fr / 1fr`), left = form (right border `1px solid #111`), right = house rules. TODO seam below.
- **Form (left):** kicker `Add to the directory`; H2 `Submit an ugly start.`; italic lead. Fields (all `1px solid #111`, 10–12px padding, Georgia, no radius):
  - `Your handle` — text input, placeholder `@yourname`
  - `Product` / `Link` — two inputs in a `1fr 1fr` grid (placeholders `What's it called?`, `https://`)
  - `What's embarrassing about it?` — textarea, min-height 66px, placeholder `Be honest. The uglier the better — that's the whole point.`
  - `Tactics (pick any)` — 4 toggle links shown as checkboxes: `☑ Ugly v1` (accent, selected) + three `☐ …` (grey). On build, make these real toggles.
  - `Proof (the embarrassing screenshot)` — `1px dashed #111` dropzone, text `Drop your ugly v1 screenshot here, or browse`.
  - Submit row: accent button `Ship it ugly →` (hover `#7e271e`) + italic aside `No polish required. Seriously.`
- **House rules (right):** label "House rules", then 3 numbered items (accent numeral + bold title + grey description), then a top-ruled italic line `Every entry here was once someone's worst-kept secret.`
- **TODO seam:** `// TODO: actually wire up the form. for now it just believes you.`

### 4. About — `prototype/About.dc.html`
- **Purpose:** The manifesto.
- **Layout:** header (nav with About marked active/italic grey) → single column max 680px.
- **Content:** kicker (function over form line); H2 `You only ever see the after.`; two body paragraphs (the rigged-comparison argument + the function-over-form lesson, with `function over form` bolded); a `border-left: 3px solid #9a3328` blockquote of the Hoffman quote; "What we believe" ordered list of 4 items (17px/1.7); two closing paragraphs ending on a 20px/700 `That's the point.`; primary button `Add an ugly start →` (→ Submit) + accent link `Back to the directory`; TODO seam; footer rule with the "best read with something unfinished open in another tab" line.

### 5. 404 — `prototype/404.dc.html`
- **Purpose:** Error page, on-thesis.
- **Layout:** header → centered block, `padding: 80px 0 90px`.
- **Content:** kicker `Error — page not found` (accent); `404` numeral (96px/700, -3px); H2 `This page shipped, then vanished.`; italic line `Either it never existed or it wasn't ready. Very on-brand for us. Keep moving.` (max 46ch); two centered accent links (`‹ Back to the directory`, `Submit an ugly start →`); TODO seam `// TODO: build a real 404. this one will do for now.`
- Not linked from anywhere (it's the fallback route).

### 6. Share card (OG image) — in `Started Ugly - Plain Surfaces.dc.html` (surface #5)
- **Purpose:** 1200×630 social/OG image. Not a page — render as a static meta image.
- **Layout:** `aspect-ratio: 1200/630`, `1px solid #111`. Top row: wordmark + `v0.1` tag (left), italic `function over form` (right). Center: left = kicker + 54px/700 headline `You're comparing your day one to their year fifteen.`; right = a 250px-wide mini before/after token (hatched grey "2008" half | 1px divider | orange-gradient "2026" half, with a `Drag to reveal` caption bar). Bottom row: italic Hoffman quote (left) + `startedugly.com` (right).

---

## The one real component: Before / After slider

A horizontal drag-to-reveal comparing two stacked, equally-sized panels. **Reference:** `prototype/BeforeAfter.dc.html` (and `BeforeAfter.dc.html` at project root).

- **Structure:** a `position: relative` container (100% width; height set by parent — 370px on Home, 360px on Entry). Two absolutely-positioned layers fill it:
  - **Before layer** (bottom): the 2008 design, always fully painted.
  - **After layer** (top): the 2026 design, clipped via `clip-path: inset(0 0 0 <pct>%)` so only the portion right of the handle shows.
  - **Handle:** a 2px white vertical line at `left: <pct>%` with a 38px circular grab knob centered on it (`‹ ›` glyphs), `box-shadow` for lift.
- **Interaction:** pointer-driven. On `pointerdown` (+ capture) and `pointermove` while dragging, compute `pct = clamp(0, 100, (clientX − rect.left) / rect.width × 100)` and update both the clip-path and handle position. Default `pct ≈ 52`. `cursor: ew-resize`, `touch-action: none`, `user-select: none`. Support touch and mouse.
- **Content in the prototype is placeholder** (CSS-drawn approximations of the two eras with hatch/gradient fills and era badges `AIRBNB · 2008` / `AIRBNB · 2026`). **In production, swap in two real screenshots** of the same dimensions; the slider logic is unchanged.
- **Accessibility:** add a `role="slider"`, `aria-valuenow`, and keyboard support (left/right arrows nudge `pct`) when building for real — the prototype omits this.

---

## Interactions & Behavior
- **Navigation:** standard page links (see each screen). Wordmark → Home everywhere. Build as client routes (`/`, `/entry/:slug`, `/submit`, `/about`, `*` → 404) or plain pages.
- **Before/after:** drag, as specified above. Persist nothing.
- **Submit form:** in the prototype the fields are live inputs but nothing is wired. On build: validate required (handle, product, embarrassing-text, ≥1 tactic), make the tactic chips real toggles, handle the screenshot upload, and show a confirmation state after "Ship it ugly →" (a dry thank-you in keeping with the voice — e.g. *"Shipped. We'll be appropriately unimpressed."*). Confirm copy with the owner.
- **Hover states:** primary buttons darken to `#7e271e`. Links may add/keep underline. Keep hovers minimal — this is a plain site.
- **Responsive:** single 900px column; below ~720px collapse the two-column blocks (home footer, entry body, submit) to one column and let the header nav wrap (already `flex-wrap`). Before/after stays full-width and works at any size.

## State Management
Minimal. Local state only:
- Before/after: `pct` (number 0–100) + `dragging` (bool).
- Submit form: field values, selected tactics (set), upload file, submitted (bool).
- No global store or data fetching needed for the prototype. Real version: fetch the entry list + per-entry detail from a CMS/DB; everything else is static.

## Assets
- **No icon font or image assets** are used in the plain direction — glyphs are literal Unicode (`‹ › ☑ ☐ → ✓ ↔`).
- **Before/after imagery** is CSS-drawn placeholder in the prototype. Production needs **real paired screenshots** per featured company (same dimensions, ~3:2 landscape works well at the documented heights).
- **No logo** exists yet — the wordmark is set type. (The `// TODO: design an actual logo` seam is intentional copy.)

## Voice & copy notes
Dry, honest, self-aware. The site admits its own unfinished state (`v0.1`, the TODO seams, "built in a weekend, and it shows"). **Keep these seams** — removing them undercuts the whole concept. Tone is matter-of-fact, never hype. "Function over form" is the standing motto; use it in the header kicker and footer.

## Files
**Build from these (plain / lead direction):**
- `prototype/Home.dc.html` — home / directory
- `prototype/Entry.dc.html` — entry detail (Airbnb)
- `prototype/Submit.dc.html` — submit form
- `prototype/About.dc.html` — manifesto
- `prototype/404.dc.html` — error page
- `prototype/BeforeAfter.dc.html` — the slider component
- `Started Ugly - Plain Surfaces.dc.html` — same surfaces in one scrollable sheet, **plus the 1200×630 share card (surface #5)** which isn't in the prototype folder

**Reference only (saved "v2" — do NOT build unless asked):**
- `Started Ugly - Editorial.dc.html` — richer editorial home
- `Started Ugly - Surfaces.dc.html` — editorial versions of all surfaces

> Reminder: `.dc.html` files use a small custom component wrapper. Read them as HTML/CSS references; the only behavior to port is the before/after slider, fully specified above.
