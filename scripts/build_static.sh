#!/bin/sh

# exit if anything fails
set -e

# update package version and create the build directory
# npm version patch
mkdir -p build

rsync -r --exclude 'menu/' src/ dist
rm src/menu/build/manifest.json
cp -R src/menu/build/ dist/

# update zip.js with new version and run it
VERSION="$(node -p "require('./package.json').version")"
sed -i bak -e "s|@VERSION@|${VERSION}|g" scripts/zip.js
node scripts/zip.js

# revert zip.js to original
sed -i bak -e "s|${VERSION}|@VERSION@|g" scripts/zip.js

# git add .
# git commit -m "new release: ${VERSION}"
