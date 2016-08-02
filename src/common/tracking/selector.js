import {createSelector} from 'reselect';
import {
  evolve,
  filter,
  fromPairs,
  groupBy,
  groupWith,
  map,
  merge,
  pick,
  pluck,
  prop,
  propEq,
  sum,
  values,
} from 'ramda';
import moment from 'moment';
import randomColor from 'randomcolor';

import {
  DIMENSION_CATEGORIES,
  TIME_SCALES,
} from './constants';

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

function groupByScale(scale, entries) {
  if (scale === TIME_SCALES.WEEK) return entries;

  // Group everything else by day
  const timeScale = 'day';
  const grouped = groupWith(
    (a, b) => moment(a.createdAt).isSame(b.createdAt, timeScale),
    entries
  );
  const averaged = map(
    group => ({
      value: average(pluck('value', group)),
      createdAt: moment(group[0].createdAt).startOf(timeScale),
    }),
    grouped
  );
  return averaged;
}

function average(values) {
  return sum(values) / values.length;
}

function data(prop, interval, entries) {
  const intervalFiltered = intervalFilter(interval, entries);
  const propMapped = propMap(prop, intervalFiltered);
  const nullFiltered = filterOutNulls(propMapped);
  const scaleGrouped = groupByScale(interval.scale, nullFiltered);
  return scaleGrouped;
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

function categorizeDimensions(dimensions) {
  const groups = groupBy(
    prop('category'),
    dimensions
  );
  const emptyCategories = fromPairs(map(
    cat => [cat, []],
    values(DIMENSION_CATEGORIES)
  ));
  // ensure we have all expected categories
  return merge(
    emptyCategories,
    groups,
  );
}

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
    scale,
  };
}

function crisis(resolved, entries) {
  const crisisEntries = filter(
    propEq('crisisResolved', resolved),
    entries
  );
  return map(
    pick(['createdAt', 'crisisResolved']),
    crisisEntries
  );
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
    crisisResolved: crisis(true, entries),
    crisisUnresolved: crisis(false, entries),
    dimensions: categorizeDimensions(dimensions),
    domain: domain(interval),
    interval,
  })
);
