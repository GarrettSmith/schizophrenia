import './Item.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Icon,
} from 'react-onsenui';
import Nominal from '../Nominal.react';

const CURRENT_ICON_MAP = {
  [0]: 'ion-ios-help-empty',
  [1]: 'ion-ios-thunderstorm-outline',
  [2]: 'ion-ios-rainy-outline',
  [3]: 'ion-ios-cloudy-outline',
  [4]: 'ion-ios-partlysunny-outline',
  [5]: 'ion-ios-sunny-outline',
};

const PREVIOUS_ICON_MAP = {
  [0]: 'ion-ios-help-empty',
  [1]: 'ion-ios-thunderstorm',
  [2]: 'ion-ios-rainy',
  [3]: 'ion-ios-cloudy',
  [4]: 'ion-ios-partlysunny',
  [5]: 'ion-ios-sunny',
}

export default class Item extends Component {

  static propTypes = {
    prop: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updateEntry: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(val) {
    this.props.updateEntry({[this.props.prop]: val});
  }

  render() {
    const {
      prop,
      title,
      value,
    } = this.props;

    return (
      <div className="overview-item">
        <div className="content">
          <Icon
            className="current-icon"
            icon={CURRENT_ICON_MAP[value]}
          />

          <div>
            <h3>
              {title}
            </h3>
            <Nominal
              onChange={this.onChange}
              value={value}
            />
          </div>
        </div>
        <div className="subcontent">
          <p>
            Last Entry:
            <Icon
              className="previous-icon"
              icon={PREVIOUS_ICON_MAP[3]}
            />
            3
          </p>
        </div>
      </div>
    );
  }

}
