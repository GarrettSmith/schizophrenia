import './Page.scss';

import Component from 'react-pure-render/component';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';
import {FormattedHTMLMessage} from 'react-intl';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Header from '../app/Header.react';
import {
  Page,
  Button,
  SpeedDial,
  SpeedDialItem,
  Icon,
  Switch,
  Col,
  Row,
  Fab
} from 'react-onsenui';
import {route} from '../routes';

const ICON_SIZE = 36;

class Home extends Component {

  static propTypes = {
    msg: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.goTo = this.goTo.bind(this);
  }

  goTo(routeKey) {
    return () => this.props.navigator.resetPage(route(routeKey));
  }

  renderToolbar() {
    return <Header title="Home" />
  }

  render() {
    const {msg} = this.props;

    return (
      <Page
        className="home"
        renderToolbar={this.renderToolbar}
      >
        <div className="container">
          <Row>
            <Col>
              <Fab
                onClick={this.goTo('medication')}
              >
                <Icon
                  icon="md-hospital-alt"
                  size={ICON_SIZE}
                />
              </Fab>
              <p>
                Medication
              </p>
            </Col>

            <Col>
              <Fab
                onClick={this.goTo('journal')}
              >
                <Icon
                  icon="md-book"
                  size={ICON_SIZE}
                />
              </Fab>
              <p>
                Journal
              </p>
            </Col>

            <Col>
              <Fab
                onClick={this.goTo('map')}
              >
                <Icon
                  icon="md-pin"
                  size={ICON_SIZE}
                />
              </Fab>
              <p>
                Map
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <Fab
                onClick={this.goTo('goalEntry')}
              >
                <Icon
                  icon="md-flag"
                  size={ICON_SIZE}
                />
              </Fab>
              <p>
                Goals
              </p>
            </Col>

            <Col>
              <Fab
                onClick={this.goTo('logEntry')}
              >
                <Icon
                  icon="md-edit"
                  size={ICON_SIZE}
                />
              </Fab>
              <p>
                Check In
              </p>
            </Col>

            <Col>
              <Fab
                onClick={this.goTo('support')}
              >
                <Icon
                  icon="md-accounts"
                  size={ICON_SIZE}
                />
              </Fab>
              <p>
                Support
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <Fab
                onClick={this.goTo('reminder')}
              >
                  <Icon
                    icon="md-alarm"
                    size={ICON_SIZE}
                  />
              </Fab>
              <p>
                Reminder
              </p>
            </Col>

            <Col>
              <Fab
                onClick={this.goTo('crisis')}
              >
                <Icon
                  icon="md-alert-triangle"
                  size={ICON_SIZE}
                />
              </Fab>
              <p>
                Crisis
              </p>
            </Col>

            <Col>
              <Fab
                onClick={this.goTo('tracking')}
              >
                <Icon
                  icon="md-chart"
                  size={ICON_SIZE}
                />
              </Fab>
              <p>
                Tracking
              </p>
            </Col>
          </Row>
        </div>
      </Page>
    );
  }

}

Home = connect(state => ({
  msg: state.intl.msg.home
}))(Home);

export default Home;
