import './Page.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from '../../app/Header.react';
import {
  Page,
  Tab,
  Tabbar,
} from 'react-onsenui';
import Overview from './overview/Page.react';
import Optional from './Optional.react';
import AssociationList from './AssociationList.react';

import {logging} from '../../../common/logging/actions';
import {associations} from '../../../common/logging/associations/actions';
import associationSelector from '../../../common/logging/associations/selector';
import entrySelector from '../../../common/logging/entry/selector';

class LogEntry extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    newEntry: PropTypes.object.isRequired,
    previousEntry: PropTypes.object.isRequired,
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
      navigator,
      newEntry,
      saveEntry,
    } = this.props;

    navigator.popPage()
      .then(() => saveEntry(newEntry.id));
  }

  renderTabs() {
    const {
      filterSymptom,
      filterSideEffect,
      newEntry,
      previousEntry,
      removeSelectedEntrySymptoms,
      removeSelectedEntrySideEffects,
      selectEntrySymptom,
      selectEntrySideEffect,
      sideEffect,
      symptom,
      updateEntry,
      setEntrySymptom,
      setEntrySideEffect,
    } = this.props;

    return [
      {
        content: (
          <Overview
            newEntry={newEntry}
            previousEntry={previousEntry}
            updateEntry={updateEntry}
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
            association={symptom}
            filterPlaceholder="Add a Symptom"
            onChangeFilter={filterSymptom}
            updateItem={setEntrySymptom}
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
            association={sideEffect}
            filterPlaceholder="Add a Side Effect"
            onChangeFilter={filterSideEffect}
            updateItem={setEntrySideEffect}
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
        className="log-entry"
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
    ...entrySelector(state),
    newEntry: state.logging.newEntry,
    enteredSymptom: state.logging.enteredSymptom,
    sideEffect: associationSelector('sideEffect', state),
    symptom: associationSelector('symptom', state),
  }),
  {
    ...associations,
    ...logging,
  }
)(LogEntry);
