# Platform and deployment

## Automated checks

Pull requests and pushes to `main` run `.github/workflows/ci.yml`. If a committed `package-lock.json` exists, CI uses `npm ci --ignore-scripts`. It runs the declared data validation and tests, then builds the site. The prepared `_site` output is checked for:

- parseable JSON data;
- an `index.html` entry point;
- resolvable local `href` and `src` targets; and
- root-relative asset URLs that use the `/tiny-town/` project base path.

External URLs are intentionally not fetched in CI. Remote availability is nondeterministic and pull-request content must not make the runner contact arbitrary hosts.

The preparation script recognizes conventional `dist/`, `build/`, and `public/` outputs, in that order. If there is no build output, it supports a dependency-free static site rooted at the repository. A future toolchain must emit one of these outputs or update the script in the same change.

While the repository has neither a package manifest nor a site entry point, the PR workflow has no site artifact to inspect and skips the build step. The deployment workflow deliberately has no such exception: it will not publish an empty site.

## Pages deployment

`.github/workflows/pages.yml` builds and validates the same artifact after changes land on `main`, then deploys it through GitHub's official Pages artifact flow. Actions are pinned to full commit SHAs. Workflow-level permissions are `contents: read`; only the deployment job receives `pages: write` and `id-token: write`. No repository secret is required.

Repository observations on 2026-10-22:

- Actions are enabled, with default workflow permissions set to read-only.
- Workflows cannot approve pull requests.
- GitHub Pages is not yet enabled.
- `main` has no branch protection or repository ruleset.
- No Actions environments are configured.

An administrator must select **GitHub Actions** as the Pages build and deployment source before the first deployment can succeed. The first successful deployment creates or uses the `github-pages` environment. Consider protecting `main` with required CI and pull-request review once the check name has appeared; this task does not broaden repository administration settings.

## Rollback

Revert the faulty change on `main`, or use **Run workflow** on the Pages workflow at a known-good commit/ref. Every run builds a fresh artifact; the workflow does not retain or use deployment credentials.
