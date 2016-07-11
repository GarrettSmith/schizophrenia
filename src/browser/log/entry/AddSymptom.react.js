import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Icon,
  Input,
  Page,
  List,
  ListHeader,
  ListItem,
} from 'react-onsenui';
import Header from '../../app/Header.react';
import Nominal from './Nominal.react';

const SYMPTOMS = [
  'Angry',
  'Hearing Voices',
  'Suicidal Thoughts',
];

export default class AddSymptom extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderHeader = this.renderHeader.bind(this)
  }

  renderToolbar() {
    return  (
      <Header
        action={() => console.log('save')}
        actionIcon="md-check"
        back
        modifier="tertiary"
        title="Add Symptoms"
      />
    );
  }

  renderRow(item) {
    const inputId = `input-${item}`;
    return (
      <ListItem
        key={item}
        tappable
      >
        <label className="left">
          <Input
            inputId={inputId}
            type="checkbox"
          />
        </label>
        <label
          className="center"
          htmlFor={inputId}
        >
          {item}
        </label>
      </ListItem>
    );
  }

  renderHeader() {
    return (
      <ListHeader>
        <Input />
      </ListHeader>
    );
  }

  render() {
    return (
      <Page
        className="symptoms"
        renderToolbar={this.renderToolbar}
      >
        <List
          dataSource={SYMPTOMS}
          renderHeader={this.renderHeader}
          renderRow={this.renderRow}
        />

      </Page>
    );
  }

}
