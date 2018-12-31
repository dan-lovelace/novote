#!/bin/sh

# exit if anything fails
set -e

# update package version and create the build directory
# TODO: put this back
# npm version patch
mkdir -p builds

# build core files
cd src/core
npm run build
cd ../..

# build popup
cd src/popup
npm run build
cd ../..

# remove old distribution
rm -rf dist/

# move files to main dist directory
rsync -r src/core/dist/ dist
rsync -r src/popup/dist/ dist/popup/

# update zip.js with new version and run it
VERSION="$(node -p "require('./package.json').version")"
sed -i bak -e "s|@VERSION@|${VERSION}|g" scripts/zip.js
node scripts/zip.js

# revert zip.js to original
sed -i bak -e "s|${VERSION}|@VERSION@|g" scripts/zip.js

# TODO: put this back
# git add .
# git commit -m "new release: ${VERSION}"
