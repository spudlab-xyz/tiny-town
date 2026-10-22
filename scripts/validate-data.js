import { town } from "../src/data.js";
import { validateTown } from "../src/validate.js";
const errors = validateTown(town);
if (errors.length) { console.error(errors.join("\n")); process.exitCode = 1; }
else console.log(`Town data valid: ${town.buildings.length} buildings, ${town.residents.length} residents, ${town.notices.length} notices, ${town.history.length} releases.`);
