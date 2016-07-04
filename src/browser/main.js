/* eslint-disable import/default */
import 'babel-polyfill';
import 'onsenui';
import Bluebird from 'bluebird';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../common/configureStore';
import {Provider} from 'react-redux';
import Navigator from './app/Navigator.react';

// http://bluebirdjs.com/docs/why-bluebird.html
window.Promise = Bluebird;

const app = document.getElementById('app');
const initialState = window.__INITIAL_STATE__;
const store = configureStore({initialState});

class App extends Component {

  render() {
    return(
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}

ReactDOM.render(
  <App />,
  app
);
