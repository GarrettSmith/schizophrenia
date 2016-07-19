import {createSelector} from 'reselect';
import {Association} from './models';

import {
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

const MIN_ENTERED = 3;

const filterSelector = state => state.filter;
const newEntryAssociationsSelector = state => state.newEntryAssociations;
const newAssociationsSelector = state => state.newAssociations;
const associationsSelector = state => state.existingAssociations;

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

function associateEntryAssociations(entryAssociations, ...associations) {
  const mergedAssociations = mergeAll(associations);
  const associated = associate(
    'associationId',
    'association',
    mergedAssociations,
    entryAssociations
  );
  return values(associated);
}

export default createSelector(
  [
    filterSelector,
    newEntryAssociationsSelector,
    newAssociationsSelector,
    associationsSelector,
  ],
  (
    filter,
    newEntryAssociations,
    newAssociations,
    associations
  ) => ({
    filter,
    filteredAssociations: suggestAssociations(filter, associations),
    selectedAssociations:
      associateEntryAssociations(newEntryAssociations, associations, newAssociations),
  })
);
