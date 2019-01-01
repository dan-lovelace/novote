export const removeKarma = () => {
  const { noDisplay } = require('../index.js');
  // ---------------------------------------------------------------------------
  // old
  // ---------------------------------------------------------------------------

  // catch-all
  const karmaSpans = document.querySelectorAll('span[class*="karmaSpans"]');
  Array.prototype.forEach.call(karmaSpans, e => {
    e.style = noDisplay;
  });

  // ---------------------------------------------------------------------------
  // new
  // ---------------------------------------------------------------------------

  // header if logged in
  try {
    const currentUserInfo = document.querySelector('.header-user-dropdown img').nextSibling;
    const currentUserKarma = currentUserInfo.querySelector('span');
    currentUserKarma.style = noDisplay;
  } catch (e) {
    // assume not logged in
  }

  // user profile page if displayed
  try {
    const userProfileKarma = document.querySelector('span#profile--id-card--highlight-tooltip--karma').parentNode.parentNode;
    userProfileKarma.style = noDisplay;

    if (userProfileKarma && userProfileKarma.previousSibling) {
      userProfileKarma.previousSibling.style = noDisplay;
    }
  } catch (e) {
    // assume not on user profile page
  }

  // hovering a user's name
  try {
    const tooltipDivs = document.querySelectorAll('div[id*="UserInfoTooltip"] div > div > div');
    Array.prototype.forEach.call(tooltipDivs, e => {
      if (e.innerHTML.toLowerCase().indexOf('karma') >= 0) {
        e.parentNode.style = noDisplay;
      }
    });
  } catch (e) {
    // assume not hovering a user's name
  }
};
