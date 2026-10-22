# Brand source

- Canonical repository: `spudlab-xyz/brand-assets` (private)
- Adopted guidance release: `v1.0.0`
- Source commit: `1f3dfb0ea44b6870d6a2129a62ce48fee408f3c1`
- Release archive SHA-256: `b9e390cd39187dc33ecfc3bd2b0a669124b7152bc7eb202ce6941994be70face`
- Consuming project: `tiny-town`
- Vendored v1.0.0 assets and tokens: listed below
- Approved local exceptions: TT-EX-01 through TT-EX-03 below
- Review date: 2027-04-22, or earlier if Tiny Town is redesigned

The canonical source remains private. Future adoption must copy only the approved files needed by this public project, record each local path and upstream file checksum here, and keep builds and CI independent of private URLs, submodules, packages, and credentials. Contributors without private access must use the pinned local files and guidance and state that limitation in their task or pull request.

## Vendored files

All local SHA-256 values match the v1.0.0 `manifest.json` entries.

| Upstream path | Local path | SHA-256 |
| --- | --- | --- |
| `assets/svg/logos/spudlab-wordmark-reverse.svg` | `public/brand/spudlab-wordmark-reverse.svg` | `7f698d8aecd233db4e383c81334766cd7839bdcc1e44d3de48ef939706a3065f` |
| `assets/png/app-icons/favicon.ico` | `public/icons/favicon.ico` | `47893a459c9a821f2ffa6df88a1efae0ae081455dba8fc57d1e73f1ba934afc9` |
| `assets/png/app-icons/spudlab-app-light-180.png` | `public/icons/spudlab-app-light-180.png` | `23f8f33deb0021ed35fc18c01ebd4d4bd098fb835da289a3bce09c4fd1303c30` |
| `assets/png/app-icons/spudlab-app-light-192.png` | `public/icons/spudlab-app-light-192.png` | `1966dece714b301df2e9b0ee68960729d01271d8a8e1fc95c5318acba9c638be` |
| `assets/png/app-icons/spudlab-app-light-512.png` | `public/icons/spudlab-app-light-512.png` | `a08c632afb76a8cdb2057b0c490451a5c2cfd852f6d51b8532dd2ecc7a5ad774` |
| `tokens/spudlab.css` | `public/tokens/spudlab.css` | `59b77053c8bb0c36a684ef87e29ffda3a227fa1009fc7de4e2f17321fb81918e` |

No Tiny Town social image is included because v1.0.0 has no approved Tiny Town export.

## Local exceptions

### TT-EX-01 — serif editorial typography

Tiny Town retains Georgia/Times for narrative display and body copy while navigation, controls, labels, tags, metadata, and status use the shared sans stack. This preserves the established story-led journey; test fallback metrics, zoom, text spacing, reflow, and clipping. Owner: Tiny Town Lead Maintainer. Reviewers: UI/UX, QA/accessibility, Brand & Content. Migration: use a future upstream project-display role if released.

### TT-EX-02 — hand-drawn geometry and hard shadow

The illustrated map, buildings, directory, and noticeboard retain their irregular geometry and restrained hard shadows; generic controls and the endorsement use shared geometry. This preserves place recognition. Boundaries, unclipped focus, reduced motion, and unrotated text require review. Owner: Tiny Town Lead Maintainer. Reviewers: UI/UX and QA/accessibility. Migration: remove when illustrated surfaces are intentionally redesigned.

### TT-EX-03 — local illustration palette

Named grass, water, road, place, orange noticeboard, and yellow-detail colours remain only on scene and project-expression surfaces. Generic text, controls, links, focus, status, borders, and neutral surfaces use shared roles. Names, icons, borders, and selected outlines remain non-colour cues. Owner: Tiny Town Lead Maintainer. Reviewers: UI/UX, QA/accessibility, Brand & Content. Migration: move any local colour that gains semantic UI meaning to a shared role.
