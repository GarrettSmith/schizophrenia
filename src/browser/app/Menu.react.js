import './Menu.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Icon,
  List,
  ListItem,
  Page,
  Toolbar,
} from 'react-onsenui';
import {route} from '../routes';

import classnames from 'classnames';
import {addIndex, map} from 'ramda';
const indexedMap = addIndex(map);

const ROUTES = [
  [
    route('home'),
  ],

  [

    route('logAgenda'),
    route('logWeek'),
    route('logMonth'),
    route('logAll'),
  ],

  [
    route('journal'),
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
    currentRoute: PropTypes.string,
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

    const active = item.key === currentRoute;

    return (
      <ListItem
        className={classnames({active})}
        key={item.key}
        onClick={() => onMenuItemClick(item)}
        ripple
      >
        <div className="left">
          <Icon icon={item.icon} size={22}/>
        </div>

        <div className="center">
          {item.key}
        </div>
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
      <Page className="menu">
        <Toolbar inline/>

        {indexedMap(this.renderRouteList, ROUTES)}

      </Page>
    );
  }

}
