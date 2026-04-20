import * as sass from 'sass';
import fs from 'fs';
import chalk from 'chalk';

export default function (theme, fileHelper) {
  const nrgScssMain = fileHelper.nrgScssDirectory + '/main.scss';
  const bootstrapScssMain = fileHelper.bootstrapNodeModules + '/bootstrap/scss/bootstrap.scss';
  const bootstrapIconScssMain = fileHelper.bootstrapIconNodeModules + '/bootstrap-icons/font/bootstrap-icons.scss';

  const nrgScssExists = fs.existsSync(nrgScssMain);
  const bootstrapScssExists = fs.existsSync(bootstrapScssMain);
  const bootstrapIconScssExists = fs.existsSync(bootstrapIconScssMain);

  let errorMessage = '';

  if (!nrgScssExists) {
    errorMessage += `Could not find NRG SCSS main file at ${nrgScssMain}\n`;
  }

  if (!bootstrapScssExists) {
    errorMessage += `Could not find Bootstrap SCSS main file at ${bootstrapScssMain}\n`;
  }

  if (!bootstrapIconScssExists) {
    errorMessage += `Could not find Bootstrap Icons SCSS main file at ${bootstrapIconScssMain}\n`;
  }

  if (errorMessage) {
    console.error(chalk.red('Preflight checks failed\n' + errorMessage));
    process.exit(1);
  }

  const fullTheme = `
    ${theme}

    @import "main";
  `;
  const result = sass.compileString(fullTheme, {
    quietDeps: true,
    loadPaths: [fileHelper.bootstrapNodeModules, fileHelper.bootstrapIconNodeModules, fileHelper.nrgScssDirectory],
  });

  return result.css;
}
