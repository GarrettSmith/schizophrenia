import './Page.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import Item from './Item.react';
import {
  Page,
} from 'react-onsenui';
import {Entry} from '../../../../common/logging/models';

import {map} from 'ramda';

export default class Overview extends Component {

  static propTypes = {
    newEntry: PropTypes.object.isRequired,
    previousEntry: PropTypes.object.isRequired,
    updateEntry: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      newEntry,
      updateEntry,
    } = this.props;

    const previousEntry = this.props.previousEntry || Entry;

    const items = [
      {
        prop: 'physical',
        title: 'Physical',
        value: newEntry.physical,
        previousValue: previousEntry.physical,
        previousTime: previousEntry.createdAt,
      },
      {
        prop: 'mental',
        title: 'Mental',
        value: newEntry.mental,
        previousValue: previousEntry.mental,
        previousTime: previousEntry.createdAt,
      },
      {
        prop: 'emotional',
        title: 'Emotional',
        value: newEntry.emotional,
        previousValue: previousEntry.emotional,
        previousTime: previousEntry.createdAt,
      },
    ];

    return (
      <Page className="overview">
        <div className="content">
          {map(
            item => (
              <Item
                {...item}
                key={item.prop}
                updateEntry={updateEntry}
              />
            ),
            items
          )}
        </div>
      </Page>
    );
  }

}
