import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Page,
} from 'react-onsenui';
import Nominal from './Nominal.react';

export default class Optional extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {msg} = this.props;

    return (
      <Page
        className="optional"
      >
        <section>
          <h3>
            Weight
          </h3>
          <input type="number" />
        </section>

        <section>
          <h3>
            Blood Sugar
          </h3>
          <input type="number" />
        </section>

        <section>
          <h3>
            Blood Pressure
          </h3>
          <input type="number" />
        </section>
      </Page>
    );
  }

}
