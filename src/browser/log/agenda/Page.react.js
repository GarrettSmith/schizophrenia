import './Page.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

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
} from '../../lib/icons';


import agendaSelector from '../../../common/logging/agenda/selector';
import {logging as loggingActions} from '../../../common/logging/actions';

import {route} from '../../routes';
import {
  isEmpty,
  map
} from 'ramda';
import moment from 'moment';

const DATE_FORMATS = {
  sameDay: '[Today], D MMMM',
  lastDay: '[Yesterday], D MMMM',
  lastWeek: 'dddd, D MMMM',
  sameElse: 'D MMMM, YYYY',
};

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
  }

  renderToolbar() {
    return <Header title="Logging" />;
  }

  renderEntry(entry) {
    const {
      editEntry,
      navigator,
    } = this.props;

    const subcontent = map(
      o => o.value ? (
        <p key={o.label}>
          {o.label}: {o.value}
          <Icon
            icon={PREVIOUS_ICON_MAP[o.value]}
          />
        </p>
      ) : null,
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
    );

    function onClick() {
      editEntry(entry.id);
      navigator.pushPage(route('logEntry'));
    }

    return (
      <Card
        key={entry.id}
        onClick={onClick}
        subcontent={subcontent}
      >
        <h4>
          {moment(entry.createdAt).calendar(null, DATE_FORMATS)}
        </h4>
      </Card>
    );
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
