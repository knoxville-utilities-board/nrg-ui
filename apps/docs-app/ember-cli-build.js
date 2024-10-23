'use strict';
/* eslint-disable @typescript-eslint/no-require-imports */

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const fs = require('fs');
const path = require('path');

module.exports = async function (defaults) {
  const { readPackageUpSync } = await import('read-package-up');

  const app = new EmberApp(defaults, {
    minifyCSS: {
      enabled: false,
    },
    'ember-cli-babel': { enableTypeScriptTransform: true },
    trees: {
      app: (() => {
        const sideWatch = require('@embroider/broccoli-side-watch');

        const paths = ['@nrg-ui/core', '@nrg-ui/css'].map((libraryName) => {
          const entry = require.resolve(libraryName);
          const { packageJson, path: packageJsonPath } = readPackageUpSync({
            cwd: entry,
          });
          const packagePath = path.dirname(packageJsonPath);

          console.debug(
            `Side-watching ${libraryName} from ${packagePath}, which started in ${entry}`,
          );

          const toWatch = packageJson.files
            .map((f) => path.join(packagePath, f))
            .filter((p) => {
              if (!fs.existsSync(p)) return false;
              if (!fs.lstatSync(p).isDirectory()) return false;

              return !p.endsWith('/src');
            });

          return toWatch;
        });

        return sideWatch('app', { watching: paths.flat() });
      })(),
    },
    '@embroider/macros': {
      setConfig: {
        'ember-css-transitions': {
          useTestWaiters: true,
        },
      },
    },
    babel: {
      plugins: [
        // ... any other plugins
        require.resolve('ember-concurrency/async-arrow-task-transform'),

        // NOTE: put any code coverage plugins last, after the transform.
      ],
    },
  });

  app.import('node_modules/@nrg-ui/css/dist/main.css');
  app.import(
    'node_modules/@nrg-ui/css/dist/assets/icons/fonts/bootstrap-icons.woff',
    {
      destDir: 'assets/fonts',
    },
  );
  app.import(
    'node_modules/@nrg-ui/css/dist/assets/icons/fonts/bootstrap-icons.woff2',
    {
      destDir: 'assets/fonts',
    },
  );

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack);
};
