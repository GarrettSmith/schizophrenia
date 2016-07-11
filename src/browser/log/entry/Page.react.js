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

import {logging} from '../../../common/logging/actions';
import loggingSelector  from '../../../common/logging/selector';

class LogEntry extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    newEntry: PropTypes.object.isRequired,
    updateEntry: PropTypes.func.isRequired,
    saveEntry: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.renderTabs = this.renderTabs.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
  }

  renderToolbar() {
    return  (
      <Header
        action={this.onSaveClick}
        actionIcon="md-check"
        back
        modifier="tertiary"
        title="New Log Entry"
      />
    );
  }

  onSaveClick() {
    const {
      saveEntry,
      navigator,
    } = this.props;

    saveEntry();
    navigator.popPage();
  }

  renderTabs() {
    const {
      addNewSymptom,
      addSymptom,
      enterSymptom,
      enteredSymptom,
      newEntrySymptoms,
      newEntry,
      suggestedSymptoms,
      updateEntry,
      updateEntrySymptom,
    } = this.props;

    return [
      {
        content: (
          <Overview
            updateEntry={updateEntry}
            emotional={newEntry.emotional}
            mental={newEntry.mental}
            physical={newEntry.physical}
          />
        ),
        key: 'overview',
        tab: (
          <Tab
            key="overview"
            label="Overview"
          />
        )
      },

      {
        content: (
          <Symptoms
            addNewSymptom={addNewSymptom}
            addSymptom={addSymptom}
            enterSymptom={enterSymptom}
            enteredSymptom={enteredSymptom}
            entrySymptoms={newEntrySymptoms}
            suggestedSymptoms={suggestedSymptoms}
            updateEntrySymptom={updateEntrySymptom}
          />
        ),
        key: 'symptoms',
        tab: (
          <Tab
            key="symptoms"
            label="Symptoms"
          />
        )
      },

      {
        content: <SideEffects updateEntry={updateEntry} {...newEntry} />,
        key: 'side-effects',
        tab: (
          <Tab
            key="side-effects"
            label="Side Effects"
          />
        )
      },

      {
        content: <Optional updateEntry={updateEntry} {...newEntry} />,
        key: 'optional',
        tab: (
          <Tab
            key="optional"
            label="Optional"
          />
        )
      },
    ];
  }

  render() {
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

export default connect(
  state => ({
    newEntry: state.logging.newEntry,
    enteredSymptom: state.logging.enteredSymptom,
    ...loggingSelector(state),
  }),
  logging
)(LogEntry);
