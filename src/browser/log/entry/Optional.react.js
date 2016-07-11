import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Input,
  Page,
} from 'react-onsenui';
import Nominal from './Nominal.react';

export default class Optional extends Component {

  static propTypes = {
    updateEntry: PropTypes.func.isRequired,
    weight: PropTypes.number,
    bloodSugar: PropTypes.number,
    bloodPressure: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.onChangeWeight = this.onChange.bind(this, 'weight');
    this.onChangeBloodSugar = this.onChange.bind(this, 'bloodSugar');
    this.onChangeBPSystolic = this.onChangeBP.bind(this, 'systolic');
    this.onChangeBPDiastolic = this.onChangeBP.bind(this, 'diastolic');
  }

  onChange(prop, event) {
    const val = event.target.valueAsNumber;
    this.props.updateEntry({[prop]: val});
  }

  onChangeBP(prop, val) {

  }

  render() {
    const {
      //bloodPressure,
      bloodSugar,
      weight,
    } = this.props;

    const bloodPressure = {
      systolic: 0,
      diastolic: 0,
    };

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
            value={bloodPressure.systolic}
            onChange={this.onChangeBPSystolic}
          />
          /
          <Input
            placeholder="Diastolic"
            type="number"
            value={bloodPressure.diastolic}
            onChange={this.onChangeBPDisatolic}
          />
        </section>
      </Page>
    );
  }

}
