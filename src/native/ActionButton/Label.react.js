import React, {
  Component,
  PropTypes,
  View,
  Text,
} from 'react-native';

const styles = {
  background: {
    borderRadius: 5,
    elevation: 1,
    marginLeft: 16,
    marginRight: 16,
  },
  label: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
  },
  text: {
    fontWeight: 'bold',
  }
};

export default class Label extends Component {

  static propTypes = {
    active: PropTypes.bool,
    activeText: PropTypes.string,
    pressed: PropTypes.bool,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    text: PropTypes.string,
  };

  render() {
    const {
      active,
      activeText,
      pressed,
      style,
      text,
    } = this.props;

    // render whenever there is text OR when active with active text
    if (text || (active && activeText)) {
      return (
        <View
          style={[
            styles.background,
            {backgroundColor: pressed ? '#000' : 'transparent'},
          ]}
        >
          <View
            style={[
              styles.label,
              style,
              {opacity: pressed ? 0.9 : 1},
            ]}
          >
            <Text style={styles.text}>
              {active && activeText ? activeText : text}
            </Text>
          </View>
        </View>
      );
    }
    return null;
  }
}
