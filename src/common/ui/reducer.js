import * as actions from './actions';
import {Record} from 'immutable';

// This isn't really common across platforms
import {Actions} from 'react-native-router-flux';

import {pick} from 'ramda';
import * as routes from '../lib/routes';

// pick a subset able to be passed around
const pickRoute = pick([
  'name',
  'props',
  'title',
  'type',
]);

function setCurrentRoute(base, state) {
  const route = pickRoute(routes.findCurrent(base));
  return state.set('currentRoute', route);
}

const InitialState = Record({
  currentRoute: null,
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

    // Routing Actions
    case Actions.AFTER_ROUTE:
    case Actions.AFTER_POP: {
      return setCurrentRoute(action.route, state);
    }

    case actions.SET_ROUTE: {
      return setCurrentRoute(action.payload, state);
    }

  }

  return state;
}
