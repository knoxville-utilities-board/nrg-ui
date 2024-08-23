const fs = require('fs');

const releasePlan = fs.readFileSync('.release-plan.json', 'utf8');
const releasePlanJson = JSON.parse(releasePlan);

const newEmberVersion = releasePlanJson.solution['@nrg-ui/ember'].newVersion;
const newCssVersion = releasePlanJson.solution['@nrg-ui/css'].newVersion;

const updatedVersions = [];
if (newEmberVersion) {
  updatedVersions.push(`@nrg-ui/ember@${newEmberVersion}`);
}
if (newCssVersion) {
  updatedVersions.push(`@nrg-ui/css@${newCssVersion}`);
}

const commitMessage = `COMMIT_MESSAGE=release: ${updatedVersions.join(', ')}`;
console.log(commitMessage);
