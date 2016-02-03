import Component from '../components/Component.react';
import React, {
  Navigator,
  PropTypes,
  View,
} from 'react-native';
import Menu from './Menu.react';
import DrawerLayout from './DrawerLayout.react';

import mapDispatchToProps from '../../common/app/mapDispatchToProps';
import mapStateToProps from '../../common/app/mapStateToProps';

import routes from '../routes';
import styles from './styles';

import {connect} from 'react-redux/native';

class App extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    device: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
  };

  static configureScene(route) {
    return route.animationType || Navigator.SceneConfigs.FloatFromRight;
  }

  constructor(props) {
    super(props);
    this.onNavigatorRef = this.onNavigatorRef.bind(this);
    this.onDrawerOpen = this.onDrawerOpen.bind(this);
    this.onDrawerClose = this.onDrawerClose.bind(this);
    this.onRouteChange = this.onRouteChange.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  onNavigatorRef(component) {
    this.navigator = component;
  }

  // TODO: Fluxify routing and make it universal with redux-router.
  // Store current route in storage.
  // https://github.com/rackt/redux-router/issues/63
  onRouteChange(route) {
    const {actions} = this.props;
    this.navigator.replace(routes[route]);
    actions.toggleSideMenu();
  }

  onDrawerOpen() {
    this.props.actions.onSideMenuChange(true);
  }

  onDrawerClose() {
    this.props.actions.onSideMenuChange(false);
  }

  renderMenu() {
    return (
      <Menu
        onRouteChange={this.onRouteChange}
      />
    );
  }

  renderScene(route) {
    return (
      <View style={[styles.sceneView, route.style]}>
        <route.Page {...this.props} />
      </View>
    );
  }

  render() {
    const {ui} = this.props;

    return (
      <DrawerLayout
        open={ui.isSideMenuOpen}
        onDrawerOpen={this.onDrawerOpen}
        onDrawerClose={this.onDrawerClose}
        drawerPosition={DrawerLayout.positions.Left}
        drawerWidth={300}
        renderNavigationView={this.renderMenu}
      >
        <Navigator
          configureScene={App.configureScene}
          initialRoute={routes.logging}
          ref={this.onNavigatorRef}
          renderScene={this.renderScene}
          style={styles.container}
        />
      </DrawerLayout>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
