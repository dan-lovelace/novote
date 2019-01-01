export const removeCommentCount = () => {
  const { noDisplay } = require('../index.js');
  // ---------------------------------------------------------------------------
  // old
  // ---------------------------------------------------------------------------

  // list page
  try {
    const commentCountElems = document.querySelectorAll('.bylink.comments');
    const regex = new RegExp(/[0-9]/g);
    commentCountElems && Array.prototype.forEach.call(commentCountElems, e => {
      if (!!regex.test(e.innerHTML)) {
        e.innerHTML = 'comments';
      }
    });
  } catch (e) {
    // assume not on list page
  }

  // post detail page
  try {
    const commentCountElems = document.querySelector('.commentarea .panestack-title .title');
    commentCountElems.style = noDisplay;
  } catch (e) {
    // assume not on post detail page
  }

  // user profile page
  try {
    const commentCountElems = document.querySelectorAll('.Post__flatListItem');
    const regex = new RegExp(/[0-9].*(comment)s?/g);
    commentCountElems && Array.prototype.forEach.call(commentCountElems, e => {
      if (!!regex.test(e.innerHTML) && e.parentNode.className === 'Post__flatList') {
        e.innerHTML = 'comments';
      }
    });
  } catch (e) {
    // assume not on user profile page
  }

  // ---------------------------------------------------------------------------
  // new
  // ---------------------------------------------------------------------------

  // list page
  try {
    const commentCountElems = document.querySelectorAll('a[data-click-id="comments"]');
    const regex = new RegExp(/[0-9]/g);
    commentCountElems && Array.prototype.forEach.call(commentCountElems, e => {
      if (!!regex.test(e.innerHTML)) {
        e.innerHTML = 'Comments';
      }
    });
  } catch (e) {
    // assume not on list page
  }

  // post detail page
  try {
    const commentCountElems = document.querySelectorAll('i.icon.icon-comment');
    const regex = new RegExp(/[0-9.]+[ k]+comments?/gi);
    commentCountElems && Array.prototype.forEach.call(commentCountElems, e => {
      const ele = e.nextSibling;
      if (!!regex.test(ele.innerHTML)) {
        ele.innerHTML = 'comments';
      }

      // do % upvoted while we're here, this gets crazy
      const commentWrapper = e.parentNode;
      const menuWrapper = commentWrapper.parentNode;
      const actionBar = menuWrapper.parentNode;
      const upvoted = document.querySelector(`.${actionBar.className} > div:nth-child(2)`);
      upvoted.style = noDisplay;
    });
  } catch (e) {
    // assume not on post detail page
  }
}
