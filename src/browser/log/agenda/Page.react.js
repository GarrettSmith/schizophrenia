import './Page.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';

import Fab from '../Fab.react';
import Empty from './Empty.react';
import Card from '../../card/Card.react';
import Header from '../../app/Header.react';
import {
  Icon,
  List,
  ListItem,
  Page,
} from 'react-onsenui';

import {
  CURRENT_ICON_MAP,
  PREVIOUS_ICON_MAP,
  CRISIS_ICON_MAP,
} from '../../lib/icons';
import * as dates from '../../lib/dates';
import {isNil} from 'ramda';

import agendaSelector from '../../../common/logging/agenda/selector';
import {logging as loggingActions} from '../../../common/logging/actions';

import {route} from '../../routes';
import {
  filter,
  isEmpty,
  map,
  prop,
} from 'ramda';

class AgendaPage extends Component {

  static propTypes = {
    editEntry: PropTypes.func.isRequired,
    entries: PropTypes.array.isRequired,
    navigator: PropTypes.object.isRequired,
    resetEntry: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderEntry = this.renderEntry.bind(this);
    this.logEntryContent = this.logEntryContent.bind(this);
    this.journalEntryContent = this.journalEntryContent.bind(this);
  }

  renderToolbar() {
    return <Header title="Logging" />;
  }

  renderEntry(entry) {
    const content = {
      log: this.logEntryContent,
      journal: this.journalEntryContent,
    }[entry.type](entry);

    return (
      <Card
        key={entry.id}
        onClick={content.onClick}
        subcontent={content.subcontent}
      >
        <h4>
          {dates.format(entry.createdAt)}
        </h4>

        {content.icon ? (
          <Icon
            className={`main-icon ${content.icon.className}`}
            icon={content.icon.name}
          />
        ) : null}

      </Card>
    );
  }

  logEntryContent(entry) {
    const {
      editEntry,
      navigator,
    } = this.props;

    const subcontent = map(
      o => (
        <p key={o.label}>
          {o.label}: {o.value}
          <Icon
            icon={PREVIOUS_ICON_MAP[o.value]}
          />
        </p>
      ),
      filter(
        prop('value'),
        [
          {
            label: 'Physical',
            value: entry.physical,
          },
          {
            label: 'Mental',
            value: entry.mental,
          },
          {
            label: 'Emotional',
            value: entry.emotional,
          },
        ]
      )
    );

    function onClick() {
      editEntry(entry.id);
      navigator.pushPage(route('logEntry'));
    }

    const icon = !isNil(entry.crisisResolved) ? ({
      className: classnames({
        'crisis-icon': true,
        'resolved': entry.crisisResolved,
      }),
      name: CRISIS_ICON_MAP[entry.crisisResolved],
    }) : null;

    return {
      icon,
      onClick,
      subcontent,
    };
  }

  journalEntryContent(entry) {
    const {
      navigator,
    } = this.props;

    const icon = {
      name: 'md-book',
    };

    function onClick() {
      navigator.pushPage(route('journalView', {entry}));
    }

    return {
      icon,
      onClick,
    };

  }

  render() {
    const {
      entries,
      navigator,
      resetEntry,
    } = this.props;

    return (
      <Page
        className="logging"
        renderToolbar={this.renderToolbar}
      >
        {isEmpty(entries) ? (
          <Empty />
        ) : (
          <List
            renderRow={this.renderEntry}
            dataSource={entries}
          />
        )}
        <Fab
          navigator={navigator}
          resetEntry={resetEntry}
        />
      </Page>
    );
  }

}

export default connect(
  agendaSelector,
  loggingActions
)(AgendaPage);
