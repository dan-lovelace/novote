// Enable extension on reddit.com only

// chrome.runtime.onInstalled.addListener(() => {
//   console.log('CHROME RUNTIME INSTALLED -------');
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
//     chrome.declarativeContent.onPageChanged.addRules([
//       {
//         conditions: [
//           new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: {
//               hostContains: 'reddit.com'
//             },
//           })
//         ],
//         actions: [
//           new chrome.declarativeContent.ShowPageAction()
//         ]
//       }
//     ]);
//   });
// });

chrome.runtime.onMessage.addListener(function (msg, sender) {
  // First, validate the message's structure
  if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
    // Enable the page-action for the requesting tab
    chrome.pageAction.show(sender.tab.id);
  }
});
