// redesign uses randomized, hashed class names. this function is an attempt to
// best guess the one used to display comment scores
function getCommentScoreClass(ctx, done) {
  let error, classes;

  try {
    // scores are currently rendered as two spans: '<span>X point[s]</span><span> · </span>'
    // points are somtimes replaced by 'score hidden'
    const scoreEx = new RegExp(/(\d+.*\spoint[s]?)|(score)/, 'i');
    const dotEx = new RegExp(/\s·\s/);

    if (
      scoreEx.test(ctx.innerHTML) &&
      dotEx.test(ctx.nextSibling.innerHTML)
    ) {
      classes = ctx.className.split(' ').map(c => `.${c}`).join('');
    }
  } catch (e) {
    error = e || true;
  }

  return done(error, classes);
}

function removeElements() {
  // TODO: add option to allow comment votes
  // const buttons = document.querySelectorAll('div:not(.Comment) > div > [aria-label="upvote"]');
  const noDisplay = 'display: none';

  // ---------------------------------------------------------------------------
  // comment scores (old reddit)
  // ---------------------------------------------------------------------------

  // catch-all
  const scores = document.querySelectorAll('div.score, span.score');
  Array.prototype.forEach.call(scores, e => {
    e.style = noDisplay;
  });

  // user profile page
  try {
    const usernames = document.querySelectorAll('a.Post__username');
    Array.prototype.forEach.call(usernames, e => {
      const parentNode = e.parentNode;

      if (e.innerHTML.substr(e.length - 1) !== ' ') {
        e.innerHTML += ' ';
      }

      Array.prototype.forEach.call(parentNode.childNodes, n => {
        if (n.nodeType === 3) {
          parentNode.removeChild(n);
        }
      })
    });
  } catch (e) {
    // assume not on user profile page
  }

  // ---------------------------------------------------------------------------
  // comment scores (redesign)
  // ---------------------------------------------------------------------------

  // get one comment element to find comment points class name for redesign
  // user comments are currently kept in <p> tags and will be excluded
  const commentSpan = document.querySelector('div.Comment span');
  commentSpan && getCommentScoreClass(commentSpan, (err, res) => {
    if (!err && res) {
      const points = document.querySelectorAll(res);

      Array.prototype.forEach.call(points, e => {
        e.style = noDisplay;
      });
    }
  });

  // ---------------------------------------------------------------------------
  // karma (old reddit)
  // ---------------------------------------------------------------------------

  // catch-all
  const karma = document.querySelectorAll('span[class*="karma"]');
  Array.prototype.forEach.call(karma, e => {
    e.style = noDisplay;
  })

  // ---------------------------------------------------------------------------
  // karma (redesign)
  // ---------------------------------------------------------------------------

  // from header if logged in
  try {
    const currentUserInfo = document.querySelector('.header-user-dropdown img').nextSibling;
    const currentUserKarma = currentUserInfo.querySelector('span');
    currentUserKarma.style = noDisplay;
  } catch (e) {
    // assume not logged in
  }

  // from user profile page if displayed
  try {
    const userProfileKarma = document.querySelector('span#profile--id-card--highlight-tooltip--karma').parentNode.parentNode;
    userProfileKarma.style = noDisplay;

    if (userProfileKarma && userProfileKarma.previousSibling) {
      userProfileKarma.previousSibling.style = noDisplay;
    }
  } catch (e) {
    // assume not on user profile page
  }

  // from hovering a user's name
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

  // ---------------------------------------------------------------------------
  // upvote buttons and score (both designs)
  // ---------------------------------------------------------------------------

  // from post list and post details
  let buttons = document.querySelectorAll('[aria-label="upvote"]');
  Array.prototype.forEach.call(buttons, e => {
    e.parentNode.innerHTML = '&nbsp;';
  });

  // from user profile page if displayed
  try {
    buttons = document.querySelectorAll('span[class*="Post__scoreDisplay"]');
    Array.prototype.forEach.call(buttons, e => {
      e.innerHTML = '&nbsp;';
    });
  } catch (e) {
    // assume not on user profile page
  }
}

// enhance performance for browser's back/forward button
window.addEventListener('popstate', removeElements);

// initialize polling since redesign won't always run our JS on navigation
setInterval(() => {
  removeElements();
}, 100);
