import React, {
  Component,
  PropTypes,
  View,
} from 'react-native';

import Label from './Label.react';
import Button from './Button.react';

export default class Item extends Component {

  static propTypes = {
    overrides: PropTypes.shape({
      iconColor: PropTypes.string,
      iconSyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
      backgroundColor: PropTypes.string,
    }),
    size: PropTypes.oneOf(Button.SIZES),
  };

  static defaultProps = {
    overrides: {},
  };

  render() {
    const {
      overrides,
      size,
    } = this.props;

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
      <View style={styles.item} >
        <Label
          {...this.props}
          style={overrides.labelStyle}
        />
        <Button
          {...this.props}
          overrides={buttonOverrides}
        />
      </View>
    );
  }
};

// Make mini items have the same spacing between labels and edge
const miniPadding = (Button.SIZES.NORMAL - Button.SIZES.MINI) / 2;

const styles = {
  item: {
    flex: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  miniButton: {
    marginLeft: miniPadding,
    marginRight: miniPadding,
  }
};
