import React, {
  Component,
  PropTypes,
  TouchableNativeFeedback,
  View,
  Text,
} from 'react-native';
import {
  Icon,
  Ripple,
  TYPO,
} from 'react-native-material-design';
import {
  getColor,
  isCompatible,
} from '../lib/react-native-material-design-helpers';

export default class ActionButton extends Component {

  static propTypes = {
    open: PropTypes.bool,
    style: PropTypes.string,
    icon: PropTypes.string.isRequired,
    primary: PropTypes.string,
    overrides: PropTypes.shape({
      iconColor: PropTypes.string,
      iconSize: PropTypes.number,
      iconSyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      backgroundColor: PropTypes.string,
      rippleColor: PropTypes.string
    }),
    disabled: PropTypes.bool,
    raised: PropTypes.bool,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
  };

  static defaultProps = {
    primary: 'paperBlue',
    disabled: false,
    raised: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      elevation: 2
    };
  }

  setElevation = () => {
    this.setState({
      elevation: 4
    });
  };

  removeElevation = () => {
    this.setState({
      elevation: 2
    });
  };

  render() {
    const {elevation} = this.state;
    const {
      disabled,
      onLongPress,
      onPress,
      overrides,
      primary,
      raised,
      style,
      icon,
    } = this.props;

    const iconStyleMap = {
      normal: {
        color: 'white',
      },
      disabled: {
        color: 'rgba(0,0,0,.26)'
      },
    };

    const buttonStyleMap = {
      normal: {
        backgroundColor: getColor(primary),
        borderColor: 'rgba(0,0,0,.12)',
      },
      disabled: {
        backgroundColor: 'rgba(0,0,0,.12)',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,.12)'
      },
    };

    const rippleColorMap = {
      normal: 'white',
      disabled: 'rgba(0,0,0,.06)'
    };

    const type = disabled ? 'disabled' : 'normal';
    const shape = raised ? 'raised' : 'flat';

    const iconStyle = (disabled || !(overrides && overrides.iconColor)) ?
        iconStyleMap[type] :
        { color: getColor(overrides.iconColor) };

    const rippleColor = (disabled || !(overrides && overrides.rippleColor)) ?
        rippleColorMap[type] :
        getColor(overrides.rippleColor);

    const buttonStyle = (() => {
      if (raised) {
        if (disabled || !(overrides && overrides.backgroundColor)) {
          return buttonStyleMap[type];
        }

        return Object.assign(
          buttonStyleMap[type],
          { backgroundColor: getColor(overrides.backgroundColor) }
        );
      }

      return null;
    })();

    if (!isCompatible('TouchableNativeFeedback')) {
      return (
        <Ripple
          elevation={raised ? [2, 4] : null}
          rippleColor={rippleColor}
          onPress={!disabled ? onPress : null}
          onLongPress={!disabled ? onLongPress : null}
          style={[
            styles.button,
            buttonStyle, {
              backgroundColor: buttonStyle && buttonStyle.backgroundColor,
            }, raised && !isCompatible('elevation') && {
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,.12)'
            }
          ]}
        >
          <Icon
            name={icon}
            style={[iconStyle, overrides.iconStyle]}
          />
        </Ripple>
      );
    }
    else {
      return (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(rippleColor)}
          onPress={!disabled ? onPress : null}
          onLongPress={!disabled ? onLongPress : null}
          onPressIn={raised ? this.setElevation : null}
          onPressOut={raised ? this.removeElevation : null}
        >
          <View style={[
            styles.button,
            buttonStyle, {
              backgroundColor: buttonStyle && buttonStyle.backgroundColor,
              elevation: raised ? elevation : 0
            }]}
          >
            <Icon
              name={icon}
              style={[iconStyle, overrides.iconStyle]}
            />
          </View>
        </TouchableNativeFeedback>
      );
    }
  }
}

const defaultSize = 56;

const styles = {
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: defaultSize,
    height: defaultSize,
    borderRadius: defaultSize / 2,
  },
  text: {
    borderRadius: 2,
  }
};
