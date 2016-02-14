import * as actions from './actions';

import {DEFAULT_SYMPTOMS} from './constants';

import {
  assoc,
} from 'ramda';

const initialState = {
  entries: {},
};

export default function todosReducer(state = initialState, action) {

  switch (action.type) {

    case actions.NEW_ENTRY: {
      return state;
    }

    default:
      return state;
  }
}
