import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Input,
  Page,
} from 'react-onsenui';
import Nominal from './Nominal.react';

export default class Optional extends Component {

  static propTypes = {
    bloodPressureDiastolic: PropTypes.number.isRequired,
    bloodPressureSystolic: PropTypes.number.isRequired,
    bloodSugar: PropTypes.number,
    updateEntry: PropTypes.func.isRequired,
    weight: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.onChangeWeight = this.onChange.bind(this, 'weight');
    this.onChangeBloodSugar = this.onChange.bind(this, 'bloodSugar');
    this.onChangeBPSystolic = this.onChange.bind(this, 'bloodPressureSystolic');
    this.onChangeBPDiastolic = this.onChange.bind(this, 'bloodPressureDiastolic');
  }

  onChange(prop, event) {
    const val = event.target.valueAsNumber;
    this.props.updateEntry({[prop]: val});
  }

  render() {
    const {
      bloodPressureDiastolic,
      bloodPressureSystolic,
      bloodSugar,
      weight,
    } = this.props;

    return (
      <Page
        className="optional"
      >
        <p>
          <Input
            float
            onChange={this.onChangeWeight}
            placeholder="Weight (lbs)"
            type="number"
            value={weight}
          />
        </p>

        <p>
          <Input
            float
            placeholder="Blood Sugar (mmol/L)"
            type="number"
            onChange={this.onChangeBloodSugar}
            value={bloodSugar}
          />
        </p>

        <section>
          <h3>
            Blood Pressure
          </h3>
          <Input
            placeholder="Systolic"
            type="number"
            value={bloodPressureSystolic}
            onChange={this.onChangeBPSystolic}
          />
          /
          <Input
            placeholder="Diastolic"
            type="number"
            value={bloodPressureDiastolic}
            onChange={this.onChangeBPDiastolic}
          />
        </section>
      </Page>
    );
  }

}
