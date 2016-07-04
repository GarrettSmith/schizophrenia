import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Page} from 'react-onsenui';

class NotFound extends Component {

  static propTypes = {
    msg: PropTypes.object,
  };

  render() {
    const {msg} = this.props;

    return (
      <Page className="notfound-page">
        <Helmet title={msg.title} />
        <h1>{msg.header}</h1>
        <p>{msg.message}</p>
      </Page>
    );
  }

}

export default connect(state => ({
  msg: state.intl.msg.notFound
}))(NotFound);
