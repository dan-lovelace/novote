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

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  console.log('msg: ', msg);
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    // Collect the necessary data
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`)
    console.log('content document: ', document);
    var domInfo = {
      total: document.querySelectorAll('*').length,
      inputs: document.querySelectorAll('input').length,
      buttons: document.querySelectorAll('button').length
    };

    // Directly respond to the sender (popup),
    // through the specified callback */
    response(domInfo);
  }
});
