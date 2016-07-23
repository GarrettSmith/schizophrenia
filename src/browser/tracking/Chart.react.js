import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Input,
  List,
  ListHeader,
  ListItem,
} from 'react-onsenui';
import {
  map,
  prop,
} from 'ramda';
import moment from 'moment';
import {
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
} from 'victory';

export default class Chart extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  renderListHeader() {
    return (
      <ListHeader>
        Filter
      </ListHeader>
    )
  }

  renderListRow(data) {
    return (
      <ListItem key={data.name}>
        <label className="left">
          <Input
            checked
            type="checkbox"
          />
        </label>
        {data.name}
      </ListItem>
    )
  }

  render() {
    const data = [
      {
        name: 'Physical',
        color: 'green',
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
          {
            createdAt: moment().subtract(5, 'd').toDate(),
            val: 2,
          },
          {
            createdAt: moment().subtract(6, 'd').toDate(),
            val: 1,
          },
        ],
      },
      {
        name: 'Mental',
        color: 'blue',
        values: [
          {
            createdAt: moment().toDate(),
            val: 3,
          },
          {
            createdAt: moment().subtract(1, 'd').toDate(),
            val: 1,
          },
          {
            createdAt: moment().subtract(2, 'd').toDate(),
            val: 3,
          },
          {
            createdAt: moment().subtract(3, 'd').toDate(),
            val: 4,
          },
          {
            createdAt: moment().subtract(4, 'd').toDate(),
            val: 5,
          },
          {
            createdAt: moment().subtract(5, 'd').toDate(),
            val: 5,
          },
          {
            createdAt: moment().subtract(6, 'd').toDate(),
            val: 3,
          },
        ],
      },
      {
        name: 'Emotional',
        color: 'red',
        values: [
          {
            createdAt: moment().toDate(),
            val: 1,
          },
          {
            createdAt: moment().subtract(1, 'd').toDate(),
            val: 2,
          },
          {
            createdAt: moment().subtract(2, 'd').toDate(),
            val: 3,
          },
          {
            createdAt: moment().subtract(3, 'd').toDate(),
            val: 3,
          },
          {
            createdAt: moment().subtract(4, 'd').toDate(),
            val: 2,
          },
          {
            createdAt: moment().subtract(5, 'd').toDate(),
            val: 4,
          },
          {
            createdAt: moment().subtract(6, 'd').toDate(),
            val: 3,
          },
        ],
      },
    ];

    const domain = {
      x: [
        moment().startOf('week').toDate(),
        moment().endOf('week').toDate(),
      ],
      y: [1, 5],
    };

    return (
      <div className="chart">

        <svg width="100%" height="50%">
          {map(
            data => (
              <g key={data.name} >
                <VictoryLine data={data.values}
                  domain={domain}
                  x="createdAt"
                  y="val"
                  standAlone={false}
                  style={{
                    data: {stroke: data.color},
                  }}
                />

                <VictoryScatter
                  data={data.values}
                  domain={domain}
                  x="createdAt"
                  y="val"
                  standAlone={false}
                  style={{
                    data: {fill: data.color},
                  }}
                />
              </g>
            ),
            data
          )}

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
            style={{
              grid: {
                stroke: "grey",
              },
            }}
          />
        </svg>

        <List
          dataSource={data}
          renderHeader={this.renderListHeader}
          renderRow={this.renderListRow}
        />
      </div>
    )
  }
}
