import Component from 'react-pure-render/component';

import React, {PropTypes} from 'react-native';
import {COLOR, Divider, Drawer} from 'react-native-material-design';

import {map} from 'ramda';

export default class Menu extends Component {

  static propTypes = {
    closeDrawer: PropTypes.func.isRequired,
    currentRoute: PropTypes.string,
    routes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.open = this.open.bind(this);
    this.makeItem = this.makeItem.bind(this);
    this.makeItems = this.makeItems.bind(this);
  }

  open(route, ...args) {
    return () => {
      this.props.routes[route](...args);
      this.props.closeDrawer();
    };
  }

  makeItem(item) {
    const press = this.open(item.route)
    return {
      ...item,
      active: item.route === this.props.currentRoute,
      onPress: press,
      onLongPress: press,
    };
  }

  makeItems = map(this.makeItem.bind(this));

  render() {
    return (
      <Drawer>
        <Drawer.Header backgroundColor={COLOR.paperPink300.color}/>

        <Drawer.Section
          items={this.makeItems([
            {
              icon: 'view-agenda',
              route: 'logAgenda',
              value: 'Agenda',
            },
            {
              icon: 'view-week',
              route: 'logWeek',
              value: 'Week',
            },
            {
              icon: 'view-module',
              route: 'logMonth',
              value: 'Month',
            },
            {
              icon: 'schedule',
              route: 'logAll',
              value: 'All Time',
            },
          ])}
        />

        <Divider/>

        <Drawer.Section
          items={this.makeItems([
            {
              icon: 'local-pharmacy',
              route: 'medication',
              value: 'Medication',
            },
            {
              icon: 'group',
              route: 'support',
              value: 'Support',
            },
          ])}
        />

        <Divider/>

        <Drawer.Section
          items={this.makeItems([
            {
              icon: 'settings',
              route: 'settings',
              value: 'Settings',
            },
            {
              icon: 'help',
              route: 'help',
              value: 'Help & Feedback',
            },
          ])}
        />

      </Drawer>
    );
  }

}
