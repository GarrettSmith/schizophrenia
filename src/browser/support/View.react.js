import './View.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

import Header from '../app/Header.react';
import {
  AlertDialog,
  Icon,
  List,
  ListItem,
} from 'react-onsenui';
import {isEmpty} from 'ramda';

import {openNavMap} from '../lib/googleMaps';

function getValue(prop, contact) {
  const p = contact[prop];
  const first = p && p[0];
  const val = first && first.value;
  return val;
}

export default class View extends Component {

  static propTypes = {
    contact: PropTypes.object,
    onCancel: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  renderRow(item) {
    return (
      <ListItem
        key={item.key}
        modifier="longdivider"
        onClick={item.onClick}
        tappable
      >
        <div className="left">
          <Icon
            icon={item.icon}
          />
        </div>

        <div className="center">
          {item.content}
        </div>
      </ListItem>
    )
  }

  render() {
    const {onCancel} = this.props;
    const contact = this.props.contact || {};

    const name = contact.displayName;
    const phone = getValue('phoneNumbers', contact);
    const email = getValue('emails', contact);
    const address = getValue('adresses', contact);
    const content = [
      {
        icon: 'md-phone',
        key: 'phone',
        content: phone,
        onClick: () => document.location = `tel:${phone}`,
      },

      {
        icon: 'md-email',
        key: 'email',
        content: email,
        onClick: () => document.location = `mailto:${email}`,
      },

      {
        icon: 'md-directions',
        key: 'address',
        content: address,
        onClick: () => openNavMap(address),
      },
    ].filter(x => x.content);

    return (
      <AlertDialog
        className="support-view"
        isOpen={!isEmpty(contact)}
        onCancel={onCancel}
      >
        <div className="alert-dialog-title">
          <h3>
            {name}
          </h3>
        </div>

        <List
          dataSource={content}
          renderRow={this.renderRow}
        />
      </AlertDialog>
    );
  }

}
