import './Page.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Header from '../app/Header.react';
import {
  AlertDialog,
  Fab,
  Icon,
  List,
  ListItem,
  Page,
} from 'react-onsenui';
import View from './View.react';

import {route} from '../routes';
import * as Contacts from '../lib/contacts';
import {actions} from '../../common/support/actions';

class SupportHome extends Component {

  static propTypes = {
    addContact: PropTypes.func.isRequired,
    contacts: PropTypes.array.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.newEntry = this.newEntry.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.renderFab = this.renderFab.bind(this);
    this.renderEntry = this.renderEntry.bind(this);
  }

  state = {
    current: null,
  };

  renderToolbar() {
    const {
      navigator,
    } = this.props
    return (
      <Header
        action={() => navigator.pushPage(route('crisis'))}
        actionIcon="md-alert-triangle"
        title="Support"
      />
    );
  }

  renderEntry(contact) {
    const name = contact.displayName;
    return (
      <ListItem
        tappable
        key={contact.id}
        modifier="longdivider"
        onClick={() => this.setState({current: contact})}
      >
        <div className="center">
          <h4>
            {name}
          </h4>
        </div>
      </ListItem>
    );
  }

  renderModal() {
    const {current} = this.state;
    return (
      <View
        contact={current}
        onCancel={() => this.setState({current: null})}
      />
    );
  }

  renderFab() {
    return (
      <Fab
        onClick={this.newEntry}
        position="bottom right"
      >
        <Icon icon="md-plus" />
      </Fab>
    );
  }

  newEntry() {
    const {addContact} = this.props;
    Contacts.select().then(addContact);
  }

  render() {
    const {contacts} = this.props;
    return (
      <Page
        className="support"
        renderFixed={this.renderFab}
        renderToolbar={this.renderToolbar}
      >
        <List
          dataSource={contacts}
          renderRow={this.renderEntry}
        />
        {this.renderModal()}

      </Page>
    );
  }

}

SupportHome = connect(state => state.support, actions)(SupportHome);

export default SupportHome;
