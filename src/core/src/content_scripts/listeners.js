import { removeElements } from './reddit';
import { updateConfig } from './index';

// enhance performance for back/forward button
window.addEventListener('popstate', removeElements);

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  const { from, subject, data } = msg;

  if (from === 'popup') {
    switch (subject) {
      case 'UpdateConfig': {
        updateConfig(data);
        break;
      }

      default:
        return false;
    }
  }
});
