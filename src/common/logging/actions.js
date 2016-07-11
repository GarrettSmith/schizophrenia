import {createAction} from 'redux-actions';

export const ADD_NEW_SYMPTOM = 'ADD_NEW_SYMPTOM';
export const ADD_SYMPTOM = 'ADD_SYMPTOM';
export const SAVE_ENTRY = 'SAVE_ENTRY';
export const ENTER_SYMPTOM = 'ENTER_SYMPTOM';
export const UPDATE_ENTRY_SYMPTOM = 'UPDATE_ENTRY_SYMPTOM';
export const UPDATE_ENTRY = 'UPDATE_ENTRY';

function addNewSymptom() {
  return ({getUid}) => ({
    type: ADD_NEW_SYMPTOM,
    payload: {
      entrySymptomId: getUid(),
      symptomId: getUid(),
    },
  });
}

function addSymptom(symptomId) {
  return ({getUid}) => ({
    type: ADD_SYMPTOM,
    payload: {
      entrySymptomId: getUid(),
      symptomId,
    },
  });
}

function updateEntrySymptom(severity, id) {
  return {
    type: UPDATE_ENTRY_SYMPTOM,
    payload: {
      id,
      severity,
    },
  };
}

function saveEntry() {
  return ({getUid, now}) => ({
    type: SAVE_ENTRY,
    payload: {
      createdAt: now(),
      id: getUid(),
    },
  });
}

export const logging = {
  addNewSymptom,
  addSymptom,
  enterSymptom: createAction(ENTER_SYMPTOM),
  saveEntry,
  updateEntrySymptom,
  updateEntry: createAction(UPDATE_ENTRY),
};
