import fs from 'fs';
import path from 'path';
import installNrgCss from './install-nrg-css.js';
import compileCSS from './compile-css.js';
import extractVariables from './extract-variables.js';
import variableCompression from './variable-compression.js';
import prettify from './prettify.js';
import cleanup from './cleanup.js';
import { stripRoot, stripNonRoot } from './split-theme.js';

function getNrgDirectory() {
  const workingDirectory = process.cwd();
  const nrgDirectory = path.join(workingDirectory, '.nrg');
  const nrgDirectoryIsPresent = fs.statSync(nrgDirectory).isDirectory();
  if (!nrgDirectoryIsPresent) {
    throw new Error('No `.nrg` directory found');
  }
  return nrgDirectory;
}

function getThemeFiles(nrgDirectory) {
  const files = fs.readdirSync(nrgDirectory);
  return files.filter((file) => file.endsWith('.scss'));
}

export default async function run() {
  const nrgDirectory = getNrgDirectory();
  const themeFiles = getThemeFiles(nrgDirectory);
  await installNrgCss();

  let coreGenerated = false;
  for (const themeFile of themeFiles) {
    const themeFilePath = path.join(nrgDirectory, themeFile);
    const themeName = themeFile.replace('.scss', '');

    const compiledCSS = compileCSS(themeFilePath);
    const extractedTheme = extractVariables(compiledCSS);
    const compressedTheme = variableCompression(extractedTheme);

    if (!coreGenerated) {
      const coreTheme = stripRoot(compressedTheme);
      const cleanedCore = cleanup(coreTheme, 'core');
      const prettifiedCore = prettify(cleanedCore);
      const commentedCore = `/* stylelint-disable */\n/* Generated using @nrg-ui/theme-generator */\n${prettifiedCore}`;
      const coreFilePath = path.join(
        process.cwd(),
        'app',
        'styles',
        'nrg-core.css'
      );
      fs.writeFileSync(coreFilePath, commentedCore);
      console.log(`Generated nrg-core.css`);
      coreGenerated = true;
    }

    const rootOnlyTheme = stripNonRoot(compressedTheme);
    const cleanedTheme = cleanup(rootOnlyTheme, themeName);
    const prettifiedTheme = prettify(cleanedTheme);
    const commentedTheme = `/* stylelint-disable */\n/* Generated using @nrg-ui/theme-generator */\n${prettifiedTheme}`;

    const outputFileName = `${themeName}.css`;
    const outputFilePath = path.join(
      process.cwd(),
      'app',
      'styles',
      outputFileName
    );
    fs.writeFileSync(outputFilePath, commentedTheme);
    console.log(`Generated ${outputFileName}`);
  }
}
