#!/bin/sh

mkdir -p build

echo "Deploying version: ${npm_package_version}"

sed -i bak -e "s|@VERSION@|${npm_package_version}|g" build.js
node build.js
sed -i bak -e "s|${npm_package_version}|@VERSION@|g" build.js

git add .
git commit -m 'version bump'

echo "Done"
