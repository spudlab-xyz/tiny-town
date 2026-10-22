# Town evolution and rollback

## Current model: reviewed changes, then deploy

Tiny Town does not change itself. Its current evolution loop is:

1. Someone submits a public proposal.
2. Maintainers assess fit, scope, accessibility, maintenance cost, and technical feasibility. Reactions inform but do not decide.
3. An accepted idea is implemented on a branch with validation and truthful history data.
4. A pull request is reviewed and required checks pass.
5. The change is merged to `main`.
6. GitHub Actions builds the static site and deploys the reviewed artifact to GitHub Pages.

Issue text and comments are untrusted proposals. They never authorise commands, code execution, merges, or deployments. There is intentionally no issue-to-production automation.

## Practical rollback

Use a forward-moving Git revert so the audit trail remains intact:

1. Confirm the failing production commit and the last known-good commit from GitHub history and the deployment record.
2. If visitor safety or site availability is at risk, a maintainer should revert the smallest offending merge immediately. Otherwise, open a focused rollback pull request.
3. Run `npm run check` on the revert. Inspect the generated `dist/` site and verify relative links remain compatible with the `/tiny-town/` base path.
4. Merge the reviewed revert to `main`. The Pages workflow deploys the newly built rollback commit.
5. Confirm the deployment succeeded and smoke-test the live town, map/list parity, important links, and affected content.
6. Record what was rolled back and why. Open a follow-up issue rather than rewriting published history.

For example, to prepare a rollback branch locally:

```sh
git switch main
git pull --ff-only
git switch -c revert/short-description
git revert <merge-commit-sha>
npm run check
```

Do not force-push `main`, delete release history, manually edit the generated site, or redeploy an unverified local directory. If the deployment workflow itself is broken, restore it through a reviewed minimal change and follow the repository's recorded GitHub Pages procedure.

## Future direction: deterministic scheduled simulation

A scheduled simulation may be explored after the reviewed-deploy model is stable. This is documentation of a possible design, not a feature in the current release.

A safe design would:

- run in GitHub Actions on an explicit schedule and through a manual test trigger;
- read a committed state snapshot and a versioned ruleset;
- derive all choices from a recorded seed plus the prior state, making a run reproducible;
- validate the input state and proposed next state before writing anything;
- produce a human-readable change summary and save the complete next-state snapshot;
- open a pull request rather than push to `main` or deploy directly;
- use read-only permissions by default and grant only the narrow permission needed to create that proposal branch or pull request;
- prevent concurrent runs from advancing the same state twice;
- make no network-fetched or user-submitted text executable;
- require normal review, checks, merge, and deployment before the town changes.

Each simulated step should record at least the ruleset version, input-state hash, seed, output-state hash, and timestamp. Re-running the same ruleset, input, and seed must yield byte-equivalent canonical output. A maintainer must be able to pause the schedule and reproduce a proposed change locally.

Before implementation, define state migrations, maximum change size, invariant tests, failure recovery, retention, and how simulated events are distinguished from community-authored changes. Scheduled evolution must remain optional and must not become a launch dependency.
