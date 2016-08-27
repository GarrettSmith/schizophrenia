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

import {COLORS} from '../lib/constants';
import {TIME_SCALES} from '../../common/tracking/constants';

const X_KEY = 'createdAt';
const Y_KEY = 'value';
const CRISIS_SIZE = 6;

export default class Chart extends Component {

  static propTypes = {
    crisisResolved: PropTypes.array.isRequired,
    crisisUnresolved: PropTypes.array.isRequired,
    dimensions: PropTypes.array.isRequired,
    domain: PropTypes.object.isRequired,
    timeScale: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      crisisResolved,
      crisisUnresolved,
      dimensions,
      domain,
      timeScale,
    } = this.props;

    const crisisDomain = {
      x: domain.x,
      y: [0, 0.1],
    };

    const xTickFormat = {
      [TIME_SCALES.WEEK]: 'ddd D',
      [TIME_SCALES.MONTH]: 'D',
      [TIME_SCALES.YEAR]: 'MMM',
    }[timeScale];

    return (
      <svg className="chart">

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

        {map(
          dimension => dimension.enabled && !isEmpty(dimension.data) ? (
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
          ) : null,
          dimensions
        )}

        <VictoryScatter
          data={crisisResolved}
          domain={crisisDomain}
          x={X_KEY}
          y="crisisResolved"
          standAlone={false}
          size={CRISIS_SIZE}
          style={{
            data: {fill: COLORS.GREEN}
          }}
        />

        <VictoryScatter
          data={crisisUnresolved}
          domain={crisisDomain}
          x={X_KEY}
          y="crisisResolved"
          standAlone={false}
          size={CRISIS_SIZE}
          style={{
            data: {fill: COLORS.RED}
          }}
        />
      </svg>
    )
  }
}
