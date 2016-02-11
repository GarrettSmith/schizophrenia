import Component from 'react-pure-render/component';
import React, {
  DrawerLayoutAndroid,
  PropTypes,
} from 'react-native';

import Menu from './Menu.react';
import {Actions} from 'react-native-router-flux';

export default class Drawer extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    route: PropTypes.object,
    ui: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderMenu = this.renderMenu.bind(this);
    this.onDrawerOpen = this.onDrawerOpen.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
  }

  onDrawerOpen() {
    this.props.actions.ui.onDrawerChange(true);
  }

  onDrawerClose() {
    this.props.actions.ui.onDrawerChange(false);
  }

  setDrawerState(open) {
    const {drawer} = this.refs;
    if (open) {
      drawer.openDrawer();
    } else {
      drawer.closeDrawer();
    }
  }

  renderMenu() {
    return (
      <Menu
        closeDrawer={this.props.actions.ui.closeDrawer}
        currentRoute={Actions.currentRouter.currentRoute.name}
        routes={Actions}
      />
    );
  }

  componentDidMount() {
    this.setDrawerState(this.props.ui.drawerOpen);
  }

  componentWillReceiveProps(newProps) {
    this.setDrawerState(newProps.ui.drawerOpen);
  }

  render() {
    const {
      children,
      route,
    } = this.props;

    // pass on the router prop to not break things
    return (
      <DrawerLayoutAndroid
        onDrawerOpen={this.onDrawerOpen}
        onDrawerClose={this.onDrawerClose}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerWidth={300}
        renderNavigationView={this.renderMenu}
        ref="drawer"
      >
        {React.Children.map(children, c => React.cloneElement(c, {route}))}
      </DrawerLayoutAndroid>
    );
  }
}
