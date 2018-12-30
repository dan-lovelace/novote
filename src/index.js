import React from 'react';
import ReactDOM from 'react-dom';
import { removeElements } from './reddit';

console.log('2');
// enhance performance for browser's back/forward button
window.addEventListener('popstate', removeElements);

// initialize polling since redesign won't always run our JS on navigation
setInterval(() => {
  removeElements();
}, 100);

ReactDOM.render((
  <div>TEST2</div>
), document.getElementById('novote-root'));
