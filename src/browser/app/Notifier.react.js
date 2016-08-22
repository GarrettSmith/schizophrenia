import React, {Component, PropTypes} from 'react';

import notify from '../lib/notify';
import {route} from '../routes';

export default class Notifier extends Component {

  static propTypes = {
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    const {navigator} = this.props;
    navigator.pushPage(route('logEntry'));
  }

  componentDidMount() {
    notify(this.onClick);
  }

  render() {
    return null;
  }
}
