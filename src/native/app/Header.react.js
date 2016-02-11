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

import {Actions as Routes} from 'react-native-router-flux';

import {pathOr} from 'ramda';

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
    router: PropTypes.object,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.currentRoute = this.currentRoute.bind(this);
    this.currentRouter = this.currentRouter.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.getProp = this.getProp.bind(this);
  }

  currentRouter() {
    return this.props.router ? this.props.router : Routes.currentRouter;
  }

  currentRoute() {
    return this.currentRouter().currentRoute;
  }

  getProp(prop) {
    if (this.props[prop]) {
      return this.props[prop];
    }

    const route = this.currentRoute();
    return pathOr(null, ['props', prop], route);
  }

  render() {
    const {
      children,
      style,
      iconColor,
    } = this.props;

    return (
      <View
        style={[
          styles.toolbar,
          {backgroundColor: this.getProp('headerColor')},
          style,
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
