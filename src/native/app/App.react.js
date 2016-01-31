import Component from '../components/Component.react';
import Header from './Header.react';
import Menu from './Menu.react';
import React, {
  DrawerLayoutAndroid,
  Navigator,
  PropTypes,
  StatusBarIOS,
  View,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import mapDispatchToProps from '../../common/app/mapDispatchToProps';
import mapStateToProps from '../../common/app/mapStateToProps';
import routes from '../routes';
import styles from './styles';
import {connect} from 'react-redux/native';

class App extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    device: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
  };

  static configureScene(route) {
    return route.animationType || Navigator.SceneConfigs.FloatFromRight;
  }

  constructor(props) {
    super(props);
    this.onNavigatorRef = this.onNavigatorRef.bind(this);
    this.onRouteChange = this.onRouteChange.bind(this);
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

  render() {
    const {actions, msg, ui} = this.props;

    const menu = (
      <Menu
        onRouteChange={this.onRouteChange}
      />
    );

    const renderScene = route =>
      <View style={[styles.sceneView, route.style]}>
        <route.Page {...this.props} />
      </View>;

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPostion={DrawerLayoutAndroid.positions.left}
        renderNavigationView={() => menu}
        ref="drawer"
      >
        <Navigator
          configureScene={App.configureScene}
          initialRoute={routes.logging}
          ref={this.onNavigatorRef}
          renderScene={renderScene}
          style={styles.container}
        />
      </DrawerLayoutAndroid>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
