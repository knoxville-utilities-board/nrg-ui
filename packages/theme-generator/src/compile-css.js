import * as sass from 'sass';

export default function (theme, fileHelper) {
  const fullTheme = `
    ${theme}

    @import "main";
  `;
  const result = sass.compileString(fullTheme, {
    quietDeps: true,
    loadPaths: [fileHelper.thisNodeModules, fileHelper.nrgScssDirectory],
  });

  return result.css;
}
