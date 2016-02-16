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
  map,
  merge,
} from 'ramda';

// set obj into id maps
const set = curry((obj, map) => assoc(obj.id, obj, map));



const initialState = {
  newEntry: Entry,
  newEntrySymptoms: {},
  newSymptoms: {},
  entries: {},
  entrySymptoms: {},
  symptoms: {},
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

    case actions.ADD_SYMPTOM: {
      const newSymptom = merge(
        Symptom,
        {
          id: action.id,
          name: action.name,
        }
      );
      const newEntrySymptom = merge(
        EntrySymptom,
        {
          id: action.entrySymptomId,
          symptomId: newSymptom.id,
        }
      );
      return evolve(
        state,
        {
          newEntrySymptoms: set(newEntrySymptom),
          newSymptoms: set(newSymptom),
        }
      );
    }

    case actions.UPDATE_ENTRY_SYMPTOM: {
      return assocPath(
        [action.id, 'severity'],
        action.severity,
        state.newEntrySymptoms
      );
    }

    case actions.ENTER_SYMPTOM: {
      return assoc('enteredSymptom', action.payload);
    }

    default:
      return state;
  }
}
