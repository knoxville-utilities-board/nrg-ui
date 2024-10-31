import chalk from 'chalk';
import cleanup from './cleanup.js';
import compileCSS from './compile-css.js';
import fs from 'fs';
import path from 'path';
import prettify from './prettify.js';
import treeDiff from './tree-diff.js';
import readThemes from './read-themes.js';
import {
  installNrgCss,
  checkNodeVersion,
  ensureNrgDirectoryExists,
} from './dependencies.js';

function getFileHelper() {
  const workingDirectory = process.cwd();
  const targetNodeModules = path.join(workingDirectory, 'node_modules');
  const thisNodeModules = path.join(import.meta.dirname, '../', 'node_modules');
  const nrgDirectory = path.join(workingDirectory, '.nrg');
  const nrgCss = path.join(
    targetNodeModules,
    '@nrg-ui',
    'css',
    'dist',
    'main.css'
  );
  const nrgScssDirectory = path.join(
    targetNodeModules,
    '@nrg-ui',
    'css',
    'src'
  );
  const themeOutputDirectory = path.join(workingDirectory, 'app', 'styles');

  return {
    workingDirectory,
    targetNodeModules,
    thisNodeModules,
    nrgDirectory,
    nrgCss,
    nrgScssDirectory,
    themeOutputDirectory,
  };
}

export default async function run() {
  console.log(
    chalk.green('Checking dependencies and ensuring NRG CSS is installed')
  );
  checkNodeVersion();

  const fileHelper = getFileHelper();
  ensureNrgDirectoryExists(fileHelper);
  await installNrgCss();

  console.log(chalk.green('Gathering theme files'));
  const rawNrgCSS = fs.readFileSync(fileHelper.nrgCss, 'utf-8');
  const themes = readThemes(fileHelper);

  for (const theme of themes) {
    console.log(chalk.green(`${theme.name}`));

    console.log(chalk.green(`  Compiling scss`));
    const compiledTheme = compileCSS(theme.contents, fileHelper);

    console.log(chalk.green(`  Generating diff from NRG`));
    const diffedTheme = treeDiff(compiledTheme, rawNrgCSS);

    console.log(chalk.green(`  Writing output`));
    const prettifiedTheme = prettify(cleanup(diffedTheme));

    const cssCommentHeader = `/* stylelint-disable */\n/* Generated using @nrg-ui/theme-generator */\n`;
    fs.writeFileSync(
      path.join(fileHelper.themeOutputDirectory, theme.outputName),
      `${cssCommentHeader}${prettifiedTheme}`
    );
  }
  console.log(chalk.green('Done'));
}
