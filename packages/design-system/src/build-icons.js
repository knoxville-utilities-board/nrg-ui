import { basename, join } from 'node:path';
import { copyFile, cp, mkdir, stat } from 'node:fs/promises';

const DIST_PATH = join(process.cwd(), 'dist');
const ASSETS_PATH = join(DIST_PATH, 'assets', 'icons');
const DEPS_PATH = join(process.cwd(), 'node_modules');

const dir = await stat(DEPS_PATH);

if (dir === undefined) {
  console.error('`node_modules` does not exist, install dependencies before building icons');
  process.exit(1);
}

await mkdir(ASSETS_PATH, { recursive: true });

const fontDirectory = join(DEPS_PATH, 'bootstrap-icons', 'font');

// Copy font files
await cp(join(fontDirectory, 'fonts'), join(ASSETS_PATH, 'fonts'), {
  recursive: true,
});

// Copy CSS for font
await copy(join(fontDirectory, 'bootstrap-icons.css'), ASSETS_PATH);

// Copy JSON for TypeScript types
await copy(join(fontDirectory, 'bootstrap-icons.json'), ASSETS_PATH);

function copy(filePath, directory) {
  const fileName = basename(filePath);
  return copyFile(filePath, join(directory, fileName));
}
