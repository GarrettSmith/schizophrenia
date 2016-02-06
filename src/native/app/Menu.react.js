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
              onPress: this.open('logAgenda'),
              onLongPress: this.open('logAgenda'),
            },
            {
              icon: 'view-week',
              value: 'Week',
              active: false,
              onPress: this.open('logWeek'),
              onLongPress: this.open('logWeek'),
            },
            {
              icon: 'view-module',
              value: 'Month',
              active: false,
              onPress: this.open('logMonth'),
              onLongPress: this.open('logMonth'),
            },
            {
              icon: 'schedule',
              value: 'All Time',
              active: false,
              onPress: this.open('logAll'),
              onLongPress: this.open('logAll'),
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
              onPress: this.open('medication'),
              onLongPress: this.open('medication'),
            },
            {
              icon: 'group',
              value: 'Support',
              active: false,
              onPress: this.open('support'),
              onLongPress: this.open('support'),
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
              onPress: this.open('settings'),
              onLongPress: this.open('settings'),
            },
            {
              icon: 'help',
              value: 'Help & Feedback',
              active: false,
              onPress: this.open('help'),
              onLongPress: this.open('help'),
            },
          ]}
        />

      </Drawer>
    );
  }

}
