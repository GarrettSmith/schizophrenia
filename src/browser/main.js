/* eslint-disable import/default */
import 'babel-polyfill';
import 'onsenui';
import Bluebird from 'bluebird';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../common/configureStore';
import createStorageEngine from 'redux-storage-engine-localstorage';
import {Provider} from 'react-redux';
import Navigator from './app/Navigator.react';
import {STORAGE_KEY} from '../common/app/constants';

// http://bluebirdjs.com/docs/why-bluebird.html
window.Promise = Bluebird;

const app = document.getElementById('app');
const initialState = window.__INITIAL_STATE__;
const engine = createStorageEngine(STORAGE_KEY);
const store = configureStore({engine, initialState});

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
