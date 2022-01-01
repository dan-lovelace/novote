export const removePostScore = () => {
  const { noDisplay } = require('../index.js');
  const { hasCommentParent } = require('./commentScore.js');

  // ---------------------------------------------------------------------------
  // old
  // ---------------------------------------------------------------------------

  try {
    const buttons = document.querySelectorAll('.score.unvoted');
    Array.prototype.forEach.call(buttons, (e) => {
      hasCommentParent(e, (res) => {
        if (!res && e.parentNode.className !== 'tagline') {
          e.style = noDisplay;
        }
      });
    });
  } catch (e) {}

  // ---------------------------------------------------------------------------
  // new
  // ---------------------------------------------------------------------------

  // post list and post details
  try {
    const buttons = document.querySelectorAll('[aria-label="upvote"]');
    Array.prototype.forEach.call(buttons, (e) => {
      hasCommentParent(e, (res) => {
        if (!res && e.nextSibling.getAttribute('aria-label') !== 'downvote') {
          e.nextSibling.innerHTML = '&nbsp;';
        }
      });
    });
  } catch (e) {}

  // post details upvote percentage
  try {
    const postContent = document.querySelector('[data-test-id="post-content"]');
    const postContentToolbar = postContent.lastElementChild;
    const upvotePercent = postContentToolbar.lastChild;
    upvotePercent.style = noDisplay;
  } catch (e) {}
};
