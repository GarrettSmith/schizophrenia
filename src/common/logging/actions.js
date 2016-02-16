import {createAction} from 'redux-actions';

export const ADD_SYMPTOM = 'ADD_SYMPTOM';
export const SAVE_ENTRY = 'SAVE_ENTRY';
export const ENTER_SYMPTOM = 'ENTER_SYMPTOM';
export const UPDATE_ENTRY_SYMPTOM = 'UPDATE_ENTRY_SYMPTOM';

function addSymptom(name) {
  return ({getUid}) => ({
    type: ADD_SYMPTOM,
    payload: {
      entrySymptomId: getUid(),
      id: getUid(),
      name,
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
  addSymptom,
  enterSymptom: createAction(ENTER_SYMPTOM),
  saveEntry,
  updateEntrySymptom,
};
