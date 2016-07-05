import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

import Fab from '../Fab.react';
import Empty from './Empty.react';
import Entry from './Entry.react';

import Header from '../../app/Header.react';
import {Page} from 'react-onsenui';

import {
  isEmpty,
  map
} from 'ramda';

export default class AgendaPage extends Component {

  static propTypes = {
    //actions: PropTypes.object.isRequired,
    //logging: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  renderToolbar() {
    return <Header title="Agenda"/>;
  }

  render() {
    const {
      navigator,
    } = this.props;
    const entries = [];

    return (
      <Page
        className="agenda"
        renderToolbar={this.renderToolbar}
      >
        {isEmpty(entries) ? <Empty /> : this.renderEntries(entries)}
        <Fab navigator={navigator}/>
      </Page>
    );
  }

  renderEntries(entries) {
    return map(
      entry => <Entry entry={entry} key={entry.id} />,
      entries
    );
  }

}
