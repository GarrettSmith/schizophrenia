import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react-native';

import {COLORS} from '../app/styles';

import Button from '../ActionButton';

export default class ActionButton extends Component {

  static propTypes = {
    routes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.logEntryPressed = this.logEntryPressed.bind(this);
  }

  logEntryPressed(active) {
    // only navigate when open
    if (active) {
      this.props.routes.logEntry();
    }
  }

  render() {
    return (
      <Button
        activeIcon="create"
        activeText="Log Entry"
        color={COLORS.SECONDARY}
        icon="add"
        onPress={this.logEntryPressed}
      >

        <Button.Item
          icon="flag"
          text="Goal"
          size={Button.SIZES.MINI}
        />

        <Button.Item
          icon="local-pharmacy"
          text="Medication"
          size={Button.SIZES.MINI}
        />

        <Button.Item
          icon="event"
          text="Appointment"
          size={Button.SIZES.MINI}
        />

      </Button>
    );
  }

}
