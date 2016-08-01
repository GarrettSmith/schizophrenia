import './Page.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Page,
} from 'react-onsenui';
import Chart from './Chart.react';
import Filter from './Filter.react';

export default class TrackingCategory extends Component {

  static propTypes = {
    dimensions: PropTypes.array.isRequired,
    domain: PropTypes.object.isRequired,
    enabledDimensions: PropTypes.array.isRequired,
    interval: PropTypes.object.isRequired,
    nextTimeInterval: PropTypes.func.isRequired,
    previousTimeInterval: PropTypes.func.isRequired,
    setTimeScale: PropTypes.func.isRequired,
    timeScale: PropTypes.string.isRequired,
    toggleDimension: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      dimensions,
      domain,
      enabledDimensions,
      interval,
      nextTimeInterval,
      previousTimeInterval,
      setTimeScale,
      timeScale,
      toggleDimension,
    } = this.props;

    return (
      <Page
        className="tracking-category"
      >
        <div className="content">
          <Chart
            dimensions={enabledDimensions}
            domain={domain}
            timeScale={timeScale}
          />

          <Filter
            dimensions={dimensions}
            toggleDimension={toggleDimension}
          />
        </div>
      </Page>
    );
  }

}
