import Component from '../components/Component.react';
import React, {PropTypes} from 'react-native';
import {Toolbar} from 'react-native-material-design';

const styles = {
  toolbar: {
    height: 76,
    paddingTop: 24
  },
};

export default class Header extends Component {

  static propTypes = {
    toggleDrawer: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  render() {
    return (
      <Toolbar
        icon="menu"
        onIconPress={this.props.toggleDrawer}
        style={styles.toolbar}
        title={'test'}
      />
    );
  }

}
