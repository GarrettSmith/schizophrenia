import './Page.scss';

import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {
  Button,
  Icon,
  List,
  ListItem,
  Popover,
  Toolbar,
  ToolbarButton,
} from 'react-onsenui';
import {
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

  state = {
    intervalsOpen: false,
  }

  constructor(props) {
    super(props);
    this.changeScale = this.changeScale.bind(this);
    this.toggleIntervals = this.toggleIntervals.bind(this);
    this.renderPopoverItem = this.renderPopoverItem.bind(this);
  }

  changeScale(scale) {
    const {setTimeScale} = this.props;
    this.toggleIntervals(false);
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

  toggleIntervals(open) {
    const intervalsOpen =
      open != undefined ? open : !this.state.intervalsOpen;
    this.setState({intervalsOpen})
  }

  renderPopoverItem(item) {
    return (
      <ListItem
        key={item}
        modifier="longdivider"
        onClick={() => this.changeScale(item)}
        tappable
        value={item}
      >
        {item}
      </ListItem>
    )
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

          <ToolbarButton
            modifier="large-center"
            onClick={() => this.toggleIntervals()}
            ref="interval_button"
          >
            {this.renderTime(timeScale, interval)}
          </ToolbarButton>

          <Popover
            isCancelable
            isOpen={this.state.intervalsOpen}
            onCancel={() => this.toggleIntervals(false)}
            getTarget={() => this.refs.interval_button}
          >
            <List
              dataSource={values(TIME_SCALES)}
              renderRow={this.renderPopoverItem}
            />
          </Popover>

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
