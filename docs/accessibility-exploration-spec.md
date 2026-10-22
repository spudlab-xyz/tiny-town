# Tiny Town accessible exploration specification

Status: implementation-ready for v1
Owner: Spud Labs Design Lead — UI/UX
Coordinates with: Engineering and Review & QA

## Experience outcome

Visitors can discover the same five locations, residents, purpose, and history with a pointer, touch, keyboard, or assistive technology. The illustrated map is an inviting overview, not the only route to content. The experience remains understandable at narrow widths, 200% browser zoom, with animation reduced, and when decorative art does not load.

## Information architecture

Use one exploration region with two views and one shared location-detail component:

1. A page heading and short introduction.
2. A labelled view switch: **Illustrated map** / **Town directory**.
3. The active map or directory view.
4. Location details, shown after a visitor chooses a location.
5. The town noticeboard and proposal call to action.

Both views use the same building records and expose the same name, short description, residents, purpose, and history. Neither view is described as an "accessible version." Persist the chosen view for the current session if convenient; otherwise default to the illustrated map on each page load. Do not change views based on detected disability or input type.

## Shared location model

Each building needs a stable `id`, `name`, `summary`, `purpose`, `history`, resident references, and map position. A location with no residents says **No current residents**; it does not omit the field. Missing optional history says **No history recorded yet**. Do not render empty controls or broken resident links.

A selected location is reflected in the URL fragment (for example, `#bakery`) so it can be linked and restored on load. An unknown fragment leaves the overview intact and presents no error interruption.

## Illustrated map

### Structure and semantics

- Give the section an accessible name such as `Explore the illustrated town map`.
- Treat scenery, paths, clouds, and ambient characters as decorative: empty alternative text for images or `aria-hidden="true"` for non-informative SVG groups.
- Render every selectable building as a native `<button>` in DOM order that follows a predictable reading route: top-to-bottom, then left-to-right. Do not use coordinate order as the only information.
- Each button's accessible name is the building name. Its visible label must also show that name at all breakpoints; never rely on shape, colour, hover, or a tooltip alone.
- Use one tab stop per building. Do not implement an ARIA grid, application role, or custom arrow-key roving model for five independent destinations.
- A persistent selected treatment uses at least two cues, such as border plus marker. Expose selection with `aria-pressed="true"`; do not overload `aria-current`, which is for navigation.
- The map artwork itself has no long prose alternative because the directory is the equivalent content. A short caption may explain: **Choose a labelled place, or use the town directory.**

### Pointer and touch

- The entire labelled marker is interactive, not only the illustrated building silhouette.
- Interactive targets are at least 44 by 44 CSS pixels, including spacing sufficient to avoid accidental activation. Where art is visually smaller, enlarge the transparent hit area without allowing targets to overlap.
- Hover may add delight, but it cannot reveal unique information or move the target. The same visible selected state appears after click/tap and keyboard activation.
- Do not make the whole map pannable or zoomable for v1. At narrow widths, scale/recompose the map within its container rather than requiring two-dimensional scrolling.

### Keyboard

- `Tab` and `Shift+Tab` visit building buttons in DOM order. `Enter` and `Space` select.
- The view switch, each building, detail actions, noticeboard links, and proposal link all have a visible focus indicator.
- Focus indicators must remain visible over both light and dark artwork: use an offset, two-tone ring or an equivalent treatment with at least 3:1 contrast against adjacent colours.
- Selection does not automatically move keyboard focus.

## Town directory

Render a real heading followed by a list of five location cards. Each card contains the location name, summary, resident names (or empty-state text), and a native button or link labelled **Explore [location]**. Do not make a non-semantic card container clickable.

The directory is in the DOM whenever practical. Hide the inactive view with the `hidden` attribute so its controls leave both the accessibility tree and tab order; do not merely move it off-screen. Switching views preserves the selected location and moves focus to the newly active view's heading using `tabindex="-1"`. Announce the heading naturally; avoid an additional live-region message.

The directory must remain usable with CSS, imagery, and motion unavailable. On a deep link, the matching directory card and detail content are available from the same underlying data.

## Location details

Use an in-page details region, not a modal dialog. On desktop it may appear beside the map; on mobile it appears immediately after the active map/directory. This avoids focus trapping, obscured context, and platform-specific bottom-sheet behavior.

On location selection:

1. Update the selected state and URL fragment without a full-page reload.
2. Replace the detail region content.
3. Keep focus on the triggering control for pointer and keyboard activation.
4. Update a visually hidden polite live region with **Now exploring [location].** Do not announce the full details.

The details region starts with an `h2` location name and includes purpose, residents, and history under consistent subheadings. Resident names that reveal biographies use real buttons or links. If a resident biography expands in place, the trigger uses `aria-expanded` and `aria-controls`; collapse returns focus to its trigger only when another action removed it.

Provide a visible **Back to town** link on narrow layouts that moves focus to the active view heading. Do not add a close button when details are part of the page.

