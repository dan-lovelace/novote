const fs = require('fs');

const VERSION = '@VERSION@';

// update extension's manifest file
const manifest = fs.readFile('./src/manifest.json', function(readErr, data) {
  if (readErr) return;
  const json = JSON.parse(data);

  json.version = VERSION;
  fs.writeFile('./src/manifest.json', JSON.stringify(json, null, 2), function(writeErr) {
    if (writeErr) return;

    // zip it all up with the latest build
    const AdmZip = require('adm-zip');
    const zip = new AdmZip();

    zip.addLocalFolder('src');
    zip.writeZip('./build/' + VERSION + '.zip');
  });
});
