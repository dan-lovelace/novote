import React from 'react';
import ReactDOM from 'react-dom';
import { removeElements } from './reddit';

import App from './App';

console.log('2');
// enhance performance for browser's back/forward button
window.addEventListener('popstate', removeElements);

// initialize polling since redesign won't always run our JS on navigation
setInterval(() => {
  removeElements();
}, 100);

// ReactDOM.render((
//   <App />
// ), document.getElementById('novote-root'));

function run() {
  ReactDOM.render(<App />, document.getElementById('novote-root'));
}

window.addEventListener('load', () => {
  run();
})
