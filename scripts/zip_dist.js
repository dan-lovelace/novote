const fs = require('fs');
const archiver = require('archiver');

const [ , , version] = process.argv;
console.log('got version:', version);
const output = fs.createWriteStream(`${__dirname}/../builds/${version}.zip`);
const archive = archiver('zip', {
  zlib: {
    level: 9,
  },
});

archive.on('error', err => {
  throw err;
})

archive.pipe(output);
archive.directory('dist/', false)
archive.finalize();
