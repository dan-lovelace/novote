# NoVote

A Chrome extension with options to remove the following components from Reddit:

- Up/downvote buttons
- User karma
- Post scores
- Comment scores
- Post comment counts
- Gilded icons

[Available on the Chrome store](https://chrome.google.com/webstore/detail/novote/kepihiliocoofjjbgmcmalnjmeclpnga)

# Development

This project is divided into two smaller projects, both built independently with webpack:

`core` - Contains the core source required by Chrome to run. `manifest.json` is the main configuration file that describes which JS to execute and when.

`popup` - React application that runs inside the DOM provided when left-clicking the extension icon while it's active.

A build script combines everything into a `dist` directory at the project's root. The projects can also be individually built using their respective build commands below.

### Local development

- Open Chrome and go to `chrome://extensions/`
- Enable 'Developer mode'
- Click 'Load unpacked'
- Select the `dist` folder at the project's root
- Navigate to `reddit.com` in a new tab
- Make local changes and run any of the commands under **Builds**
- If changes were made to the `core` directory, the extension will need to be refreshed on [chrome://extensions/](chrome://extensions/) and the Reddit page also needs refreshing
- If changes were only made to the `popup` directory, nothing needs to be refreshed.. just close and reopen the popup

### Builds

- Install `jq` with Homebrew: `brew install jq`
- Full local build: `npm run build` will build both `core` and `popup` together and place it in the `dist` folder. Optional:
  - `core` build only - `npm run build-partial:core`
  - `popup` build only - `npm run build-partial:popup`
- Production build: `npm run build:production` builds `core` and `popup`, updates the extension's version and creates a zip file in the `builds` directory

### Deploys

- Go to [the Chrome developer dashboard](https://chrome.google.com/webstore/developer/dashboard?authuser=1)
- Click Edit
- Upload the latest build from the `builds` directory
