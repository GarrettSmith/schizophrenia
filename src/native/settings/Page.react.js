import Component from 'react-pure-render/component';
import React, {
  PropTypes,
  Text,
  View,
} from 'react-native';

import appStyles from '../app/styles';

const styles = {
};

export default class Page extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {actions} = this.props;
    return (
      <View style={appStyles.centeredView}>
        <Text>
          Settings
        </Text>
      </View>
    );
  }

}
