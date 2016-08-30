import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import notify from '../lib/notify';
import {route} from '../routes';

class Notifier extends Component {

  static propTypes = {
    navigator: PropTypes.object,
    notificationEnabled: PropTypes.bool.isRequired,
    notificationTime: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const {navigator} = this.props;
    navigator.pushPage(route('logEntry'));
  }

  render() {
    const {
      notificationEnabled,
      notificationTime,
    } = this.props;

    notify(notificationEnabled, notificationTime, this.onClick);

    return null;
  }
}

export default connect(
  state => state.settings
)(Notifier);
