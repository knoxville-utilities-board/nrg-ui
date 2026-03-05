import fs from 'fs';
import path from 'path';

export default function (workingDirectory) {
  const defaultConfig = {
    projectPath: '.',
    outputDir: 'app/styles',
  };
  const configPath = path.join(workingDirectory, '.nrg', 'config.json');
  if (!fs.existsSync(configPath)) {
    return defaultConfig;
  }
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  return {
    ...defaultConfig,
    ...config,
  };
}
