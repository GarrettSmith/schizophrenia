import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

import {
  Fab,
  Icon,
  SpeedDial,
  SpeedDialItem,
} from 'react-onsenui';

export default class ActionButton extends Component {

  static propTypes = {
  };

  state = {
    open: false,
  };

  constructor(props) {
    super(props);
    this.logEntryPressed = this.logEntryPressed.bind(this);
  }

  logEntryPressed(active) {
    // only navigate when open
    if (active) {
      //this.props.routes.logEntry();
    }
  }

  render() {
    return (
      <SpeedDial
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

        <SpeedDialItem>
          <Icon icon="md-flag" />
        </SpeedDialItem>

        <SpeedDialItem>
          <Icon icon="md-pill" />
        </SpeedDialItem>
      </SpeedDial>
    );
  }

}
