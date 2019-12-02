export const removeGildBadges = () => {
  const { noDisplay } = require('../index.js');

  // ---------------------------------------------------------------------------
  // old
  // ---------------------------------------------------------------------------
  try {
    const gildedIcons = document.querySelectorAll('.gilded-gid1-icon, .gilded-gid2-icon, .gilded-gid3-icon, .awarding-link');
    gildedIcons && Array.prototype.forEach.call(gildedIcons, e => {
      e.style = noDisplay;
    });
  } catch (e) {
    // assume not on list page
  }

  // ---------------------------------------------------------------------------
  // new
  // ---------------------------------------------------------------------------
  try {
    const gildedIcons = document.querySelectorAll('i[id*="PostAwardBadges"], i[id*="CommentAwardBadges"], span[id*="PostAwardBadges"], span[id*="CommentAwardBadges"]');
    gildedIcons && Array.prototype.forEach.call(gildedIcons, e => {
      e.parentNode.style = noDisplay;
    });

    const awardsLinks = document.querySelectorAll('button[data-click-id="awards"]');
    awardsLinks && Array.prototype.forEach.call(awardsLinks, e => {
      e.style = noDisplay;
    });
  } catch (e) {
    // assume not on list page
  }
};
