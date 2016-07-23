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
  };

  constructor(props) {
    super(props);
  }

  renderListHeader() {
    return (
      <ListHeader>
        Filter
      </ListHeader>
    )
  }

  renderListRow(dimension) {
    return (
      <ListItem key={dimension.name}>
        <label className="left">
          <Input
            checked
            type="checkbox"
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

