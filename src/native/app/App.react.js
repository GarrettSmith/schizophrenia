import styles, {COLORS} from './styles';

import Component from 'react-pure-render/component';
import React, {
  BackAndroid,
  Navigator,
  PropTypes,
} from 'react-native';

import {
  Actions,
  Route,
  Router,
  Schema,
} from 'react-native-router-flux';

import Agenda from '../log/agenda/Page.react';
import All from '../log/all/Page.react';
import Drawer from './Drawer.react';
import Header from './Header.react';
import Help from '../help/Page.react';
import LogEntry from '../log/entry/Page.react';
import LogEntryHeader from '../log/entry/Header.react';
import Medication from '../medication/Page.react';
import Month from '../log/month/Page.react';
import Settings from '../settings/Page.react';
import Support from '../support/Page.react';
import Week from '../log/week/Page.react';

const components = {
  Agenda,
  All,
  Drawer,
  Header,
  Help,
  Medication,
  LogEntry,
  LogEntryHeader,
  Month,
  Router,
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
    ui: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.initialRoute = this.initialRoute.bind(this);
  }

  componentWillMount() {
    // Navigate back and exit if we have nowhere further to navigate to
    BackAndroid.addEventListener('hardwareBackPress', Actions.pop);
  }

  componentDidMount() {
    // dispatch action to set the initial route
    this.props.actions.ui.setRoute(Actions.currentRouter.currentRoute);
  }

  initialRoute(name) {
    return this.props.ui.primaryRoute.name === name;
  }

  render() {
    const {
      actions,
    } = this.props;

    return (
      <Connected.Router
        hideNavBar
        style={styles.container}
      >

        <Schema
          name="default"
          sceneConfig={Navigator.SceneConfigs.FadeAndroid}
        />

        <Schema
          headerColor={COLORS.PRIMARY}
          leftIcon="menu"
          leftIconPress={actions.ui.openDrawer}
          name="primary"
          sceneConfig={Navigator.SceneConfigs.FadeAndroid}
          type="replace"
        />

        <Schema
          header={Connected.Header}
          headerColor={COLORS.TERTIARY}
          hideNavBar
          leftIcon="arrow-back"
          leftIconPress={Actions.pop}
          name="secondary"
          sceneConfig={Navigator.SceneConfigs.FadeAndroid}
          wrapRouter
        />

        <Schema
          header={Connected.Header}
          headerColor={COLORS.TERTIARY}
          hideNavBar
          leftIcon="close"
          leftIconPress={Actions.pop}
          name="modal"
          sceneConfig={Navigator.SceneConfigs.FloatFromBottomAndroid}
          wrapRouter
        />

        <Route
          name="main"
          initial
          schema="primary"
        >
          <Connected.Drawer>
            <Connected.Router
              hideNavBar
              header={Connected.Header}
            >

              <Route
                name="logAgenda"
                component={Connected.Agenda}
                initial={this.initialRoute('logAgenda')}
                schema="primary"
                title="{date}"
              />

              <Route
                name="logWeek"
                component={Connected.Week}
                initial={this.initialRoute('logWeek')}
                schema="primary"
                title="{date}"
              />

              <Route
                name="logMonth"
                component={Connected.Month}
                initial={this.initialRoute('logMonth')}
                schema="primary"
                title="{date}"
              />

              <Route
                name="logAll"
                component={Connected.All}
                initial={this.initialRoute('logAll')}
                schema="primary"
                title="{date}"
              />

              <Route
                name="medication"
                component={Connected.Medication}
                schema="primary"
                title="Medication"
              />

              <Route
                name="support"
                component={Connected.Support}
                schema="primary"
                title="Support"
              />

            </Connected.Router>
          </Connected.Drawer>
        </Route>

        <Route
          name="settings"
          component={Connected.Settings}
          schema="secondary"
          title="Settings"
        />

        <Route
          name="help"
          component={Connected.Help}
          schema="secondary"
          title="Help & Feedback"
        />

        <Route
          name="logEntry"
          component={Connected.LogEntry}
          header={Connected.LogEntryHeader}
          schema="modal"
        />

      </Connected.Router>
    );
  }

}

export default connectComponent(App);
