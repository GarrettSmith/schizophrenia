import './Header.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  BackButton,
  Toolbar,
  ToolbarButton,
  Icon,
} from 'react-onsenui';
import {ui as uiActions} from '../../common/ui/actions';
import {connect} from 'react-redux';

class Header extends Component {

  static propTypes = {
    action: PropTypes.func,
    actionIcon: PropTypes.string,
    back: PropTypes.bool,
    title: PropTypes.string,
    modifier: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.renderLeft = this.renderLeft.bind(this);
    this.renderRight = this.renderRight.bind(this);
  }

  renderLeft() {
    const {
      back,
      openDrawer,
    } = this.props;

    return (
      <div className="left">
      {back ? (
        <BackButton>
          Back
        </BackButton>
      ) : (
        <ToolbarButton
          onClick={openDrawer}
          ripple
        >
          <Icon icon="md-menu" />
        </ToolbarButton>
      )}
      </div>
    );
  }

  renderRight() {
    const {
      action,
      actionIcon,
    } = this.props;
    if (!action) return;

    const icon = actionIcon || 'md-check';
    return (
      <div className="right">
        <ToolbarButton
          onClick={action}
          ripple
        >
          <Icon icon={icon} />
        </ToolbarButton>
      </div>
    );
  }

  render() {
    const {
      modifier,
      title,
    } = this.props;

    return (
      <Toolbar className={`header ${modifier}`}>
        {this.renderLeft()}
        <div className="center">
          {title}
        </div>
        {this.renderRight()}
      </Toolbar>
    );
  }

}

Header = connect(state => ({
  currentPath: state.ui.currentPath
}), uiActions)(Header);

export default Header;
