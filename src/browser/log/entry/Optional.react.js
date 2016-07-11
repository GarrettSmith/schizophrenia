import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Input,
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
          <Input
            float
            placeholder="Weight (lbs)"
            type="number"
          />
        </section>

        <section>
          <Input
            float
            placeholder="Blood Sugar (mmol/L)"
            type="number"
          />
        </section>

        <section>
          <h3>
            Blood Pressure
          </h3>
          <Input
            placeholder="Systolic"
            type="number"
          />
          /
          <Input
            placeholder="Diastolic"
            type="number"
          />
        </section>
      </Page>
    );
  }

}
