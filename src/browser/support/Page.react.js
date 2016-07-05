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
  {
    key: 1,
    name: 'John Doe',
    phone: '555 555-5555',
    email: 'j.doe@example.com',
    address: '123 Fake St.',
  },
  {
    key: 2,
    name: 'Jane Doe',
    phone: '555 555-5555',
    email: 'jane.doe@example.com',
    address: '123 Fake St.',
  },
];

class SupportHome extends Component {

  static propTypes = {
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.newEntry = this.newEntry.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
  }

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

  renderEntry(entry) {
    return (
      <ListItem tappable modifier="longdivider">
        <div className="center">
          <h3>
            {entry.name}
          </h3>
          <table>
            <tbody>
              <tr>
                <td>Phone</td>
                <td>
                <a href={`tel:${entry.phone}`}>
                  {entry.phone}
                </a>
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <a href={`mailto:${entry.email}`} >
                    {entry.email}
                  </a>
                </td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{entry.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ListItem>
    );
  }

  newEntry() {
    this.props.navigator.pushPage(route('supportEntry'));
  }

  render() {

    return (
      <Page
        className="support"
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

SupportHome = connect(state => ({
}))(SupportHome);

export default SupportHome;
