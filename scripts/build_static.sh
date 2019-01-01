#!/bin/sh

# colors
reset=$(tput sgr0)
red=$(tput setaf 1)
green=$(tput setaf 2)

# exit if anything fails
set -e

function build(){
  PARAM=$1
  echo "build ${PARAM}"
  if [ "${PARAM}" = "production" ]
  then
    npm version patch

    # update manifest.json with latest version
    OLD_VERSION="$(jq .version < ./core/src/manifest.json)"
    NEW_VERSION="\"$(node -p "require('./package.json').version")\""
    sed -i bak -e "s|${OLD_VERSION}|${NEW_VERSION}|g" ./core/src/manifest.json
    rm -rf ./core/src/manifest.jsonbak
  fi

  mkdir -p builds

  if [[ "${PARAM}" = "" || "${PARAM}" = "core" ]]
  then
    # build core js
    cd core
    npm run build
    cd ../
  fi

  if [[ "${PARAM}" = "" || "${PARAM}" = "popup" ]]
  then
    # build popup js
    cd popup
    npm run build
    cd ../
  fi

  # remove old distribution and create a new one
  rm -rf dist/
  rsync -r core/dist/ dist
  rsync -r popup/dist/ dist/popup/

  if [ "${PARAM}" = "production" ]
  then
    # build zip file
    FILENAME="${NEW_VERSION//\"/}.zip"
    rm -rf ./builds/${FILENAME}
    cd dist
    zip -r "../builds/${FILENAME}" ./*
    cd ..

    # commit version update
    git add .
    git commit -m "new version: ${NEW_VERSION}"
  fi

  echo ""
  echo $green"Build successful!"$reset
  echo ""
}

case "$1" in
  production)
    echo $red"You are about to create a production build which will increase the version number! This cannot be undone."
    echo ""
    echo "Are you sure you want to proceed? [y/n]"$reset
    read CHOICE

    if [ "${CHOICE}" = "y" ]
    then
      echo $green"Creating production build"$reset
      build "production"
    else
      echo "Exiting"
      exit 0
    fi
    ;;

  core)
    echo $green"Building core JS only for a dev build"$reset
    build "core"
    ;;

  popup)
    echo $green"Building popup JS only for a dev build"$reset
    build "popup"
    ;;

  *)
    echo $green"Creating dev build"$reset
    build ""
    ;;
esac
