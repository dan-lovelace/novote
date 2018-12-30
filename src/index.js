import { removeElements } from './reddit';
import { foo } from './test';

console.log('foo: ', foo);
// enhance performance for browser's back/forward button
window.addEventListener('popstate', removeElements);

// initialize polling since redesign won't always run our JS on navigation
setInterval(() => {
  removeElements();
}, 100);
