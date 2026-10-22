import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(process.argv[2] ?? '_site');
const base = process.env.SITE_BASE_PATH ?? '/tiny-town/';
const errors = [];

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

function localTarget(raw, fromFile) {
  const value = raw.split('#')[0].split('?')[0];
  if (!value || /^(?:[a-z]+:|\/\/|#)/i.test(value)) return null;
  if (value.startsWith('/')) {
    if (!value.startsWith(base)) {
      errors.push(`${path.relative(root, fromFile)}: root-relative URL ${raw} must begin with ${base}`);
      return null;
    }
    return path.join(root, value.slice(base.length));
  }
  return path.resolve(path.dirname(fromFile), decodeURIComponent(value));
}

async function resolves(target) {
  const candidates = target.endsWith(path.sep)
    ? [path.join(target, 'index.html')]
    : [target, `${target}.html`, path.join(target, 'index.html')];
  for (const candidate of candidates) {
    try { if ((await stat(candidate)).isFile()) return true; } catch {}
  }
  return false;
}

const files = await walk(root);
if (!files.some((file) => path.relative(root, file) === 'index.html')) {
  errors.push('Site output does not contain index.html.');
}

for (const file of files) {
  const relative = path.relative(root, file);
  if (file.endsWith('.json')) {
    try { JSON.parse(await readFile(file, 'utf8')); }
    catch (error) { errors.push(`${relative}: invalid JSON (${error.message})`); }
  }
  if (!file.endsWith('.html')) continue;
  const html = await readFile(file, 'utf8');
  const attributes = html.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi);
  for (const [, raw] of attributes) {
    const target = localTarget(raw, file);
    if (target && !await resolves(target)) errors.push(`${relative}: ${raw} does not resolve`);
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join('\n'));
  process.exit(1);
}
console.log(`Validated ${files.length} files: JSON syntax, internal links, and ${base} base-path compatibility.`);
