export const removeVoteButtons = () => {
  const { noDisplay } = require('../index.js');
  // TODO: add option to allow comment votes
  // const buttons = document.querySelectorAll('div:not(.Comment) > div > [aria-label="upvote"]');

  // ---------------------------------------------------------------------------
  // both
  // ---------------------------------------------------------------------------

  // post list and post details
  let buttons = document.querySelectorAll('[aria-label="upvote"]');
  Array.prototype.forEach.call(buttons, e => {
    e.parentNode.innerHTML = '&nbsp;';
  });

  // user profile page if displayed
  try {
    buttons = document.querySelectorAll('span[class*="Post__scoreDisplay"]');
    Array.prototype.forEach.call(buttons, e => {
      e.innerHTML = '&nbsp;';
    });
  } catch (e) {
    // assume not on user profile page
  }
};
