import './Page.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from '../app/Header.react';
import {
  Icon,
  Page,
} from 'react-onsenui';
import Card from '../card/Card.react';
import {route} from '../routes';
import {openNavMap} from '../lib/googleMaps';

class CrisisHome extends Component {

  static propTypes = {
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.renderToolbar = this.renderToolbar.bind(this);
    this.openSupport = this.openSupport.bind(this);
  }

  renderToolbar() {
    return  (
      <Header
        back
        modifier="secondary"
        title="Crisis Resources"
      />
    );
  }

  openSupport() {
    this.props.navigator.pushPage(route('support'));
  }

  render() {

    return (
      <Page
        className="crisis"
        renderToolbar={this.renderToolbar}
      >

        <Card
          onClick={this.openSupport}
          tappable
        >
          <h4>
            Contact your support network
          </h4>

          <Icon
            className="main-icon"
            icon="md-accounts"
          />
        </Card>

        <Card
          subcontent={
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
          }
        >
          <h4>
            Phone Lines
          </h4>
        </Card>

        <Card
          subcontent={
            <ul>
              <li>
                <a
                  onClick={() => openNavMap('755 Portage Avenue, Winnipeg')}
                >
                  755 Portage Avenue
                </a>
              </li>

              <li>
                <a href="tel:2049403633">
                  204-940-3633
                </a>
              </li>
            </ul>
          }
        >
          <h4>
            Crisis Stabilization Unit (WRHA)
          </h4>
        </Card>

        <Card
          subcontent={
            <ul>
              <li>
                <a
                  onClick={() => openNavMap('817 Bannatyne Avenue, Winnipeg')}
                >
                  817 Bannatyne Avenue
                </a>
              </li>
              <li>
                <a href="tel:2049401781">
                  204-940-1781
                </a>
              </li>
            </ul>
          }
        >
          <h4>
            Crisis Response Centre
          </h4>
        </Card>

        <Card
          subcontent={
            <ul>
              <li>
                <a href="tel:911">
                  911
                </a>
              </li>
            </ul>
          }
        >
          <h4>
            Go to Your Nearest Hospital Emergency
          </h4>
        </Card>

      </Page>
    );
  }

}

CrisisHome = connect(state => ({
}))(CrisisHome);

export default CrisisHome;
