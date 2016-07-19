import {curry} from 'ramda';

import {ASSOCIATION_TYPES} from './constants';

export const ADD_ENTRY_ASSOCIATION = 'ADD_ENTRY_ASSOCIATION';
export const UPDATE_ENTRY_ASSOCIATION = 'UPDATE_ENTRY_ASSOCIATION';
export const FILTER_ASSOCIATION = 'FILTER_ASSOCIATION';

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

export const associations = {
  // symptoms
  addSymptom: addAssociation(ASSOCIATION_TYPES.SYMPTOM),
  updateEntrySymptom: updateEntryAssociation(ASSOCIATION_TYPES.SYMPTOM),
  filterSymptom: filterAssociation(ASSOCIATION_TYPES.SYMPTOM),

  // side effects
  addSideEffect: addAssociation(ASSOCIATION_TYPES.SIDE_EFFECT),
  updateEntrySideEffect: updateEntryAssociation(ASSOCIATION_TYPES.SIDE_EFFECT),
  filterSideEffect: filterAssociation(ASSOCIATION_TYPES.SIDE_EFFECT),
};
