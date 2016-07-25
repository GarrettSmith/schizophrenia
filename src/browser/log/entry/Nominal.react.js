import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import Rating from 'react-rating';

export default class Nominal extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.number,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      onChange,
      value,
    } = this.props;
    return (
      <Rating
        initialRate={value}
        onChange={onChange}
        starCount={5}
        start={0}
        step={1}
        stop={5}
      />
    );
  }

}
