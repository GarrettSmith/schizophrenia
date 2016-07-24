import './Page.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Toolbar,
  ToolbarButton,
  Icon,
} from 'react-onsenui';
import {
  map,
  values,
} from 'ramda';
import moment from 'moment';

import {TIME_SCALES} from '../../common/tracking/constants';

export default class TrackingToolbar extends Component {

  static propTypes = {
    nextTimeInterval: PropTypes.func.isRequired,
    previousTimeInterval: PropTypes.func.isRequired,
    setTimeScale: PropTypes.func.isRequired,
    interval: PropTypes.object.isRequired,
    timeScale: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.changeScale = this.changeScale.bind(this);
  }

  changeScale(e) {
    const {setTimeScale} = this.props;
    const scale = e.target.value;
    setTimeScale(scale);
  }

  renderTime(timeScale, interval) {
    const start = moment(interval.start);
    const end = moment(interval.end);
    return {
      [TIME_SCALES.WEEK]:
        () => `${start.format('MMMM Do')} - ${end.format('Do')}`,

      [TIME_SCALES.MONTH]:
        () => start.format('MMMM YYYY'),

      [TIME_SCALES.YEAR]:
        () => start.format('YYYY'),
    }[timeScale]();
  }

  render() {
    const {
      nextTimeInterval,
      previousTimeInterval,
      setTimeScale,
      interval,
      timeScale,
    } = this.props;

    return (
      <Toolbar inline>
        <div className="left">
          <ToolbarButton
            onClick={previousTimeInterval}
          >
            <Icon icon="md-caret-left" />
          </ToolbarButton>
        </div>

        <div className="center">
          <select
            onChange={this.changeScale}
          >
            {map(
              scale => (
                <option
                  key={scale}
                  value={scale}
                >
                  {scale}
                </option>
              ),
              values(TIME_SCALES)
            )}
          </select>
          {this.renderTime(timeScale, interval)}
        </div>

        <div className="right">
          <ToolbarButton
            onClick={nextTimeInterval}
          >
            <Icon icon="md-caret-right" />
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  }

}
