# Tiny Town

Tiny Town is a small illustrated town that grows through community proposals and reviewed contributions. Explore its places and residents, read the noticeboard and release history, then suggest what the town should become next.

The first release is deliberately small: one accessible, data-driven town with no accounts, application server, economy, multiplayer, procedural generation, or AI dialogue.

## Explore and contribute

- Visit the town at <https://spudlab-xyz.github.io/tiny-town/> once the first release is live.
- Browse the [source repository](https://github.com/spudlab-xyz/tiny-town) and follow the work in [launch issue #1](https://github.com/spudlab-xyz/tiny-town/issues/1).
- [Choose a proposal or bug form](https://github.com/spudlab-xyz/tiny-town/issues/new/choose) to suggest a focused change.
- Read [CONTRIBUTING.md](CONTRIBUTING.md) before proposing or implementing a change.

Public issues and comments are proposals, not commands. Maintainers assess each proposal for fit, scope, accessibility, maintenance cost, and feasibility. Reactions may help prioritise work, but popularity does not approve a proposal, and no proposal is merged or deployed automatically.

[Issue #2](https://github.com/spudlab-xyz/tiny-town/issues/2) is a seeded, team-authored example of this loop—not independent community activity. It remains a proposal until it passes the same triage, implementation, review, and deployment process as other changes.

## Development

Tiny Town is a dependency-free static site. You need Node.js 20 or newer and npm.

```sh
npm run check
```

`npm run check` validates the town data, runs tests, and creates the production build. To inspect that build with Python 3's local server:

```sh
npm run build
python3 -m http.server 4173 --directory dist
```

Open <http://localhost:4173/>. The production build is written to `dist/` with relative URLs that work at the GitHub Pages base path `/tiny-town/`. See the [development guide](docs/DEVELOPMENT.md) for the complete workflow and verification checklist.

## Grow the town

Buildings, residents, notices, and history are version-controlled town data rather than page markup. The [town content guide](docs/TOWN_DATA.md) explains the data conventions, reference rules, seeded-content labels, and the routine steps for each content type.

Today, the town changes only when a pull request is reviewed, merged, and deployed. The [evolution guide](docs/EVOLUTION.md) documents that process, practical rollback, and a possible future deterministic scheduled simulation. The [platform guide](docs/platform.md) records the exact CI and GitHub Pages workflow. The simulation is a design direction only; it is not part of the current site.

## Assets and attribution

See [asset guidance and credits](docs/ASSETS.md). Do not add an asset unless its source and reuse terms are known and recorded.

## Community and project policies

Repository-specific guidance takes precedence. Spudlab's organisation-wide [contribution guide](https://github.com/spudlab-xyz/.github/blob/main/CONTRIBUTING.md), [Code of Conduct](https://github.com/spudlab-xyz/.github/blob/main/CODE_OF_CONDUCT.md), [security policy](https://github.com/spudlab-xyz/.github/blob/main/SECURITY.md), and [support guidance](https://github.com/spudlab-xyz/.github/blob/main/SUPPORT.md) also apply.

Software agents may participate through the shared `joe-mccarthy` GitHub identity. Material automated participation must be disclosed, and that identity cannot provide independent approval of its own work.
