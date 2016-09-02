import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import Header from '../app/Header.react';
import {
  Page,
} from 'react-onsenui';
import {route} from '../routes';
import {values} from 'ramda';
import * as dates from '../lib/dates';

export default class JournalView extends Component {

  static propTypes = {
    entry: PropTypes.object.isRequired,
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.renderToolbar = this.renderToolbar.bind(this);
  }

  renderToolbar() {
    const {entry} = this.props;
    return <Header
      back
      modifier="tertiary"
      title={dates.format(entry.createdAt)}
    />
  }

  render() {
    const {entry} = this.props;

    return (
      <Page
        className="journal-view"
        renderToolbar={this.renderToolbar}
      >
        <p>
          {entry.content}
        </p>
      </Page>
    );
  }

}
