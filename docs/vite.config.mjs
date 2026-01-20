import { loadTranslations } from '@ember-intl/vite';
import { classicEmberSupport, ember, extensions } from '@embroider/vite';
import { codeSnippetsPlugin } from '@nrg-ui/code-snippets';
import { extractCodeBlocks } from '@nrg-ui/showcase/plugins';
import { babel } from '@rollup/plugin-babel';
import { join, resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(async (config) => {
  const { mode } = config;
  let emberEnvironment = 'production';

  if (mode === 'development') {
    emberEnvironment = 'development';
  } else if (mode === 'test') {
    emberEnvironment = 'test';
  }

  const { default: emberEnv } = await import(resolve(join('config', 'environment.js')));
  const resolvedEmberEnv = await emberEnv(emberEnvironment);

  const base = resolvedEmberEnv.rootURL ?? '/';

  return {
    base,
    plugins: [
      extractCodeBlocks(),
      codeSnippetsPlugin(),
      classicEmberSupport(),
      ember(),
      // extra plugins here
      babel({
        babelHelpers: 'runtime',
        extensions,
      }),
      loadTranslations(),
    ],
  };
});
