import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");
test("page exposes its essential landmarks and list fallback", () => {
  for (const snippet of ["<main>", "id=\"town-map\"", "id=\"location-list\"", "id=\"place-detail\"", "id=\"notices\"", "id=\"history\""]) assert.match(html, new RegExp(snippet));
});
test("assets use relative URLs for subpath deployment", () => {
  assert.match(html, /href="\.\/styles\.css"/); assert.match(html, /src="\.\/src\/app\.js"/); assert.doesNotMatch(html, /(?:href|src)="\/(?!\/)/);
});
test("focus and reduced-motion accommodations are present", () => {
  assert.match(css, /:focus-visible/); assert.match(css, /prefers-reduced-motion/);
});

test("mobile markers are clamped inside the map", () => {
  assert.match(css, /left:clamp\(0%,var\(--x\),62%\);width:38%/);
});

test("navigation clears unknown fragments and returns focus to the active view", () => {
  assert.match(app, /else clearBuilding\(\)/);
  assert.match(app, /focusActiveView\(\)/);
  assert.match(app, /history\.pushState\(\{\}, "",/);
});

test("directory and details render purpose and history", () => {
  assert.match(app, /<h3>Purpose<\/h3>/);
  assert.match(app, /<h3>History<\/h3>/);
  assert.match(app, /<b>Purpose:<\/b>/);
  assert.match(app, /<b>History:<\/b>/);
});

test("site validation rejects a missing local JavaScript import", async (t) => {
  const fixture = await mkdtemp(path.join(tmpdir(), "tiny-town-site-"));
  t.after(() => rm(fixture, { recursive: true, force: true }));
  await mkdir(path.join(fixture, "src"));
  await writeFile(path.join(fixture, "index.html"), '<script type="module" src="./src/app.js"></script>');
  await writeFile(path.join(fixture, "src/app.js"), 'import "./missing.js";');

  const result = spawnSync(process.execPath, [new URL("../scripts/validate-site.mjs", import.meta.url).pathname, fixture], { encoding: "utf8" });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /src\/app\.js: \.\/missing\.js does not resolve/);
});
