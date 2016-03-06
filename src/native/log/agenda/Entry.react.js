import Component from 'react-pure-render/component';
import React, {
  PropTypes,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';

import {COLORS} from '../../app/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = {
  entry: {
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    elevation: 1,
    flexDirection: 'row',
    marginBottom: 1,
  },
};

export default class Entry extends Component {

  static propTypes = {
    entry: PropTypes.shape({
      createdAt: PropTypes.number,
    }).isRequired,
  };

  render() {
    const {
      entry,
    } = this.props;

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(COLORS.PRIMARY)}
      >
        <View style={styles.entry}>
          <Icon
            name="help"
            size={32}
          />
          <Text>
            {entry.createdAt}
          </Text>
        </View>
      </TouchableNativeFeedback>
    );
  }

}
