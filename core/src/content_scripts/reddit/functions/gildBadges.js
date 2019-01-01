export const removeGildBadges = () => {
  const { noDisplay } = require('../index.js');

  // ---------------------------------------------------------------------------
  // old
  // ---------------------------------------------------------------------------
  try {
    const gildedIcons = document.querySelectorAll('.gilded-gid1-icon, .gilded-gid2-icon, .gilded-gid3-icon');
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
    const gildedIcons = document.querySelectorAll('i[id*="PostAwardBadges"], i[id*="CommentAwardBadges"]');
    gildedIcons && Array.prototype.forEach.call(gildedIcons, e => {
      e.parentNode.style = noDisplay;
    });
  } catch (e) {
    // assume not on list page
  }
};
