import reddit from './reddit';
import { foo } from './test';

// enhance performance for browser's back/forward button
window.addEventListener('popstate', removeElements);

// initialize polling since redesign won't always run our JS on navigation
setInterval(() => {
  reddit.removeElements();
}, 100);
