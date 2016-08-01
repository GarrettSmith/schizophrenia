import {createSelector} from 'reselect';
import {
  Association,
  EntryAssociation,
} from './models';

import {
  assoc,
  contains,
  eqBy,
  filter,
  length,
  map,
  merge,
  mergeAll,
  mergeWith,
  path,
  pick,
  prop,
  propEq,
  toLower,
  unionWith,
  values,
} from 'ramda';

import {associate} from '../../lib/state';
import {previousEntrySelector} from '../entry/selector';

const MIN_ENTERED = 1;

// TODO prevent duplicates from typing
function filterAssociations(filterText, associations) {
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

function associateEntryAssociations(entryAssociations, associations) {
  return associate(
    'associationId',
    'association',
    associations,
    entryAssociations
  );
}

function selectEntryAssociations(selected, entryAssociations) {
  return map(
    a => assoc('selected', contains(a.id, selected), a),
    entryAssociations
  );
}

function suggestEntryAssociations(previousEntryAssociations) {
  const copiedProps = [
    'associationId',
  ];
  return map(
    prev => merge(
      EntryAssociation,
      pick(copiedProps, prev),
    ),
    values(previousEntryAssociations)
  );
}

function selectedEntryAssociations(
  selected,
  newEntryAssociations,
  previousEntryAssociations,
  ...associations
) {
  const mergedAssociations = mergeAll(associations);

  const entryAssociations = unionWith(
    eqBy(prop('associationId')),
    values(newEntryAssociations),
    suggestEntryAssociations(previousEntryAssociations),
  );

  const associated = associateEntryAssociations(
    entryAssociations,
    mergedAssociations
  );

  const selectedEntryAssociations = selectEntryAssociations(
    selected,
    associated
  );

  return selectedEntryAssociations;
}

function previousEntryAssociations(previousEntry, entryAssociations) {
  return filter(
    propEq('entryId', previousEntry.id),
    entryAssociations
  );
}

export default function associationsSelect(type, state) {

  const filterSelector = path([type, 'filter']);
  const newEntryAssociationsSelector = path([type, 'newEntryAssociations']);
  const entryAssociationsSelector = path([type, 'existingEntryAssociations']);
  const newAssociationsSelector = path([type, 'newAssociations']);
  const associationsSelector = path([type, 'existingAssociations']);
  const selectedSelector = path([type, 'selected']);

  const previousEntryAssociationsSelector = createSelector(
    [
      previousEntrySelector,
      entryAssociationsSelector,
    ],
    previousEntryAssociations
  );

  const filteredAssociationsSelector = createSelector(
    [
      filterSelector,
      associationsSelector,
    ],
    filterAssociations
  );

  const selectedEntryAssociationsSelector = createSelector(
    [
      selectedSelector,
      newEntryAssociationsSelector,
      previousEntryAssociationsSelector,
      newAssociationsSelector,
      associationsSelector,
    ],
    selectedEntryAssociations
  );

  return createSelector(
    [
      filterSelector,
      selectedSelector,
      filteredAssociationsSelector,
      selectedEntryAssociationsSelector,
    ],
    (
      filter,
      selected,
      filteredAssociations,
      selectedEntryAssociations,
    ) => ({
      filter,
      selected,
      filteredAssociations,
      selectedEntryAssociations,
    })
  )(state);
}
