import './Page.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from '../app/Header.react';
import {
  Icon,
  Page,
  Tab,
  Tabbar,
} from 'react-onsenui';
import Chart from './Chart.react';
import {route} from '../routes';

class Tracking extends Component {

  static propTypes = {
    navigator: PropTypes.object,
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

  renderTabs() {
    return [
      {
        content: <Chart />,
        tab: <Tab label='Week' icon="md-view-week" />
      },
      {
        content: <Page>Month</Page>,
        tab: <Tab label='Month' icon="md-view-module" />
      },
      {
        content: <Page>Year</Page>,
        tab: <Tab label='Year' icon="md-calendar" />
      },
    ];
  }

  render() {

    return (
      <Page
        className="tracking"
        renderToolbar={this.renderToolbar}
      >
        <Tabbar
          initialIndex={0}
          renderTabs={this.renderTabs}
          position="bottom"
        />
      </Page>
    );
  }

}

Tracking = connect(state => ({
}))(Tracking);

export default Tracking;
