import './Empty.scss';

import Component from 'react-pure-render/component';
import React from 'react';
import {Icon} from 'react-onsenui';

export default class Empty extends Component {

  render() {
    return (
      <div className="empty">

        <Icon icon="md-calendar" size={96} />
        <p>
          You haven't logged anything for today.
        </p>
        <p>
          Tap to get started!
        </p>

      </div>
    );
  }

}
