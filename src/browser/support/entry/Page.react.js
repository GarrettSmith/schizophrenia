import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from '../../app/Header.react';
import {
  Col,
  Row,
  Page,
} from 'react-onsenui';

class SupportEntry extends Component {

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
        title="New Support Entry"
      />
    );
  }

  render() {
    const {msg} = this.props;

    return (
      <Page
        className="support-entry"
        renderToolbar={this.renderToolbar}
      >
        <Row>
          <label>Name</label>
          <input />
        </Row>

        <Row>
          <label>Address</label>
          <input />
        </Row>

        <Row>
          <label>Phone</label>
          <input type="tel"/>
        </Row>

        <Row>
          <label>Email</label>
          <input type="email"/>
        </Row>

      </Page>
    );
  }

}

SupportEntry = connect(state => ({
}))(SupportEntry);

export default SupportEntry;
