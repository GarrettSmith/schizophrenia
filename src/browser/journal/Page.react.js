import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from '../app/Header.react';
import {
  Fab,
  Icon,
  List,
  ListItem,
  Page,
} from 'react-onsenui';
import {route} from '../routes';
import {values} from 'ramda';
import * as dates from '../lib/dates';

class JournalHome extends Component {

  static propTypes = {
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.newEntry = this.newEntry.bind(this);
    this.viewEntry = this.viewEntry.bind(this);
    this.renderEntry = this.renderEntry.bind(this);
  }

  renderToolbar() {
    return <Header title="Journal" />
  }

  renderEntry(entry) {
    return (
      <ListItem
        tappable
        modifier="longdivider"
        key={entry.id}
        onClick={() => this.viewEntry(entry)}
      >
        {dates.format(entry.createdAt)}
      </ListItem>
    );
  }

  newEntry() {
    this.props.navigator.pushPage(route('journalEntry'));
  }

  viewEntry(entry) {
    this.props.navigator.pushPage(route('journalView', {entry}));
  }

  render() {
    const {entries} = this.props;

    return (
      <Page
        className="journal"
        renderToolbar={this.renderToolbar}
      >
        <List
          dataSource={values(entries)}
          renderRow={this.renderEntry}
        />
        <Fab
          onClick={this.newEntry}
          position="bottom right"
        >
          <Icon icon="md-plus" />
        </Fab>

      </Page>
    );
  }

}

export default connect(
  state => state.journal
)(JournalHome);
