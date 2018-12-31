// import { removeElements } from './reddit';
//
// console.log('Initializing app 6');
//
// // enhance performance for browser's back/forward button
// window.addEventListener('popstate', removeElements);
//
// // initialize polling since redesign won't always run our JS on navigation
// setInterval(() => {
//   removeElements();
// }, 100);

// Inform the background page that
// this tab should have a page-action
chrome.runtime.sendMessage({
  from: 'content',
  subject: 'showPageAction'
});

console.log('content document: ', document);

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  const { from, subject, data } = msg;
  console.log('msg: ', msg);
  if (from === 'popup') {
    switch (subject) {
      case 'DOMInfo': {
        var domInfo = {
          total: document.querySelectorAll('*').length,
          inputs: document.querySelectorAll('input').length,
          buttons: document.querySelectorAll('button').length
        };

        // Directly respond to the sender (popup),
        // through the specified callback */
        response(domInfo);
        break;
      }

      case 'UpdateConfig': {
        console.log('updating config...');
        break;
      }

      default:
        return false;

    }
  }
});
