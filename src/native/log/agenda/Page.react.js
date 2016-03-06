import Component from 'react-pure-render/component';
import React, {PropTypes, View} from 'react-native';

import {COLORS} from '../../app/styles';

import ActionButton from '../ActionButton.react';
import Empty from './Empty.react';
import Entry from './Entry.react';

import {Actions as Routes} from 'react-native-router-flux';

import {
  isEmpty,
  map
} from 'ramda';

const styles = {
  container: {
    backgroundColor: COLORS.DIM,
    flex: 1,
  },
};

export default class Page extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    logging: PropTypes.object.isRequired,
  };

  render() {
    const {
      logging: {
        agenda: {
          entries,
        },
      },
    } = this.props;

    return (
      <View style={styles.container}>
        {isEmpty(entries) ? <Empty /> : this.renderEntries(entries)}
        <ActionButton routes={Routes} />
      </View>
    );
  }

  renderEntries(entries) {
    return map(
      entry => <Entry entry={entry} key={entry.id} />,
      entries
    );
  }

}
