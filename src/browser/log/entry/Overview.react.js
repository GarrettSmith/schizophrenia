import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Page,
} from 'react-onsenui';
import Nominal from './Nominal.react';

export default class Overview extends Component {

  static propTypes = {
    emotional: PropTypes.number.isRequired,
    mental: PropTypes.number.isRequired,
    physical: PropTypes.number.isRequired,
    updateEntry: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onChangePhysical = this.onChange.bind(this, 'physical');
    this.onChangeMental = this.onChange.bind(this, 'mental');
    this.onChangeEmotional = this.onChange.bind(this, 'emotional');
  }

  onChange(prop, val) {
    this.props.updateEntry({[prop]: val});
  }

  render() {
    const {
      emotional,
      mental,
      physical,
    } = this.props;

    return (
      <Page
        className="overview"
      >
        <section>
          <h3>
            Physical
          </h3>
          <Nominal
            onChange={this.onChangePhysical}
            value={physical}
          />
        </section>

        <section>
          <h3>
            Mental
          </h3>
          <Nominal
            onChange={this.onChangeMental}
            value={mental}
          />
        </section>

        <section>
          <h3>
            Emotional
          </h3>
          <Nominal
            onChange={this.onChangeEmotional}
            value={emotional}
          />
        </section>

      </Page>
    );
  }

}
