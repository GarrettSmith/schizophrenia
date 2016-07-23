import './Page.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Toolbar,
  ToolbarButton,
  Icon,
} from 'react-onsenui';


export default class TrackingToolbar extends Component {

  static propTypes = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
    } = this.props;

    return (
      <Toolbar inline>
        <div className="left">
          <ToolbarButton>
            <Icon icon="md-caret-left" />
          </ToolbarButton>
        </div>

        <div className="center">
          <select>
            <option>
              Week
            </option>
            <option>
              Month
            </option>
            <option>
              Year
            </option>
          </select>
        </div>

        <div className="right">
          <ToolbarButton>
            <Icon icon="md-caret-right" />
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  }

}
