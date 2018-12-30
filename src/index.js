import React from 'react';
// import ReactDOM from 'react-dom';
import { removeElements } from './reddit';
//
// import './styles/App.scss';
// import App from './App';

console.log('Initializing app 5');
// enhance performance for browser's back/forward button
window.addEventListener('popstate', removeElements);

// initialize polling since redesign won't always run our JS on navigation
setInterval(() => {
  removeElements();
}, 100);

const test = React.createElement('div', null, 'hello world');
console.log('test: ', test);
// ReactDOM.render(<App />, document.getElementById('root'));
