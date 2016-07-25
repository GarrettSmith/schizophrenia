import './Item.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Icon,
} from 'react-onsenui';
import Card from '../../../card/Card.react';
import Nominal from '../Nominal.react';
import {
  CURRENT_ICON_MAP,
  PREVIOUS_ICON_MAP,
} from '../../../lib/icons';

export default class Item extends Component {

  static propTypes = {
    prop: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updateEntry: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired,
    previousValue: PropTypes.number.isRequired,
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
      previousValue,
      title,
      value,
    } = this.props;

    const subcontent = previousValue ? (
      <p>
        Last Entry: {previousValue}
        <Icon
          className="previous-icon"
          icon={PREVIOUS_ICON_MAP[previousValue]}
        />
      </p>
    ) : null;

    return (
      <Card
        subcontent={subcontent}
      >
        <Icon
          className="primary-icon"
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
      </Card>
    );
  }

}
