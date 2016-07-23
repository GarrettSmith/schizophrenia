import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Fab,
  Icon,
  Page,
  Tab,
  Tabbar,
} from 'react-onsenui';
import {prop} from 'ramda';
import moment from 'moment';

export default class Chart extends Component {

  static propTypes = {
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const data = [
      {
        name: 'Physical',
        values: [
          {
            createdAt: moment().toDate(),
            val: 2,
          },
          {
            createdAt: moment().subtract(1, 'd').toDate(),
            val: 3,
          },
          {
            createdAt: moment().subtract(2, 'd').toDate(),
            val: 5,
          },
          {
            createdAt: moment().subtract(3, 'd').toDate(),
            val: 4,
          },
          {
            createdAt: moment().subtract(4, 'd').toDate(),
            val: 2,
          },
        ],
      }
    ];

    const domain = {
      x: [
        moment().startOf('week').toDate(),
        moment().endOf('week').toDate(),
      ],
      y: [0, 5],
    };
    console.log(data, domain)

    return (
      <Page className="chart">
      </Page>
    )
  }
}