On initial load with a valid location fragment, render that location selected and place details in the document without forcibly moving focus. Browser Back/Forward restores selection and content, again without surprise focus movement.

## Responsive behaviour

- **Wide (about 900px and above):** map/directory and details may form a two-column layout. Keep DOM order as exploration first, details second.
- **Medium and narrow:** use one column; details follow the active exploration view. Labels remain visible and may use short leader lines where art is crowded.
- At 320 CSS pixels wide and at 200% zoom, no page-level horizontal scrolling is introduced by the map, details, or view switch. Long names wrap rather than truncate.
- Respect text resizing to 200% without loss of content or control overlap. Do not fix card or detail-panel heights.
- Respect safe-area insets for any sticky mobile control. Prefer normal document flow; sticky controls must not cover focused content.

## Motion and visual design

Ambient motion is decorative, subtle, and never required to understand status. Avoid parallax, auto-panning, flashing, or continuous large movement. Interaction feedback should use colour/outline immediately; any accompanying transform finishes within 200ms.

Under `prefers-reduced-motion: reduce`, remove ambient loops, parallax, smooth scrolling, bounce, and scale/translation transitions. A short opacity change is acceptable only if content is not delayed. The final visual and semantic states remain identical.

Text meets WCAG AA contrast: 4.5:1 for normal text and 3:1 for large text. Meaningful control boundaries, focus rings, and selected indicators meet 3:1 against adjacent colours. Test the final composited colours over the map artwork—not just token values in isolation. Do not place essential labels directly on visually busy art without an opaque or sufficiently solid backing.

## Interface copy

Prefer concrete, playful-but-clear labels:

- View switch: **Illustrated map** / **Town directory**
- Map help: **Choose a labelled place, or use the town directory.**
- Directory action: **Explore [location]**
- Detail status: **Now exploring [location].**
- Empty residents: **No current residents**
- Empty history: **No history recorded yet**
- Proposal call to action: **Propose a town change on GitHub**

The proposal link must signal that it leaves Tiny Town if that is not already evident in nearby copy. Do not imply that proposals are automatically accepted or deployed.

## Edge cases

- Very long building and resident names wrap without covering art or controls.
- A building with zero or several residents renders valid text and links.
- An unavailable resident reference is omitted from the interactive list and reported by data validation; it never creates an empty link.
- Slow or failed art loading leaves visible building labels and the directory usable.
- Rapid selection only announces and displays the final selected location; stale asynchronous work cannot overwrite it.
- An invalid URL fragment does not focus an error or leave a false selected state.
- Browser Back/Forward, reload, and copied fragments preserve the expected location.
- At 400% zoom/reflow, content uses one logical column and retains all functions without two-dimensional scrolling, except any genuinely essential visual illustration.
- High-contrast/forced-colours mode retains button boundaries, focus, and selection without depending on background images.
- When JavaScript fails, the server/static HTML provides the directory and complete location content, or a direct link to an equivalent all-locations page.

## Engineering acceptance checks

- [ ] Five labelled map buttons and five matching directory entries come from the same records.
- [ ] Every map location is reachable and operable with `Tab`, `Shift+Tab`, `Enter`, and `Space`; tab order is predictable.
- [ ] No custom ARIA grid/application semantics or arrow-key-only interaction is introduced.
- [ ] Map targets are at least 44 by 44 CSS pixels and do not overlap.
- [ ] Focus is clearly visible over every background; keyboard focus is never lost when content updates or views switch.
- [ ] Switching views hides inactive controls from the accessibility tree, preserves selection, and focuses the active view heading.
- [ ] Selection updates the detail region and URL fragment; Back/Forward restores state without forced focus movement.
- [ ] A concise polite announcement identifies the newly selected location without duplicating the whole panel.
- [ ] Map and directory expose equivalent location, resident, purpose, and history information.
- [ ] Layout works at 320px width, 200% text/zoom, portrait and landscape, with no control overlap or page-level horizontal scroll.
- [ ] Reduced-motion mode removes ambient and spatial motion; no information depends on animation.
- [ ] Normal text contrast is at least 4.5:1; large text, focus, control boundaries, and meaningful non-text states are at least 3:1.
- [ ] Forced-colours mode preserves focus, controls, and selected state.
- [ ] Decorative map content is hidden from assistive technology; meaningful labels remain real text.
- [ ] Empty, long, missing-art, invalid-fragment, and no-JavaScript states behave as specified.

## QA walkthrough

Test with keyboard alone at wide and 320px layouts; VoiceOver/Safari or NVDA/Firefox for names, roles, states, and announcements; touch target inspection on a phone-sized viewport; 200% text/zoom plus 400% reflow; `prefers-reduced-motion`; forced colours; and automated accessibility checks. Automated results supplement rather than replace the manual map/list parity and focus-order review.

Record the browser, viewport, assistive technology, and result for each manual pass. Any exception to this specification should be reviewed jointly by Engineering, Design, and Review & QA before release.
