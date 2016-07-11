import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Fab from '../Fab.react';
import Empty from './Empty.react';
import Entry from './Entry.react';

import Header from '../../app/Header.react';
import {Page} from 'react-onsenui';

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

  renderEntries(entries) {
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
          this.renderEntries(entries)
        )}
        <Fab navigator={navigator}/>
      </Page>
    );
  }

}

export default connect(agendaSelector)(AgendaPage);
