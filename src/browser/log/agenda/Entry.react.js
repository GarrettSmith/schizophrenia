import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

import {
  Icon,
  Ripple,
} from 'react-onsenui';

export default class Entry extends Component {

  static propTypes = {
    entry: PropTypes.shape({
      createdAt: PropTypes.number,
    }).isRequired,
  };

  render() {
    const {
      entry,
    } = this.props;

    return (
      <div className="entry">
        <Ripple />
        <Icon icon="md-help" />
        <p>
          {entry.createdAt}
        </p>
      </div>
    );
  }

}
