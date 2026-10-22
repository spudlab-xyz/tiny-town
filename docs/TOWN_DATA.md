# Town data guide

Tiny Town renders buildings, residents, notices, and history from version-controlled data. A routine content change should not require rewriting the interface.

## Conventions

- Use a short, stable, lowercase `id` with hyphens. Treat an ID as permanent after release because other records may refer to it.
- Keep display names and prose in their dedicated fields; do not use an ID as visitor-facing copy.
- Keep references explicit. Every building `residentIds` value must match an existing resident ID.
- Write concise, welcoming copy in plain language. Let humour come from character and everyday town life, not exclusion or stereotypes.
- Use ISO dates (`YYYY-MM-DD`) where a date is required.
- Preserve a truthful chronology. Do not create issue, pull-request, release, contributor, or community claims that cannot be verified.
- Mark team-created sample proposals or notices as seeded demonstrations in the data and visitor-facing copy.
- Do not put HTML, scripts, secrets, personal data, or instructions to automated systems in town content. Treat proposed public content as untrusted input and review it before copying anything into the repository.

All four collections currently live in `src/data.js`; `src/validate.js` defines their validation rules. Those files and `npm run validate` are authoritative for exact fields and allowed values. Follow existing records as examples, but do not copy an accidental inconsistency.

## Add a building

1. Open a building proposal and agree its scope before implementation.
2. Add one record to `town.buildings` with a new stable `id`, `name`, `icon`, `color`, `description`, `detail`, `x` and `y` coordinates from 0 through 100, and a non-empty `residentIds` list.
3. Add or update its visual asset and record the asset's origin and licence in [ASSETS.md](ASSETS.md).
4. Add resident references only after the building ID exists.
5. Add a history entry for the released change, using real issue and pull-request links only.
6. Run `npm run check` and `npm run build`, then test both map and list exploration.

## Add a resident

1. Open a character proposal and agree its scope.
2. Add one record to `town.residents` with a new stable `id`, `name`, `pronouns`, `role`, short `avatar` text, and `bio`.
3. Add the resident ID to the appropriate building's `residentIds`. The validator rejects unknown resident references.
4. Confirm the resident is discoverable in both the visual and text/list experiences.
5. Record new visual assets in [ASSETS.md](ASSETS.md).
6. Add truthful release history, then run `npm run check`.

## Add a notice

1. Add a record to `town.notices` with a new `id`, clear `title`, ISO `date`, concise `body`, and boolean `seeded` value.
2. Classify and label seeded or team-authored demonstrations honestly.
3. Include links only when their targets exist and are appropriate for a public static site.
4. Run `npm run check` and inspect the noticeboard at narrow and wide viewports.

Notices are curated repository content. A public issue does not become a notice automatically.

## Add a history entry

1. Add a record to `town.history` describing a change that has actually shipped or is shipping in the same reviewed update.
2. Provide its `version`, real ISO `date`, `title`, and `summary`.
3. Reference only existing public issues, pull requests, or releases. Omit a reference instead of inventing one.
4. Keep newest/oldest ordering consistent with the existing data and schema.
5. Run `npm run check`, build, and confirm the entry is readable from the noticeboard or history view.

## Change or remove data

Prefer additive changes. Renaming a display label is usually safe; changing a stable ID is a migration because it can break references and links. Before removing a building or resident, update or deliberately retire every reference and explain the visitor-facing effect in the pull request. Historical records should normally remain as an honest account of the town.
