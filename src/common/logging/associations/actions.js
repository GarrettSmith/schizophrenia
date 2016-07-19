import {curry} from 'ramda';

import {ASSOCIATION_TYPES} from './constants';

export const ADD_ENTRY_ASSOCIATION = 'ADD_ENTRY_ASSOCIATION';
export const UPDATE_ENTRY_ASSOCIATION = 'UPDATE_ENTRY_ASSOCIATION';
export const FILTER_ASSOCIATION = 'FILTER_ASSOCIATION';
export const SELECT_ENTRY_ASSOCIATION = 'SELECT_ENTRY_ASSOCIATION';
export const REMOVE_SELECTED_ENTRY_ASSOCIATIONS = 'REMOVE_SELECTED_ENTRY_ASSOCIATIONS';

const addAssociation = curry((associationType, id) => {
  return ({getUid}) => ({
    type: ADD_ENTRY_ASSOCIATION,
    meta: {
      associationType,
    },
    payload: {
      entryAssociationId: getUid(),
      associationId: id || getUid(),
    },
  });
});

const updateEntryAssociation = curry((associationType, severity, id) => {
  return {
    type: UPDATE_ENTRY_ASSOCIATION,
    meta: {
      associationType,
    },
    payload: {
      id,
      severity,
    },
  };
});

const filterAssociation = curry((associationType, filter) => {
  return {
    type: FILTER_ASSOCIATION,
    meta: {
      associationType,
    },
    payload: filter,
  };
});

const selectAssociation = curry((associationType, selected, id) => {
  return {
    type: SELECT_ENTRY_ASSOCIATION,
    meta: {
      associationType,
    },
    payload: {
      id,
      selected,
    },
  };
});

const removeSelectedEntryAssociations = associationType => () => ({
  type: REMOVE_SELECTED_ENTRY_ASSOCIATIONS,
  meta: {
    associationType,
  },
});

export const associations = {
  // symptoms
  addSymptom: addAssociation(ASSOCIATION_TYPES.SYMPTOM),
  updateEntrySymptom: updateEntryAssociation(ASSOCIATION_TYPES.SYMPTOM),
  filterSymptom: filterAssociation(ASSOCIATION_TYPES.SYMPTOM),
  selectEntrySymptom: selectAssociation(ASSOCIATION_TYPES.SYMPTOM),
  removeSelectedEntrySymptoms:
    removeSelectedEntryAssociations(ASSOCIATION_TYPES.SYMPTOM),

  // side effects
  addSideEffect: addAssociation(ASSOCIATION_TYPES.SIDE_EFFECT),
  updateEntrySideEffect: updateEntryAssociation(ASSOCIATION_TYPES.SIDE_EFFECT),
  filterSideEffect: filterAssociation(ASSOCIATION_TYPES.SIDE_EFFECT),
  selectEntrySideEffect: selectAssociation(ASSOCIATION_TYPES.SIDE_EFFECT),
  removeSelectedEntrySideEffects:
    removeSelectedEntryAssociations(ASSOCIATION_TYPES.SIDE_EFFECTS),
};
