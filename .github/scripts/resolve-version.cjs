module.exports = async () => {
  const fs = require('fs');
  const manifestFilePath = '.github/release-please-manifest.json';

  if (!fs.existsSync(manifestFilePath)) {
    throw new Error(`File not found: ${manifestFilePath}`);
  }

  const content = fs.readFileSync(manifestFilePath, 'utf8');
  const manifest = JSON.parse(content);
  const currentVersion = manifest["."];
  console.log(`currentVersion: ${currentVersion}`)

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [major, minor, patch] = currentVersion.split('.').map(Number);
  let newVersion;
  if (major !== currentYear || minor !== currentMonth) {
    newVersion = `${currentYear}.${currentMonth}.0`;
  } else {
    newVersion = `${major}.${minor}.${patch + 1}`;
  }

  console.log(`newVersion: ${newVersion}`)
  return newVersion;
}
