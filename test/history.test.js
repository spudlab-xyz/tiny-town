import test from "node:test";
import assert from "node:assert/strict";
import { historyMarkup } from "../src/history.js";

test("release history renders its facts and links", () => {
  const html = historyMarkup([{version:"v1.0.0",date:"2026-10-22",title:"Tiny Town opens",summary:"First release.",links:[{label:"Release",url:"https://example.com/v1.0.0"}]}]);
  assert.match(html, /<span>v1\.0\.0<\/span>/);
  assert.match(html, /<time datetime="2026-10-22">2026-10-22<\/time>/);
  assert.match(html, /href="https:\/\/example\.com\/v1\.0\.0">Release ↗<\/a>/);
});

test("release history preserves a valid empty state", () => {
  const html = historyMarkup([]);
  assert.match(html, /No releases are recorded yet/);
  assert.match(html, /^<li>/);
});
