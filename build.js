const fs = require('fs');

const VERSION = '@VERSION@';

const manifest = fs.readFile('./src/manifest.json', function(err, data) {
  const json = JSON.parse(data);

  json.version = VERSION;
  fs.writeFile('./src/manifest.json', JSON.stringify(json, null, 2));
});
