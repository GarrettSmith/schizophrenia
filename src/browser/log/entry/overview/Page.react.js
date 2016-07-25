import './Page.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import Item from './Item.react';
import {
  Page,
} from 'react-onsenui';

import {map} from 'ramda';

export default class Overview extends Component {

  static propTypes = {
    emotional: PropTypes.number.isRequired,
    mental: PropTypes.number.isRequired,
    physical: PropTypes.number.isRequired,
    previousEmotional: PropTypes.number,
    previousMental: PropTypes.number,
    previousPhysical: PropTypes.number,
    updateEntry: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      emotional,
      mental,
      physical,
      previousEmotional,
      previousMental,
      previousPhysical,
      updateEntry,
    } = this.props;

    const items = [
      {
        prop: 'physical',
        title: 'Physical',
        value: physical,
        previousValue: previousPhysical,
      },
      {
        prop: 'mental',
        title: 'Mental',
        value: mental,
        previousValue: previousMental,
      },
      {
        prop: 'emotional',
        title: 'Emotional',
        value: emotional,
        previousValue: previousEmotional,
      },
    ];

    return (
      <Page className="overview">
        <div className="card">
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
