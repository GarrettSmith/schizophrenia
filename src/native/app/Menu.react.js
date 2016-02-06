import Component from 'react-pure-render/component';

import React, {PropTypes} from 'react-native';
import {COLOR, Divider, Drawer} from 'react-native-material-design';

export default class Menu extends Component {

  static propTypes = {
    closeDrawer: PropTypes.func.isRequired,
    routes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
  }

  open(route, ...args) {
    return () => {
      this.props.routes[route](...args);
      this.props.closeDrawer();
    };
  }

  render() {
    return (
      <Drawer>
        <Drawer.Header backgroundColor={COLOR.paperPink300.color}>
        </Drawer.Header>

        <Drawer.Section
          items={[
            {
              icon: 'view-agenda',
              value: 'Agenda',
              active: true,
              onPress: this.open('agenda'),
              onLongPress: this.open('agenda'),
            },
            {
              icon: 'view-week',
              value: 'Week',
              active: false,
              onPress: this.open('agenda2'),
              onLongPress: this.open('agenda2'),
            },
            {
              icon: 'view-module',
              value: 'Month',
              active: false,
              onPress: () => routes.agenda,
              onLongPress: () => routes.agenda,
            },
            {
              icon: 'schedule',
              value: 'All Time',
              active: false,
              onPress: () => routes.agenda,
              onLongPress: () => routes.agenda,
            },
          ]}
        />

        <Divider/>

        <Drawer.Section
          items={[
            {
              icon: 'local-pharmacy',
              value: 'Medication',
              active: false,
              onPress: () => routes.agenda,
              onLongPress: () => routes.agenda,
            },
            {
              icon: 'group',
              value: 'Support',
              active: false,
              onPress: () => routes.agenda,
              onLongPress: () => routes.agenda,
            },
          ]}
        />

        <Divider/>

        <Drawer.Section
          items={[
            {
              icon: 'settings',
              value: 'Settings',
              active: false,
              onPress: () => routes.agenda,
              onLongPress: () => routes.agenda,
            },
            {
              icon: 'help',
              value: 'Help & Feedback',
              active: false,
              onPress: () => routes.agenda,
              onLongPress: () => routes.agenda,
            },
          ]}
        />

      </Drawer>
    );
  }

}
