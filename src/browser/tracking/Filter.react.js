import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Input,
  List,
  ListHeader,
  ListItem,
} from 'react-onsenui';

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
            checked={dimension.enabled}
            onChange={this.onDimensionChange}
            type="checkbox"
            value={dimension.id}
          />
        </label>
        {dimension.name}
      </ListItem>
    )
  }

  render() {
    const {
      dimensions,
    } = this.props;

    return (
      <List
        className="tracking-filter"
        dataSource={dimensions}
        renderHeader={this.renderListHeader}
        renderRow={this.renderListRow}
      />
    )
  }
}

