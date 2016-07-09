import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from '../../app/Header.react';
import {
  Page,
  Tab,
  Tabbar,
} from 'react-onsenui';
import Overview from './Overview.react';
import Optional from './Optional.react';
import Symptoms from './Symptoms.react';
import SideEffects from './SideEffects.react';

class LogEntry extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
  }

  renderToolbar() {
    return  (
      <Header
        action={() => console.log('save')}
        actionIcon="md-check"
        back
        modifier="tertiary"
        navigator={this.props.navigator}
        title="New Log Entry"
      />
    );
  }

  renderTabs() {
    return [
      {
        content: <Overview />,
        tab: (
          <Tab
            label="Overview"
          />
        )
      },

      {
        content: <Symptoms />,
        tab: (
          <Tab
            label="Symptoms"
          />
        )
      },

      {
        content: <SideEffects />,
        tab: (
          <Tab
            label="Side Effects"
          />
        )
      },

      {
        content: <Optional />,
        tab: (
          <Tab
            label="Optional"
          />
        )
      },
    ];
  }

  render() {
    const {msg} = this.props;

    return (
      <Page
        className="goal-entry"
        renderToolbar={this.renderToolbar}
      >
        <Tabbar
          initialIndex={0}
          renderTabs={this.renderTabs}
        />
      </Page>
    );
  }

}

LogEntry = connect(state => ({
}))(LogEntry);

export default LogEntry;
