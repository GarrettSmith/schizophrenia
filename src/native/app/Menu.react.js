import Component from '../components/Component.react';

import React, {View} from 'react-native';
import {COLOR, Divider, Drawer} from 'react-native-material-design';

const {PropTypes} = React;

export default class Menu extends Component {

  static propTypes = {
    onRouteChange: PropTypes.func.isRequired,
  };

  render() {
    const {onRouteChange} = this.props;

    console.log(COLOR.paperPink50)

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
              onPress: () => onRouteChange('logging'),
              onLongPress: () => onRouteChange('logging'),
            },
            {
              icon: 'view-week',
              value: 'Week',
              active: false,
              onPress: () => onRouteChange('logging'),
              onLongPress: () => onRouteChange('logging'),
            },
            {
              icon: 'view-module',
              value: 'Month',
              active: false,
              onPress: () => onRouteChange('logging'),
              onLongPress: () => onRouteChange('logging'),
            },
            {
              icon: 'schedule',
              value: 'All Time',
              active: false,
              onPress: () => onRouteChange('logging'),
              onLongPress: () => onRouteChange('logging'),
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
              onPress: () => onRouteChange('logging'),
              onLongPress: () => onRouteChange('logging'),
            },
            {
              icon: 'group',
              value: 'Support',
              active: false,
              onPress: () => onRouteChange('logging'),
              onLongPress: () => onRouteChange('logging'),
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
              onPress: () => onRouteChange('logging'),
              onLongPress: () => onRouteChange('logging'),
            },
            {
              icon: 'help',
              value: 'Help & Feedback',
              active: false,
              onPress: () => onRouteChange('logging'),
              onLongPress: () => onRouteChange('logging'),
            },
          ]}
        />

      </Drawer>
    );
  }

}

const styles = {
  drawerContainer: {
    top: 0,
    bottom: 0,
  }
}
