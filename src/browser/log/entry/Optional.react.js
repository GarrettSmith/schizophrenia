import './Optional.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Input,
  Page,
} from 'react-onsenui';
import Card from '../../card/Card.react';

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
        <div className="content">

          <Card
            subcontent={
              <div className="sub-input">
                <Input
                  float
                  onChange={this.onChangeWeight}
                  type="number"
                  value={weight}
                />
                <span className="unit">
                  lbs
                </span>
              </div>
            }
          >
            <h3>
              Weight
            </h3>
          </Card>

          <Card
            subcontent={
              <div className="sub-input">
                <Input
                  float
                  type="number"
                  onChange={this.onChangeBloodSugar}
                  value={bloodSugar}
                />
                <span className="unit">
                  mmol/L
                </span>
              </div>
            }
          >
            <h3>
              Blood Sugar
            </h3>
          </Card>

          <Card
            subcontent={
              <div className="sub-input">
                <Input
                  type="number"
                  value={bloodPressureSystolic}
                  onChange={this.onChangeBPSystolic}
                />
                <span className="bp-seperator">
                  /
                </span>
                <Input
                  type="number"
                  value={bloodPressureDiastolic}
                  onChange={this.onChangeBPDiastolic}
                />
                <span className="unit bp-unit">
                  mm&nbsp;Hg
                </span>
              </div>
            }
          >
            <h3>
              Blood Pressure
            </h3>
          </Card>

        </div>
      </Page>
    );
  }

}
