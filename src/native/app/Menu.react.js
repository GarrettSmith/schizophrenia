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
              icon: 'label',
              value: 'Day',
              active: true,
              onPress: () => onRouteChange('logging'),
              onLongPress: () => onRouteChange('logging'),
            },
            {
              icon: 'label',
              value: 'Week',
              active: false,
              onPress: () => onRouteChange('logging'),
              onLongPress: () => onRouteChange('logging'),
            },
            {
              icon: 'label',
              value: 'Month',
              active: false,
              onPress: () => onRouteChange('logging'),
              onLongPress: () => onRouteChange('logging'),
            },
            {
              icon: 'label',
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
              icon: 'label',
              value: 'Medication',
              active: false,
              onPress: () => onRouteChange('logging'),
              onLongPress: () => onRouteChange('logging'),
            },
            {
              icon: 'label',
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
              icon: 'label',
              value: 'Settings',
              active: false,
              onPress: () => onRouteChange('logging'),
              onLongPress: () => onRouteChange('logging'),
            },
            {
              icon: 'label',
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
