# Development guide

This guide covers a clean local setup, production verification, and the checks expected on a pull request.

## Prerequisites

- Git
- Node.js 20 or newer
- npm, included with Node.js
- Python 3 only if you want to run the documented local preview server

No account, API key, paid service, or application server is required to explore or build the town.

## Set up a local checkout

```sh
git clone https://github.com/spudlab-xyz/tiny-town.git
cd tiny-town
npm run check
```

The current project has no third-party runtime or development packages, so there is no dependency-install step. Edit the source files directly and rerun the checks after a change.

## Verify a change

Run the consolidated local check:

```sh
npm run check
```

It runs data validation, the Node.js test suite, and the build. These commands are also available separately:

```sh
npm run validate
npm test
npm run build
```

Inspect the production output locally with any static file server. For example, with Python 3:

```sh
python3 -m http.server 4173 --directory dist
```

Then open <http://localhost:4173/>. The generated site lives in `dist/`. Relative URLs allow it to work below `/tiny-town/` as well as in the local root preview. Do not edit `dist/` or commit it unless a maintainer explicitly changes the release process.

For user-facing changes, also check:

1. Use the important paths with keyboard only and confirm focus remains visible.
2. Confirm the map and text/list view expose equivalent important information.
3. Check a narrow mobile viewport, touch-sized controls, and 200% browser zoom.
4. Enable reduced motion at the operating-system or browser level and confirm non-essential movement is removed.
5. Confirm meaningful images have useful alternatives and information does not depend on colour alone.
6. Follow internal and external links, including the repository and proposal links.

Record what you checked and any known limitation in the pull request. Do not claim accessibility conformance without evidence.

## CI and deployment checks

The **CI** workflow runs the `validate` job for pull requests and pushes to `main`. In addition to the project's declared validation and tests, it prepares `_site` and checks JSON syntax, local `href` and `src` targets, and `/tiny-town/` base-path compatibility. External URLs are intentionally not fetched: remote availability is nondeterministic, and untrusted pull-request content must not make the runner contact arbitrary hosts. Check important external links manually.

The site-preparation step recognises `dist/`, `build/`, or `public/` output, or a dependency-free site with a root `index.html`. A future toolchain must continue to emit one of those layouts or update the preparation script and [platform guide](platform.md) in the same change.

After a change reaches `main`, **Deploy GitHub Pages** runs `build` and then `deploy`, publishing a freshly built artifact to <https://spudlab-xyz.github.io/tiny-town/>. See [platform and deployment](platform.md) for workflow and permission details.

## Keep changes focused

- Start from an issue for substantial work and agree the scope before implementation.
- Create a short-lived branch from the latest `main`.
- Keep generated files, credentials, personal data, and private operational information out of commits.
- Add or update town history only for changes that actually happened. Link an issue or pull request only when it exists.
- Clearly label team-authored demonstrations; never present seeded material as community activity.
- Open a pull request, link the relevant issue, describe verification, and wait for review and required checks.

See [CONTRIBUTING.md](../CONTRIBUTING.md) for proposal and review expectations and [TOWN_DATA.md](TOWN_DATA.md) for content changes.

## Troubleshooting

- If a command behaves unexpectedly, first confirm that `node --version` reports 20 or newer.
- If port 4173 is occupied, choose another unused local port in the preview command.
- If a production-only link or asset fails, test the built preview and inspect whether the URL incorrectly assumes a domain-root deployment. Tiny Town is served from `/tiny-town/`.
- If data validation fails, fix the reported identifier, missing field, duplicate, or unresolved reference; do not weaken validation to admit one entry.
