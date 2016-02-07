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

import {COLORS} from './styles';

const statusbarHeight = 24;
const toolbarHeight = 52;
const spacing = 16;

const styles = {
  toolbar: {
    alignItems: 'center',
    elevation: 4,
    flexDirection: 'row',
    height: statusbarHeight + toolbarHeight,
    paddingTop: statusbarHeight,
    paddingLeft: spacing,
    paddingRight: spacing,
  },
  leftIcon: {
    marginRight: spacing / 2,
  },
  title: {
    color: 'white',
    flex: 1,
    marginLeft: spacing,
    fontSize: 20,
  },
  rightIcon: {
    marginLeft: spacing,
  },
};

export default class Header extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    children: PropTypes.node,
    router: PropTypes.object,
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.currentRoute = this.currentRoute.bind(this);
    this.title = this.title.bind(this);
    this.atTop = this.atTop.bind(this);
    this.leftIcon = this.leftIcon.bind(this);
    this.leftIconPress = this.leftIconPress.bind(this);
    this.color = this.color.bind(this);
  }

  currentRoute() {
    return this.props.router.currentRoute;
  }

  title() {
    const {title} = this.props;
    if (title) {
      return title;
    }

    const routeTitle = this.currentRoute().title;
    if (routeTitle) {
      return routeTitle === '{date}' ? String(new Date) : routeTitle;
    }

    return '';
  }

  atTop() {
    return this.props.router.stack.length === 1;
  }

  leftIcon() {
    return this.atTop() ? 'menu' : 'back';
  }

  leftIconPress() {
    if (this.atTop()) {
      this.props.actions.ui.openDrawer();
    } else {
      this.props.router.pop();
    }
  }

  color() {
    const {color} = this.props;
    if (color) {
      return color;
    }

    const route = this.currentRoute();
    if (route && route.props && route.props.headerColor) {
      return route.props.headerColor;
    }

    return COLORS.PRIMARY;
  }

  render() {
    const {children} = this.props;
    return (
      <View
        style={[
          styles.toolbar,
          {backgroundColor: this.color()}
        ]}
      >

        <IconToggle
          color="#fff"
          onPress={this.leftIconPress}
          style={styles.leftIcon}
        >
          <Icon
            color="#fff"
            name={this.leftIcon()}
            size={24}
          />
        </IconToggle>

        <Text
          numberOfLines={1}
          style={styles.title}
        >
          {this.title()}
        </Text>
        {children}
      </View>
    );
  }

}
