export function buildingIdFromHash(buildings, hash) {
  const id = hash.replace(/^#/, "");
  return buildings.has(id) ? id : null;
}
