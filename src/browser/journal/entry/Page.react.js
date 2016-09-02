import './Page.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from '../../app/Header.react';
import {
  Page,
} from 'react-onsenui';
import {actions} from '../../../common/journal/actions';

class JournalEntry extends Component {

  static propTypes = {
    newContent: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
  }

  renderToolbar() {
    return  (
      <Header
        action={this.save}
        actionIcon="md-check"
        back
        modifier="tertiary"
        title="New Journal Entry"
      />
    );
  }

  save() {
    this.props.navigator.popPage().then(() => {
      this.props.saveJournalEntry();
    });
  }

  update(e) {
    this.props.updateJournalContent(e.target.value);
  }

  render() {
    const {newContent} = this.props;

    return (
      <Page
        className="journal-entry"
        renderToolbar={this.renderToolbar}
      >
        <textarea
          autofocus
          value={newContent}
          onChange={this.update}
        />
      </Page>
    );
  }

}

export default connect(state => state.journal, actions)(JournalEntry);
