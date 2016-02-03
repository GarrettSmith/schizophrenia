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

    case actions.ON_DRAWER_CHANGE: {
      const {isOpen} = action.payload;
      return state.set('drawerOpen', isOpen);
    }

    case actions.TOGGLE_DRAWER:
      return state.update('drawerOpen', drawerOpen => !drawerOpen);

    case actions.SET_DRAWER_ENABLED: {
      const {enabled} = action.payload;
      return state.set('drawerEnabled', enabled);
    }

  }

  return state;
}
