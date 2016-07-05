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
import {route} from '../routes';
import NotFound from '../notfound/Page.react';
import Menu from './Menu.react';

export class Navigator extends Component {
  constructor(props) {
    super(props);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.onDrawerOpen = this.onDrawerOpen.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
    this.renderPage = this.renderPage.bind(this);
  }

  renderPage(route, navigator) {
    this.setState({navigator});
    // Fallback to the not found page just in case
    const RouteComponent = route.component || NotFound;
    return (
      <RouteComponent navigator={navigator} {...route} />
    );
  }

  onMenuItemClick(route) {
    const {
      closeDrawer,
      setRoute,
    } = this.props;

    closeDrawer();
    setRoute(route.key);
    if (!route || !route.component) {
      this.state.navigator.pushPage(route);
    }
    else {
      this.state.navigator.resetPage(route);
    }
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
      currentRoute,
    } = this.props;

    return(
      <Splitter>
        <SplitterSide
          collapse
          isOpen={drawerOpen}
          isSwipeable
          onClose={this.onDrawerClose}
          onOpen={this.onDrawerOpen}
          side="left"
          width={350}
        >
          <Menu
            currentRoute={currentRoute}
            onMenuItemClick={this.onMenuItemClick}
          />
        </SplitterSide>

        <SplitterContent>
          <OnsNav
            initialRoute={route(currentRoute)}
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
