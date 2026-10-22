import { cp, mkdir, rm } from "node:fs/promises";
const output = new URL("../dist/", import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(new URL("src/", output), { recursive: true });
for (const file of ["index.html", "styles.css"]) await cp(new URL(`../${file}`, import.meta.url), new URL(file, output));
for (const file of ["app.js", "data.js", "validate.js"]) await cp(new URL(`../src/${file}`, import.meta.url), new URL(`src/${file}`, output));
console.log("Built static site in dist/ (relative URLs support /tiny-town/).");
