# Community before/after screenshots + letterboxed rendering

Date: 2026-06-23

## Problem

1. Community submissions can only supply one screenshot (the ugly "before").
   There's no way to also offer a "now/after" shot, so community entries can
   never have a real before/after.
2. Entries with a single image still render the drag slider — it just reveals
   the same picture on both sides (the call sites pass `afterSrc={nowImage ?? thenImage}`).
3. `.ba__img { object-fit: cover }` crops wide screenshots to fill the fixed-height
   frame. The Firestarters shot (1280×580) gets its sides cut off flush to the
   border — claustrophobic.

## Decisions

- The ugly "before" stays **required**; the "now/after" is **optional**. (House
  rules: no entry without the proof.)
- **Letterbox everywhere**: switch the framed image from crop (`cover`) to fit
  (`contain`). This intentionally also changes the famous before/afters from
  full-bleed to letterboxed.

## Design

### A. Submission — two screenshots

- `src/components/SubmitForm.tsx`: extract an internal `Dropzone` component
  (encapsulates its own filename + drag state — the parent never reads it; files
  are attached on the GitHub issue, not uploaded by the form). Render two zones in
  a `field-row`: "Proof: the ugly 'before'" and "The now / after — optional".
  Remove the now-unused `fileName` / `dragging` / `fileRef` / `pickFile` from the
  parent.
- `.github/ISSUE_TEMPLATE/submit-your-ugly-mvp.yml`: keep the required
  `screenshot` (before); add an optional `screenshot_now` textarea after it.
- No URL param (GitHub can't prefill file attachments). Entry creation stays
  manual — the maintainer fills `thenImage` and, when provided, `nowImage`. The
  `Entry` type already has `nowImage?`, so no schema change.

### B. Rendering — no slider for single-image entries

- New `src/components/StaticShot.tsx`: a single image in the same framed box as
  the slider (`.ba.ba--static` > one `.ba__layer` + `.ba__img` + one corner
  badge). No handle, no clip-path, no drag/keyboard, default cursor. Props:
  `{ src, alt, badge?, height, priority? }`.
- Both call sites wrap their existing `.ba-frame` around a conditional:
  `entry.nowImage ? <BeforeAfter…/> : <StaticShot…/>`. In the slider branch,
  `afterSrc` becomes `entry.nowImage` directly (no `?? thenImage` fallback).
  - `src/app/[slug]/page.tsx`
  - `src/app/page.tsx` (home hero `featuredEntry`)
- Captions go conditional: slider keeps "Drag the handle — … → now"; static reads
  plainly ("Name, year") with no drag instruction. The hero keeps its
  "See the whole story →" link in both branches.

### C. Sizing — letterbox

- `src/app/globals.css`: `.ba__img` → `object-fit: contain; object-position: center;`.
  The frame's existing `background: var(--paper)` (white) becomes clean letterbox
  margin, so the whole screenshot shows with breathing room. Add
  `.ba--static { cursor: default; }`.

## Out of scope (YAGNI)

Real file upload in the form; per-image captions; any `Entry` schema change.

## Verification

- `bun test` — content gate (unaffected; schema unchanged).
- `bun run build` — type-checks new component + both call sites.
- Grep prerendered HTML: confirm `firestarters.html` renders the static shot
  (no slider role) and a famous page still renders the slider; confirm
  `object-fit: contain` ships in CSS.
- Preview screenshot if the renderer cooperates this session.
