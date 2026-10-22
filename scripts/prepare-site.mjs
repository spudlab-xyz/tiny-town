import { cp, mkdir, readFile, rm, stat } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const destination = path.join(root, '_site');
const packagePath = path.join(root, 'package.json');

async function exists(file) {
  try { await stat(file); return true; } catch { return false; }
}

await rm(destination, { recursive: true, force: true });

if (await exists(packagePath)) {
  const pkg = JSON.parse(await readFile(packagePath, 'utf8'));
  if (pkg.scripts?.build) {
    const result = spawnSync('npm', ['run', 'build'], {
      cwd: root,
      env: { ...process.env, BASE_URL: process.env.SITE_BASE_PATH ?? '/tiny-town/' },
      stdio: 'inherit',
    });
    if (result.status !== 0) process.exit(result.status ?? 1);
  }
}

const candidates = ['dist', 'build', 'public'];
let source = null;
for (const candidate of candidates) {
  const directory = path.join(root, candidate);
  if (await exists(path.join(directory, 'index.html'))) {
    source = directory;
    break;
  }
}

if (source) {
  await cp(source, destination, { recursive: true });
} else if (await exists(path.join(root, 'index.html'))) {
  await mkdir(destination, { recursive: true });
  await cp(root, destination, {
    recursive: true,
    filter: (entry) => {
      const relative = path.relative(root, entry);
      const first = relative.split(path.sep)[0];
      return !['.git', '.github', '_site', 'node_modules', 'scripts'].includes(first);
    },
  });
} else {
  throw new Error('No deployable index.html found in dist/, build/, public/, or the repository root.');
}

console.log(`Prepared ${path.relative(root, source ?? root)} for deployment in _site/.`);
