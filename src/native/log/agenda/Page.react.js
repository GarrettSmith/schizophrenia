import Component from 'react-pure-render/component';
import React, {PropTypes, Text, View} from 'react-native';

import appStyles, {COLORS} from '../../app/styles';

import ActionButton from '../ActionButton.react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Actions as Routes} from 'react-native-router-flux';

const styles = {
  emptyContainer: {
    backgroundColor: COLORS.DIM,
  },
  emptyText: {
    color: COLORS.DIM_DARK,
    fontSize: 16,
  },
};

export default class Page extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[appStyles.centeredView, styles.emptyContainer]}>

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

        <ActionButton routes={Routes} />
      </View>
    );
  }

}
