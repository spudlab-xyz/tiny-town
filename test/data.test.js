import test from "node:test";
import assert from "node:assert/strict";
import { town, indexTown } from "../src/data.js";
import { validateTown } from "../src/validate.js";
import { buildingIdFromHash } from "../src/navigation.js";

test("the shipped town data is valid and complete", () => {
  assert.deepEqual(validateTown(town), []);
  assert.equal(town.buildings.length, 5);
  assert.equal(town.residents.length, 5);
  assert.equal(town.notices.length, 4);
  assert.ok(town.notices.every(({ seeded }) => seeded));
  const umbrella = town.notices.find(({ id }) => id === "lost-umbrella");
  assert.equal(umbrella.residentId, "mara");
  assert.match(umbrella.body, /moss-green umbrella/);
  assert.equal(umbrella.sourceUrl, "https://github.com/spudlab-xyz/tiny-town/issues/2");
});

test("notice resident references are validated", () => {
  const invalid = structuredClone(town);
  invalid.notices.at(-1).residentId = "nobody";
  assert.match(validateTown(invalid).join("\n"), /unknown resident nobody/);
});

test("all resident references resolve", () => {
  const index = indexTown(town);
  for (const building of town.buildings) for (const id of building.residentIds) assert.ok(index.residents.has(id));
});

test("location hashes resolve only known buildings", () => {
  const { buildings } = indexTown(town);
  assert.equal(buildingIdFromHash(buildings, "#signpost"), "signpost");
  assert.equal(buildingIdFromHash(buildings, ""), null);
  assert.equal(buildingIdFromHash(buildings, "#not-a-place"), null);
});

test("every location has equivalent purpose and history content", () => {
  for (const building of town.buildings) {
    assert.ok(building.purpose.length > 10);
    assert.ok(building.history.length > 10);
  }
});

test("map label colors meet 4.5:1 contrast against white", () => {
  const luminance = (hex) => {
    const channels = hex.match(/[\da-f]{2}/gi).map((value) => parseInt(value, 16) / 255).map((value) => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
    return .2126 * channels[0] + .7152 * channels[1] + .0722 * channels[2];
  };
  for (const building of town.buildings) assert.ok(1.05 / (luminance(building.color) + .05) >= 4.5, `${building.name} color contrast`);
});

test("validation reports duplicate ids, missing references, and bad coordinates", () => {
  const invalid = structuredClone(town);
  invalid.buildings[0].id = invalid.residents[0].id;
  invalid.buildings[0].residentIds = ["nobody"];
  invalid.buildings[0].x = 101;
  const errors = validateTown(invalid).join("\n");
  assert.match(errors, /unique/); assert.match(errors, /unknown resident/); assert.match(errors, /coordinates/);
});
