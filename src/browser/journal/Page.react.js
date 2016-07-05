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

const ENTRIES = [
  '05/01/2016',
  '04/18/2016',
  '04/19/2016',
  '03/22/2016',
];

class JournalHome extends Component {

  static propTypes = {
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.newEntry = this.newEntry.bind(this);
  }

  renderToolbar() {
    return <Header title="Journal" />
  }

  renderEntry(entry) {
    return (
      <ListItem tappable modifier="longdivider">
        {entry}
      </ListItem>
    );
  }

  newEntry() {
    this.props.navigator.pushPage(route('journalEntry'));
  }

  render() {

    return (
      <Page
        className="journal"
        renderToolbar={this.renderToolbar}
      >
        <List
          dataSource={ENTRIES}
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

JournalHome = connect(state => ({
}))(JournalHome);

export default JournalHome;
