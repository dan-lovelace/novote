#!/bin/sh

# exit if anything fails
set -e

# update package version and create the build directory
# TODO: put this back
# npm version patch

function build(){
  ENV=$1

  if [ "${ENV}" = "production" ]
  then
    npm version patch
  fi

  mkdir -p builds

  # build core js
  cd core
  npm run build
  cd ../

  # build popup js
  cd popup
  npm run build
  cd ../

  # remove old distribution
  rm -rf dist/

  # move files to main dist directory
  rsync -r core/dist/ dist
  rsync -r popup/dist/ dist/popup/

  # update manifest
  OLD_VERSION="$(jq .version < ./dist/manifest.json)"
  NEW_VERSION="\"$(node -p "require('./package.json').version")\""
  sed -i bak -e "s|${OLD_VERSION}|${NEW_VERSION}|g" ./dist/manifest.json

  # build zip file
  cd dist
  zip -r "../builds/${NEW_VERSION//\"/}.zip" ./*
  cd ..

  if [ "${ENV}" = "production" ]
  then
    git add .
    git commit -m "new release: ${VERSION}"
  fi
}

echo ""
echo "Which environment are you building? [dev (default) / prod]"
read CHOICE

case "${CHOICE}" in
  prod)
    echo ""
    echo "Creating production build"
    build "production"
    ;;

  *)
    echo ""
    echo "Creating dev build"
    build "dev"
    ;;
esac
