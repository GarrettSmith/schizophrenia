import Component from '../components/Component.react';
import React from 'react-native';
import {Toolbar} from 'react-native-material-design';

const {PropTypes} = React;

export default class Header extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    toggleSideMenu: PropTypes.func.isRequired
  };

  render() {
    const {
      color,
      title,
      toggleSideMenu,
    } = this.props;

    return (
      <Toolbar
        icon="menu"
        onIconPress={toggleSideMenu}
        style={styles.toolbar}
        title={title}
      />
    );
  }

}

const styles = {
  toolbar: {
    height: 76,
    paddingTop: 24
  },
}
