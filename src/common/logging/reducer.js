import * as actions from './actions';

import {DEFAULT_SYMPTOMS} from './constants';

import {
  Entry,
  EntrySymptom,
  Symptom,
} from './models';

import {
  assoc,
  assocPath,
  clone,
  curry,
  evolve,
  find,
  identity,
  map,
  merge,
  propEq,
  values,
} from 'ramda';

// set obj into id maps
const set = curry((obj, map) => assoc(obj.id, obj, map));

const initialState = {
  newEntry: Entry,
  newEntrySymptoms: {},
  newSymptoms: {},
  entries: {},
  entrySymptoms: {},
  symptoms: DEFAULT_SYMPTOMS,
  enteredSymptom: null,
};

export default function loggingReducer(state = initialState, action) {

  switch (action.type) {

    case actions.SAVE_ENTRY: {
      const newEntry = merge(state.newEntry, action.payload);
      const newEntrySymptoms = map(assoc('entryId', newEntry.id));
      return merge(
        state,
        {
          // Reset new entry state to be empty
          newEntry: Entry,
          newEntrySymptoms: {},
          newSymptoms: {},

          // Merge new state into persistent state
          entries: set(newEntry, state.entries),
          entrySymptoms: merge(newEntrySymptoms, state.entrySymptoms),
          symptoms: merge(state.newSymptoms, state.symptoms),
        }
      );
    }

    case actions.ADD_NEW_SYMPTOM: {
      const name = state.enteredSymptom;

      const oldSymptom = find(propEq('name', name), values(state.symptoms));
      const newSymptom = merge(
        Symptom,
        {
          id: action.payload.symptomId,
          name,
        }
      );
      const symptom = oldSymptom || newSymptom;

      const newEntrySymptom = merge(
        EntrySymptom,
        {
          id: action.payload.entrySymptomId,
          symptomId: symptom.id,
        }
      );
      return evolve(
        {
          newEntrySymptoms: set(newEntrySymptom),
          // only update newSymptoms if this is actually new
          newSymptoms: newSymptom ? set(newSymptom) : identity,
          enteredSymptom: () => null,
        },
        state
      );
    }

    case actions.ADD_SYMPTOM: {
      const newEntrySymptom = merge(
        EntrySymptom,
        {
          id: action.payload.entrySymptomId,
          symptomId: action.payload.symptomId,
        }
      );
      return evolve(
        {
          newEntrySymptoms: set(newEntrySymptom),
          enteredSymptom: () => null,
        },
        state
      );
    }

    case actions.UPDATE_ENTRY_SYMPTOM: {
      return assocPath(
        ['newEntrySymptoms', action.payload.id, 'severity'],
        action.payload.severity,
        state
      );
    }

    case actions.ENTER_SYMPTOM: {
      return assoc('enteredSymptom', action.payload, state);
    }

    default:
      return state;
  }
}
