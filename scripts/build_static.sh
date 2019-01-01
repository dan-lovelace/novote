#!/bin/sh

# colors
reset=$(tput sgr0)
red=$(tput setaf 1)
green=$(tput setaf 2)
cyan=$(tput setaf 6)

# exit if anything fails
set -e

function echo_stage(){
  DESCRIPTION=$1

  echo ""
  echo $cyan"- ${DESCRIPTION}"$reset
}

function build(){
  PARAM=$1

  if [ "${PARAM}" = "production" ]
  then
    echo_stage "Bumping version"
    npm version patch

    echo_stage "Updating manifest.json with new version"
    OLD_VERSION="$(jq .version < ./core/src/manifest.json)"
    NEW_VERSION="\"$(node -p "require('./package.json').version")\""
    sed -i bak -e "s|${OLD_VERSION}|${NEW_VERSION}|g" ./core/src/manifest.json
    rm -rf ./core/src/manifest.jsonbak
  fi

  echo_stage "Creating builds directory if it doesn't exist"
  mkdir -p builds

  if [[ "${PARAM}" = "" || "${PARAM}" = "production" || "${PARAM}" = "core" ]]
  then
    echo_stage "Building core JS"
    cd core
    npm run build
    cd ../
  fi

  if [[ "${PARAM}" = "" || "${PARAM}" = "production" || "${PARAM}" = "popup" ]]
  then
    echo_stage "Building popup JS"
    cd popup
    npm run build
    cd ../
  fi

  echo_stage "Removing old distribution and creating a new one"
  rm -rf dist/
  rsync -r core/dist/ dist
  rsync -r popup/dist/ dist/popup/

  if [ "${PARAM}" = "production" ]
  then
    echo_stage "Building zip file"
    FILENAME="${NEW_VERSION//\"/}.zip"
    rm -rf ./builds/${FILENAME}
    cd dist
    zip -r "../builds/${FILENAME}" ./*
    cd ..

    echo_stage "Committing version update"
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
      echo_stage "Creating production build"
      build "production"
    else
      echo "Exiting"
      exit 0
    fi
    ;;

  core)
    echo_stage "Building core JS only for a dev build"
    build "core"
    ;;

  popup)
    echo_stage "Building popup JS only for a dev build"
    build "popup"
    ;;

  *)
    echo_stage "Creating dev build"
    build
    ;;
esac
