import chalk from 'chalk';
import cleanup from './cleanup.js';
import compileCSS from './compile-css.js';
import fs from 'fs';
import path from 'path';
import prettify from './prettify.js';
import treeDiff from './tree-diff.js';
import readThemes from './read-themes.js';
import getConfig from './config.js';
import {
  installNrgCss,
  checkNodeVersion,
  ensureNrgDirectoryExists,
} from './dependencies.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

function getFileHelper() {
  const workingDirectory = process.cwd();
  const bootstrapLocation = path.dirname(
    require.resolve('bootstrap/package.json')
  );
  const bootstrapNodeModules = path.join(bootstrapLocation, '../');
  const bootstrapIconLocation = path.dirname(
    require.resolve('bootstrap-icons/package.json')
  );
  const bootstrapIconNodeModules = path.join(bootstrapIconLocation, '../');

  const nrgDirectory = path.join(workingDirectory, '.nrg');

  const config = getConfig(workingDirectory);

  const targetNodeModules = path.join(
    workingDirectory,
    config.projectPath,
    'node_modules'
  );
  const targetPackageJson = path.join(
    workingDirectory,
    config.projectPath,
    'package.json'
  );

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

  return {
    config,
    workingDirectory,
    targetNodeModules,
    targetPackageJson,
    bootstrapNodeModules,
    bootstrapIconNodeModules,
    nrgDirectory,
    nrgCss,
    nrgScssDirectory,
  };
}

export default async function run() {
  console.log(
    chalk.green('Checking dependencies and ensuring NRG CSS is installed')
  );
  checkNodeVersion();

  const fileHelper = getFileHelper();
  ensureNrgDirectoryExists(fileHelper);

  await installNrgCss(fileHelper);

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
    const prettifiedTheme = await prettify(cleanup(diffedTheme));

    const cssCommentHeader = `/* stylelint-disable */\n/* Generated using @nrg-ui/theme-generator */\n`;
    const themeOutputDirectory = path.join(
      fileHelper.workingDirectory,
      fileHelper.config.outputDir
    );
    if (!fs.existsSync(themeOutputDirectory)) {
      fs.mkdirSync(themeOutputDirectory, { recursive: true });
    }
    fs.writeFileSync(
      path.join(themeOutputDirectory, theme.outputName),
      `${cssCommentHeader}${prettifiedTheme}`
    );
  }
  console.log(chalk.green('Done'));
}
