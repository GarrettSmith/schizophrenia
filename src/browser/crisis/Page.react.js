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
import {openNavMap} from '../lib/googleMaps';

class CrisisHome extends Component {

  static propTypes = {
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.renderToolbar = this.renderToolbar.bind(this);
  }

  renderToolbar() {
    return  (
      <Header
        back
        modifier="tertiary"
        navigator={this.props.navigator}
        title="Crisis Resources"
      />
    );
  }

  render() {

    return (
      <Page
        className="crisis"
        renderToolbar={this.renderToolbar}
      >
        <h2>Phone Lines</h2>
        <ul>
          <li>
            <a href="tel:2047868686" >
              Klinic Crisis Line
            </a>
          </li>
          <li>
            <a href="tel:2049401781" >
              WRHA Mobile Crisis
            </a>
          </li>
          <li>
            <a href="tel:18774357170" >
              Manitoba Suicide Line
            </a>
          </li>
          <li>
            <a href="tel:2049429276" >
              Seneca Help Line (7pm - 11pm)
            </a>
          </li>
        </ul>

        <h3>
          Crisis Stabilization Unit (WRHA)
        </h3>
        <p>
          <a href="tel:2049403633">
            204-940-3633
          </a>
          <a
            onClick={() => openNavMap('755 Portage Avenue, Winnipeg')}
          >
            755 Portage Avenue
          </a>
        </p>

        <h3>
          Crisis Response Centre
        </h3>
        <p>
          <a href="tel:2049401781">
            204-940-1781
          </a>
          <a
          onClick={() => openNavMap('817 Bannatyne Avenue, Winnipeg')}
          >
            817 Bannatyne Avenue
          </a>
        </p>

        <h2>
          Go to your nearest hospital emergency or call
          <a href="tel:911">911</a>
        </h2>

      </Page>
    );
  }

}

CrisisHome = connect(state => ({
}))(CrisisHome);

export default CrisisHome;
