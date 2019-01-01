export const removeGildBadge = () => {
  const { noDisplay } = require('../index.js');
  // ---------------------------------------------------------------------------
  // gilded identifiers (old reddit)
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
  // gilded identifiers (redesign)
  // ---------------------------------------------------------------------------
  try {
    const gildedIcons = document.querySelectorAll('i[id*="PostAwardBadges"], i[id*="CommentAwardBadges"]');
    gildedIcons && Array.prototype.forEach.call(gildedIcons, e => {
      e.style = noDisplay;
    });
  } catch (e) {
    // assume not on list page
  }
};
