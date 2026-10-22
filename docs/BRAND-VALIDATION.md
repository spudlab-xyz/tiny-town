# Brand integration validation

Engineering preflight for issue #9. Independent Review & QA must repeat the interactive checks against the exact PR head before merge.

## Automated evidence

- `npm run check`: five buildings and five residents validated; 19 tests passed; production build passed.
- `scripts/validate-brand.mjs`: six pinned files match v1.0.0 SHA-256 values; manifest identity and relative paths pass; production source has no private-repository, credential, or API dependency markers.
- `scripts/validate-site.mjs dist`: production JSON, local assets, module imports, and `/tiny-town/` base-path compatibility pass.
- Contrast calculation using WCAG relative luminance: noticeboard ink/orange 5.25:1; footer cream/ink 14.23:1; light primary pair 8.15:1; dark primary pair 11.08:1; accent tag pair 9.54:1. Existing map label-pair tests remain green.

## Engineering inspection matrix

| Surface | Light, wide | Dark, wide | Light, 320 CSS px | Dark, 320 CSS px |
| --- | --- | --- | --- | --- |
| Map | semantic page/control chrome; local scene colours | semantic dark chrome; local scene unchanged | 16px gutter, clamped 44px+ controls, directory available | same dark-role behavior |
| Directory and detail | surface/text/border roles; sticky detail | dark surface/text/border roles | single column; static detail after exploration | same dark-role behavior |
| Noticeboard | ink on orange; semantic article surfaces | ink on orange; dark semantic articles | single-column articles | same dark-role behavior |
| History | semantic page, link, text, border roles | dark semantic roles | one-column entries at 360px and below | same dark-role behavior |
| Footer | dark semantic surface; reverse wordmark | same approved dark footer treatment | wrapped centered rows; 112px wordmark retained | same approved treatment |

The DOM order preserves header, main landmarks, map/directory, detail, noticeboard, history, invitation, and footer. The three-option native theme control is labelled, has a 44px minimum target, stores only explicit choices, and follows system preference otherwise. The pre-paint script applies an explicit choice before styles load. Reduced-motion tokens and existing hover suppression remain active; forced-colour rules preserve borders, focus, selected outlines, native select behavior, and endorsement contrast.

Missing endorsement artwork retains the visible `by` text and the image alternative `Spudlab`. Missing scenery does not remove generated place names or the directory. With JavaScript disabled, the project framing, copy, theme default, footer, and endorsement remain readable; the existing script-generated exploration content remains subject to the repository's established fallback contract.

## Exact-head QA required

Review & QA must record actual-browser results for System/Light/Dark, keyboard-only exploration and focus return, 200% zoom, 320px/400% reflow, text-spacing overrides, NVDA/Firefox or VoiceOver/Safari, reduced motion, forced colours/high contrast, touch targets, missing art, no JavaScript, history/back-forward fragments, and final composited contrast over every illustrated surface. Capture or note map, directory, detail, noticeboard, and history in both themes at wide and 320px. This engineering record does not claim product WCAG certification or replace independent exact-head validation.
