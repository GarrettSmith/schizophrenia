import 'react-native-browser-polyfill';
import App from './app/App.react';
import React, {AppRegistry, Component, Platform, UIManager} from 'react-native';
import configureStore from '../common/configureStore';
import {Provider} from 'react-redux/native';
import {setPlatform} from '../common/device/actions';

// TODO: We can't use <IntlProvider> yet because it's not ready for
// react-native. Therefore we can't use <FormattedMessage> etc.
// https://github.com/yahoo/react-intl/issues/119
// Nevermind, we can use plain old format from intl. Check todos Header.
// import {IntlProvider} from 'react-intl';
// TODO: Wait for https://github.com/facebook/react-native/issues/2985
// Soon!!!

import '../../node_modules/intl/index.js';
import '../../node_modules/intl/locale-data/jsonp/en.js';

export default function index() {

  // Enable LayoutAnimation on Android
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

  // TODO: Add local storage example.
  const initialState = {
    device: {
      isMobile: true
    }
  };
  const store = configureStore({initialState});
  store.dispatch(setPlatform(Platform.OS));

  class Root extends Component {
    render() {
      return (
        <Provider store={store}>
          {() => <App />}
        </Provider>
      );
    }
  }

  AppRegistry.registerComponent('Este', () => Root);

}
