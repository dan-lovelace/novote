#!/bin/sh

npm version patch &&
mkdir -p build

VERSION=$npm_package_version

echo "Deploying version: ${VERSION}"

sed -i bak -e "s|@VERSION@|${VERSION}|g" build.js
node build.js
sed -i bak -e "s|${VERSION}|@VERSION@|g" build.js

git add .
git commit -m 'version bump'

echo "Done"
