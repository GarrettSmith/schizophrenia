import Component from '../components/Component.react';
import React, {PropTypes, Text, View} from 'react-native';
import appStyles from '../app/styles';

export default class Page extends Component {

  static propTypes = {
  };

  render() {
    return (
      <View style={appStyles.centeredView}>
        <Text>
          "This is where the logging will all happen!"
        </Text>
      </View>
    );
  }

}
