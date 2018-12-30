#!/bin/sh

# exit if anything fails
set -e

# update package version and create the build directory
# npm version patch
mkdir -p ./build

# copy non-bundled required files
cp ./src/manifest.json ./dist/manifest.json
cp ./src/background.js ./dist/background.js
cp -a ./src/images/. ./dist/images/

# update zip.js with new version and run it
VERSION="$(node -p "require('./package.json').version")"
sed -i bak -e "s|@VERSION@|${VERSION}|g" ./scripts/zip.js
node ./scripts/zip.js

# revert zip.js to original
sed -i bak -e "s|${VERSION}|@VERSION@|g" ./scripts/zip.js

git add .
git commit -m "new release: ${VERSION}"
