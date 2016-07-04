import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Toolbar
} from 'react-onsenui';

class Header extends Component {

  static propTypes = {
    title: PropTypes.string,
  };

  render() {
    return (
      <Toolbar>
        <div className="center">
          {title}
        </div>
      </Toolbar>
    );
  }

}
