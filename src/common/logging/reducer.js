import * as actions from './actions';
import Entry from './entry';
import Symptom from './symptom';
import {Map, Record} from 'immutable-fns';

const InitialState = Record({
  entries: Map(),
});
const initialState = new InitialState;

// Note how JSON from server is revived to immutable record.
const revive = ({entries}) => Record.merge(
  {
    // Turn js objects back into map of entries
    entries: Map.map(entry => Entry(entry), Map(entries))
  },
  initialState
);

export default function todosReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) {
    return revive(state);
  }

  switch (action.type) {

    case actions.NEW_ENTRY: {
      const entry = action.payload;
      return Map.update(
        'entries',
        Map.set(entry.id, entry),
        state
      );
    }

    default:
      return state;
  }
}
