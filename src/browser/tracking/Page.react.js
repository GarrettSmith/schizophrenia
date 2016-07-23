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
      toggleDimension,
    } = this.props;

    return (
      <Page
        className="tracking"
        renderToolbar={this.renderToolbar}
      >
        <div className="content">
          <Toolbar />

          <Chart
            data={data}
            dimensions={enabledDimensions}
            domain={domain}
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
  }),
  trackingActions
)(Tracking);
