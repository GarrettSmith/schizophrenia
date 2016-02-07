import Component from 'react-pure-render/component';
import React, {PropTypes, Text, View} from 'react-native';

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
          onPress={() => console.log('goal button pressed')}
          text="Goal"
          size={Button.SIZES.MINI}
        />

        <Button.Item
          icon="local-pharmacy"
          onPress={() => console.log('action button pressed')}
          text="Medication"
          size={Button.SIZES.MINI}
        />

        <Button.Item
          icon="event"
          onPress={() => console.log('action button pressed')}
          text="Appointment"
          size={Button.SIZES.MINI}
        />

      </Button>
    );
  }

}
