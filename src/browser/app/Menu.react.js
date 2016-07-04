import Component from 'react-pure-render/component';

import React, {PropTypes} from 'react';
import {
  Page,
  List,
  ListItem,
  Toolbar,
} from 'react-onsenui';
import {route} from '../routes';

import classnames from 'classnames';
import {addIndex, map} from 'ramda';
const indexedMap = addIndex(map);

const ROUTES = [
  [

    route('logAgenda'),
    route('logWeek'),
    route('logMonth'),
    route('logAll'),
  ],

  [
    route('medication'),
    route('support'),
  ],

  [
    route('settings'),
    route('help'),
  ]
];

export default class Menu extends Component {

  static propTypes = {
    currentRoute: PropTypes.object,
    navigator: PropTypes.object.isRequired,
    onMenuItemClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderRoute = this.renderRoute.bind(this);
    this.renderRouteList = this.renderRouteList.bind(this);
  }

  renderRoute(item) {
    const {
      currentRoute,
      onMenuItemClick,
    } = this.props;

    const active = item === currentRoute;

    return (
      <ListItem
        className={classnames({active})}
        key={item.name}
        onClick={() => onMenuItemClick(item.name)}
        ripple
      >
        {item.name}
      </ListItem>
    );
  }

  renderRouteList(routes, i) {
    return (
      <List
        dataSource={routes}
        key={i}
        renderRow={this.renderRoute}
      />
    );
  }

  render() {
    return (
      <Page>
        <Toolbar inline>
          <p>
            Menu
          </p>
        </Toolbar>

        {indexedMap(this.renderRouteList, ROUTES)}

      </Page>
    );
  }

}
