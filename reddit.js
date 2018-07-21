function removeButtons() {
  const buttons = document.querySelectorAll('div:not(.Comment) > div > button[aria-label="upvote"]');

  Array.prototype.forEach.call(buttons, function(e, i) {
    e.parentNode.style = 'display: none';
  });
}

window.addEventListener('popstate', removeButtons);

setInterval(function() {
  removeButtons();
}, 100);
