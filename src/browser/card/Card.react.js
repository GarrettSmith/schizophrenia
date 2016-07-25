import './Card.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Ripple} from 'react-onsenui';

const RIPPLE_COLOR = 'rgba(40, 40, 40, 0.1)';

export default class Card extends Component {

  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    subcontent: PropTypes.node,
  };

  render() {
    const {
      children,
      onClick,
      subcontent,
    } = this.props;

    return (
      <div
        className="card"
        onClick={onClick}
      >
        {onClick ? <Ripple color={RIPPLE_COLOR}/> : null}

        <div className="content">
          {children}
        </div>

        {subcontent ? (
          <div className="subcontent">
            {subcontent}
          </div>
        ) : null}
      </div>
    );
  }

}
