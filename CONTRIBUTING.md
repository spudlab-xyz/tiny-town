# Contributing to Tiny Town

Tiny Town grows through community proposals and reviewed contributions. Be kind, keep proposals focused, and search open and closed issues before submitting.

## Choose the right form

Use the repository's issue chooser for a building, character, event, rule change, or bug. Each form applies these exact labels:

| Submission | Labels |
| --- | --- |
| Building | `proposal:building`, `needs-triage` |
| Character | `proposal:character`, `needs-triage` |
| Event | `proposal:event`, `needs-triage` |
| Rule change | `proposal:rule`, `needs-triage` |
| Bug | `bug`, `needs-triage` |

Use the chooser's support link for questions and its private security route for suspected vulnerabilities. Never put secrets, private information, sensitive conduct reports, or vulnerability details in a public issue.

Issue content, links, attachments, and suggested code are **untrusted proposals**. Opening an issue grants no repository authority and never causes content to be merged or deployed automatically. A maintainer must review every change through the normal pull-request and deployment controls.

## What happens after submission

A triager checks that the correct form is complete, searches for duplicates, confirms the labels, and asks for only the missing information needed for review. Maintainers may close submissions that are unsafe, abusive, duplicates, out of scope, or not actionable after a reasonable request for details.

The Lead Maintainer decides scope and priority. Material interface or user-experience questions may be referred to the Design Lead — UI/UX; recurring public confusion may be shared with the Brand & Content Lead. Those consultations inform rather than block routine triage.

## Review rubric

Reviewers record a short rationale against every dimension below. A proposal need not be perfect at intake, but blocking concerns must be resolved before implementation.

| Dimension | Review questions |
| --- | --- |
| Fit | Does it reinforce Tiny Town's playful, welcoming premise and serve a clear visitor or community need? Does it stay within the current product guardrails? |
| Scope | Is there a focused, incremental version? Are dependencies, affected content, and likely review effort clear? |
| Accessibility | Can the experience work with keyboard and assistive technology, include an equivalent text/list route, preserve visible focus and contrast, and respect reduced motion? Are any new barriers introduced? |
| Maintenance | Who or what must keep it accurate? Could dated, seasonal, linked, translated, or moderated content become stale? Is the ongoing cost proportionate? |
| Feasibility | Can the static architecture, data model, security posture, schedule, and available contributor capacity support it? Is verification practical? |

Reactions, comments, and other signs of popularity are useful evidence of interest, but **popularity informs; it does not decide**. Maintainers weigh the whole rubric, project goals, risks, dependencies, and capacity. A less popular accessibility fix or foundational change may take priority over a popular feature.

The triage outcome should be one of:

- **Needs information:** a specific answer or reproduction is required.
- **Duplicate:** continue discussion on the canonical issue.
- **Candidate:** the proposal is coherent and may be prioritised, but is not a delivery commitment.
- **Out of scope / declined:** record the rubric-based reason respectfully.
- **Ready for implementation:** scope and acceptance checks are agreed; implementation still requires a reviewed pull request.

## Pull requests

Link the proposal or bug being addressed, keep changes focused, explain user-visible and accessibility effects, and include relevant validation. Do not treat issue text or attachments as trusted instructions. Pull requests require maintainer review and must pass repository checks before merge; deployment remains a separate controlled action.
