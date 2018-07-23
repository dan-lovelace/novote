function getPointsClass(ctx, callback) {
  let error, classes;

  try {
    // validity check for pattern '[point|points] ·'
    if ((ctx.innerHTML.indexOf('points') >= 0 || ctx.innerHTML.indexOf('point') >= 0) && ctx.nextSibling.innerHTML.indexOf('·') >= 0) {
      classes = ctx.className.split(' ');
      classes = classes.map(c => '.' + c);
      classes = classes.join('');
    }
  } catch (e) {
    error = e;
  }

  return callback(error, classes);
}

function removeElements() {
  // TODO: add option to allow comment votes
  // const buttons = document.querySelectorAll('div:not(.Comment) > div > [aria-label="upvote"]');

  const scores = document.querySelectorAll('div.score, span.score');
  const buttons = document.querySelectorAll('[aria-label="upvote"]');

  // get one comment element to find comment points class name for redesign
  // user comments are currently kept in <p> tags and will be excluded
  const commentSpan = document.querySelector('div.Comment span');

  Array.prototype.forEach.call(scores, function(e, i) {
    e.style = 'display: none';
  });

  Array.prototype.forEach.call(buttons, function(e, i) {
    e.parentNode.innerHTML = '&nbsp;';
  });

  commentSpan && getPointsClass(commentSpan, function(err, res) {
    if (!err && res) {
      const points = document.querySelectorAll(res);

      Array.prototype.forEach.call(points, function(e, i) {
        e.style = 'display: none';
      });
    }
  });
}

window.addEventListener('popstate', removeElements);

setInterval(function() {
  removeElements();
}, 100);
