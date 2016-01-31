import Component from '../components/Component.react';
import React, {PropTypes, Text, View} from 'react-native';
import appStyles from '../app/styles';
import ActionButton from '../action-button/ActionButton.react';
import {Button, COLOR} from 'react-native-material-design';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../app/Header.react';

export default class Page extends Component {

  static propTypes = {
  };

  render() {
    return (
      <View style={appStyles.centeredView}>
        <Header
        />

        <Icon name="today" />
        <Text>
          You haven't logged anything for today.
        </Text>
        <Text>
          Tap here to get started!
        </Text>

        <ActionButton
          overrides={{
            backgroundColor: 'paperPink300',
          }}
          icon="create"
          onPress={() => console.log('action button pressed')}
        />
      </View>
    );
  }

}
