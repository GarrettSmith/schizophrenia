import {createSelector} from 'reselect';
import {Association} from './models';

import {
  assoc,
  contains,
  filter,
  length,
  map,
  merge,
  mergeAll,
  prop,
  toLower,
  values,
} from 'ramda';

import {associate} from '../../lib/state';

const MIN_ENTERED = 1;

const filterSelector = state => state.filter;
const newEntryAssociationsSelector = state => state.newEntryAssociations;
const newAssociationsSelector = state => state.newAssociations;
const associationsSelector = state => state.existingAssociations;
const selectedSelector = state => state.selected;

// TODO prevent duplicates from typing
function suggestAssociations(filterText, associations) {
  if (!filterText || length(filterText) < MIN_ENTERED) return [];

  const associationObjs = values(associations);
  const existing = filter(
    s => contains(toLower(filterText), toLower(s.name)),
    associationObjs
  );
  const newAssociation = merge(Association, {name: filterText});
  return [
    newAssociation,
    ...existing,
  ];
}

function associateEntryAssociations(selected, entryAssociations, ...associations) {
  const mergedAssociations = mergeAll(associations);
  const associated = associate(
    'associationId',
    'association',
    mergedAssociations,
    entryAssociations
  );
  // select entry associations
  const selectedAssociations = map(
    a => assoc('selected', contains(a.id, selected), a),
    associated
  );
  return values(selectedAssociations);
}

export default createSelector(
  [
    filterSelector,
    selectedSelector,
    newEntryAssociationsSelector,
    newAssociationsSelector,
    associationsSelector,
  ],
  (
    filter,
    selected,
    newEntryAssociations,
    newAssociations,
    associations
  ) => ({
    filter,
    selected,
    filteredAssociations: suggestAssociations(filter, associations),
    selectedAssociations: associateEntryAssociations(
      selected,
      newEntryAssociations,
      associations,
      newAssociations
    ),
  })
);
