import './Page.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from '../app/Header.react';
import {
  Toolbar,
  ToolbarButton,
  Icon,
  Page,
  Tab,
  Tabbar,
} from 'react-onsenui';
import Chart from './Chart.react';
import Filter from './Filter.react';

import trackingSelector from '../../common/tracking/selector';

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
    } = this.props;

    return (
      <Page
        className="tracking"
        renderToolbar={this.renderToolbar}
      >
        <Toolbar inline>
          <div className="left">
            <ToolbarButton>
              <Icon icon="md-caret-left" />
            </ToolbarButton>
          </div>

          <div className="center">
            <select>
              <option>
                Week
              </option>
              <option>
                Month
              </option>
              <option>
                Year
              </option>
            </select>
          </div>

          <div className="right">
            <ToolbarButton>
              <Icon icon="md-caret-right" />
            </ToolbarButton>
          </div>
        </Toolbar>

        <Chart
          data={data}
          dimensions={dimensions}
          domain={domain}
        />

        <Filter
          dimensions={dimensions}
        />
      </Page>
    );
  }

}

export default connect(
  state => ({
    ...trackingSelector(state),
  })
)(Tracking);
