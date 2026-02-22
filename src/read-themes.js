import fs from 'fs';
import path from 'path';

export default function (fileHelper) {
  return fs
    .readdirSync(fileHelper.nrgDirectory)
    .filter((file) => file.endsWith('.scss'))
    .map((file) => {
      return {
        name: file,
        outputName: file.replace('.scss', '.css'),
        contents: fs.readFileSync(
          path.join(fileHelper.nrgDirectory, file),
          'utf-8'
        ),
      };
    });
}
