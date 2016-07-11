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

  ACTIONS = [
    route('logEntry'),
    route('journalEntry'),
  ];

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  state = {
    open: false,
  };

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(route) {
    const {navigator} = this.props;
    return (
        <SpeedDialItem
          key={route.key}
          onClick={() => navigator.pushPage(route)}
        >
          <Icon icon={route.icon}/>
        </SpeedDialItem>
    );
  }

  render() {
    return (
      <SpeedDial
        className="log-speed-dial"
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

        {this.ACTIONS.map(this.renderItem)}

      </SpeedDial>
    );
  }

}
