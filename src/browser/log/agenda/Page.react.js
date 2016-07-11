import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Fab from '../Fab.react';
import Empty from './Empty.react';
import Entry from './Entry.react';

import Header from '../../app/Header.react';
import {
  Icon,
  List,
  ListItem,
  Page,
} from 'react-onsenui';

import agendaSelector from '../../../common/logging/agenda/selector';

import {
  isEmpty,
  map
} from 'ramda';

class AgendaPage extends Component {

  static propTypes = {
    entries: PropTypes.array.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  renderToolbar() {
    return <Header title="Agenda"/>;
  }

  renderEntry(entry) {
    const entryTime = new Date(entry.createdAt);
    const entryName = entryTime.toLocaleString();
    return (
      <ListItem
        key={entry.id}
        tappable
      >
        <div className="left">
          <Icon icon="md-calendar" />
        </div>
        {entryName}
      </ListItem>
    );
    return map(
      entry => <Entry entry={entry} key={entry.id} />,
        entries
    );
  }

  render() {
    const {
      entries,
      navigator,
    } = this.props;

    return (
      <Page
        className="agenda"
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
        <Fab navigator={navigator}/>
      </Page>
    );
  }

}

export default connect(agendaSelector)(AgendaPage);
