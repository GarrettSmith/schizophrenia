import {createSelector} from 'reselect';
import {
  evolve,
  filter,
  find,
  fromPairs,
  groupBy,
  groupWith,
  map,
  merge,
  path,
  pick,
  pipe,
  pluck,
  prop,
  propEq,
  sum,
  values,
} from 'ramda';
import {associate, idMap} from '../lib/state';
import moment from 'moment';
import randomColor from 'randomcolor';

import {
  DIMENSION_CATEGORIES,
  TIME_SCALES,
} from './constants';

const entriesSelector = state => state.logging.entries;

const entrySymptomSelector = state => state.symptom.existingEntryAssociations;
const symptomSelector = state => state.symptom.existingAssociations;

const entrySideEffectSelector = state => state.sideEffect.existingEntryAssociations;
const sideEffectSelector = state => state.sideEffect.existingAssociations;

const dimensionsSelector = state => state.tracking.dimensions;

const timeScaleSelector = state => state.tracking.timeScale;
const timeIntervalMarkerSelector = state => state.tracking.timeIntervalMarker;

function dimensionColor({color, name}) {
  return color || randomColor({
    seed: name,
    luminosity: 'bright',
  });
}

function intervalFilter({start, end}) {
  return filter(
    entry => moment(entry.createdAt).isBetween(start, end, null, '[]')
  );
}

const associationValueExtractor = associationType => ({associationId}) => entry => {
  const entryAssociations = entry[associationType];
  const entryAssociation = find(
    propEq('associationId', associationId),
    values(entryAssociations)
  );
  return entryAssociation && entryAssociation.severity;
};

const valueMap = dimension => entries => {
  // function that takes an entry and returns the value to plot
  // passed the dimension first
  // dimension => entry => value
  const valueExtractor = {
    [DIMENSION_CATEGORIES.OVERVIEW]: dimension => prop(dimension.prop),
    [DIMENSION_CATEGORIES.OPTIONAL]: dimension => prop(dimension.prop),
    [DIMENSION_CATEGORIES.SYMPTOM]: associationValueExtractor('symptoms'),
    [DIMENSION_CATEGORIES.SIDE_EFFECT]: associationValueExtractor('sideEffects'),
  }[dimension.category](dimension);

  return map(
    entry => ({
      value: valueExtractor(entry),
      createdAt: entry.createdAt,
    }),
    entries
  );
}

const filterOutNulls = filter(prop('value'));

const groupByScale = scale => entries => {
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

function data(interval, entries, dimension) {
  // skip calculation if dimension is disabled
  if (!dimension.enabled) return [];
  return pipe(
    values,
    intervalFilter(interval),
    valueMap(dimension),
    filterOutNulls,
    groupByScale(interval.scale),
  )(entries);
}

function populateDimensions(interval, entries, dimensions) {
  return map(
    dimension => merge(
      dimension,
      {
        color: dimensionColor(dimension),
        data: data(interval, entries, dimension),
        domain: dimensionDomain(interval, dimension),
      }
    ),
    dimensions
  );
}

function categorizeDimensions(dimensions) {
  const groups = groupBy(
    prop('category'),
    values(dimensions)
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

function dimensionDomain(interval, dimension) {
  if (dimension.category === 'optional') {
    const y = {
      weight: [0, 300],
      bloodSugar: [0, 20],
      bloodPressureSystolic: [120, 160],
      bloodPressureDiastolic: [80, 100],
    }[dimension.prop];

    return {
      x: [interval.start, interval.end],
      y,
    };
  }
  return domain(interval);
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
    values(crisisEntries)
  );
}

function associateEntryAssociations(associations, entryAssociations) {
  return pipe(
    values,
    associate('associationId', 'association', associations),
    groupBy(prop('entryId')),
  )(entryAssociations);
}

function entryAssociationsForEntry(entryAssociations, {id}) {
  return idMap(entryAssociations[id] || []);
}

function associateEntries(
  entries,
  entrySymptoms,
  symptoms,
  entrySideEffects,
  sideEffects
) {
  const associatedEntrySymptoms = associateEntryAssociations(
    symptoms,
    entrySymptoms
  );
  const associatedEntrySideEffects = associateEntryAssociations(
    sideEffects,
    entrySideEffects
  );

  return map(
    entry => ({
      ...entry,
      symptoms: entryAssociationsForEntry(associatedEntrySymptoms, entry),
      sideEffects: entryAssociationsForEntry(associatedEntrySideEffects, entry),
    }),
    entries
  );
}

const associatedEntriesSelector = createSelector(
  [
    entriesSelector,
    entrySymptomSelector,
    symptomSelector,
    entrySideEffectSelector,
    sideEffectSelector,
  ],
  associateEntries
)

const intervalSelector = createSelector(
  [
    timeScaleSelector,
    timeIntervalMarkerSelector,
  ],
  timeInterval
);

const populatedDimensionsSelector = createSelector(
  [
    intervalSelector,
    associatedEntriesSelector,
    dimensionsSelector,
  ],
  populateDimensions
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
