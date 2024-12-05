import { execa } from 'execa';

export default {
  generators: {
    component: {
      classBased: true,
    },
    helper: {
      classBased: true,
    },
    modifier: {
      classBased: true,
    },
  },
  hooks: {
    async postGenerate({ files }) {
      await execa('npx', [
        'prettier',
        '--write',
        ...files.map((file) => file.path),
      ]);
    },
  },
  typescript: true,
};
