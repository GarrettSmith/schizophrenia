import React, {
  Component,
  LayoutAnimation,
  PropTypes,
  TouchableHighlight,
  View,
  Text,
} from 'react-native';
import {getColor} from '../lib/react-native-material-design-helpers';
import {Icon} from 'react-native-material-design';

export default class Button extends Component {

  static propTypes = {
    active: PropTypes.bool,
    activeIcon: PropTypes.string,
    icon: PropTypes.string.isRequired,
    primary: PropTypes.string,
    overrides: PropTypes.shape({
      iconColor: PropTypes.string,
      iconSyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      backgroundColor: PropTypes.string,
    }),
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    size: PropTypes.oneOf(Button.SIZES),
  };

  static SIZES = {
    NORMAL: 56,
    MINI: 40,
  };

  static defaultProps = {
    primary: 'paperBlue',
    icon: 'add',
    size: Button.SIZES.NORMAL,
  };

  constructor(props) {
    super(props);
    setTimeout(LayoutAnimation.spring, 0);
  }

  render() {
    const {
      active,
      activeIcon,
      activeLabel,
      icon,
      onLongPress,
      onPress,
      overrides,
      primary,
      size,
    } = this.props;

    const iconStyle = {
      color: (overrides && overrides.iconColor) ?
        getColor(overrides.iconColor) :
        '#fff',
    };

    const roundStyle = {
      borderRadius: size / 2,
      width: size,
      height: size,
    };

    const buttonStyle = {
      backgroundColor: (overrides && overrides.backgroundColor) ?
        getColor(overrides.backgroundColor) :
        getColor(primary),
      borderColor: 'rgba(0,0,0,.12)',
    };


    return (
      <TouchableHighlight
        activeOpacity={0.9}
        underlayColor="#000"
        onPress={() => onPress && onPress(active)}
        onLongPress={() => onLongPress && onLongPress(active)}
        style={[
          roundStyle,
          styles.highlight,
          overrides.highlightStyle,
        ]}
      >
        <View
          style={[
            styles.button,
            roundStyle,
            buttonStyle,
            overrides.buttonStyle,
          ]}
        >
          <Icon
            name={active ? activeIcon : icon}
            style={[iconStyle, overrides.iconStyle]}
          />
        </View>
      </TouchableHighlight>
    );
  }
};

const styles = {
  highlight: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
};
