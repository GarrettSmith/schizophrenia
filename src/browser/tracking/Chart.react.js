import './Chart.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  isEmpty,
  map,
} from 'ramda';
import moment from 'moment';
import {
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
} from 'victory';

import {TIME_SCALES} from '../../common/tracking/constants';

const X_KEY = 'createdAt';
const Y_KEY = 'value';

export default class Chart extends Component {

  static propTypes = {
    dimensions: PropTypes.array.isRequired,
    domain: PropTypes.object.isRequired,
    timeScale: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      dimensions,
      domain,
      timeScale,
    } = this.props;

    const xTickFormat = {
      [TIME_SCALES.WEEK]: 'ddd D',
      [TIME_SCALES.MONTH]: 'D',
      [TIME_SCALES.YEAR]: 'MMM',
    }[timeScale];

    return (
      <svg className="chart">
        {map(
          dimension => isEmpty(dimension.data) ? null : (
            <g key={dimension.name} >
              <VictoryLine
                data={dimension.data}
                domain={domain}
                x={X_KEY}
                y={Y_KEY}
                standAlone={false}
                style={{
                  data: {stroke: dimension.color},
                }}
              />

              <VictoryScatter
                data={dimension.data}
                domain={domain}
                x={X_KEY}
                y={Y_KEY}
                standAlone={false}
                style={{
                  data: {fill: dimension.color},
                }}
              />
            </g>
          ),
          dimensions
        )}

        <VictoryAxis
          standAlone={false}
          domain={domain.x}
          tickFormat={x => moment(x).format(xTickFormat)}
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
    )
  }
}
