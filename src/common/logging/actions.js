import Symptom from './symptom';
import {createAction} from 'redux-actions';

export const ADD_SYMPTOM = 'ADD_SYMPTOM';
export const SAVE_ENTRY = 'SAVE_ENTRY';
export const SET_SYMPTOM_SEVERITY = 'SET_SYMPTOM_SEVERITY';

function saveEntry() {
  return ({getUid, now}) => ({
    type: SAVE_ENTRY,
    payload: {
      createdAt: now(),
      id: getUid(),
    },
  });
}

function setSymptomSeverity(severity, symptom) {
  return {
    type: SET_SYMPTOM_SEVERITY,
    payload: {
      severity,
      symptom,
    },
  };
}

export const logging = {
  addSymptom: createAction(ADD_SYMPTOM),
  saveEntry,
  setSymptomSeverity,
};

