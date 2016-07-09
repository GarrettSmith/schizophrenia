import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Fab,
  Icon,
  Page,
  List,
  ListItem,
} from 'react-onsenui';
import Nominal from './Nominal.react';

const SYMPTOMS = [
  'Angry',
  'Hearing Voices',
  'Suicidal Thoughts',
];

export default class Symptoms extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
  }

  renderRow(item) {
    return (
      <ListItem
        modifier="longdivider"
        key={item}
      >
        <div class="center">
          <h3>
            {item}
          </h3>
          <div>
            <Nominal

            />
          </div>
        </div>
      </ListItem>
    );
  }

  onClickAdd() {
    console.log('add');
  }

  render() {
    return (
      <Page
        className="symptoms"
      >
        <List
          dataSource={SYMPTOMS}
          renderRow={this.renderRow}
        />

        <Fab
          ripple
          onClick={this.onClickAdd}
          position="bottom right"
        >
          <Icon icon="md-plus" />
        </Fab>
      </Page>
    );
  }

}
