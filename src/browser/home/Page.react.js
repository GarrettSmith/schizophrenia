import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import {FormattedHTMLMessage} from 'react-intl';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {
  Page,
  Button,
  SpeedDial,
  SpeedDialItem,
  Fab
} from 'react-onsenui';

class Home extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired
  };

  render() {
    const {msg} = this.props;

    return (
      <Page>
        <Button ripple>Test</Button>
        <SpeedDial position='bottom right'>
          <Fab>A</Fab>
          <SpeedDialItem>B</SpeedDialItem>
          <SpeedDialItem>C</SpeedDialItem>
        </SpeedDial>
      </Page>
    );
  }

}

Home = connect(state => ({
  msg: state.intl.msg.home
}))(Home);

export default Home;
