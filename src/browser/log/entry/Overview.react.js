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
    return (
      <Page
        className="overview"
      >
        <section>
          <h3>
            Physical
          </h3>
          <Nominal
            onChange={x => console.log(x)}
            value={1}
          />
        </section>

        <section>
          <h3>
            Mental
          </h3>
          <Nominal
            onChange={x => console.log(x)}
            value={1}
          />
        </section>

        <section>
          <h3>
            Emotional
          </h3>
          <Nominal
            onChange={x => console.log(x)}
            value={1}
          />
        </section>

      </Page>
    );
  }

}
