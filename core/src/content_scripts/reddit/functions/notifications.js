export const removeNotifications = () => {
  const { noDisplay } = require('../index.js');
  // ---------------------------------------------------------------------------
  // old
  // ---------------------------------------------------------------------------

  // nothing here yet

  // ---------------------------------------------------------------------------
  // new
  // ---------------------------------------------------------------------------

  // header if logged in
  try {
    const notificationWrapper = document.querySelector('[aria-label="Open notifications inbox"] div');
    notificationWrapper.style = noDisplay;
  } catch (e) {
    // assume not logged in
  }
};
