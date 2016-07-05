import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from '../../app/Header.react';
import {
  Page,
} from 'react-onsenui';

class GoalEntry extends Component {

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
        title="New Goal Entry"
      />
    );
  }

  render() {
    const {msg} = this.props;

    return (
      <Page
        className="goal-entry"
        renderToolbar={this.renderToolbar}
      >
        <textarea />
        <ul>
          <li>
            <strong>S</strong>pecific
          </li>
          <li>
            <strong>M</strong>easurable
          </li>
          <li>
            <strong>A</strong>ttainable
          </li>
          <li>
            <strong>R</strong>elevant
          </li>
          <li>
            <strong>T</strong>imely
          </li>
        </ul>
      </Page>
    );
  }

}

GoalEntry = connect(state => ({
}))(GoalEntry);

export default GoalEntry;
