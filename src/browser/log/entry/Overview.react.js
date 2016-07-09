import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Page,
} from 'react-onsenui';
import Nominal from './Nominal.react';

export default class Overview extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {msg} = this.props;

    return (
      <Page
        className="overview"
      >
        <section>
          <h2>
            Physical
          </h2>
          <Nominal
            onChange={x => console.log(x)}
            value={1}
          />
        </section>

        <section>
          <h2>
            Mental
          </h2>
          <Nominal />
        </section>

        <section>
          <h2>
            Emotional
          </h2>
          <Nominal />
        </section>

      </Page>
    );
  }

}
