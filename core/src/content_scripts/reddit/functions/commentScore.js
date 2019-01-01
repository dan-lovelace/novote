// redesign uses randomized, hashed class names. this function is an attempt to
// best guess the one used to display comment scores
function getCommentScoreClass(ctx, done) {
  let error, classes;

  try {
    // scores are currently rendered as two spans: '<span>X point[s]</span><span> · </span>'
    // points are somtimes replaced by 'score hidden'
    const scoreEx = new RegExp(/(\d+.*\spoint[s]?)|(score)/i);
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

export function hasCommentParent(ctx, done) {
  try {
    const parent = Object.assign(ctx.parentNode);
    const regex = new RegExp(/.*(comment)\s/ig);

    if (!parent.className || !regex.test(parent.className)) {
      hasCommentParent(parent, done);
    } else {
      done(parent.className);
    }
  } catch (err) {
    done(false);
  }

  done(false);
};

export function removeCommentScore() {
  const { noDisplay } = require('../index.js');
  // ---------------------------------------------------------------------------
  // old
  // ---------------------------------------------------------------------------

  // catch-all
  const scores = document.querySelectorAll('div.score, span.score');

  Array.prototype.forEach.call(scores, e => {
    hasCommentParent(e, res => e.style = noDisplay);
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
  // new
  // ---------------------------------------------------------------------------

  // get one comment element to find comment points class name for redesign
  // user comments are currently kept in <p> tags and will be excluded
  const commentSpan = document.querySelector('div.Comment span:nth-child(2)');
  commentSpan && getCommentScoreClass(commentSpan, (err, res) => {
    if (!err && res) {
      const points = document.querySelectorAll(res);

      Array.prototype.forEach.call(points, e => {
        e.style = noDisplay;
      });
    }
  });
}
