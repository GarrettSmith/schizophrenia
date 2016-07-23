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
import {
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
} from 'victory';

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
    ];

    const domain = {
      x: [
        moment().startOf('week').toDate(),
        moment().endOf('week').toDate(),
      ],
      y: [0, 5],
    };

    return (
      <Page className="chart">
        <svg width="100%" height="100%">
          <VictoryLine data={data}
            domain={domain}
            interpolation="cardinal"
            x="createdAt"
            y="val"
            standAlone={false}
          />

          <VictoryScatter
            data={data}
            domain={domain}
            x="createdAt"
            y="val"
            standAlone={false}
            labels={prop('val')}
          />

          <VictoryAxis
            standAlone={false}
            domain={domain.x}
            tickFormat={x => moment(x).format('ddd D')}
          />

          <VictoryAxis
            dependentAxis
            standAlone={false}
            domain={domain.y}
            tickFormat={x => `${x}`}
          />
        </svg>
      </Page>
    )
  }
}
