import {curry} from 'ramda';

import {ASSOCIATION_TYPES} from './constants';

export const SET_ENTRY_ASSOCIATION = 'SET_ENTRY_ASSOCIATION';
export const FILTER_ASSOCIATION = 'FILTER_ASSOCIATION';
export const SELECT_ENTRY_ASSOCIATION = 'SELECT_ENTRY_ASSOCIATION';
export const REMOVE_SELECTED_ENTRY_ASSOCIATIONS = 'REMOVE_SELECTED_ENTRY_ASSOCIATIONS';

const setEntryAssociation = curry((associationType, {associationId, id, severity}) => {
  return ({getUid}) => ({
    type: SET_ENTRY_ASSOCIATION,
    meta: {
      associationType,
    },
    payload: {
      id: id || getUid(),
      associationId: associationId || getUid(),
      severity,
    },
  });
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
  setEntrySymptom: setEntryAssociation(ASSOCIATION_TYPES.SYMPTOM),
  filterSymptom: filterAssociation(ASSOCIATION_TYPES.SYMPTOM),
  selectEntrySymptom: selectAssociation(ASSOCIATION_TYPES.SYMPTOM),
  removeSelectedEntrySymptoms:
    removeSelectedEntryAssociations(ASSOCIATION_TYPES.SYMPTOM),

  // side effects
  setEntrySideEffect: setEntryAssociation(ASSOCIATION_TYPES.SIDE_EFFECT),
  filterSideEffect: filterAssociation(ASSOCIATION_TYPES.SIDE_EFFECT),
  selectEntrySideEffect: selectAssociation(ASSOCIATION_TYPES.SIDE_EFFECT),
  removeSelectedEntrySideEffects:
    removeSelectedEntryAssociations(ASSOCIATION_TYPES.SIDE_EFFECTS),
};
