/* eslint-disable import/default */
import 'babel-polyfill';
import 'onsenui';
import './app/App.scss';
import Bluebird from 'bluebird';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../common/configureStore';
import {Provider} from 'react-redux';
import Menu from './app/Menu.react';
import {
  Navigator,
  Splitter,
  SplitterContent,
  SplitterSide
} from 'react-onsenui';
import {INITIAL_ROUTE} from './routes';

// http://bluebirdjs.com/docs/why-bluebird.html
window.Promise = Bluebird;

const app = document.getElementById('app');
const initialState = window.__INITIAL_STATE__;
const store = configureStore({initialState});

class App extends Component {
  navigator = null;

  renderPage(route, navigator) {
    this.navigator = navigator;
    //this.props.setRoute(route);
    console.log(`Set route ${route.id}`);
    return (
      <route.component navigator={navigator} {...route} />
    )
  }

  render() {
    const {
      closeMenu,
      currentRoute,
      menuOpen,
      openMenu,
    } = this.props;
    return(
      <Provider store={store}>
        <Splitter>
          <SplitterSide
            side="left"
            isOpen={true}
            width={240}
            collapse
            isSwipeable
          >
            <Menu
              currentRoute={currentRoute}
              navigator={navigator}
              onMenuItemClick={x => console.log(x)}
            />
          </SplitterSide>
          <SplitterContent>
            <Navigator
              initialRoute={INITIAL_ROUTE}
              renderPage={this.renderPage}
            />
          </SplitterContent>
        </Splitter>
      </Provider>
    );
  }
}

ReactDOM.render(
  <App />,
  app
);
