import Component from '../components/Component.react';
import React, {PropTypes, Text, View} from 'react-native';
import appStyles from '../app/styles';
import ActionButton from '../ActionButton';
import {Button, COLOR} from 'react-native-material-design';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../app/Header.react';

export default class Page extends Component {

  static propTypes = {
  };

  render() {
    return (
      <View style={[appStyles.centeredView, styles.emptyContainer]}>
        <Header
        />

        <Icon
          color={styles.emptyText.color}
          name="today"
          size={96}
        />
        <Text style={styles.emptyText}>
          You haven't logged anything for today.
        </Text>
        <Text style={styles.emptyText}>
          Tap here to get started!
        </Text>

        <ActionButton
          activeIcon="create"
          activeText="Log Entry"
          primary="paperPink300"
          icon="add"
          onPress={() => console.log('action button pressed')}
        >

          <ActionButton.Item
            icon="flag"
            onPress={() => console.log('goal button pressed')}
            text="Goal"
            size={ActionButton.SIZES.MINI}
          />

          <ActionButton.Item
            icon="local-pharmacy"
            onPress={() => console.log('action button pressed')}
            text="Medication"
            size={ActionButton.SIZES.MINI}
          />

          <ActionButton.Item
            icon="event"
            onPress={() => console.log('action button pressed')}
            text="Appointment"
            size={ActionButton.SIZES.MINI}
          />

        </ActionButton>
      </View>
    );
  }

}

const styles = {
  emptyContainer: {
    backgroundColor: COLOR.paperGrey300.color,
  },
  emptyText: {
    color: COLOR.paperGrey500.color,
    fontSize: 16,
  }
}
