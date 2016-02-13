import {COLORS} from '../../app/styles';

import Component from 'react-pure-render/component';
import React, {
  ListView,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View,
} from 'react-native';

import BaseHeader from '../../app/Header.react';
import {Icon} from 'react-native-material-design';

import {Actions as Routes} from 'react-native-router-flux';

const styles = {
  input: {
    flex: 1,
    paddingBottom: 6,
    paddingTop: 6,
    color: COLORS.BLACK,
    fontSize: 20,
  },
  list: {
    backgroundColor: COLORS.WHITE,
    elevation: 2,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  row: {
    padding: 12,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowIcon: {
    paddingRight: 24,
  },
  rowText: {
    color: COLORS.BLACK_DARK,
    fontSize: 16,
  },
};

export default class Header extends Component {

  data() {
    const ds = new ListView.DataSource({rowHasChanged: (a, b) => a !== b});
    return ds.cloneWithRows([
      'Heard voices',
      'Seen visions',
      'Feel that my thoughts are disorganized',
      'Felt unusual sensations',
      'Done something I deserve to be punished for',
      'Had others see/hear my thoughts',
    ]);
  }

  render() {
    return (
      <View>
        <BaseHeader
          leftIcon="close"
          leftIconPress={Routes.pop}
          headerColor={COLORS.WHITE}
          iconColor={COLORS.DIM_DARK}
          rightIcon="done"
        >
          <TextInput
            autoCapitalize="sentences"
            autoCorrect
            autoFocus
            placeholder="How have you been feeling?"
            underlineColorAndroid={COLORS.DIM_DARK}
            selectionColor={COLORS.SECONDARY}
            style={styles.input}
          />
        </BaseHeader>

        <ListView
          dataSource={this.data()}
          renderRow={this.renderRow}
          style={styles.list}
        />
      </View>
    );
  }

  renderRow(data) {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(COLORS.DIM, false)}
      >
        <View style={styles.row}>
          <Icon
            name="playlist-add"
            style={styles.rowIcon}
          />
          <Text style={styles.rowText}>
            {data}
          </Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}
