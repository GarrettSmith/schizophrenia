import React, {
  Animated,
  Component,
  PropTypes,
  View,
} from 'react-native';
import {Icon} from 'react-native-material-design';

import {COLORS} from '../app/styles';

const sizes = {
  NORMAL: 56,
  MINI: 40,
};

const animations = {
  SPIN: 0,
  ZOOM: 1,
};

const styles = {
  background: {
    elevation: 6,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#fff',
  },
};

export default class Button extends Component {

  static propTypes = {
    active: PropTypes.bool,
    activeIcon: PropTypes.string,
    animation: PropTypes.number,
    color: PropTypes.string,
    icon: PropTypes.string.isRequired,
    pressed: PropTypes.bool,
    overrides: PropTypes.shape({
      buttonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      highlightStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      iconSyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    }),
    size: PropTypes.number,
  };

  static ANIMATIONS = animations;
  static SIZES = sizes;

  static defaultProps = {
    animation: animations.ZOOM,
    pressed: false,
    color: COLORS.PRIMARY,
    icon: 'add',
    size: Button.SIZES.NORMAL,
  };

  constructor(props) {
    super(props);
    this.state = {
      rotate: new Animated.Value(0),
      scale: new Animated.Value(1),
    };
  }

  componentDidMount() {
    switch (this.props.animation) {
      case (animations.SPIN):
        this.spin();
        break;
      case (animations.ZOOM):
        this.zoom();
        break;
    }
  }

  spin() {
    const duration = 200;
    this.state.scale.setValue(0.1);
    this.state.rotate.setValue(-90);
    Animated.parallel(
      [
        Animated.timing(
          this.state.scale,
          {
            toValue: 1,
            duration,
          }
        ),
        Animated.timing(
          this.state.rotate,
          {
            toValue: 0,
            duration,
          }
        ),
      ]
    ).start();
  }

  zoom() {
    const duration = 100;
    this.state.scale.setValue(0.1);
    Animated.timing(
      this.state.scale,
      {
        toValue: 1,
        duration,
      }
    ).start();
  }

  componentWillReceiveProps(newProps) {
    const {rotate} = this.state;
    const {active} = newProps;

    // Spin icon when changing active state
    if (active !== this.props.active) {
      rotate.setValue((active ? -1 : 1) * 45);
      Animated.spring(
        rotate,
        {
          toValue: 0,
          friction: 10,
          velocity: 10,
          tension: 200,
        }
      ).start();
    }
  }

  render() {
    const {
      active,
      activeIcon,
      color,
      icon,
      overrides,
      pressed,
      size,
    } = this.props;

    const {
      rotate,
      scale,
    } = this.state;

    const roundStyle = {
      borderRadius: size / 2,
      width: size,
      height: size,
    };

    return (
      <Animated.View
        style={[
          styles.background,
          roundStyle,
          overrides.highlightStyle,
          {backgroundColor: pressed ? '#000' : 'transparent'},
          {transform: [
            {rotate: rotate.interpolate({
              inputRange: [-360, 360],
              outputRange: ['-360deg', '360deg'],
            })},
            {scale},
          ]},
        ]}
      >
        <View
          style={[
            styles.button,
            roundStyle,
            {backgroundColor: color},
            overrides.buttonStyle,
            {opacity: pressed ? 0.9 : 1},
          ]}
        >
          <Icon
            name={active ? activeIcon : icon}
            style={[
              styles.icon,
              overrides.iconStyle,
            ]}
            size={24}
          />
        </View>
      </Animated.View>
    );
  }
}
