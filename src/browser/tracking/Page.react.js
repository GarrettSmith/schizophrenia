import './Page.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {
  Page,
  Tab,
  Tabbar,
} from 'react-onsenui';
import Header from '../app/Header.react';
import Toolbar from './Toolbar.react';
import Category from './Category.react';

import trackingSelector from '../../common/tracking/selector';
import {tracking as trackingActions} from '../../common/tracking/actions';

class Tracking extends Component {

  static propTypes = {
    crisisResolved: PropTypes.array.isRequired,
    crisisUnresolved: PropTypes.array.isRequired,
    dimensions: PropTypes.object.isRequired,
    domain: PropTypes.object.isRequired,
    interval: PropTypes.object.isRequired,
    nextTimeInterval: PropTypes.func.isRequired,
    previousTimeInterval: PropTypes.func.isRequired,
    setTimeScale: PropTypes.func.isRequired,
    timeScale: PropTypes.string.isRequired,
    toggleDimension: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderTabs = this.renderTabs.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
  }

  renderTabs() {
    const {
      dimensions,
    } = this.props;

    return [
      {
        content: (
          <Category
            {...this.props}
            dimensions={dimensions.overview}
            key="overview"
          />
        ),
        tab: (
          <Tab
            label="Overview"
            key="overview"
          />
        ),
      },

      {
        content: (
          <Category
            {...this.props}
            dimensions={dimensions.symptom}
            key="symptom"
          />
        ),
        tab: (
          <Tab
            label="Symptoms"
            key="symptom"
          />
        ),
      },

      {
        content: (
          <Category
            {...this.props}
            dimensions={dimensions.sideEffect}
            key="side-effect"
          />
        ),
        tab: (
          <Tab
            label="Side Effects"
            key="side-effect"
          />
        ),
      },

      {
        content: (
          <Category
            {...this.props}
            dimensions={dimensions.optional}
            domain={{x: this.props.domain.x}}
            key="optional"
          />
        ),
        tab: (
          <Tab
            label="Optional"
            key="optional"
          />
        ),
      },
    ];
  }


  renderToolbar() {
    const {
      dimensions,
      domain,
      interval,
      nextTimeInterval,
      previousTimeInterval,
      setTimeScale,
      timeScale,
      toggleDimension,
    } = this.props;

    return (
      <Header
        title="Tracking"
        subheader={
          <Toolbar
            nextTimeInterval={nextTimeInterval}
            previousTimeInterval={previousTimeInterval}
            setTimeScale={setTimeScale}
            interval={interval}
            timeScale={timeScale}
          />
        }
      />
    );
  }

  render() {
    return (
      <Page
        className="tracking"
        renderToolbar={this.renderToolbar}
      >

        <Tabbar
          animation="slide"
          initialIndex={0}
          renderTabs={this.renderTabs}
        />
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
