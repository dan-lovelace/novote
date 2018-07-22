function removeButtons() {
  // TODO: add option to allow comment votes
  // const buttons = document.querySelectorAll('div:not(.Comment) > div > [aria-label="upvote"]');

  const buttons = document.querySelectorAll('[aria-label="upvote"]');

  Array.prototype.forEach.call(buttons, function(e, i) {
    e.parentNode.innerHTML = '&nbsp;';
  });
}

window.addEventListener('popstate', removeButtons);

setInterval(function() {
  removeButtons();
}, 100);
