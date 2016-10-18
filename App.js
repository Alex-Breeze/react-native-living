/**
 * Created by buhe on 2016/10/18.
 */
import React, {
    Component,
} from 'react';

import {
    View
} from 'react-native';

import Main from './main';

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers from './reducers';

const logger = createLogger();

const middleware = [thunk, logger];
const store = compose(
    applyMiddleware(...middleware)
)(createStore)(reducers);


class App extends Component {


  constructor() {
    super();
    //Umeng.startWithAppkey('55894b6d67e58e66c5000d6d');
  }

  render() {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
  }
}

export default App;