import './Page.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from '../app/Header.react';
import {
  Page,
} from 'react-onsenui';
import Chart from './Chart.react';
import Filter from './Filter.react';
import Toolbar from './Toolbar.react';

import trackingSelector from '../../common/tracking/selector';
import {tracking as trackingActions} from '../../common/tracking/actions';

class Tracking extends Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
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
    this.renderToolbar = this.renderToolbar.bind(this);
  }

  renderToolbar() {
    return (
      <Header title="Tracking" />
    );
  }

  render() {
    const {
      data,
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
        className="tracking"
        renderToolbar={this.renderToolbar}
      >
        <div className="content">
          <Toolbar
            nextTimeInterval={nextTimeInterval}
            previousTimeInterval={previousTimeInterval}
            setTimeScale={setTimeScale}
            interval={interval}
            timeScale={timeScale}
          />

          <Chart
            data={data}
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

export default connect(
  state => ({
    ...trackingSelector(state),
    timeScale: state.tracking.timeScale,
  }),
  trackingActions
)(Tracking);
