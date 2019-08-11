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
    # TODO: put this back
    # npm version patch

    echo_stage "Updating manifest.json with new version"
    NEW_VERSION="\"$(node -p "require('./package.json').version")\""
    sed -i.bak -E 's/("version"): "[0-9]+\.[0-9]+\.[0-9]+"/"version": '${NEW_VERSION}'/g' ./core/src/manifest.json
    rm -rf ./core/src/manifest.json.bak
  fi

  echo_stage "Creating builds directory if it doesn't exist"
  mkdir -p builds

  if [[ "${PARAM}" = "" || "${PARAM}" = "production" || "${PARAM}" = "core" ]]
  then
    echo_stage "Building core JS"
    cd core

    if [ "$2" = "development" ]
    then
      npm run build:development
    else
      npm run build
    fi

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
    VERSION="${NEW_VERSION//\"/}"
    FILENAME="${VERSION}.zip"
    rm -rf ./builds/${FILENAME}
    echo "Zipping new version: $VERSION"
    node scripts/zip_dist $VERSION

    echo_stage "Committing version update"
    git add .
    git commit -m "new version: ${VERSION}"
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
    build "core" $2
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
