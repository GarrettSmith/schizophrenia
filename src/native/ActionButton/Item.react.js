import React, {
  Component,
  PropTypes,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Label from './Label.react';
import Button from './Button.react';

// Make mini items have the same spacing between labels and edge
const miniPadding = (Button.SIZES.NORMAL - Button.SIZES.MINI) / 2;

const styles = {
  item: {
    flex: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 6,
    paddingBottom: 10,
    alignSelf: 'flex-end',
  },
  miniButton: {
    marginLeft: miniPadding,
    marginRight: miniPadding,
  }
};

export default class Item extends Component {

  static propTypes = {
    active: PropTypes.bool,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    overrides: PropTypes.shape({
      iconColor: PropTypes.string,
      iconSyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      backgroundColor: PropTypes.string,
    }),
    size: PropTypes.number,
  };

  static defaultProps = {
    active: false,
    overrides: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
    };
  }

  setPressed(pressed) {
    return () => this.setState({pressed});
  }

  handle(actionName) {
    const {active} = this.props;
    const action = this.props[actionName];
    return () => action && action(active);
  }

  render() {
    const {
      overrides,
      size,
    } = this.props;
    const {pressed} = this.state;

    const hlStyle = overrides.highlightStyle || {};

    const buttonOverrides = {
      iconStyle: overrides.iconStyle,
      buttonStyle: overrides.buttonStyle,
      highlightStyle: [
        hlStyle,
        size === Button.SIZES.MINI ? styles.miniButton : null,
      ],
    };

    return (
      <TouchableWithoutFeedback
        delayPressOut={100}
        onPressIn={this.setPressed(true)}
        onPressOut={this.setPressed(false)}
        onPress={this.handle('onPress')}
        onLongPress={this.handle('onLongPress')}
      >
        <View style={styles.item}>
          <Label
            {...this.props}
            pressed={pressed}
            style={overrides.labelStyle}
          />
          <Button
            {...this.props}
            pressed={pressed}
            overrides={buttonOverrides}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}