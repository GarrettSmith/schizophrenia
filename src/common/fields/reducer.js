import * as actions from './actions';

import {
  assocPath,
  dissocPath,
} from 'ramda';

export default function todosReducer(state = {}, action) {

  switch (action.type) {

    case actions.DELETE_FIELD: {
      const {path} = action.payload;
      return dissocPath(path, undefined, state);
    }

    case actions.SET_FIELD: {
      const {path, value} = action.payload;
      return assocPath(path, value, state);
    }

  }

  return state;
}
