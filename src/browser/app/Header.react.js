import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Toolbar
} from 'react-onsenui';

export default class Header extends Component {

  static propTypes = {
    title: PropTypes.string,
  };

  render() {
    const {title} = this.props;

    return (
      <Toolbar>
        <div className="center">
          {title}
        </div>
      </Toolbar>
    );
  }

}
