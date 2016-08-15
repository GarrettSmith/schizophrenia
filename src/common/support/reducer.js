import * as actions from './actions';

const initialState = {
  contacts: [],
};

import {
  append,
  evolve,
} from 'ramda';

function addContact(contact, state) {
  return evolve(
    {
      contacts: append(contact),
    },
    state
  );
}

export default function supportReducer(state = initialState, action) {
  switch(action.type) {
    case actions.ADD_CONTACT:
      return addContact(action.payload, state);
  }
  return state;
}
