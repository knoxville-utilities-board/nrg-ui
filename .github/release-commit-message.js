const fs = require('fs');
const path = require('path');

const releasePlan = fs.readFileSync('.release-plan.json', 'utf8');
const releasePlanJson = JSON.parse(releasePlan);

const packageDirectory = 'packages';
const packages = fs.readdirSync(packageDirectory)
  .map(file => path.join(packageDirectory, file))
  .filter(path => fs.statSync(path).isDirectory());

const updatedVersions = [];
for(const package of packages) {
  const packageJson = fs.readFileSync(path.join(package, 'package.json'), 'utf8');
  const packageJsonParsed = JSON.parse(packageJson);
  if (packageJsonParsed.private) {
    continue;
  }
  const name = packageJsonParsed.name;
  const newVersion = releasePlanJson.solution[name].newVersion;
  if (newVersion) {
    updatedVersions.push(`${name}@${newVersion}`);
  }
}

const commitMessage = `COMMIT_MESSAGE=release: ${updatedVersions.join(', ')}`;
console.log(commitMessage);
