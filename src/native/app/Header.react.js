import {COLORS} from './styles';

import Component from 'react-pure-render/component';
import React, {
  PropTypes,
  Text,
  View,
} from 'react-native';
import {
  Icon,
  IconToggle,
} from 'react-native-material-design';

import {path} from 'ramda';

const statusbarHeight = 24;
const toolbarHeight = 52;
const spacing = 16;
const defaultIconColor = COLORS.WHITE;

const styles = {
  toolbar: {
    alignItems: 'center',
    elevation: 3,
    flexDirection: 'row',
    height: statusbarHeight + toolbarHeight,
    paddingTop: statusbarHeight,
    paddingLeft: spacing,
    paddingRight: spacing,
  },
  leftIcon: {
    marginRight: spacing,
  },
  title: {
    color: COLORS.WHITE,
    flex: 1,
    fontSize: 20,
  },
  rightIcon: {
    marginLeft: spacing,
  },
};

export default class Header extends Component {

  static propTypes = {
    children: PropTypes.node,
    headerColor: PropTypes.string,
    iconColor: PropTypes.string,
    leftIcon: PropTypes.string,
    leftIconPress: PropTypes.func,
    rightIcon: PropTypes.string,
    rightIconPress: PropTypes.func,
    title: PropTypes.string,
    ui: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.renderTitle = this.renderTitle.bind(this);
    this.getProp = this.getProp.bind(this);
  }

  getProp(prop) {
    if (this.props[prop]) {
      return this.props[prop];
    }

    const route = this.props.ui;
    return path(['currentRoute', 'props', prop], route);
  }

  render() {
    const {
      children,
      iconColor,
    } = this.props;

    return (
      <View
        style={[
          styles.toolbar,
          {backgroundColor: this.getProp('headerColor')},
        ]}
      >
        {
          this.renderIcon(
            this.getProp('leftIcon'),
            this.getProp('leftIconPress'),
            iconColor,
            styles.leftIcon
          )
        }

        {this.renderTitle()}
        {children}

        {
          this.renderIcon(
            this.getProp('rightIcon'),
            this.getProp('rightIconPress'),
            iconColor,
            styles.rightIcon
          )
        }
      </View>
    );
  }

  renderTitle() {
    const title = this.getProp('title');

    if (title) {
      return (
        <Text
          numberOfLines={1}
          style={styles.title}
        >
          {title}
        </Text>
      );
    }
  }

  renderIcon(name, onPress, color = defaultIconColor, style = null) {
    if (name) {
      return (
        <IconToggle
          color={COLORS.WHITE}
          onPress={onPress}
        >
          <Icon
            color={color}
            name={name}
            size={24}
            style={style}
          />
        </IconToggle>
      );
    }
  }

}
