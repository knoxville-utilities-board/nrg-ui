const fs = require('fs');
const path = require('path');

const releasePlan = fs.readFileSync('.release-plan.json', 'utf8');
const releasePlanJson = JSON.parse(releasePlan);

const packageDirectory = 'packages';
const packages = fs
  .readdirSync(packageDirectory)
  .map((file) => path.join(packageDirectory, file))
  .filter((path) => fs.statSync(path).isDirectory());

const updatedVersions = [];
for (const pkg of packages) {
  let packageJson;
  try {
    const json = fs.readFileSync(path.join(pkg, 'package.json'), 'utf8');
    packageJson = JSON.parse(json);
  } catch (e) {
    continue;
  }
  if (packageJson.private) {
    continue;
  }
  const name = packageJson.name;
  const newVersion = releasePlanJson.solution[name]?.newVersion;
  if (newVersion) {
    updatedVersions.push(`${name}@${newVersion}`);
  }
}

const commitMessage = `COMMIT_MESSAGE=release: ${updatedVersions.join(', ')}`;
console.log(commitMessage);
