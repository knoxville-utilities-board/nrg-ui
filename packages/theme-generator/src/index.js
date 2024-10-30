import fs from 'fs';
import path from 'path';
import installNrgCss from './install-nrg-css.js';
import compileCSS, { compileBase } from './compile-css.js';
import extractVariables from './extract-variables.js';
import variableCompression from './variable-compression.js';
import prettify from './prettify.js';
import cleanup from './cleanup.js';
import treeDiff from './tree-diff.js';

const CSS_COMMENT_HEADER = `/* stylelint-disable */\n/* Generated using @nrg-ui/theme-generator */\n`;

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
  const rawNrgCSS = fs.readFileSync(
    path.join(
      process.cwd(),
      'node_modules',
      '@nrg-ui',
      'css',
      'dist',
      'main.css'
    ),
    'utf-8'
  );

  const baseCSS = variableCompression(extractVariables(compileBase()));
  const diffedCore = treeDiff(baseCSS, rawNrgCSS);
  const prettifiedCore = prettify(cleanup(diffedCore, 'core'));
  const coreFilePath = path.join(
    process.cwd(),
    'app',
    'styles',
    'nrg-core.css'
  );
  fs.writeFileSync(coreFilePath, `${CSS_COMMENT_HEADER}${prettifiedCore}`);
  console.log(`Generated nrg-core.css`);

  for (const themeFile of themeFiles) {
    const themeFilePath = path.join(nrgDirectory, themeFile);
    const themeName = themeFile.replace('.scss', '');

    const compressedTheme = variableCompression(
      extractVariables(compileCSS(themeFilePath))
    );
    const diffedTheme = treeDiff(treeDiff(compressedTheme, rawNrgCSS), baseCSS);
    const prettifiedTheme = prettify(cleanup(diffedTheme, themeName));

    const outputFileName = `${themeName}.css`;
    const outputFilePath = path.join(
      process.cwd(),
      'app',
      'styles',
      outputFileName
    );
    fs.writeFileSync(outputFilePath, `${CSS_COMMENT_HEADER}${prettifiedTheme}`);
    console.log(`Generated ${outputFileName}`);
  }
}
