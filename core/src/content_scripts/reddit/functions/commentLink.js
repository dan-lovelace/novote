export const removeCommentLink = () => {
  const { noDisplay } = require('../index.js');
  // ---------------------------------------------------------------------------
  // old
  // ---------------------------------------------------------------------------

  // list page
  try {
    const commentLinkElems = document.querySelectorAll('.bylink.comments');
    commentLinkElems && Array.prototype.forEach.call(commentLinkElems, e => {
      e.style = noDisplay;
    });
  } catch (e) {
    // assume not on list page
  }

  // user profile page
  try {
    const commentLinkElems = document.querySelectorAll('.Post__flatListItem');
    commentLinkElems && Array.prototype.forEach.call(commentLinkElems, e => {
      e.style = noDisplay;
    });
  } catch (e) {
    // assume not on user profile page
  }

  // ---------------------------------------------------------------------------
  // new
  // ---------------------------------------------------------------------------

  // list page
  try {
    const commentLinkElems = document.querySelectorAll('a[data-click-id="comments"]');
    commentLinkElems && Array.prototype.forEach.call(commentLinkElems, e => {
      e.style = noDisplay;
    });
  } catch (e) {
    // assume not on list page
  }
}
