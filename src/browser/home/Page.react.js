import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import {FormattedHTMLMessage} from 'react-intl';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import 'onsenui';
import {
  Button,
  Page,
  SpeedDial,
  Fab,
  SpeedDialItem,
  Icon
} from 'react-onsenui';

class HomePage extends Component {

  static propTypes = {
    //msg: PropTypes.object.isRequired
  };

  render() {
    const {msg} = this.props;

    return (
      <Page>
        <Helmet title={msg.title} />

        <SpeedDial position='bottom right'>
          <Fab>
            <Icon icon='md-add' />
          </Fab>
          <SpeedDialItem>
            <Icon icon='md-add' />
          </SpeedDialItem>
          <SpeedDialItem>
            <Icon icon='md-add' />
          </SpeedDialItem>
        </SpeedDial>

        <Button>Button</Button>

      </Page>
    );
  }

}

HomePage = connect(state => ({
  msg: state.intl.msg.home
}))(HomePage);

export default HomePage;
