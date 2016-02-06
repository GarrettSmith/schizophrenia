import * as actions from './actions';
import {Record} from 'immutable';

const InitialState = Record({
  drawerEnabled: true,
  drawerOpen: false,
});
const initialState = new InitialState;

export default function uiReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState;

  switch (action.type) {

    case actions.CLOSE_DRAWER: {
      return state.set('drawerOpen', false);
    }

    case actions.OPEN_DRAWER: {
      return state.set('drawerOpen', true);
    }

    case actions.ON_DRAWER_CHANGE: {
      return state.set('drawerOpen', action.payload);
    }

    case actions.SET_DRAWER_ENABLED: {
      return state.set('drawerEnabled', action.payload);
    }

  }

  return state;
}
