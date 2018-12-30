#!/bin/sh

# exit if anything fails
set -e

# update package version and create the build directory
npm version patch
mkdir -p build

# update build.js with new version and run it
VERSION="$(node -p "require('./package.json').version")"
sed -i bak -e "s|@VERSION@|${VERSION}|g" build.js
node ./build.js

# revert build.js to original
sed -i bak -e "s|${VERSION}|@VERSION@|g" build.js

git add .
git commit -m 'version bump'
