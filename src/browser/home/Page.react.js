import './Page.scss';

import Component from 'react-pure-render/component';
import Helmet from 'react-helmet'
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import Header from '../app/Header.react';
import {
  Page,
} from 'react-onsenui';
import Fab from '../log/Fab.react';

import {logging as loggingActions} from '../../common/logging/actions';

import randomColor from 'randomcolor';

class Home extends Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    resetEntry: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  renderToolbar() {
    return <Header title="Home" />
  }

  render() {
    const {
      navigator,
      resetEntry,
    } = this.props;
    const cssText = `.home .page__background {
      background-color: ${randomColor()};
    }`;

    return (
      <Page
        className="home"
        renderToolbar={this.renderToolbar}
      >
        <Helmet style={[{cssText}]} />
        <Fab
          navigator={navigator}
          resetEntry={resetEntry}
        />
      </Page>
    );
  }

}

export default connect(
  state => ({}),
  loggingActions
)(Home);
