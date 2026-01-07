import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';

const OUTPUT_FILE = join(process.cwd(), 'src', 'icons.ts');
const AUTO_GEN_HEADER = "/* Generated from Bootstrap Icon's bootstrap-icons.json */";

const content = [AUTO_GEN_HEADER, `const icons = [`];
const iconData = JSON.parse(
  await readFile(
    join(
      process.cwd(),
      'node_modules',
      '@nrg-ui',
      'css',
      'dist',
      'assets',
      'icons',
      'bootstrap-icons.json',
    ),
  ),
);
const iconNames = Object.keys(iconData);
const iconTypes = iconNames.sort().map((icon) => `  'bi-${icon}',`);

content.push(...iconTypes, '] as const;');
content.push(`\nexport type Icon = (typeof icons)[number];`);
content.push(`\nexport default icons;`);

const data = content.join('\n') + '\n';

await writeFile(OUTPUT_FILE, data);
