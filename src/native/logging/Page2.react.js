import Component from 'react-pure-render/component';
import React, {PropTypes, Text, View} from 'react-native';

import appStyles from '../app/styles';

import ActionButton from '../ActionButton';
import {COLOR} from 'react-native-material-design';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../app/Header.react';

const styles = {
  emptyContainer: {
    backgroundColor: COLOR.paperRed500.color,
  },
  emptyText: {
    color: COLOR.paperGrey500.color,
    fontSize: 16,
  }
};

export default class Page extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.setDrawerEnabled = this.setDrawerEnabled.bind(this);
    this.enableDrawer = this.enableDrawer.bind(this);
    this.disableDrawer = this.disableDrawer.bind(this);
  }

  setDrawerEnabled(enabled) {
    console.log(enabled)
    this.props.actions.ui.setDrawerEnabled(enabled);
  }

  enableDrawer() {
    this.setDrawerEnabled(true);
  }

  disableDrawer() {
    this.setDrawerEnabled(false);
  }

  render() {
    const {actions} = this.props;
    return (
      <View style={[appStyles.centeredView, styles.emptyContainer]}>
        <Header
          openDrawer={actions.ui.openDrawer}
        />
      </View>
    );
  }

}
