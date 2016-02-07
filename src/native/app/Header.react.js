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
    headerColor: PropTypes.string,
    router: PropTypes.object,
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.color = this.color.bind(this);
    this.currentRoute = this.currentRoute.bind(this);
    this.currentRouter = this.currentRouter.bind(this);
    this.leftIcon = this.leftIcon.bind(this);
    this.leftIconPress = this.leftIconPress.bind(this);
    this.title = this.title.bind(this);
  }

  currentRouter() {
    return this.props.router ? this.props.router : Routes.currentRouter;
  }

  currentRoute() {
    return this.currentRouter().currentRoute;
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

  leftIcon() {
    const {leftIcon} = this.props;
    if (leftIcon) {
      return leftIcon;
    }

    const route = this.currentRoute();
    return pathOr(null, ['props', 'leftIcon'], route);
  }

  leftIconPress() {
    const {leftIconPress} = this.props;
    if (leftIconPress) {
      return leftIconPress;
    }

    const route = this.currentRoute();
    return pathOr(null, ['props', 'leftIconPress'], route);
  }

  color() {
    const {headerColor} = this.props;
      if (headerColor) {
        return headerColor;
    }

    const route = this.currentRoute();
    return pathOr(COLORS.PRIMARY, ['props', 'headerColor'], route);
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
          onPress={this.leftIconPress()}
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
