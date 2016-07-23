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

const X_KEY = 'createdAt';

export default class Chart extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    dimensions: PropTypes.array.isRequired,
    domain: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      data,
      dimensions,
      domain,
    } = this.props;

    return (
      <svg className="chart">
        {map(
          dimension => isEmpty(data) ? null : (
            <g key={dimension.name} >
              <VictoryLine
                data={data}
                domain={domain}
                x={X_KEY}
                y={dimension.prop}
                standAlone={false}
                style={{
                  data: {stroke: 'black'},
                }}
              />

              <VictoryScatter
                data={data}
                domain={domain}
                x={X_KEY}
                y={dimension.prop}
                standAlone={false}
                style={{
                  data: {fill: 'grey'},
                }}
              />
            </g>
          ),
          dimensions
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
    )
  }
}
