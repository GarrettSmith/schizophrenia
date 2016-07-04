import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Header extends Component {

  static propTypes = {
    pathname: PropTypes.string.isRequired,
    //viewer: PropTypes.object,
  };

  render() {

    return (
    );
  }

}

export default connect(state => ({
}))(Header);
