import React, {
  Animated,
  Component,
  PropTypes,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Item from './Item.react';
import Button from './Button.react';

export default class ActionButton extends Component {

  static Item = Item;
  static SIZES = Button.SIZES;

  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(0),
    };
  }

  setActive(active) {
    this.setState({
      active,
    });

    // animate
    const duration = 80;
    this.state.translateY.setValue(10);
    Animated.parallel([
      Animated.timing(
        this.state.opacity,
        {
          toValue: active ? 1 : 0,
          duration,
        }
      ),
      Animated.timing(
        this.state.translateY,
        {
          toValue: 0,
          duration,
        }
      )
    ]).start();
  }

  render() {
    const {
      children,
      onPress,
    } = this.props;

    const {
      active,
      opacity,
      translateY,
    } = this.state;

    return (
      <TouchableWithoutFeedback
        onPress={() => this.setActive(false)}
      >
        <Animated.View
          style={[
            styles.container,
            {backgroundColor: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.7)'],
            })}
          ]}
        >

          { active ? this.renderChildren() : null }

          <Item
            {...this.props}
            animation={Button.ANIMATIONS.SPIN}
            active={active}
            onPress={active => {
              this.setActive(!active);
              onPress && onPress(active);
            }}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  renderChildren() {
    return (
      <Animated.View
        style={{transform: [{translateY: this.state.translateY}]}}
      >
        {React.Children.map(
          this.props.children,
          child => {
            const deactivateAndCall = callback => active => {
              setTimeout(
                () => this.setActive(false),
                100,
              );
              child.props[callback] && child.props[callback](active);
            };
            return React.cloneElement(
              child,
              {
                onPress: deactivateAndCall('onPress'),
                onLongPress: deactivateAndCall('onLongPress'),
              }
            );
          }
        )}
      </Animated.View>
    );
  }

}

// used to hide elevation shadows
const overscan = 20;

const styles = {
  container: {
    alignItems: 'flex-end',
    bottom: -1 * overscan,
    elevation: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    left: -1 * overscan,
    padding: overscan + 14,
    position: 'absolute',
    right: -1 * overscan,
    top: -1 * overscan,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
};
