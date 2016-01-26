import * as actions from './actions';
import {Record} from 'immutable';

const InitialState = Record({
  switch: false,
});
const initialState = new InitialState;

export default function switchReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return InitialState(state);

  switch(action.type) {
    case actions.TOGGLE_SWITCH:
      return state.set('switch', action.payload.value);

    default:
      return state;
  }

}
