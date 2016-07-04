import './App.scss';

import React, {Component} from 'react';
import {ui as uiActions} from '../../common/ui/actions';
import {connect} from 'react-redux';
import {
  Navigator as OnsNav,
  Splitter,
  SplitterContent,
  SplitterSide
} from 'react-onsenui';
import {INITIAL_ROUTE} from '../routes';
import NotFound from '../notfound/Page.react';
import Menu from './Menu.react';

export class Navigator extends Component {
  constructor(props) {
    super(props);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.onDrawerOpen = this.onDrawerOpen.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
  }

  navigator = null; // So we can pass around a refrence

  renderPage(route, navigator) {
    this.navigator = navigator;
    const component = route.component || NotFound;
    return (
      <component navigator={navigator} {...route} />
    );
  }

  onMenuItemClick(route) {
    const {
      closeDrawer,
      setRoute,
    } = this.props;

    closeDrawer();
    setRoute(route);
  }

  onDrawerOpen() {
    this.props.onDrawerChange(true);
  }

  onDrawerClose() {
    this.props.onDrawerChange(false);
  }

  render() {
    const {
      drawerOpen,
      closeMenu,
      currentRoute,
      onDrawerChange,
    } = this.props;

    console.log(drawerOpen);

    return(
      <Splitter>
        <SplitterSide
          collapse
          isOpen={drawerOpen}
          isSwipeable
          onClose={this.onDrawerClose}
          onOpen={this.onDrawerOpen}
          side="left"
          width={240}
        >
          <Menu
            currentRoute={currentRoute}
            navigator={navigator}
            onMenuItemClick={this.onMenuItemClick}
          />
        </SplitterSide>

        <SplitterContent>
          <OnsNav
            initialRoute={INITIAL_ROUTE}
            renderPage={this.renderPage}
          />
        </SplitterContent>
      </Splitter>
    );
  }
}

Navigator = connect(state => ({
  currentRoute: state.ui.currentRoute,
  drawerOpen: state.ui.drawerOpen
}), uiActions)(Navigator);

export default Navigator;
