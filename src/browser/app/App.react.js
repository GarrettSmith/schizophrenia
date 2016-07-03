import './App.scss';
import Component from 'react-pure-render/component';
import Footer from './Footer.react';
import Header from './Header.react';
import Helmet from 'react-helmet';
import React, {PropTypes} from 'react';

export default class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    //msg: PropTypes.object.isRequired,
    //users: PropTypes.object.isRequired,
  };

  render() {
    const {children, location} = this.props;

    return (
      // Pass data-pathname to allow route specific styling.
      <div className="page" data-pathname={location.pathname}>
        <Helmet
          meta={[{
            name: 'description',
            content: '',
          }]}
          style={require('onsenui/css/onsenui.css')}
          titleTemplate="%s"
        />
        <Header
          // TODO: Use Redux router, then connect location.
          pathname={location.pathname}
        />
        {children}
        <Footer />
      </div>
    );
  }

}
