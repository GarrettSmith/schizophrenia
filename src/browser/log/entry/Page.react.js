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
import AssociationList from './AssociationList.react';

import {logging} from '../../../common/logging/actions';
import {associations} from '../../../common/logging/associations/actions';
import associationSelector from '../../../common/logging/associations/selector';

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
      addNewSideEffect,
      addSymptom,
      addSideEffect,
      filterSymptom,
      filterSideEffect,
      newEntry,
      removeSelectedEntrySymptoms,
      removeSelectedEntrySideEffects,
      selectEntrySymptom,
      selectEntrySideEffect,
      sideEffect,
      symptom,
      updateEntry,
      updateEntrySymptom,
      updateEntrySideEffect,
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
          <AssociationList
            add={addSymptom}
            association={symptom}
            filterPlaceholder="Add a Symptom"
            onChangeFilter={filterSymptom}
            updateItem={updateEntrySymptom}
            select={selectEntrySymptom}
            removeSelected={removeSelectedEntrySymptoms}
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
        content: (
          <AssociationList
            add={addSideEffect}
            association={sideEffect}
            filterPlaceholder="Add a Side Effect"
            onChangeFilter={filterSideEffect}
            updateItem={updateEntrySideEffect}
            select={selectEntrySideEffect}
            removeSelected={removeSelectedEntrySideEffects}
          />
        ),
        key: 'sideEffects',
        tab: (
          <Tab
            key="sideEffects"
            label="SideEffects"
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
    newEntry: state.logging.newEntry,
    enteredSymptom: state.logging.enteredSymptom,
    sideEffect: associationSelector(state.sideEffect),
    symptom: associationSelector(state.symptom),
  }),
  {
    ...associations,
    ...logging,
  }
)(LogEntry);
