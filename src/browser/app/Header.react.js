import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class Header extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
    //viewer: PropTypes.object,
  };

  render() {
    const {msg} = this.props;

    return (
      <header>
        <h1>
          <Link to="/">{msg.home}</Link>
        </h1>
        <ul>
          <li><Link activeClassName="active" to="/todos">{msg.todos}</Link></li>
          <li><Link activeClassName="active" to="/me">{msg.me}</Link></li>
        </ul>
      </header>
    );
  }

}

export default connect(state => ({
  msg: state.intl.msg.app.links,
}))(Header);
