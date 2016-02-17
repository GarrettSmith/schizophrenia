import * as actions from './actions';

// This isn't really common across platforms
import {Actions} from 'react-native-router-flux';

import * as routes from '../lib/routes';
import {
  assoc,
  is,
  pick,
  pickBy,
} from 'ramda';

const initialState = {
  currentRoute: null,
  drawerEnabled: true,
  drawerOpen: false,
};

// pick a subset able to be passed around
function pickRoute(route) {
  const top = pick(
    [
      'name',
      'title',
      'type',
    ],
    route
  );
  const props = pickBy(is(String), route.props);
  return assoc('props', props, top);
};

function setCurrentRoute(base, state) {
  const route = pickRoute(routes.findCurrent(base));
  return assoc('currentRoute', route, state);
}

export default function uiReducer(state = initialState, action) {

  switch (action.type) {

    case actions.CLOSE_DRAWER: {
      return assoc('drawerOpen', false, state);
    }

    case actions.OPEN_DRAWER: {
      alert('open')
      return assoc('drawerOpen', true, state);
    }

    case actions.ON_DRAWER_CHANGE: {
      return assoc('drawerOpen', action.payload, state);
    }

    case actions.SET_DRAWER_ENABLED: {
      return assoc('drawerEnabled', action.payload, state);
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
