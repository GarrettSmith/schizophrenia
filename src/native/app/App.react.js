import styles from './styles';

import Component from 'react-pure-render/component';
import React, {
  BackAndroid,
  Navigator,
  PropTypes,
} from 'react-native';

import {
  Actions,
  Animations,
  Route,
  Router,
  Schema,
} from 'react-native-router-flux';

import Agenda from '../log/agenda/Page.react';
import All from '../log/all/Page.react';
import Drawer from './Drawer.react';
import Help from '../help/Page.react';
import Medication from '../medication/Page.react';
import Month from '../log/month/Page.react';
import Settings from '../settings/Page.react';
import Support from '../support/Page.react';
import Week from '../log/week/Page.react';

const components = {
  Agenda,
  All,
  Drawer,
  Help,
  Medication,
  Month,
  Settings,
  Support,
  Week,
};

import mapDispatchToProps from '../../common/app/mapDispatchToProps';
import mapStateToProps from '../../common/app/mapStateToProps';
import {connect} from 'react-redux';
import {map} from 'ramda';

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
const Connected = map(connectComponent, components);

class App extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
  };

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      // Navigate back and exit if we have nowhere further to navigate to
      return Actions.pop();
    });
  }

  render() {
    const {
      actions,
      ui,
    } = this.props;

    return (
        <Router
          hideNavBar={true}
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
            <Connected.Drawer>
              <Router hideNavBar={true}>

                <Route
                  name="logAgenda"
                  component={Connected.Agenda}
                  initial={true}
                  schema="default"
                />

                <Route
                  name="logWeek"
                  component={Connected.Week}
                  schema="default"
                />

                <Route
                  name="logMonth"
                  component={Connected.Month}
                  schema="default"
                />

                <Route
                  name="logAll"
                  component={Connected.All}
                  schema="default"
                />

                <Route
                  name="medication"
                  component={Connected.Medication}
                  schema="default"
                />

                <Route
                  name="support"
                  component={Connected.Support}
                  schema="default"
                />

                <Route
                  name="settings"
                  component={Connected.Settings}
                  schema="default"
                />

                <Route
                  name="help"
                  component={Connected.Help}
                  schema="default"
                />

              </Router>
            </Connected.Drawer>
          </Route>
        </Router>
    );
  }

}

export default connectComponent(App);
