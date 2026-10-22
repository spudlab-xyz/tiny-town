const requiredStrings = (item, fields, path, errors) => {
  for (const field of fields) if (typeof item[field] !== "string" || !item[field].trim()) errors.push(`${path}.${field} must be a non-empty string`);
};

export function validateTown(data) {
  const errors = [];
  for (const key of ["buildings", "residents", "notices", "history"]) if (!Array.isArray(data?.[key])) errors.push(`${key} must be an array`);
  if (errors.length) return errors;

  const ids = new Set();
  const addId = (id, path) => { if (ids.has(id)) errors.push(`${path}.id must be unique`); ids.add(id); };
  data.residents.forEach((resident, index) => {
    const path = `residents[${index}]`;
    requiredStrings(resident, ["id", "name", "pronouns", "role", "avatar", "bio"], path, errors);
    addId(resident.id, path);
  });
  const residentIds = new Set(data.residents.map(({ id }) => id));
  data.buildings.forEach((building, index) => {
    const path = `buildings[${index}]`;
    requiredStrings(building, ["id", "name", "icon", "color", "description", "detail"], path, errors);
    addId(building.id, path);
    if (![building.x, building.y].every((value) => Number.isFinite(value) && value >= 0 && value <= 100)) errors.push(`${path} coordinates must be from 0 to 100`);
    if (!Array.isArray(building.residentIds) || !building.residentIds.length) errors.push(`${path}.residentIds must not be empty`);
    else for (const id of building.residentIds) if (!residentIds.has(id)) errors.push(`${path} references unknown resident ${id}`);
  });
  data.notices.forEach((notice, index) => {
    const path = `notices[${index}]`;
    requiredStrings(notice, ["id", "title", "date", "body"], path, errors);
    addId(notice.id, path);
    if (typeof notice.seeded !== "boolean") errors.push(`${path}.seeded must be a boolean`);
    if (notice.residentId !== undefined && !residentIds.has(notice.residentId)) errors.push(`${path} references unknown resident ${notice.residentId}`);
    if (notice.sourceUrl !== undefined && (typeof notice.sourceUrl !== "string" || !notice.sourceUrl.startsWith("https://"))) errors.push(`${path}.sourceUrl must be an https URL`);
  });
  data.history.forEach((entry, index) => requiredStrings(entry, ["version", "date", "title", "summary"], `history[${index}]`, errors));
  return errors;
}
