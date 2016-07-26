import {createSelector} from 'reselect';
import {
  evolve,
  filter,
  map,
  merge,
  pick,
  pipe,
  prop,
  values,
} from 'ramda';
import moment from 'moment';
import randomColor from 'randomcolor';

const entriesSelector = state => values(state.logging.entries);
const dimensionsSelector = state => values(state.tracking.dimensions);
const timeScaleSelector = state => state.tracking.timeScale;
const timeIntervalMarkerSelector = state => state.tracking.timeIntervalMarker;

function dimensionColor({color, name}) {
  return color || randomColor({
    seed: name,
    luminosity: 'bright',
  });
}

function intervalFilter({start, end}, entries) {
  return filter(
    entry => moment(entry.createdAt).isBetween(start, end, null, '[]'),
    entries
  );
}

function propMap(property, entries) {
  return map(
    entry => ({
      value: prop(property, entry),
      createdAt: entry.createdAt,
    }),
    entries
  );
}

const filterOutNulls = filter(prop('value'));

function data(prop, interval, entries) {
  const intervalFiltered = intervalFilter(interval, entries);
  const propMapped = propMap(prop, intervalFiltered);
  const nullFiltered = filterOutNulls(propMapped);
  return nullFiltered;
}

function populateDimensions(interval, entries, dimensions) {
  return map(
    dimension => merge(
      dimension,
      {
        color: dimensionColor(dimension),
        data: data(dimension.prop, interval, entries)
      }
    ),
    dimensions
  );
}

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

const populatedDimensionsSelector = createSelector(
  [
    dimensionsSelector,
    entriesSelector,
    intervalSelector,
  ],
  (
    dimensions,
    entries,
    interval,
  ) => populateDimensions(interval, entries, dimensions)
)

export default createSelector(
  [
    entriesSelector,
    populatedDimensionsSelector,
    intervalSelector,
  ],
  (
    entries,
    dimensions,
    interval,
  ) => ({
    dimensions,
    enabledDimensions: enabledDimensions(dimensions),
    domain: domain(interval),
    interval,
  })
);
