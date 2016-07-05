import './Fab.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Fab,
  Icon,
  SpeedDial,
  SpeedDialItem,
} from 'react-onsenui';
import {route} from '../routes';

export default class ActionButton extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  state = {
    open: false,
  };

  constructor(props) {
    super(props);
    this.goTo = this.goTo.bind(this);
  }

  goTo(routeKey) {
    this.props.navigator.pushPage(route(routeKey));
  }

  render() {
    return (
      <SpeedDial
        class="log-speed-dial"
        position="bottom right"
      >
        <Fab
          onClick={() => this.setState({open: !this.state.open})}
        >
          <Icon
            icon="md-plus"
            style={{transform: `rotate(${this.state.open ? 45 : 0}deg)`}}
          />
        </Fab>

        <SpeedDialItem
          onClick={() => this.goTo('logEntry')}
        >
          <Icon icon="md-edit" />
        </SpeedDialItem>

        <SpeedDialItem
          onClick={() => this.goTo('journalEntry')}
        >
          <Icon icon="md-book" />
        </SpeedDialItem>

        <SpeedDialItem
          onClick={() => this.goTo('goalEntry')}
        >
          <Icon icon="md-flag" />
        </SpeedDialItem>
      </SpeedDial>
    );
  }

}
