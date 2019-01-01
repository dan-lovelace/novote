import { removeElements } from './reddit';

import fields from './lib/fields';

// instantiate all listeners
import './listeners';

export let config = {};

export function updateConfig(newConfig) {
  config = newConfig;
}

// send message to background.js to show page action
chrome.runtime.sendMessage({
  from: 'content',
  subject: 'ShowPageAction'
});

// load user configuration
chrome.storage.sync.get(fields.map(field => field.id), storage => {
  const defaults = fields.reduce((acc, val, index) => index === 1
    ? Object.assign({ [acc.id]: acc.defaultValue }, { [val.id]: val.defaultValue })
    : Object.assign(acc, { [val.id]: val.defaultValue })
  );

  config = {
    ...defaults,
    ...storage,
  };

  // chrome.runtime.sendMessage({
  //   from: 'content',
  //   subject: 'UserConfigLoaded',
  //   data: config,
  // });
  console.log('initialized with config: ', config);
});

// initialize polling to remove elements
(function poll() {
  removeElements(config);
  setTimeout(poll, 100);
})();
