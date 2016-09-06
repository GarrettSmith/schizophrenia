import './Page.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Header from '../app/Header.react';
import {
  AlertDialog,
  Fab,
  Icon,
  Input,
  List,
  ListItem,
  Page,
  Switch,
} from 'react-onsenui';
import Card from '../card/Card.react';

import {route} from '../routes';
import {actions} from '../../common/settings/actions';

class Settings extends Component {

  static propTypes = {
    notificationEnabled: PropTypes.bool.isRequired,
    notificationTime: PropTypes.number.isRequired,
    setNotificationTime: PropTypes.func.isRequired,
    toggleNotification: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.toggle = this.toggle.bind(this);
    this.setTime = this.setTime.bind(this);
  }

  renderToolbar() {
    return (
      <Header
        modifier="tertiary"
        title="Settings"
      />
    );
  }

  setTime(e) {
    this.props.setNotificationTime(e.target.value);
  }

  toggle(e) {
    this.props.toggleNotification(e.target.checked);
  }

  render() {
    const {
      notificationEnabled,
      notificationTime,
    } = this.props;

    return (
      <Page
        className="settings"
        renderToolbar={this.renderToolbar}
      >
        <Card>
          <div className="enabled">
            <label>
              Enable Notifications
            </label>
            <Switch
              checked={notificationEnabled}
              onChange={this.toggle}
            />
          </div>

          <div className="time">
            <label>
              Notification Time
            </label>
            <div className="time-inputs">
              <Input
                type="time"
                value={`${notificationTime}`}
                onChange={this.setTime}
              />
            </div>
          </div>
        </Card>
      </Page>
    );
  }
}

export default connect(
  state => state.settings,
  actions
)(Settings);
