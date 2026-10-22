import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
test("page exposes its essential landmarks and list fallback", () => {
  for (const snippet of ["<main>", "id=\"town-map\"", "id=\"location-list\"", "id=\"place-detail\"", "id=\"notices\"", "id=\"history\""]) assert.match(html, new RegExp(snippet));
});
test("assets use relative URLs for subpath deployment", () => {
  assert.match(html, /href="\.\/styles\.css"/); assert.match(html, /src="\.\/src\/app\.js"/); assert.doesNotMatch(html, /(?:href|src)="\/(?!\/)/);
});
test("focus and reduced-motion accommodations are present", () => {
  assert.match(css, /:focus-visible/); assert.match(css, /prefers-reduced-motion/);
});
