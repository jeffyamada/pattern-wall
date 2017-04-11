import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import App from './components/App';
import Circles from './components/Circles';
import NotFound from './components/NotFound';
import * as reducers from './reducers';

// reducers
const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});

// middleware
const middleware = [
  thunk,
];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

// create store
const store = compose(applyMiddleware(...middleware))(createStore)(rootReducer);

const history = syncHistoryWithStore(browserHistory, store);

export default function Root() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App} />
        <Route path="/circles" component={Circles} />
        <Route path="404" component={NotFound} />
        <Redirect from="*" to="404" />
      </Router>
    </Provider>
  );
}
