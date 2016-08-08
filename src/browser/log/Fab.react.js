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
    resetEntry: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  state = {
    open: false,
  };

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem({route, action}) {
    const {navigator} = this.props;

    function onClick() {
      action && action();
      navigator.pushPage(route)
    }

    return (
        <SpeedDialItem
          key={route.key}
          onClick={onClick}
          ref={route.key}
        >
          <Icon icon={route.icon}/>
          <p>
            {route.name}
          </p>
        </SpeedDialItem>
    );
  }

  render() {
    const {
      resetEntry,
    } = this.props;

    const actions = [
      {
        route: route('logEntry'),
        action: resetEntry,
      },
      {
        route: route('journalEntry'),
        action: null,
      }
    ];

    return (
      <SpeedDial
        className="log-speed-dial"
        position="bottom right"
      >
        <Fab
          onClick={() => this.setState({open: !this.state.open})}
          ref="fab"
        >
          <Icon
            icon="md-plus"
            style={{transform: `rotate(${this.state.open ? 45 : 0}deg)`}}
          />
        </Fab>

        {actions.map(this.renderItem)}

      </SpeedDial>
    );
  }

}
