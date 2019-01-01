#!/bin/sh

reset=$(tput sgr0)
red=$(tput setaf 1)
green=$(tput setaf 2)

# exit if anything fails
set -e

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
  rm -rf ./dist/manifest.jsonbak

  # build zip file
  FILENAME="${NEW_VERSION//\"/}.zip"
  rm -rf ./builds/${FILENAME}
  cd dist
  zip -r "../builds/${FILENAME}" ./*
  cd ..

  # if [ "${ENV}" = "production" ]
  # then
  #   git add .
  #   git commit -m "new release: ${VERSION}"
  # fi
}

case "$1" in
  production)
    echo $red"You are about to create a production build which will increase the version number! This cannot be undone."
    echo "Are you sure you want to proceed? [y/n]"$reset
    read CHOICE

    if [ "${CHOICE}" = "y" ]
    then
      echo "Creating production build"
      build "production"
    else
      echo "Exiting"
      exit 0
    fi
    ;;

  *)
    echo "Creating dev build"
    build
    ;;
esac
