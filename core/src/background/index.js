chrome.runtime.onMessage.addListener(function (msg, sender) {
  // validate the message's structure
  if ((msg.from === 'content') && (msg.subject === 'ShowPageAction')) {
    // enable the page-action for the requesting tab
    chrome.pageAction.show(sender.tab.id);
  }
});
