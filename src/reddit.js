// redesign uses randomized, hashed class names. this function is an attempt to
// best guess the one used to display comment scores
function getCommentScoreClass(ctx, done) {
  let error, classes;

  try {
    // scores are currently rendered as two spans: '<span>X point[s]</span><span> · </span>'
    // points are somtimes replaced by 'score hidden' or 'score below threshold'
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

  const scores = document.querySelectorAll('div.score, span.score');
  const buttons = document.querySelectorAll('[aria-label="upvote"]');

  // get one comment element to find comment points class name for redesign
  // user comments are currently kept in <p> tags and will be excluded
  const commentSpan = document.querySelector('div.Comment span');

  Array.prototype.forEach.call(scores, e => {
    e.style = 'display: none';
  });

  Array.prototype.forEach.call(buttons, e => {
    e.parentNode.innerHTML = '&nbsp;';
  });

  commentSpan && getCommentScoreClass(commentSpan, (err, res) => {
    if (!err && res) {
      const points = document.querySelectorAll(res);

      Array.prototype.forEach.call(points, e => {
        e.style = 'display: none';
      });
    }
  });
}

// enhance performance for browser's back/forward button
window.addEventListener('popstate', removeElements);

// initialize polling since redesign won't always run our JS on navigation
setInterval(() => {
  removeElements();
}, 100);
