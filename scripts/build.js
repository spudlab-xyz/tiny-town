import { cp, mkdir, rm } from "node:fs/promises";
const output = new URL("../dist/", import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(new URL("src/", output), { recursive: true });
for (const file of ["index.html", "styles.css", "manifest.webmanifest"]) await cp(new URL(`../${file}`, import.meta.url), new URL(file, output));
await cp(new URL("../public/", import.meta.url), new URL("public/", output), { recursive: true });
for (const file of ["app.js", "data.js", "history.js", "navigation.js", "validate.js"]) await cp(new URL(`../src/${file}`, import.meta.url), new URL(`src/${file}`, output));
console.log("Built static site in dist/ (relative URLs support /tiny-town/).");
