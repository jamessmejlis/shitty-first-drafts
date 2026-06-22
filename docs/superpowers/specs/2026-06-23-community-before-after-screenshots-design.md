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

### C. Sizing — aspect-adaptive frame

Initial attempt was "letterbox everywhere" (`object-fit: contain`), but that gives
the 4:3 famous screenshots big white side-bands and a slider that drags over dead
space (the frame is ~2.1:1, wider than those images). Final approach: **size the
frame to each image's aspect ratio** so the whole shot shows with no bands and no
crop.

Aspect ratios are read at **build time** (not measured in the browser) so the
layout is fully server-rendered — no layout shift, no JS dependency, and grep-able
in the prerendered HTML.

- `src/lib/imageAspect.ts`: reads an image's intrinsic `width/height` from
  `/public` via a tiny zero-dependency PNG/JPEG header parser (the formats we
  ship), returning `width / height`; falls back to `16/10` if unreadable. Unit
  test cross-checks it against `sips`.
- `BeforeAfter` / `StaticShot`: drop the fixed `height` prop; take an `aspect`
  prop and set `style={{ aspectRatio }}` on the `.ba` box. With no client
  measurement, `StaticShot` is a plain server component.
- Both server call sites compute `imageAspect(entry.thenImage)` and pass it down.
- `src/app/globals.css`: `.ba` uses `aspect-ratio: 16 / 10` as a fallback
  (always overridden inline) instead of `height: 100%`; `.ba__img` stays
  `object-fit: cover` (the box matches the before/single image, so cover fills it
  with no crop; a slightly different now/then ratio crops a hair rather than
  banding). Drop the mobile `max-height` cap. Add `.ba--static { cursor: default; }`.

## Out of scope (YAGNI)

Real file upload in the form; per-image captions; any `Entry` schema change.

## Verification

- `bun test` — content gate (unaffected; schema unchanged).
- `bun run build` — type-checks new component + both call sites.
- Grep prerendered HTML: confirm `firestarters.html` renders the static shot
  (no slider role) and a famous page still renders the slider; confirm
  `object-fit: contain` ships in CSS.
- Preview screenshot if the renderer cooperates this session.
