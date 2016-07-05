import './Page.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from '../../app/Header.react';
import {
  Page,
} from 'react-onsenui';

class JournalEntry extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderToolbar = this.renderToolbar.bind(this);
  }

  renderToolbar() {
    return  (
      <Header
        action={() => console.log('save')}
        actionIcon="md-check"
        back
        modifier="tertiary"
        navigator={this.props.navigator}
        title="New Journal Entry"
      />
    );
  }

  render() {
    const {msg} = this.props;

    return (
      <Page
        className="journal-entry"
        renderToolbar={this.renderToolbar}
      >
        <textarea autofocus/>
      </Page>
    );
  }

}

JournalEntry = connect(state => ({
}))(JournalEntry);

export default JournalEntry;
