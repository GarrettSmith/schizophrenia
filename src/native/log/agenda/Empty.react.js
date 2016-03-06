import Component from 'react-pure-render/component';
import React, {Text, View} from 'react-native';

import appStyles, {COLORS} from '../../app/styles';

import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = {
  emptyText: {
    color: COLORS.DIM_DARK,
    fontSize: 16,
  },
};

export default class Empty extends Component {

  render() {
    return (
      <View style={appStyles.centeredView}>

        <Icon
          color={styles.emptyText.color}
          name="today"
          size={96}
        />
        <Text style={styles.emptyText}>
          You haven't logged anything for today.
        </Text>
        <Text style={styles.emptyText}>
          Tap to get started!
        </Text>

      </View>
    );
  }

}
