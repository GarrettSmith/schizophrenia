import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

import Fab from '../Fab.react';

import {Page} from 'react-onsenui';

export default class AllPage extends Component {

  static propTypes = {
    //actions: PropTypes.object.isRequired,
    //logging: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Page>
        All
      </Page>
    );
  }

}
