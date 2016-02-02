import React, {
  Animated,
  Component,
  LayoutAnimation,
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

  static defaultProps = {
    active: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  setActive(active) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      active,
    });
  }

  render() {
    const {
      children,
      onPress,
    } = this.props;

    const {active} = this.state;

    return (
      <TouchableWithoutFeedback
        onPress={() => this.setActive(false)}
      >
        <Animated.View
          style={[
            styles.container,
            active ? styles.activeContainer : null,
          ]}
        >
          { active ? children: null }

          <Item
            {...this.props}
            active={active}
            onPress={active => {
              if (!active) {
                this.setActive(true);
              }
              onPress && onPress(active);
            }}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
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
    padding: overscan + 20,
    position: 'absolute',
    right: -1 * overscan,
    top: -1 * overscan,
    transform: [
    ]
  },
  containerActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
};
