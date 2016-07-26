import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Input,
  List,
  ListHeader,
  ListItem,
} from 'react-onsenui';
import Helmet from 'react-helmet';
import {map} from 'ramda';

export default class Filter extends Component {

  static propTypes = {
    dimensions: PropTypes.array.isRequired,
    toggleDimension: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onDimensionChange = this.onDimensionChange.bind(this);
    this.renderListRow = this.renderListRow.bind(this);
  }

  renderListHeader() {
    return (
      <ListHeader>
        Filter
      </ListHeader>
    )
  }

  onDimensionChange(e) {
    const {toggleDimension} = this.props;
    const id = e.target.value;
    const checked = e.target.checked;
    toggleDimension(id, checked);
  }

  renderListRow(dimension) {
    return (
      <ListItem key={dimension.name}>
        <label className="left">
          <Input
            className={dimension.name}
            checked={dimension.enabled}
            onChange={this.onDimensionChange}
            type="checkbox"
            value={dimension.id}
          />
        </label>
        <label>
          {dimension.name}
        </label>
      </ListItem>
    )
  }

  render() {
    const {
      dimensions,
    } = this.props;

    const checkboxStyles = map(
      d => {
        const selector = `.${d.name} .checkbox__input:checked`;
        return {
          cssText:
            `
            ${selector},
            ${selector} + .checkbox__checkmark:before {
            background-color: ${d.color};
            }
            `
        };
      },
      dimensions
    );

    return (
      <div className="tracking-filter">
        <Helmet style={checkboxStyles} />
        <List
          dataSource={dimensions}
          renderHeader={this.renderListHeader}
          renderRow={this.renderListRow}
        />
      </div>
    )
  }
}

