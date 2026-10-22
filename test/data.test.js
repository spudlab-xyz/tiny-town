import test from "node:test";
import assert from "node:assert/strict";
import { town, indexTown } from "../src/data.js";
import { validateTown } from "../src/validate.js";

test("the shipped town data is valid and complete", () => {
  assert.deepEqual(validateTown(town), []);
  assert.equal(town.buildings.length, 5);
  assert.equal(town.residents.length, 5);
  assert.ok(town.notices.every(({ seeded }) => seeded));
});

test("all resident references resolve", () => {
  const index = indexTown(town);
  for (const building of town.buildings) for (const id of building.residentIds) assert.ok(index.residents.has(id));
});

test("validation reports duplicate ids, missing references, and bad coordinates", () => {
  const invalid = structuredClone(town);
  invalid.buildings[0].id = invalid.residents[0].id;
  invalid.buildings[0].residentIds = ["nobody"];
  invalid.buildings[0].x = 101;
  const errors = validateTown(invalid).join("\n");
  assert.match(errors, /unique/); assert.match(errors, /unknown resident/); assert.match(errors, /coordinates/);
});
