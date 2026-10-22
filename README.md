# tiny-town
A playful open-source town that grows through community proposals

Platform checks and deployment behavior are documented in [docs/platform.md](docs/platform.md).

Want to help the town grow? Read [CONTRIBUTING.md](CONTRIBUTING.md) and use the repository's issue chooser to submit a proposal or bug report.

## Local development

Tiny Town is dependency-free and requires Node.js 20 or newer for checks. Serve the repository root with any static server (for example, `npx serve .`) and open the displayed URL. Relative asset paths allow the same files to work at `/tiny-town/` on GitHub Pages.

Run `npm run check` to validate town data, execute tests, and build the deployable site into `dist/`.

## Adding town content

Edit the arrays in `src/data.js`. Buildings reference residents by stable ID; notices must explicitly declare whether they are seeded; release history must only describe a verifiable published release. `npm run validate` reports duplicate IDs, broken references, missing fields, and invalid map coordinates. Public issue text is an untrusted proposal and must be reviewed before it is copied into town data.
