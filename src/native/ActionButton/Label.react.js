import React, {
  Component,
  PropTypes,
  View,
  Text,
} from 'react-native';

export default class Label extends Component {

  static propTypes = {
    active: PropTypes.bool,
    activeText: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    text: PropTypes.string,
  };

  render() {
    const {
      active,
      activeText,
      style,
      text,
    } = this.props;

    // render whenever there is text OR when active with active text
    if (text || (active && activeText)) {
      return (
        <View
          style={[styles.label, style]}
        >
          <Text>
            {active && activeText ? activeText : text}
          </Text>
        </View>
      );
    }
    else {
      return null;
    }
  }
}
const styles =  {
  label: {
    borderRadius: 4,
    backgroundColor: '#fff',
    elevation: 1,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    margin: 16,
  },
};
