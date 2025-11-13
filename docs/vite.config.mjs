import { classicEmberSupport, ember, extensions } from '@embroider/vite';
import { extractCodeBlocks } from '@nrg-ui/showcase/plugins';
import { babel } from '@rollup/plugin-babel';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    extractCodeBlocks(),
    classicEmberSupport(),
    ember(),
    // extra plugins here
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ],
});
