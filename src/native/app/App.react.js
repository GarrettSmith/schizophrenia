import Component from 'react-pure-render/component';
import React, {
  Navigator,
  PropTypes,
  View,
} from 'react-native';

import Drawer from './Drawer.react';
import Agenda from '../logging/Page.react';
import Agenda2 from '../logging/Page2.react';

import mapDispatchToProps from '../../common/app/mapDispatchToProps';
import mapStateToProps from '../../common/app/mapStateToProps';

import styles from './styles';

import {
  Router,
  Route,
  Schema,
  Animations,
} from 'react-native-router-flux';

import {connect} from 'react-redux';
const connectComponent = connect(mapStateToProps, mapDispatchToProps);

const ConnectedAgenda = connectComponent(Agenda);
const ConnectedAgenda2 = connectComponent(Agenda2);
const ConnectedDrawer = connectComponent(Drawer);

class App extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
  };

  render() {
    const {
      actions,
      ui,
    } = this.props;

    return (
        <Router
          hideNavBar={true}
          onPush={actions.ui.closeDrawer}
          onReplace={actions.ui.closeDrawer}
          style={styles.container}
        >

          <Schema
            name="default"
            sceneConfig={Navigator.SceneConfigs.FaceAndroid}
          />
          <Schema
            name="modal"
            sceneConfig={Navigator.SceneConfigs.FloatFromBottomAndroid}
          />

          <Route name="main">
            <ConnectedDrawer>
              <Router
                hideNavBar={true}
                onPush={ actions.ui.closeDrawer}
                onReplace={actions.ui.closeDrawer}
              >

                <Route
                  name="agenda"
                  component={ConnectedAgenda}
                  initial={true}
                  schema="default"
                />

                <Route
                  name="agenda2"
                  component={ConnectedAgenda2}
                  schema="default"
                />

              </Router>
            </ConnectedDrawer>
          </Route>
        </Router>
    );
  }

}

export default connectComponent(App);
