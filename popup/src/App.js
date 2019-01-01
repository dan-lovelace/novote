import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Home from './components/Home';

const App = () => (
  <Router history={createBrowserHistory()}>
    <Switch>
      <Route path='/popup' component={Home} />
      <Route path='*' component={() => <div>Not found</div>} />
    </Switch>
  </Router>
);

export default App;
