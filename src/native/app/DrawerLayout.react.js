import React, {
  Component,
  DrawerLayoutAndroid,
  PropTypes,
  View,
} from 'react-native';

const styles = {
  container: {
    flex: 1,
  },
};

export default class DrawerLayout extends Component {
  static positions = DrawerLayoutAndroid.positions;

  static propTypes = {
    open: PropTypes.bool,
    children: PropTypes.node,
    enabled: PropTypes.bool,
  };

  static defaultProps = {
    open: false,
    enabled: true,
  };

  setDrawerState(open) {
    if (this.props.enabled) {
      const {drawer} = this.refs;
      if (open) {
        drawer.openDrawer();
      } else {
        drawer.closeDrawer();
      }
    }
  }

  componentDidMount() {
    this.setDrawerState(this.props.open);
  }

  componentWillReceiveProps(newProps) {
    this.setDrawerState(newProps.open);
  }

  render() {
    const {
      children,
      enabled,
    } = this.props;

    if (enabled) {
      return (
        <DrawerLayoutAndroid
          {...this.props}
          ref="drawer"
        >
          {children}
        </DrawerLayoutAndroid>
      );
    }

    return (
      <View style={styles.container}>
        {children}
      </View>
    );
  }
}
