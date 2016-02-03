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
    children: PropTypes.node,
  };

  render() {
    return (
      <Toolbar
        icon="menu"
        style={styles.toolbar}
        title={'test'}
      />
    );
  }

}
