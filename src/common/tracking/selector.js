import {createSelector} from 'reselect';
import {
  evolve,
  filter,
  map,
  pick,
  pipe,
  prop,
  values,
} from 'ramda';
import moment from 'moment';

const entriesSelector = state => values(state.logging.entries);
const dimensionsSelector = state => values(state.tracking.dimensions);
const timeScaleSelector = state => state.tracking.timeScale;
const timeIntervalMarkerSelector = state => state.tracking.timeIntervalMarker;

function intervalFilter({start, end}, entries) {
  return filter(
    entry => moment(entry.createdAt).isBetween(start, end, null, '[]'),
    entries
  );
}

const data = pipe(intervalFilter);

const enabledDimensions = filter(prop('enabled'));

function domain({start, end}) {
  return {
    x: [start, end],
    y: [1, 5],
  };
}

function timeInterval(scale, marker) {
  return {
    start: moment(marker).startOf(scale),
    end: moment(marker).endOf(scale),
  };
}

const intervalSelector = createSelector(
  [
    timeScaleSelector,
    timeIntervalMarkerSelector,
  ],
  (
    timeScale,
    timeIntervalMarker,
  ) => timeInterval(timeScale, timeIntervalMarker)
);

export default createSelector(
  [
    entriesSelector,
    dimensionsSelector,
    intervalSelector,
  ],
  (
    entries,
    dimensions,
    interval,
  ) => ({
    data: data(interval, entries),
    dimensions: dimensions,
    enabledDimensions: enabledDimensions(dimensions),
    domain: domain(interval),
    interval,
  })
);
