import Component from '../components/Component.react';
import React from 'react-native';
import {Toolbar} from 'react-native-material-design';

const {PropTypes} = React;

export default class Header extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const {
      children
    } = this.props;

    return (
      <Toolbar
        icon="menu"
        onIconPress={() => null}
        style={styles.toolbar}
        title={'test'}
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
