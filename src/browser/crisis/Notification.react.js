import './Notification.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import crisisSelector from '../../common/crisis/selector';
import {logging} from '../../common/logging/actions';
import {
  AlertDialog,
  Page,
} from 'react-onsenui';
import {route} from '../routes';

class Notification extends Component {
  static propTypes = {
    navigator: PropTypes.object,
    previousEntry: PropTypes.object.isRequired,
    setCrisisResolved: PropTypes.func.isRequired,
    showCrisisWarning: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.onNo = this.onNo.bind(this);
    this.onYes = this.onYes.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(resolved) {
    const {
      previousEntry: {
        id,
      },
      setCrisisResolved,
    } = this.props;
    setCrisisResolved(id, resolved);
  }

  onNo() {
    const {navigator} = this.props;
    console.log(navigator)
    this.onClick(false);
    navigator.pushPage(route('crisis'));
  }

  onYes() {
    this.onClick(true);
  }

  render() {
    const {showCrisisWarning} = this.props;
    return (
      <AlertDialog
        isCancelable={false}
        className="crisis-notification"
        isOpen={showCrisisWarning}
      >
        <div className="alert-dialog-title">
          Your symptoms seem severe
        </div>

        <div className="alert-dialog-content">
          Are you able to cope?
        </div>

        <div className="alert-dialog-footer">

          <button
            onClick={this.onNo}
            className="alert-dialog-button"
          >
            No
          </button>

          <button
            onClick={this.onYes}
            className="alert-dialog-button"
          >
            Yes
          </button>

        </div>
      </AlertDialog>
    );
  }
}

export default connect(
  crisisSelector,
  logging
)(Notification);
