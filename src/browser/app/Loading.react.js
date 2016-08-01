import './Loading.scss';

import React, {Component, PropTypes} from 'react';
import {
  Page,
  ProgressCircular,
} from 'react-onsenui';

export default class Loading extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page className="loading">
        <ProgressCircular
          indeterminate
        />
      </Page>
    );
  }
}
