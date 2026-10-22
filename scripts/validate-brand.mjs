import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const expected = new Map([
  ["public/brand/spudlab-wordmark-reverse.svg", "7f698d8aecd233db4e383c81334766cd7839bdcc1e44d3de48ef939706a3065f"],
  ["public/icons/favicon.ico", "47893a459c9a821f2ffa6df88a1efae0ae081455dba8fc57d1e73f1ba934afc9"],
  ["public/icons/spudlab-app-light-180.png", "23f8f33deb0021ed35fc18c01ebd4d4bd098fb835da289a3bce09c4fd1303c30"],
  ["public/icons/spudlab-app-light-192.png", "1966dece714b301df2e9b0ee68960729d01271d8a8e1fc95c5318acba9c638be"],
  ["public/icons/spudlab-app-light-512.png", "a08c632afb76a8cdb2057b0c490451a5c2cfd852f6d51b8532dd2ecc7a5ad774"],
  ["public/tokens/spudlab.css", "59b77053c8bb0c36a684ef87e29ffda3a227fa1009fc7de4e2f17321fb81918e"],
]);

const errors = [];
for (const [file, checksum] of expected) {
  try {
    const actual = createHash("sha256").update(await readFile(file)).digest("hex");
    if (actual !== checksum) errors.push(`${file}: expected ${checksum}, received ${actual}`);
  } catch (error) { errors.push(`${file}: ${error.message}`); }
}

const manifest = JSON.parse(await readFile("manifest.webmanifest", "utf8"));
if (manifest.name !== "Tiny Town" || manifest.short_name !== "Tiny Town") errors.push("manifest must keep the Tiny Town name");
for (const field of [manifest.start_url, manifest.scope, ...manifest.icons.map(({ src }) => src)]) {
  if (!field.startsWith("./")) errors.push(`manifest URL is not base-path-safe: ${field}`);
}
const productionText = [await readFile("index.html", "utf8"), await readFile("manifest.webmanifest", "utf8"), await readFile("styles.css", "utf8")].join("\n");
for (const forbidden of ["github.com/spudlab-xyz/brand-assets", "git@github.com", "api.github.com", "PRIVATE_TOKEN"]) {
  if (productionText.includes(forbidden)) errors.push(`production source contains private dependency marker: ${forbidden}`);
}
if (errors.length) { console.error(errors.map((error) => `- ${error}`).join("\n")); process.exit(1); }
console.log(`Validated ${expected.size} pinned brand files, Tiny Town manifest metadata, base-path URLs, and private-dependency boundaries.`);
