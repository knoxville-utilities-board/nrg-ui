import { execa } from 'execa';

export default {
  hooks: {
    async postGenerate({ files }) {
      await execa('npx', [
        'prettier',
        '--write',
        ...files.map((file) => file.path),
      ]);
    },
  },
};
