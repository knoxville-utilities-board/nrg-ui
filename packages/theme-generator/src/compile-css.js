import fs from 'fs';
import path from 'path';
import * as sass from 'sass';
import { fileURLToPath } from 'url';

export default function (themeFilePath) {
  const themeFileContents = fs.readFileSync(themeFilePath, 'utf8');
  const fullTheme = `
    ${themeFileContents}

    @import "main";
  `;

  const dirname = fileURLToPath(new URL('.', import.meta.url));
  const designSystemDirectory = path.join(
    process.cwd(),
    'node_modules/@nrg-ui/css/src'
  );
  const nodeModules = path.join(dirname, '../', 'node_modules');

  const result = sass.compileString(fullTheme, {
    quietDeps: true,
    loadPaths: [path.join(nodeModules), path.join(designSystemDirectory)],
  });

  return result.css;
}
