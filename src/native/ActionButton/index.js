import React, {
  Animated,
  Component,
  PropTypes,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Item from './Item.react';
import Button from './Button.react';

// used to hide elevation shadows
const overscan = 20;
const padding = 14;

const styles = {
  container: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  activeContainer: {
    bottom: -1 * overscan,
    left: -1 * overscan,
    padding: overscan + padding,
    right: -1 * overscan,
    top: -1 * overscan,
    elevation: 10,
  },
  inactiveContainer: {
    bottom: 0,
    right: 0,
    padding,
  },
};

export default class ActionButton extends Component {

  static Item = Item;
  static SIZES = Button.SIZES;

  static propTypes = {
    children: PropTypes.node,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onActivate: PropTypes.func,
    onDeactivate: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      opacity: new Animated.Value(0),
      showBackground: false,
      translateY: new Animated.Value(0),
    };

    this.timeouts = [];

    // Bind funcs to keep this sane
    this.onPressContainer = this.onPressContainer.bind(this);
    this.onPressItem = this.onPressItem.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
    this.wrapChild = this.wrapChild.bind(this);
  }

  componentWillUnmount() {
    // Clean up all the timeouts
    this.timeouts.forEach(timeout => clearTimeout(timeout));
  }

  setActive(active) {
    this.setState({
      active,
      showBackground: true,
    });

    // animate
    const duration = 80;

    // hide bg after fade on deactivate
    if (!active) {
      this.timeouts.push(setTimeout(
        () => this.setState({showBackground: false}),
          duration
      ));
    }

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
      ),
    ]).start();

    // callbacks
    const {onActivate, onDeactivate} = this.props;
    if (active) {
      onActivate && onActivate();
    } else {
      onDeactivate && onDeactivate();
    }
  }

  onPressContainer() {
    this.setActive(false);
  }

  onPressItem() {
    const {active} = this.state;
    const {onPress} = this.props;
    this.setActive(!active);
    onPress && onPress(active);
  }

  render() {
    const {
      active,
      opacity,
      showBackground,
    } = this.state;

    return (
      <TouchableWithoutFeedback
        onPress={this.onPressContainer}
      >
        <Animated.View
          style={[
            styles.container,
            showBackground ? styles.activeContainer : styles.inactiveContainer,
            {backgroundColor: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.7)'],
            })},
          ]}
        >

          { active ? this.renderChildren() : null }

          <Item
            {...this.props}
            animation={Button.ANIMATIONS.SPIN}
            active={active}
            onPress={this.onPressItem}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  // deactive the child buttons after they are pressed
  wrapChild(child) {
    const deactivateAndCall = callback => active => {
      this.timeouts.push(setTimeout(
        () => this.setActive(false),
        100,
      ));
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

  renderChildren() {
    return (
      <Animated.View
        style={{transform: [{translateY: this.state.translateY}]}}
      >
        {React.Children.map(this.props.children, this.wrapChild)}
      </Animated.View>
    );
  }

}
